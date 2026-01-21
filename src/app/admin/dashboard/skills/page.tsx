import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'

async function getSkillsData() {
  return await prisma.skillCategory.findMany({
    include: {
      skills: {
        orderBy: { order: 'asc' },
      },
    },
    orderBy: { order: 'asc' },
  })
}

export default async function AdminSkillsPage() {
  const categories = await getSkillsData()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold gradient-text">Skills</h1>
          <p className="text-muted-foreground mt-2">
            Manage your skills and skill categories
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/skills/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Link>
        </Button>
      </div>

      {categories.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No skill categories yet</p>
            <Button asChild>
              <Link href="/admin/skills/new">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Category
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {categories.map((category) => (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle>{category.nameEn}</CardTitle>
                <CardDescription>
                  {category.skills.length} skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{skill.nameEn}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-purple-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
