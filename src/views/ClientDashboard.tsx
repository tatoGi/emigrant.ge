'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Heart, Settings, LogOut, User, MapPin, Globe2, Shield, Bell } from 'lucide-react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/hooks/use-toast'
import { COUNTRIES, CITIES_BY_COUNTRY, LANGUAGES, NATIONALITIES } from '@/lib/data'

type Section = 'dashboard' | 'saved' | 'settings'

interface Props {
  section: Section
}

const navItems = [
  { icon: Heart, label: 'Saved', path: '/client/saved' },
  { icon: Settings, label: 'Settings', path: '/client/settings' },
]

const settingsSections = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'location', label: 'Location', icon: MapPin },
  { id: 'language', label: 'Language & Nationality', icon: Globe2 },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'notifications', label: 'Notifications', icon: Bell },
]

const ClientDashboard = ({ section }: Props) => {
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  // usePathname replaces window.location.pathname for active nav state
  const pathname = usePathname()

  const [profile, setProfile] = useState({
    first_name: '', last_name: '', phone: '',
    country: '', city: '', nationality: '', languages: [] as string[],
  })
  const [activeSection, setActiveSection] = useState('personal')
  const [saving, setSaving] = useState(false)
  const [newPassword, setNewPassword] = useState('')

  // TODO: fetch profile from backend when ready

  const saveProfile = async () => {
    // TODO: persist to backend when ready
    setSaving(true)
    await new Promise(r => setTimeout(r, 300))
    setSaving(false)
    toast({ title: 'Saved!' })
  }

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) return
    // TODO: call backend password update when ready
    toast({ title: 'Password updated' })
    setNewPassword('')
  }

  const handleLogout = async () => {
    await signOut()
    router.push('/')
  }

  const cities = profile.country ? CITIES_BY_COUNTRY[profile.country] || [] : []

  const toggleLanguage = (lang: string) => {
    setProfile(p => ({
      ...p,
      languages: p.languages.includes(lang) ? p.languages.filter(l => l !== lang) : [...p.languages, lang],
    }))
  }

  const Nav = () => (
    <aside className="hidden md:block w-56 shrink-0">
      <nav className="space-y-1">
        {navItems.map(item => {
          const Icon = item.icon
          const active = pathname === item.path
          return (
            <Link key={item.path} href={item.path} className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}>
              <Icon className="h-4 w-4" /> {item.label}
            </Link>
          )
        })}
        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </nav>
    </aside>
  )

  // section prop replaces window.location.pathname checks
  if (section === 'saved') {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-20 container mx-auto px-4 py-8">
          <div className="flex gap-8">
            <Nav />
            <main className="flex-1">
              <h1 className="font-display text-2xl font-bold text-foreground mb-6">Saved</h1>
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <p className="text-muted-foreground">Your saved providers will appear here.</p>
                <Link href="/search" className="text-primary hover:underline text-sm mt-2 inline-block">Find a professional</Link>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Nav />
          <main className="flex-1 max-w-2xl">
            <h1 className="font-display text-2xl font-bold text-foreground mb-6">Settings</h1>

            <div className="flex gap-2 flex-wrap mb-6">
              {settingsSections.map(s => (
                <button key={s.id} onClick={() => setActiveSection(s.id)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeSection === s.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'}`}>
                  <s.icon className="h-3.5 w-3.5" /> {s.label}
                </button>
              ))}
            </div>

            {activeSection === 'personal' && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><Label>First Name</Label><Input value={profile.first_name} onChange={e => setProfile(p => ({ ...p, first_name: e.target.value }))} /></div>
                  <div><Label>Last Name</Label><Input value={profile.last_name} onChange={e => setProfile(p => ({ ...p, last_name: e.target.value }))} /></div>
                </div>
                <div><Label>Phone</Label><Input value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} /></div>
                <div><Label>Email</Label><Input value={user?.email || ''} disabled className="opacity-60" /></div>
                <Button onClick={saveProfile} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
              </div>
            )}

            {activeSection === 'location' && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div><Label>Country</Label>
                  <Select value={profile.country} onValueChange={v => setProfile(p => ({ ...p, country: v, city: '' }))}>
                    <SelectTrigger><SelectValue placeholder="Select country" /></SelectTrigger>
                    <SelectContent>{COUNTRIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>City</Label>
                  <Select value={profile.city} onValueChange={v => setProfile(p => ({ ...p, city: v }))} disabled={!profile.country}>
                    <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                    <SelectContent>{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <Button onClick={saveProfile} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
              </div>
            )}

            {activeSection === 'language' && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div><Label>Nationality</Label>
                  <Select value={profile.nationality} onValueChange={v => setProfile(p => ({ ...p, nationality: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select nationality" /></SelectTrigger>
                    <SelectContent>{NATIONALITIES.map(n => <SelectItem key={n} value={n}>{n}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {LANGUAGES.map(lang => (
                      <button key={lang} onClick={() => toggleLanguage(lang)} className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${profile.languages.includes(lang) ? 'bg-primary text-primary-foreground border-primary' : 'bg-muted text-muted-foreground border-border hover:border-foreground/30'}`}>
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={saveProfile} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
              </div>
            )}

            {activeSection === 'security' && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div><Label>New Password</Label><Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Min 6 characters" minLength={6} /></div>
                <Button onClick={changePassword} disabled={!newPassword || newPassword.length < 6}>Update Password</Button>
              </div>
            )}

            {activeSection === 'notifications' && (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                {['Booking updates', 'New messages', 'Promotions'].map(item => (
                  <div key={item} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{item}</span>
                    <Switch defaultChecked />
                  </div>
                ))}
                <Button onClick={saveProfile} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default ClientDashboard
