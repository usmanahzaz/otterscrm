import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'
import { ProfileForm } from './profile-form'
import { WorkspaceForm } from './workspace-form'
import { PasswordForm } from './password-form'
import { NotificationPreferencesForm } from '@/components/notification-preferences-form'
import { WorkspaceLogoUpload } from '@/components/workspace-logo-upload'
import { ApiKeysSection } from '@/components/api-keys-section'
import { BillingSection } from '@/components/billing-section'

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

          {/* Notification Preferences section */}
          <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e3e8ee]">
              <h2 className="text-[15px] font-semibold text-[#0a2540]">Notifications</h2>
              <p className="text-[12px] text-[#8898aa] mt-0.5">Manage how you receive notifications</p>
            </div>
            <div className="px-6 py-5">
              <NotificationPreferencesForm />
            </div>
          </section>

          {/* Workspace Logo section */}
          {canEditWorkspace && (
            <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e3e8ee]">
                <h2 className="text-[15px] font-semibold text-[#0a2540]">Workspace Logo</h2>
                <p className="text-[12px] text-[#8898aa] mt-0.5">Upload your workspace logo</p>
              </div>
              <div className="px-6 py-5">
                <WorkspaceLogoUpload currentLogoUrl={workspace?.logoUrl || ''} />
              </div>
            </section>
          )}

          {/* API Keys section */}
          {canEditWorkspace && (
            <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
              <div className="px-6 py-4 border-b border-[#e3e8ee]">
                <h2 className="text-[15px] font-semibold text-[#0a2540]">API Keys</h2>
                <p className="text-[12px] text-[#8898aa] mt-0.5">Manage API access for integrations</p>
              </div>
              <div className="px-6 py-5">
                <ApiKeysSection />
              </div>
            </section>
          )}

          {/* Billing section */}
          <section className="bg-white rounded-xl border border-[#e3e8ee] overflow-hidden">
            <div className="px-6 py-4 border-b border-[#e3e8ee]">
              <h2 className="text-[15px] font-semibold text-[#0a2540]">Billing & Plans</h2>
              <p className="text-[12px] text-[#8898aa] mt-0.5">View and manage your subscription</p>
            </div>
            <div className="px-6 py-5">
              <BillingSection currentPlan="free" />
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
