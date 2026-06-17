'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { BarChart3, Settings, Users, Zap } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Leads', icon: BarChart3 },
  { href: '/dashboard/team', label: 'Team', icon: Users },
  { href: '/dashboard/automations', label: 'Automations', icon: Zap },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 border-r border-[#e3e8ee] flex flex-col flex-shrink-0" style={{ background: '#f6f9fc' }}>
      {/* Nav items */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/dashboard' && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                isActive
                  ? 'text-white bg-[#635bff]'
                  : 'text-[#425466] hover:text-[#0a2540] hover:bg-white/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-[#e3e8ee] text-[11px] text-[#8898aa]">
        <p>LeadOrbit v1.0</p>
      </div>
    </aside>
  )
}
