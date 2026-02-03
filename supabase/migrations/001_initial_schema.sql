-- Enable RLS
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create tables
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    image_url TEXT,
    category TEXT,
    type TEXT NOT NULL CHECK (type IN ('furniture', 'paint_pack')),
    colors TEXT[], -- For paint packs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.cart_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_id TEXT UNIQUE,
    items JSONB NOT NULL,
    customer_info JSONB NOT NULL,
    total_amount INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.saved_designs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    room_type TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, image_url)
);

CREATE TABLE IF NOT EXISTS public.designers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    whatsapp TEXT,
    image_url TEXT,
    specialty TEXT,
    experience TEXT,
    rating DECIMAL(2,1) DEFAULT 0.0,
    projects_count INTEGER DEFAULT 0,
    price INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Products are viewable by everyone" ON public.products
    FOR SELECT USING (true);

CREATE POLICY "Users can view their own cart items" ON public.cart_items
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own cart items" ON public.cart_items
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own cart items" ON public.cart_items
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own cart items" ON public.cart_items
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own orders" ON public.orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own saved designs" ON public.saved_designs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved designs" ON public.saved_designs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved designs" ON public.saved_designs
    FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Designers are viewable by everyone" ON public.designers
    FOR SELECT USING (true);

-- Create indexes
CREATE INDEX idx_cart_items_user_id ON public.cart_items(user_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_session_id ON public.orders(session_id);
CREATE INDEX idx_saved_designs_user_id ON public.saved_designs(user_id);
CREATE INDEX idx_products_category ON public.products(category);
CREATE INDEX idx_products_type ON public.products(type);

-- Insert sample data
INSERT INTO public.designers (name, email, phone, whatsapp, image_url, specialty, experience, rating, projects_count, price) VALUES
('Priya Sharma', 'priya@dreaminteriors.com', '+91-9876543210', '+91-9876543210', 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop', 'Modern Minimalist', '8 years', 4.9, 150, 4999),
('Rajesh Kumar', 'rajesh@dreaminteriors.com', '+91-9876543211', '+91-9876543211', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', 'Traditional Indian', '12 years', 4.8, 200, 3999),
('Anita Desai', 'anita@dreaminteriors.com', '+91-9876543212', '+91-9876543212', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop', 'Contemporary Luxury', '10 years', 4.9, 180, 4499),
('Vikram Singh', 'vikram@dreaminteriors.com', '+91-9876543213', '+91-9876543213', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', 'Industrial Design', '6 years', 4.7, 120, 3499),
('Meera Patel', 'meera@dreaminteriors.com', '+91-9876543214', '+91-9876543214', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop', 'Scandinavian Style', '7 years', 4.8, 140, 3999),
('Arjun Mehta', 'arjun@dreaminteriors.com', '+91-9876543215', '+91-9876543215', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', 'Eco-Friendly Design', '9 years', 4.9, 160, 4299),
('Kavya Reddy', 'kavya@dreaminteriors.com', '+91-9876543216', '+91-9876543216', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop', 'Bohemian Chic', '5 years', 4.8, 100, 2999),
('Rohit Gupta', 'rohit@dreaminteriors.com', '+91-9876543217', '+91-9876543217', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop', 'Smart Home Integration', '4 years', 4.7, 80, 3799);