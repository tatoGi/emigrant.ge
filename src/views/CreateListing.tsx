'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PROFESSIONS, COUNTRIES, CITIES_BY_COUNTRY, LANGUAGES, NATIONALITIES } from '@/lib/data'

const steps = ['Basic Info', 'Service Details', 'Pricing & Photos']

const CreateListing = () => {
  const [step, setStep] = useState(0)
  const [country, setCountry] = useState('')

  const cities = country ? CITIES_BY_COUNTRY[country] || [] : []

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 container mx-auto px-4 py-8 max-w-2xl">
        <Link href="/provider/dashboard" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>

        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Create a new listing</h1>
        <p className="text-muted-foreground mb-8">Fill in your service details to attract clients</p>

        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                {i + 1}
              </div>
              <span className={`text-sm hidden sm:inline ${i <= step ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{s}</span>
              {i < steps.length - 1 && <div className="flex-1 h-px bg-border" />}
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Full Name *</label>
                <Input placeholder="Your full name" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Phone Number *</label>
                <Input placeholder="+49 123 456 7890" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Nationality *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body">
                  <option value="">Select nationality</option>
                  {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Languages *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body" multiple>
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <p className="text-xs text-muted-foreground mt-1">Hold Ctrl/Cmd to select multiple</p>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Profession/Service *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body">
                  <option value="">Select profession</option>
                  {PROFESSIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Country *</label>
                  <select value={country} onChange={e => setCountry(e.target.value)} className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body">
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">City *</label>
                  <select disabled={!country} className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body disabled:opacity-40">
                    <option value="">Select city</option>
                    {cities.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Description *</label>
                <Textarea placeholder="Describe your service, experience, and what makes you stand out..." rows={4} />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Listing Type *</label>
                <div className="grid grid-cols-2 gap-3 mt-1">
                  <label className="flex items-center gap-3 border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input type="radio" name="listingType" value="standard" defaultChecked className="accent-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Standard</p>
                      <p className="text-xs text-muted-foreground">Free listing</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/5">
                    <input type="radio" name="listingType" value="vip" className="accent-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">VIP ⭐</p>
                      <p className="text-xs text-muted-foreground">Priority placement</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Price Type *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body">
                  <option>Fixed</option>
                  <option>Hourly</option>
                  <option>Negotiable</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Price (€)</label>
                <Input type="number" placeholder="e.g. 50" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Booking Mode *</label>
                <select className="w-full h-10 px-3 border border-input rounded-md text-sm bg-background text-foreground font-body">
                  <option>Request Only</option>
                  <option>Calendar Booking</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">Photos *</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Publish Listing</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateListing
