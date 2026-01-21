'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate, formatDateFr } from '@/lib/utils'

interface Project {
  id: string
  titleEn: string
  titleFr: string
  shortDescEn: string
  shortDescFr: string
  descriptionEn: string
  descriptionFr: string
  techStack: string[]
  role: string
  impactEn: string
  impactFr: string
  githubUrl: string | null
  liveUrl: string | null
  featured: boolean
  startDate: Date | null
  endDate: Date | null
}

interface ProjectsSectionProps {
  projects: Project[]
  featured?: boolean
}

export function ProjectsSection({ projects, featured = true }: ProjectsSectionProps) {
  const { language, t } = useLanguage()

  const displayProjects = featured
    ? projects.filter((p) => p.featured).slice(0, 3)
    : projects

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            {t.projects.title}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            {t.projects.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project, index) => {
            const title = language === 'en' ? project.titleEn : project.titleFr
            const shortDesc = language === 'en' ? project.shortDescEn : project.shortDescFr
            const impact = language === 'en' ? project.impactEn : project.impactFr

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full flex flex-col hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl gradient-text">
                      {title}
                    </CardTitle>
                    <CardDescription>{shortDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4">
                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          {t.projects.techStack}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.techStack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.techStack.length > 5 && (
                            <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                              +{project.techStack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Role */}
                      <div>
                        <h4 className="text-sm font-semibold mb-1">
                          {t.projects.role}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {project.role}
                        </p>
                      </div>

                      {/* Impact */}
                      <div>
                        <h4 className="text-sm font-semibold mb-1">
                          {t.projects.impact}
                        </h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {impact}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    {project.githubUrl && (
                      <Button variant="outline" size="sm" asChild className="flex-1">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="h-4 w-4 mr-2" />
                          {t.projects.viewCode}
                        </a>
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button size="sm" asChild className="flex-1">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {t.projects.viewLive}
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {featured && projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/projects">{t.projects.viewAll}</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  )
}
