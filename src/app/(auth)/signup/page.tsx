'use client'

import { useState, useTransition } from 'react'
import { signUp } from '@/lib/auth-actions'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError]   = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)

    if (formData.get('password') !== formData.get('confirm_password')) {
      setError('Passwords do not match.')
      return
    }

    startTransition(async () => {
      const result = await signUp(formData)
      if (result?.error) setError(result.error)
      // signUp redirects on success, so we don't need to handle success state
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
            Create your account
          </h1>
          <p className="text-[14px]" style={{ color: '#8898aa' }}>
            Start managing your Meta leads in seconds.
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
          <div className="col-span-2">
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#425466' }}>
              Full name
            </label>
            <input
              name="full_name"
              type="text"
              required
              autoComplete="name"
              placeholder="Jane Smith"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e3e8ee] text-[14px] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
              style={{ color: '#0a2540' }}
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#425466' }}>
              Workspace name
            </label>
            <input
              name="workspace_name"
              type="text"
              required
              placeholder="Acme Sales Team"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e3e8ee] text-[14px] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
              style={{ color: '#0a2540' }}
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#425466' }}>
              Work email
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
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#425466' }}>
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={8}
                autoComplete="new-password"
                placeholder="Min. 8 characters"
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

          <div>
            <label className="block text-[13px] font-medium mb-1.5" style={{ color: '#425466' }}>
              Confirm password
            </label>
            <input
              name="confirm_password"
              type={showPassword ? 'text' : 'password'}
              required
              autoComplete="new-password"
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#e3e8ee] text-[14px] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
              style={{ color: '#0a2540' }}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 rounded-lg text-[14px] font-semibold text-white flex items-center justify-center gap-2 transition-all disabled:opacity-70 mt-2"
            style={{ background: '#635bff' }}
          >
            {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
            {isPending ? 'Creating account…' : 'Create free account'}
          </button>

          <p className="text-center text-[11px]" style={{ color: '#8898aa' }}>
            By signing up you agree to our{' '}
            <a href="/terms" className="underline">
              Terms
            </a>
            {' '}and{' '}
            <a href="/privacy" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px" style={{ background: '#e3e8ee' }} />
          <span className="text-[12px]" style={{ color: '#8898aa' }}>or</span>
          <div className="flex-1 h-px" style={{ background: '#e3e8ee' }} />
        </div>

        <p className="text-center text-[13px]" style={{ color: '#8898aa' }}>
          Already have an account?{' '}
          <a
            href="/login"
            className="font-semibold hover:underline"
            style={{ color: '#635bff' }}
          >
            Sign in →
          </a>
        </p>
      </div>
    </div>
  )
}
