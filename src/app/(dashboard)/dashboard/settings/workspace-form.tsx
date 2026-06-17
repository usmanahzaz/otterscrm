'use client'

import { useState, useTransition } from 'react'
import { updateWorkspace } from '@/lib/settings-actions'
import { Loader2, CheckCircle2 } from 'lucide-react'

interface Props {
  defaultName: string
}

export function WorkspaceForm({ defaultName }: Props) {
  const [isPending, startTransition] = useTransition()
  const [error,   setError]   = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateWorkspace(formData)
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
        <label className="block text-[12px] font-medium text-[#425466] mb-1.5">Workspace name</label>
        <input
          name="workspace_name"
          type="text"
          required
          defaultValue={defaultName}
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
