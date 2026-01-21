import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, Code, Trophy, Eye } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

async function getDashboardStats() {
  const [projectsCount, skillsCount, hackathonsCount, publishedProjects] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.hackathon.count(),
    prisma.project.count({ where: { published: true } }),
  ])

  return {
    projectsCount,
    skillsCount,
    hackathonsCount,
    publishedProjects,
  }
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats()

  const statsCards = [
    {
      title: 'Total Projects',
      value: stats.projectsCount,
      description: `${stats.publishedProjects} published`,
      icon: Briefcase,
      href: '/admin/projects',
    },
    {
      title: 'Skills',
      value: stats.skillsCount,
      description: 'Across all categories',
      icon: Code,
      href: '/admin/skills',
    },
    {
      title: 'Hackathons',
      value: stats.hackathonsCount,
      description: 'Competition entries',
      icon: Trophy,
      href: '/admin/hackathons',
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your portfolio content from here
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {statsCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
              <Button variant="link" className="mt-2 p-0 h-auto" asChild>
                <Link href={stat.href}>Manage →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4">
          <Button variant="outline" asChild>
            <Link href="/admin/hero">Edit Hero Section</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/about">Edit About Section</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/projects">Add New Project</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Preview Website
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
