'use client'

import { useState, useTransition, useRef } from 'react'
import { changePassword } from '@/lib/settings-actions'
import { Loader2, CheckCircle2, Eye, EyeOff } from 'lucide-react'

export function PasswordForm() {
  const [isPending, startTransition] = useTransition()
  const [error,   setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [show, setShow]       = useState(false)
  const formRef               = useRef<HTMLFormElement>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await changePassword(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        formRef.current?.reset()
        setTimeout(() => setSuccess(false), 4000)
      }
    })
  }

  const inputClass = "w-full px-3 py-2 pr-10 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-[12px] text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="block text-[12px] font-medium text-[#425466] mb-1.5">Current password</label>
        <div className="relative">
          <input
            name="current_password"
            type={show ? 'text' : 'password'}
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className={inputClass}
          />
          <button type="button" onClick={() => setShow(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8898aa]">
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#425466] mb-1.5">New password</label>
        <div className="relative">
          <input
            name="new_password"
            type={show ? 'text' : 'password'}
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#425466] mb-1.5">Confirm new password</label>
        <div className="relative">
          <input
            name="confirm_password"
            type={show ? 'text' : 'password'}
            required
            autoComplete="new-password"
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-60"
        >
          {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Update password
        </button>
        {success && (
          <span className="flex items-center gap-1.5 text-[12px] text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Password updated!
          </span>
        )}
      </div>
    </form>
  )
}
