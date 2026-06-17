'use client'

import { useState, useTransition } from 'react'
import { updateProfile } from '@/lib/settings-actions'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface Props {
  defaultFullName: string
  defaultPhone: string
  email: string
}

export function ProfileForm({ defaultFullName, defaultPhone, email }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error,   setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateProfile(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-[12px] text-red-600">
          {error}
        </div>
      )}

      <div>
        <label className="block text-[12px] font-medium text-[#425466] mb-1.5">Full name</label>
        <input
          name="full_name"
          type="text"
          required
          defaultValue={defaultFullName}
          className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
        />
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#425466] mb-1.5">Email address</label>
        <input
          type="email"
          value={email}
          disabled
          className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#425466] bg-gray-50 cursor-not-allowed"
        />
        <p className="text-[11px] text-[#8898aa] mt-1">Email cannot be changed.</p>
      </div>

      <div>
        <label className="block text-[12px] font-medium text-[#425466] mb-1.5">Phone number</label>
        <input
          name="phone"
          type="tel"
          defaultValue={defaultPhone}
          placeholder="+1 555 000 0000"
          className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] outline-none transition-all focus:border-[#635bff] focus:ring-2 focus:ring-[#635bff]/10"
        />
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#635bff] text-white text-[13px] font-semibold hover:bg-[#5350e6] transition-colors disabled:opacity-60"
        >
          {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Save changes
        </button>
        {success && (
          <span className="flex items-center gap-1.5 text-[12px] text-emerald-600">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Saved!
          </span>
        )}
      </div>
    </form>
  )
}
