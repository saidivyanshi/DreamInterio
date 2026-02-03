'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { ThemeProvider } from 'next-themes'

// Create a demo supabase client for development
const createDemoSupabaseClient = () => {
  try {
    return createClientComponentClient()
  } catch (error) {
    // Return a mock client for demo purposes
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        signInWithPassword: () => Promise.resolve({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
        signUp: () => Promise.resolve({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
        signInWithOAuth: () => Promise.resolve({ data: null, error: { message: 'Demo mode - Supabase not configured' } }),
        signOut: () => Promise.resolve({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ order: () => Promise.resolve({ data: [], error: null }) }) }),
        insert: () => Promise.resolve({ data: null, error: null }),
      }),
    }
  }
}

const supabase = createDemoSupabaseClient()

export function Providers({ children }: { children: React.ReactNode }) {
  const [initialSession, setInitialSession] = useState(null)

  useEffect(() => {
    if (supabase.auth?.getSession) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setInitialSession(session)
      }).catch(() => {
        // Handle demo mode
        setInitialSession(null)
      })
    }
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <SessionContextProvider 
        supabaseClient={supabase} 
        initialSession={initialSession}
      >
        {children}
      </SessionContextProvider>
    </ThemeProvider>
  )
}