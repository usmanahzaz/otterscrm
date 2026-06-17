import { Orbit } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#f6f9fc' }}>
      {/* Minimal header */}
      <header className="px-6 py-5">
        <a href="/" className="inline-flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-[#635bff] flex items-center justify-center">
            <Orbit className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-semibold text-[15px] text-[#0a2540]"
            style={{ letterSpacing: '-0.01em' }}
          >
            LeadOrbit
          </span>
        </a>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="text-center py-6">
        <p className="text-[12px]" style={{ color: '#8898aa' }}>
          © {new Date().getFullYear()} LeadOrbit ·{' '}
          <a href="/privacy" className="hover:underline">Privacy</a>
          {' · '}
          <a href="/terms" className="hover:underline">Terms</a>
        </p>
      </footer>
    </div>
  )
}
