'use client'

// useSearchParams requires 'use client' and a Suspense boundary in the parent route
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { SlidersHorizontal } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSearchBar from '@/components/HeroSearchBar'
import ListingCard from '@/components/ListingCard'
import { MOCK_LISTINGS, NATIONALITIES, LANGUAGES } from '@/lib/data'

const SearchResults = () => {
  // next/navigation useSearchParams returns ReadonlyURLSearchParams — same .get() API as react-router
  const searchParams = useSearchParams()
  const country = searchParams?.get('country') || ''
  const city = searchParams?.get('city') || ''
  const profession = searchParams?.get('profession') || ''

  const [nationality, setNationality] = useState('')
  const [language, setLanguage] = useState('')
  const [sortBy, setSortBy] = useState('best')
  const [showFilters, setShowFilters] = useState(false)

  const results = useMemo(() => {
    let filtered = [...MOCK_LISTINGS]
    if (country) filtered = filtered.filter(l => l.country === country)
    if (city) filtered = filtered.filter(l => l.city === city)
    if (profession) filtered = filtered.filter(l => l.profession === profession)
    if (nationality) filtered = filtered.filter(l => l.nationality === nationality)
    if (language) filtered = filtered.filter(l => l.languages.includes(language))

    switch (sortBy) {
      case 'rating': filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break
      case 'price_low': filtered.sort((a, b) => (a.priceValue || 999) - (b.priceValue || 999)); break
      case 'recent': filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break
    }
    return filtered
  }, [country, city, profession, nationality, language, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-6 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <HeroSearchBar initialCountry={country} initialCity={city} initialProfession={profession} compact />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-xl font-bold text-foreground">
            {results.length} professional{results.length !== 1 ? 's' : ''} found
          </h2>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 text-sm text-muted-foreground border border-border rounded-lg px-3 py-2"
            >
              <SlidersHorizontal className="h-4 w-4" /> Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm bg-card border border-border rounded-lg px-3 py-2 text-foreground font-body"
            >
              <option value="best">Best match</option>
              <option value="rating">Highest rated</option>
              <option value="price_low">Lowest price</option>
              <option value="recent">Most recent</option>
            </select>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} md:block w-full md:w-60 shrink-0 space-y-5`}>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Provider Nationality</label>
              <select value={nationality} onChange={e => setNationality(e.target.value)} className="w-full text-sm bg-card border border-border rounded-lg px-3 py-2 text-foreground font-body">
                <option value="">Any</option>
                {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground block mb-1.5">Language</label>
              <select value={language} onChange={e => setLanguage(e.target.value)} className="w-full text-sm bg-card border border-border rounded-lg px-3 py-2 text-foreground font-body">
                <option value="">Any</option>
                {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </aside>

          {/* Results grid */}
          <div className="flex-1">
            {results.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No professionals found matching your criteria.</p>
                <p className="text-sm text-muted-foreground mt-1">Try broadening your search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(listing => (
                  <ListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchResults
