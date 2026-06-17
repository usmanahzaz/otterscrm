import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, Phone, Mail, MessageCircle, Clock } from 'lucide-react'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth-actions'
import { getLeadDetails } from '@/lib/lead-details-actions'
import { LeadDetailsContent } from '@/components/lead-details-content'

interface LeadDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function LeadDetailsPage({ params }: LeadDetailsPageProps) {
  const currentUser = await getCurrentUser()
  if (!currentUser) {
    redirect('/login')
  }

  const { id } = await params

  let lead
  try {
    lead = await getLeadDetails(id)
  } catch (err) {
    notFound()
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-[#e3e8ee] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/leads"
            className="flex items-center gap-2 text-[#635bff] hover:text-[#5350e6] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-[13px] font-semibold">Back to Leads</span>
          </Link>
          <div className="border-l border-[#e3e8ee] pl-4">
            <h1 className="text-xl font-bold text-[#0a2540]">{lead.fullName}</h1>
            <p className="text-[13px] text-[#8898aa] mt-0.5">{lead.email || 'No email'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            title="Call"
            className="p-2.5 rounded-lg border border-[#e3e8ee] text-[#8898aa] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors"
          >
            <Phone className="w-4 h-4" />
          </button>
          <button
            title="Email"
            className="p-2.5 rounded-lg border border-[#e3e8ee] text-[#8898aa] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            title="WhatsApp"
            className="p-2.5 rounded-lg border border-[#e3e8ee] text-[#8898aa] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
          <button
            title="Set Reminder"
            className="p-2.5 rounded-lg border border-[#e3e8ee] text-[#8898aa] hover:bg-[#f6f9fc] hover:text-[#0a2540] transition-colors"
          >
            <Clock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <LeadDetailsContent initialLead={lead} />
      </div>
    </div>
  )
}
