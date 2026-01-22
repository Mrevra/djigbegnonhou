'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Layers,
  FileText,
  Briefcase,
  Award,
  LogOut,
  Menu,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Hero Section',
    href: '/admin/dashboard/hero',
    icon: Layers,
  },
  {
    label: 'About Section',
    href: '/admin/dashboard/about',
    icon: FileText,
  },
  {
    label: 'Skills',
    href: '/admin/dashboard/skills',
    icon: Briefcase,
  },
  {
    label: 'Projects',
    href: '/admin/dashboard/projects',
    icon: Briefcase,
  },
  {
    label: 'Hackathons',
    href: '/admin/dashboard/hackathons',
    icon: Award,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/admin/login' })
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 md:hidden z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ duration: 0.3 }}
        className="fixed md:relative md:translate-x-0 w-64 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col z-40"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Admin
          </h1>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.div>
              </Link>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
          {session?.user && (
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Logged in as
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {session.user.email}
              </p>
            </div>
          )}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
            size="sm"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </motion.aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 md:hidden z-30"
        />
      )}
    </>
  )
}
