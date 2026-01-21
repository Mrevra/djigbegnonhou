import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AboutForm } from '@/components/admin/forms/AboutForm'

async function getAboutData() {
  return await prisma.aboutSection.findFirst()
}

export default async function AdminAboutPage() {
  const about = await getAboutData()

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold gradient-text">About Section</h1>
        <p className="text-muted-foreground mt-2">
          Edit the about section of your portfolio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Content</CardTitle>
          <CardDescription>
            This content appears on the homepage about section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AboutForm initialData={about} />
        </CardContent>
      </Card>
    </div>
  )
}
