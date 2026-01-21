'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Hero Section Actions
const heroSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nickname: z.string().min(1),
  titleEn: z.string().min(1),
  titleFr: z.string().min(1),
  taglineEn: z.string().min(1),
  taglineFr: z.string().min(1),
  ctaTextEn: z.string().min(1),
  ctaTextFr: z.string().min(1),
  ctaLink: z.string().min(1),
  profileImage: z.string().nullable().optional(),
  resumeUrl: z.string().nullable().optional(),
})

export async function updateHeroSection(data: z.infer<typeof heroSchema>) {
  try {
    const validated = heroSchema.parse(data)
    
    const existing = await prisma.heroSection.findFirst()
    
    if (existing) {
      await prisma.heroSection.update({
        where: { id: existing.id },
        data: validated,
      })
    } else {
      await prisma.heroSection.create({
        data: validated,
      })
    }
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error updating hero section:', error)
    return { success: false, error: 'Failed to update hero section' }
  }
}

// About Section Actions
const aboutSchema = z.object({
  introEn: z.string().min(1),
  introFr: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionFr: z.string().min(1),
  yearsExperience: z.number().min(0),
  projectsCompleted: z.number().min(0),
  clientsSatisfied: z.number().min(0),
  image: z.string().nullable().optional(),
})

export async function updateAboutSection(data: z.infer<typeof aboutSchema>) {
  try {
    const validated = aboutSchema.parse(data)
    
    const existing = await prisma.aboutSection.findFirst()
    
    if (existing) {
      await prisma.aboutSection.update({
        where: { id: existing.id },
        data: validated,
      })
    } else {
      await prisma.aboutSection.create({
        data: validated,
      })
    }
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error updating about section:', error)
    return { success: false, error: 'Failed to update about section' }
  }
}

// Project Actions
const projectSchema = z.object({
  titleEn: z.string().min(1),
  titleFr: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionFr: z.string().min(1),
  shortDescEn: z.string().min(1),
  shortDescFr: z.string().min(1),
  techStack: z.array(z.string()),
  role: z.string().min(1),
  impactEn: z.string().min(1),
  impactFr: z.string().min(1),
  images: z.array(z.string()),
  githubUrl: z.string().nullable().optional(),
  liveUrl: z.string().nullable().optional(),
  featured: z.boolean(),
  published: z.boolean(),
  order: z.number(),
  startDate: z.date().nullable().optional(),
  endDate: z.date().nullable().optional(),
})

export async function createProject(data: z.infer<typeof projectSchema>) {
  try {
    const validated = projectSchema.parse(data)
    await prisma.project.create({ data: validated })
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Error creating project:', error)
    return { success: false, error: 'Failed to create project' }
  }
}

export async function updateProject(id: string, data: z.infer<typeof projectSchema>) {
  try {
    const validated = projectSchema.parse(data)
    await prisma.project.update({
      where: { id },
      data: validated,
    })
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, error: 'Failed to update project' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: 'Failed to delete project' }
  }
}

// Skill Category Actions
const skillCategorySchema = z.object({
  nameEn: z.string().min(1),
  nameFr: z.string().min(1),
  order: z.number(),
  icon: z.string().nullable().optional(),
})

export async function createSkillCategory(data: z.infer<typeof skillCategorySchema>) {
  try {
    const validated = skillCategorySchema.parse(data)
    await prisma.skillCategory.create({ data: validated })
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Error creating skill category:', error)
    return { success: false, error: 'Failed to create skill category' }
  }
}

export async function updateSkillCategory(id: string, data: z.infer<typeof skillCategorySchema>) {
  try {
    const validated = skillCategorySchema.parse(data)
    await prisma.skillCategory.update({
      where: { id },
      data: validated,
    })
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Error updating skill category:', error)
    return { success: false, error: 'Failed to update skill category' }
  }
}

export async function deleteSkillCategory(id: string) {
  try {
    await prisma.skillCategory.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Error deleting skill category:', error)
    return { success: false, error: 'Failed to delete skill category' }
  }
}

// Skill Actions
const skillSchema = z.object({
  nameEn: z.string().min(1),
  nameFr: z.string().min(1),
  level: z.number().min(0).max(100),
  categoryId: z.string(),
  order: z.number(),
  icon: z.string().nullable().optional(),
})

export async function createSkill(data: z.infer<typeof skillSchema>) {
  try {
    const validated = skillSchema.parse(data)
    await prisma.skill.create({ data: validated })
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Error creating skill:', error)
    return { success: false, error: 'Failed to create skill' }
  }
}

export async function updateSkill(id: string, data: z.infer<typeof skillSchema>) {
  try {
    const validated = skillSchema.parse(data)
    await prisma.skill.update({
      where: { id },
      data: validated,
    })
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Error updating skill:', error)
    return { success: false, error: 'Failed to update skill' }
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Error deleting skill:', error)
    return { success: false, error: 'Failed to delete skill' }
  }
}

// Hackathon Actions
const hackathonSchema = z.object({
  nameEn: z.string().min(1),
  nameFr: z.string().min(1),
  descriptionEn: z.string().min(1),
  descriptionFr: z.string().min(1),
  position: z.string().min(1),
  award: z.string().nullable().optional(),
  date: z.date(),
  location: z.string().min(1),
  teamSize: z.number().nullable().optional(),
  techStack: z.array(z.string()),
  projectUrl: z.string().nullable().optional(),
  image: z.string().nullable().optional(),
  published: z.boolean(),
  order: z.number(),
})

export async function createHackathon(data: z.infer<typeof hackathonSchema>) {
  try {
    const validated = hackathonSchema.parse(data)
    await prisma.hackathon.create({ data: validated })
    revalidatePath('/')
    revalidatePath('/admin/hackathons')
    return { success: true }
  } catch (error) {
    console.error('Error creating hackathon:', error)
    return { success: false, error: 'Failed to create hackathon' }
  }
}

export async function updateHackathon(id: string, data: z.infer<typeof hackathonSchema>) {
  try {
    const validated = hackathonSchema.parse(data)
    await prisma.hackathon.update({
      where: { id },
      data: validated,
    })
    revalidatePath('/')
    revalidatePath('/admin/hackathons')
    return { success: true }
  } catch (error) {
    console.error('Error updating hackathon:', error)
    return { success: false, error: 'Failed to update hackathon' }
  }
}

export async function deleteHackathon(id: string) {
  try {
    await prisma.hackathon.delete({ where: { id } })
    revalidatePath('/')
    revalidatePath('/admin/hackathons')
    return { success: true }
  } catch (error) {
    console.error('Error deleting hackathon:', error)
    return { success: false, error: 'Failed to delete hackathon' }
  }
}
