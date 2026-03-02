'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Globe, Mail, Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { signIn } = useAuth()
  const { toast } = useToast()
  // useRouter replaces useNavigate — router.push() replaces navigate()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await signIn(email, password)
    setSubmitting(false)
    if (error) {
      toast({ title: 'Login failed', description: error.message, variant: 'destructive' })
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <Link href="/" className="flex items-center gap-2 mb-8 justify-center">
          <Globe className="h-7 w-7 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">ემიგრანტ.GE</span>
        </Link>
        <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
          <h1 className="font-display text-2xl font-bold text-foreground mb-1 text-center">Welcome back</h1>
          <p className="text-muted-foreground text-center mb-6">Log in to your account</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="email" placeholder="Email" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="Password" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-primary hover:underline">Forgot password?</Link>
            </div>
            <Button className="w-full gap-2" size="lg" disabled={submitting}>
              {submitting ? 'Logging in…' : 'Log in'} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
