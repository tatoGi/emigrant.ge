// Server Component — no hooks, no client interactivity
import Link from 'next/link'
import { Globe } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-6 w-6" />
              <span className="font-display text-lg font-bold">MyPeople</span>
            </div>
            <p className="text-sm opacity-70">
              Connecting immigrants with trusted professionals from their communities worldwide.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">For Clients</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/search" className="hover:opacity-100 transition-opacity">Find Professionals</Link></li>
              <li><Link href="/register" className="hover:opacity-100 transition-opacity">Create Account</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">For Providers</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><Link href="/register" className="hover:opacity-100 transition-opacity">List Your Service</Link></li>
              <li><Link href="/login" className="hover:opacity-100 transition-opacity">Provider Login</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li><a href="#" className="hover:opacity-100 transition-opacity">Help Center</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-sm text-center opacity-50">
          © 2026 MyPeople. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
