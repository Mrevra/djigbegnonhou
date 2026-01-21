import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  // Allow login page to be accessed without authentication
  if (!session && !children.toString().includes('login')) {
    redirect('/admin/login')
  }

  return <>{children}</>
}
