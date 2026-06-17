import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { Settings } from 'lucide-react'

export default async function SettingsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) redirect('/login')

  const { user, profile, workspace } = currentUser

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6">
        <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
          Settings
        </h1>
        <p className="text-[13px] text-[#8898aa] mt-1">
          Manage your workspace and account
        </p>
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-2xl mx-auto px-8 py-8 space-y-8">
          {/* Workspace section */}
          <section>
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Workspace</h2>
            <div className="space-y-4 p-4 rounded-lg border border-[#e3e8ee]">
              <div>
                <label className="block text-[13px] font-medium text-[#425466] mb-1.5">
                  Workspace name
                </label>
                <input
                  type="text"
                  defaultValue={workspace?.name ?? ''}
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] bg-gray-50 disabled:opacity-60"
                />
              </div>
            </div>
          </section>

          {/* Account section */}
          <section>
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Account</h2>
            <div className="space-y-4 p-4 rounded-lg border border-[#e3e8ee]">
              <div>
                <label className="block text-[13px] font-medium text-[#425466] mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  defaultValue={profile?.fullName ?? ''}
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] bg-gray-50 disabled:opacity-60"
                />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#425466] mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email ?? ''}
                  disabled
                  className="w-full px-3 py-2 rounded-lg border border-[#e3e8ee] text-[13px] text-[#0a2540] bg-gray-50 disabled:opacity-60"
                />
              </div>
            </div>
          </section>

          {/* Integrations section */}
          <section>
            <h2 className="text-lg font-semibold text-[#0a2540] mb-4">Integrations</h2>
            <div className="p-4 rounded-lg border border-[#e3e8ee] text-center">
              <p className="text-[13px] text-[#8898aa]">
                Meta integration coming in Phase 5.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
