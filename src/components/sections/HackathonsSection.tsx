'use client'

import { motion } from 'framer-motion'
import { Award, Calendar, MapPin, Users, ExternalLink } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate, formatDateFr } from '@/lib/utils'

interface Hackathon {
  id: string
  nameEn: string
  nameFr: string
  descriptionEn: string
  descriptionFr: string
  position: string
  award: string | null
  date: Date
  location: string
  teamSize: number | null
  techStack: string[]
  projectUrl: string | null
}

interface HackathonsSectionProps {
  hackathons: Hackathon[]
}

export function HackathonsSection({ hackathons }: HackathonsSectionProps) {
  const { language, t } = useLanguage()

  const sortedHackathons = [...hackathons].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  return (
    <section id="hackathons" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            {t.hackathons.title}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            {t.hackathons.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {sortedHackathons.map((hackathon, index) => {
            const name = language === 'en' ? hackathon.nameEn : hackathon.nameFr
            const description = language === 'en' ? hackathon.descriptionEn : hackathon.descriptionFr
            const formattedDate = language === 'en' 
              ? formatDate(hackathon.date)
              : formatDateFr(hackathon.date)

            return (
              <motion.div
                key={hackathon.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl gradient-text">
                          {name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {description}
                        </CardDescription>
                      </div>
                      {hackathon.award && (
                        <div className="p-3 rounded-full bg-yellow-500/10">
                          <Award className="h-6 w-6 text-yellow-500" />
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Achievement */}
                      <div className="flex items-center gap-2 text-sm">
                        <Award className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{hackathon.position}</span>
                        {hackathon.award && (
                          <span className="text-muted-foreground">
                            - {hackathon.award}
                          </span>
                        )}
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {formattedDate}
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {hackathon.location}
                      </div>

                      {/* Team Size */}
                      {hackathon.teamSize && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {t.hackathons.teamSize}: {hackathon.teamSize}
                        </div>
                      )}

                      {/* Tech Stack */}
                      <div>
                        <h4 className="text-sm font-semibold mb-2">
                          {t.hackathons.techStack}
                        </h4>
                        <div className="flex flex-wrap gap-2">
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

                      {/* Project Link */}
                      {hackathon.projectUrl && (
                        <Button variant="outline" size="sm" asChild className="w-full">
                          <a
                            href={hackathon.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            {t.hackathons.viewProject}
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
