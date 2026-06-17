import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { ProfileForm } from './profile-form'
import { WorkspaceForm } from './workspace-form'
import { PasswordForm } from './password-form'

export default async function SettingsPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) redirect('/login')

  const { user, profile, workspace, role } = currentUser
  const canEditWorkspace = role === 'owner' || role === 'admin'

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6 bg-white">
        <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
          Settings
        </h1>
        <p className="text-[13px] text-[#8898aa] mt-1">
          Manage your account and workspace preferences
        </p>
      </div>

      <div className="flex-1 overflow-auto bg-[#f6f9fc]">
        <div className="max-w-2xl mx-auto px-8 py-8 space-y-6">

          {/* Profile section */}
          <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e3e8ee]">
              <h2 className="text-[15px] font-semibold text-[#0a2540]">Profile</h2>
              <p className="text-[12px] text-[#8898aa] mt-0.5">Your personal information</p>
            </div>
            <div className="px-6 py-5">
              <ProfileForm
                defaultFullName={profile?.fullName ?? user.fullName ?? ''}
                defaultPhone={profile?.phone ?? ''}
                email={user.email}
              />
            </div>
          </section>

          {/* Workspace section */}
          {canEditWorkspace && workspace && (
            <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e3e8ee]">
                <h2 className="text-[15px] font-semibold text-[#0a2540]">Workspace</h2>
                <p className="text-[12px] text-[#8898aa] mt-0.5">Settings for your team workspace</p>
              </div>
              <div className="px-6 py-5">
                <WorkspaceForm defaultName={workspace.name} />
              </div>
            </section>
          )}

          {/* Password section */}
          <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e3e8ee]">
              <h2 className="text-[15px] font-semibold text-[#0a2540]">Password</h2>
              <p className="text-[12px] text-[#8898aa] mt-0.5">Change your login password</p>
            </div>
            <div className="px-6 py-5">
              <PasswordForm />
            </div>
          </section>

          {/* Integrations section */}
          <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e3e8ee]">
              <h2 className="text-[15px] font-semibold text-[#0a2540]">Integrations</h2>
              <p className="text-[12px] text-[#8898aa] mt-0.5">Connect your Meta Ads account</p>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center justify-between py-3 px-4 rounded-lg border border-[#e3e8ee]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white text-[11px] font-bold">
                    f
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#0a2540]">Meta Ads</p>
                    <p className="text-[11px] text-[#8898aa]">Coming in Phase 5</p>
                  </div>
                </div>
                <span className="text-[11px] text-[#8898aa] bg-gray-100 px-2.5 py-1 rounded-full">
                  Not connected
                </span>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
