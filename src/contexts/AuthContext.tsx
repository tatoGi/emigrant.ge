'use client'

// Temporary mock auth — no backend yet.
// Replace implementations with real API calls when backend is ready.
import { createContext, useContext, useState, ReactNode } from 'react'

type AppRole = 'client' | 'provider'

interface MockUser {
  id: string
  email: string
}

interface AuthContextType {
  user: MockUser | null
  role: AppRole | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string, role: AppRole) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null)
  const [role, setRole] = useState<AppRole | null>(null)
  // No async init needed without a backend
  const loading = false

  const signUp = async (
    email: string,
    _password: string,
    _fullName: string,
    selectedRole: AppRole
  ): Promise<{ error: any }> => {
    setUser({ id: crypto.randomUUID(), email })
    setRole(selectedRole)
    return { error: null }
  }

  const signIn = async (
    email: string,
    _password: string
  ): Promise<{ error: any }> => {
    setUser({ id: crypto.randomUUID(), email })
    // Default role until role-based auth is implemented
    setRole('client')
    return { error: null }
  }

  const signOut = async () => {
    setUser(null)
    setRole(null)
  }

  const resetPassword = async (_email: string): Promise<{ error: any }> => {
    // No-op until backend is ready
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{ user, role, loading, signUp, signIn, signOut, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
