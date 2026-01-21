import { prisma } from '@/lib/prisma'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { HackathonsSection } from '@/components/sections/HackathonsSection'
import { ContactSection } from '@/components/sections/ContactSection'

async function getPortfolioData() {
  const [hero, about, categories, projects, hackathons] = await Promise.all([
    prisma.heroSection.findFirst(),
    prisma.aboutSection.findFirst(),
    prisma.skillCategory.findMany({
      include: {
        skills: {
          orderBy: { order: 'asc' },
        },
      },
      orderBy: { order: 'asc' },
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    }),
    prisma.hackathon.findMany({
      where: { published: true },
      orderBy: { date: 'desc' },
    }),
  ])

  return { hero, about, categories, projects, hackathons }
}

export default async function HomePage() {
  const { hero, about, categories, projects, hackathons } = await getPortfolioData()

  if (!hero || !about) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Portfolio Not Setup</h1>
          <p className="text-muted-foreground">
            Please run the seed command to populate the database.
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <HeroSection data={hero} />
      <AboutSection data={about} />
      <SkillsSection categories={categories} />
      <ProjectsSection projects={projects} featured />
      <HackathonsSection hackathons={hackathons} />
      <ContactSection />
    </>
  )
}
