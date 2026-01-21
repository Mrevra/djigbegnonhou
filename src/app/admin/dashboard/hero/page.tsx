import { prisma } from '@/lib/prisma'
import { HeroForm } from '@/components/admin/forms/HeroForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

async function getHeroData() {
  return await prisma.heroSection.findFirst()
}

export default async function AdminHeroPage() {
  const hero = await getHeroData()

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Hero Section</h1>
        <p className="text-muted-foreground mt-2">
          Edit the main hero section of your portfolio
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Content</CardTitle>
          <CardDescription>
            This content appears on the homepage hero section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <HeroForm initialData={hero} />
        </CardContent>
      </Card>
    </div>
  )
}
