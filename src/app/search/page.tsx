import { Suspense } from 'react'
import SearchResults from '@/views/SearchResults'

// Suspense required because SearchResults uses useSearchParams()
// Without this boundary, Next.js static build fails at this route
export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SearchResults />
    </Suspense>
  )
}
