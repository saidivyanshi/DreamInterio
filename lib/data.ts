export const roomTypes = [
  {
    id: 'living-hall',
    name: 'Living Hall',
    description: 'Elegant living spaces for family gatherings',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    count: 24
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Cozy and comfortable bedroom designs',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    count: 18
  },
  {
    id: 'kitchen',
    name: 'Kitchen',
    description: 'Modern and functional kitchen layouts',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    count: 15
  },
  {
    id: 'balcony',
    name: 'Balcony',
    description: 'Beautiful outdoor living spaces',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    count: 12
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Productive home office setups',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    count: 20
  }
]

export const furnitureProducts = [
  // Living Hall Furniture
  {
    id: 'sofa-1',
    name: 'Premium L-Shaped Sofa',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop',
    category: 'living-hall',
    type: 'furniture' as const,
    description: 'Luxurious fabric sofa with premium cushioning'
  },
  {
    id: 'coffee-table-1',
    name: 'Glass Coffee Table',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    category: 'living-hall',
    type: 'furniture' as const,
    description: 'Modern tempered glass coffee table'
  },
  {
    id: 'tv-unit-1',
    name: 'Wooden TV Unit',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    category: 'living-hall',
    type: 'furniture' as const,
    description: 'Solid wood entertainment center'
  },
  {
    id: 'armchair-1',
    name: 'Leather Armchair',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop',
    category: 'living-hall',
    type: 'furniture' as const,
    description: 'Genuine leather reclining armchair'
  },
  
  // Bedroom Furniture
  {
    id: 'bed-1',
    name: 'King Size Bed',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    category: 'bedroom',
    type: 'furniture' as const,
    description: 'Solid wood king size bed with storage'
  },
  {
    id: 'wardrobe-1',
    name: '4-Door Wardrobe',
    price: 95000,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    category: 'bedroom',
    type: 'furniture' as const,
    description: 'Spacious wardrobe with mirror doors'
  },
  {
    id: 'dresser-1',
    name: 'Wooden Dresser',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    category: 'bedroom',
    type: 'furniture' as const,
    description: 'Classic wooden dresser with mirror'
  },
  {
    id: 'nightstand-1',
    name: 'Bedside Table Set',
    price: 18000,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=400&fit=crop',
    category: 'bedroom',
    type: 'furniture' as const,
    description: 'Set of 2 matching bedside tables'
  },
  
  // Kitchen Furniture
  {
    id: 'kitchen-cabinet-1',
    name: 'Modular Kitchen Cabinet',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    category: 'kitchen',
    type: 'furniture' as const,
    description: 'Complete modular kitchen setup'
  },
  {
    id: 'dining-table-1',
    name: '6-Seater Dining Table',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    category: 'kitchen',
    type: 'furniture' as const,
    description: 'Solid wood dining table with chairs'
  },
  {
    id: 'kitchen-island-1',
    name: 'Kitchen Island',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop',
    category: 'kitchen',
    type: 'furniture' as const,
    description: 'Multi-functional kitchen island'
  },
  
  // Office Furniture
  {
    id: 'office-desk-1',
    name: 'Executive Office Desk',
    price: 42000,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    category: 'office',
    type: 'furniture' as const,
    description: 'Large executive desk with drawers'
  },
  {
    id: 'office-chair-1',
    name: 'Ergonomic Office Chair',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    category: 'office',
    type: 'furniture' as const,
    description: 'High-back ergonomic office chair'
  },
  {
    id: 'bookshelf-1',
    name: 'Wooden Bookshelf',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    category: 'office',
    type: 'furniture' as const,
    description: '5-tier wooden bookshelf'
  },
  
  // Balcony Furniture
  {
    id: 'outdoor-set-1',
    name: 'Outdoor Seating Set',
    price: 38000,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    category: 'balcony',
    type: 'furniture' as const,
    description: 'Weather-resistant outdoor furniture set'
  },
  {
    id: 'planter-1',
    name: 'Decorative Planters Set',
    price: 8000,
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
    category: 'balcony',
    type: 'furniture' as const,
    description: 'Set of 3 ceramic planters'
  }
]

