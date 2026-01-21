'use client'

import { motion } from 'framer-motion'
import { Award, Briefcase, Users } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card } from '@/components/ui/card'

interface AboutSectionProps {
  data: {
    introEn: string
    introFr: string
    descriptionEn: string
    descriptionFr: string
    yearsExperience: number
    projectsCompleted: number
    clientsSatisfied: number
  }
}

export function AboutSection({ data }: AboutSectionProps) {
  const { language, t } = useLanguage()

  const intro = language === 'en' ? data.introEn : data.introFr
  const description = language === 'en' ? data.descriptionEn : data.descriptionFr

  const stats = [
    {
      icon: Briefcase,
      value: `${data.yearsExperience}+`,
      label: t.about.yearsExp,
    },
    {
      icon: Award,
      value: `${data.projectsCompleted}+`,
      label: t.about.projectsCompleted,
    },
    {
      icon: Users,
      value: `${data.clientsSatisfied}+`,
      label: t.about.clientsSatisfied,
    },
  ]

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            {t.about.title}
          </h2>
          <p className="mt-4 text-xl text-primary font-semibold">
            {intro}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <stat.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
