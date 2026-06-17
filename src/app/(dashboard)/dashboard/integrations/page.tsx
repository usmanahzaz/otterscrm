import { redirect } from 'next/navigation'
import { Plus } from 'lucide-react'
import { getCurrentUser } from '@/lib/auth-actions'
import { getConnectedMetaPages } from '@/lib/meta-actions'
import { IntegrationsContent } from '@/components/integrations-content'

export default async function IntegrationsPage() {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    redirect('/login')
  }

  const metaPages = await getConnectedMetaPages()

  return (
    <div className="flex flex-col h-full">
      {/* Page header */}
      <div className="border-b border-[#e3e8ee] px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0a2540]" style={{ letterSpacing: '-0.025em' }}>
            Integrations
          </h1>
          <p className="text-[13px] text-[#8898aa] mt-1">
            Connect your Meta ads account to sync leads
          </p>
        </div>
      </div>

      {/* Content */}
      <IntegrationsContent metaPages={metaPages} />
    </div>
  )
}
