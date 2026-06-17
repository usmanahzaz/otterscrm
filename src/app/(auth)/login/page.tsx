'use client'

import { useState, useTransition } from 'react'
import { signIn } from '@/lib/auth-actions'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await signIn(formData)
      if (result?.error) setError(result.error)
    })
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl border border-[#e3e8ee] p-8 shadow-sm">
        {/* Heading */}
        <div className="mb-8">
          <h1
            className="text-[26px] font-bold mb-1.5"
            style={{ color: '#0a2540', letterSpacing: '-0.025em' }}
          >
            Welcome back
          </h1>
          <p className="text-[14px]" style={{ color: '#8898aa' }}>
            Sign in to your LeadOrbit workspace.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3.5 rounded-lg bg-red-50 border border-red-100 text-[13px] text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#425466' }}>
              Email address
            </label>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e3e8ee] text-[14px] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
              style={{ color: '#0a2540' }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[13px] font-medium" style={{ color: '#425466' }}>
                Password
              </label>
              <a
                href="#"
                className="text-[12px] font-medium hover:underline"
                style={{ color: '#635bff' }}
              >
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#e3e8ee] text-[14px] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10 pr-10"
                style={{ color: '#0a2540' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: '#8898aa' }}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 rounded-lg text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            style={{ background: '#635bff' }}
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: '#e3e8ee' }} />
          <span className="text-[12px]" style={{ color: '#8898aa' }}>or</span>
          <div className="flex-1 h-px" style={{ background: '#e3e8ee' }} />
        </div>

        {/* Sign up link */}
        <p className="text-center text-[13px]" style={{ color: '#8898aa' }}>
          Don&apos;t have an account?{' '}
          <a
            href="/signup"
            className="font-semibold hover:underline"
            style={{ color: '#635bff' }}
          >
            Create one free →
          </a>
        </p>
      </div>
    </div>
  )
}
