'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Globe, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'

const Register = () => {
  const [role, setRole] = useState<'client' | 'provider'>('client')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const { signUp } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await signUp(email, password, fullName, role)
    setSubmitting(false)
    if (error) {
      toast({ title: 'Registration failed', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Check your email', description: 'We sent a confirmation link to verify your account.' })
      router.push('/login')
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      <div className="hidden lg:flex lg:w-1/2 bg-primary items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <Globe className="h-12 w-12 mb-6" />
          <h2 className="font-display text-3xl font-bold mb-4">Join your community abroad</h2>
          <p className="text-primary-foreground/80 text-lg">
            Connect with trusted professionals who speak your language and understand your culture.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <Globe className="h-6 w-6 text-primary" />
            <span className="font-display text-lg font-bold text-foreground">ემიგრანტ.GE</span>
          </Link>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Create your account</h1>
          <p className="text-muted-foreground mb-6">Start finding or offering services today</p>

          <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setRole('client')}
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${role === 'client' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
            >
              I need a service
            </button>
            <button
              onClick={() => setRole('provider')}
              className={`flex-1 text-sm font-medium py-2 rounded-md transition-colors ${role === 'provider' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
            >
              I&apos;m a provider
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Full name" className="pl-10" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="email" placeholder="Email" className="pl-10" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="password" placeholder="Password" className="pl-10" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} />
            </div>
            <Button className="w-full gap-2" size="lg" disabled={submitting}>
              {submitting ? 'Creating…' : 'Create Account'} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
