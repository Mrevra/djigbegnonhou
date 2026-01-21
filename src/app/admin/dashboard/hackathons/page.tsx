import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Plus, Edit, Award, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

async function getHackathons() {
  return await prisma.hackathon.findMany({
    orderBy: { date: 'desc' },
  })
}

export default async function AdminHackathonsPage() {
  const hackathons = await getHackathons()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Hackathons</h1>
          <p className="text-muted-foreground mt-2">
            Manage your hackathon entries and achievements
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/hackathons/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Hackathon
          </Link>
        </Button>
      </div>

      {hackathons.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No hackathons yet</p>
            <Button asChild>
              <Link href="/admin/hackathons/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Hackathon
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      {hackathon.nameEn}
                      {hackathon.award && (
                        <Award className="h-5 w-5 text-yellow-500" />
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {hackathon.descriptionEn.substring(0, 150)}...
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon" asChild>
                    <Link href={`/admin/hackathons/${hackathon.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span className="font-semibold text-foreground">{hackathon.position}</span>
                    {hackathon.award && <span>- {hackathon.award}</span>}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {formatDate(hackathon.date)} • {hackathon.location}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {hackathon.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