export const paintPacks = [
  {
    id: 'paint-warm-1',
    name: 'Warm Sunset Palette',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    type: 'paint_pack' as const,
    colors: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5'],
    description: 'Warm and inviting color palette'
  },
  {
    id: 'paint-cool-1',
    name: 'Ocean Breeze Palette',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    type: 'paint_pack' as const,
    colors: ['#0077BE', '#00A8CC', '#7FDBFF', '#B8E6B8'],
    description: 'Cool and calming ocean-inspired colors'
  },
  {
    id: 'paint-neutral-1',
    name: 'Modern Neutral Palette',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    type: 'paint_pack' as const,
    colors: ['#F5F5F5', '#E0E0E0', '#9E9E9E', '#424242'],
    description: 'Sophisticated neutral tones'
  },
  {
    id: 'paint-earth-1',
    name: 'Earthy Tones Palette',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
    type: 'paint_pack' as const,
    colors: ['#8D6E63', '#A1887F', '#D7CCC8', '#EFEBE9'],
    description: 'Natural earthy color palette'
  }
]

export const designers = [
  {
    id: 'designer-1',
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop',
    rating: 4.9,
    specialty: 'Modern Minimalist',
    experience: '8 years',
    projects: 150,
    price: 4999,
    whatsapp: '+91-9876543210',
    email: 'priya@dreaminteriors.com',
    phone: '+91-9876543210'
  },
  {
    id: 'designer-2',
    name: 'Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    rating: 4.8,
    specialty: 'Traditional Indian',
    experience: '12 years',
    projects: 200,
    price: 3999,
    whatsapp: '+91-9876543211',
    email: 'rajesh@dreaminteriors.com',
    phone: '+91-9876543211'
  },
  {
    id: 'designer-3',
    name: 'Anita Desai',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
    rating: 4.9,
    specialty: 'Contemporary Luxury',
    experience: '10 years',
    projects: 180,
    price: 4499,
    whatsapp: '+91-9876543212',
    email: 'anita@dreaminteriors.com',
    phone: '+91-9876543212'
  },
  {
    id: 'designer-4',
    name: 'Vikram Singh',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
    rating: 4.7,
    specialty: 'Industrial Design',
    experience: '6 years',
    projects: 120,
    price: 3499,
    whatsapp: '+91-9876543213',
    email: 'vikram@dreaminteriors.com',
    phone: '+91-9876543213'
  },
  {
    id: 'designer-5',
    name: 'Meera Patel',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop',
    rating: 4.8,
    specialty: 'Scandinavian Style',
    experience: '7 years',
    projects: 140,
    price: 3999,
    whatsapp: '+91-9876543214',
    email: 'meera@dreaminteriors.com',
    phone: '+91-9876543214'
  },
  {
    id: 'designer-6',
    name: 'Arjun Mehta',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
    rating: 4.9,
    specialty: 'Eco-Friendly Design',
    experience: '9 years',
    projects: 160,
    price: 4299,
    whatsapp: '+91-9876543215',
    email: 'arjun@dreaminteriors.com',
    phone: '+91-9876543215'
  },
  {
    id: 'designer-7',
    name: 'Kavya Reddy',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop',
    rating: 4.8,
    specialty: 'Bohemian Chic',
    experience: '5 years',
    projects: 100,
    price: 2999,
    whatsapp: '+91-9876543216',
    email: 'kavya@dreaminteriors.com',
    phone: '+91-9876543216'
  },
  {
    id: 'designer-8',
    name: 'Rohit Gupta',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop',
    rating: 4.7,
    specialty: 'Smart Home Integration',
    experience: '4 years',
    projects: 80,
    price: 3799,
    whatsapp: '+91-9876543217',
    email: 'rohit@dreaminteriors.com',
    phone: '+91-9876543217'
  }
]

export const roomImages = {
  'living-hall': [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
  ],
  'bedroom': [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1631049421450-348ccd7f8949?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571508601891-ca5e7a713859?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=600&fit=crop'
  ],
  'kitchen': [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-4f6e9d4d4d4d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-4f6e9d4d4d4d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-4f6e9d4d4d4d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1565182999561-18d7dc61c393?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
  ],
  'balcony': [
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop'
  ],
  'office': [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
  ]
}