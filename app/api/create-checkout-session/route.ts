import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { items, customerInfo, total, userId } = await request.json()

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: 'inr',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100, // Convert to paise
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      customer_email: customerInfo.email,
      metadata: {
        userId,
        customerInfo: JSON.stringify(customerInfo),
      },
    })

    // Save order to database
    const supabase = createServerClient()
    
    const { error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        session_id: session.id,
        items: items,
        customer_info: customerInfo,
        total_amount: total,
        status: 'pending',
      })

    if (error) {
      console.error('Database error:', error)
    }

    return NextResponse.json({ sessionId: session.id })
  } catch (error: any) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}