import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Home, BookOpen, Guitar } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/accordi', label: 'Accordi', icon: BookOpen },
]

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top nav */}
      <nav className="sticky top-0 z-50 bg-surface-50/80 backdrop-blur-xl border-b border-surface-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-2 group">
              <Guitar
                size={24}
                className="text-brand-500 transition-transform duration-300 group-hover:rotate-[-8deg]"
              />
              <span className="font-display text-2xl tracking-wide hidden sm:inline">
                GUITAR <span className="text-brand-500">JOURNEY</span>
              </span>
            </NavLink>

            {/* Nav links */}
            <div className="flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600'
                        : 'text-surface-500 hover:text-surface-700 hover:bg-surface-200/60'
                    }`
                  }
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 py-8 sm:py-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-200 py-6 text-center">
        <p className="text-xs text-surface-400">
          Guitar Journey — 30 giorni per imparare la chitarra
        </p>
      </footer>
    </div>
  )
}
