import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export const createClient = () => {
  try {
    return createClientComponentClient()
  } catch (error) {
    // Return mock client for demo mode
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Demo mode' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Demo mode' } }),
        signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Demo mode' } }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null }),
      }),
    }
  }
}

export const createServerClient = () => {
  try {
    return createServerComponentClient({ cookies })
  } catch (error) {
    return createClient()
  }
}