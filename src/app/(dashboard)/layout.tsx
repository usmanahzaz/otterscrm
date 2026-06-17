import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth-actions'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen" style={{ background: '#f6f9fc' }}>
      {children}
    </div>
  )
}
