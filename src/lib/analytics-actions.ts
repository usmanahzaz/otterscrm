'use server'

import { db } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth-actions'
import type { LeadStatus } from '@prisma/client'

// ── Get analytics data ────────────────────────────────────
export async function getAnalyticsData() {
  const currentUser = await getCurrentUser()
  if (!currentUser?.workspace?.id) {
    throw new Error('No workspace found')
  }

  const workspaceId = currentUser.workspace.id
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Total leads
  const totalLeads = await db.lead.count({
    where: { workspaceId },
  })

  // Leads by status
  const statuses: LeadStatus[] = ['new', 'contacted', 'follow_up', 'won', 'lost']
  const leadsByStatus = await Promise.all(
    statuses.map(async (status) => ({
      status,
      count: await db.lead.count({
        where: { workspaceId, status },
      }),
    }))
  )

  // Leads created in last 30 days (for trend)
  const leadsLast30Days = await db.lead.findMany({
    where: {
      workspaceId,
      createdAt: { gte: thirtyDaysAgo },
    },
    select: { createdAt: true },
  })

  // Group leads by day for the last 30 days
  const dailyLeads: Record<string, number> = {}
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split('T')[0]
    dailyLeads[dateStr] = 0
  }

  leadsLast30Days.forEach((lead) => {
    const dateStr = lead.createdAt.toISOString().split('T')[0]
    dailyLeads[dateStr] = (dailyLeads[dateStr] || 0) + 1
  })

  // Conversion rate (won / total)
  const wonCount = leadsByStatus.find((s) => s.status === 'won')?.count || 0
  const conversionRate = totalLeads > 0 ? Math.round((wonCount / totalLeads) * 100) : 0

  // Top performers (users by assigned leads)
  const topPerformers = await db.user.findMany({
    where: {
      assignedLeads: {
        some: {
          workspaceId,
        },
      },
    },
    select: {
      id: true,
      fullName: true,
      _count: {
        select: {
          assignedLeads: {
            where: { workspaceId },
          },
        },
      },
    },
    orderBy: {
      assignedLeads: {
        _count: 'desc',
      },
    },
    take: 5,
  })

  // Recent activities
  const recentActivities = await db.activity.findMany({
    where: { workspaceId },
    include: {
      lead: { select: { id: true, fullName: true } },
      user: { select: { id: true, fullName: true } },
    },
    orderBy: { createdAt: 'desc' },
    take: 10,
  })

  return {
    totalLeads,
    leadsByStatus,
    conversionRate,
    leadsLast30Days: dailyLeads,
    topPerformers: topPerformers.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      leadCount: user._count.assignedLeads,
    })),
    recentActivities,
  }
}
