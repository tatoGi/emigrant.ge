// Server Component — no client hooks used, child components handle their own 'use client'
import Image from 'next/image'
import heroBg from '@/assets/hero-bg.jpg'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSearchBar from '@/components/HeroSearchBar'
import VipOffers from '@/components/VipOffers'
import CategoryGrid from '@/components/CategoryGrid'

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative pt-16">
        <div className="absolute inset-0 z-0">
          {/* next/image requires a positioned parent — 'absolute inset-0' satisfies fill requirement */}
          <Image src={heroBg} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-foreground/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-36">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-4 animate-fade-up">
              იპოვე შენი ქვეყნის პროფესიონალი უცხოეთში
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              მოძებნეთ ექიმები, მუშები, იურისტები და ნებისმიერი მომსახურების მიმწოდებელი თქვენს ქალაქში — თქვენს ენაზე.
            </p>
          </div>
          <div className="max-w-4xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <HeroSearchBar />
          </div>
        </div>
      </section>

      <VipOffers />
      <CategoryGrid />
      <Footer />
    </div>
  )
}

export default Index
