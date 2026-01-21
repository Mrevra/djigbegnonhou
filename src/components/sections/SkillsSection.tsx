'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Skill {
  id: string
  nameEn: string
  nameFr: string
  level: number
  order: number
}

interface SkillCategory {
  id: string
  nameEn: string
  nameFr: string
  order: number
  skills: Skill[]
}

interface SkillsSectionProps {
  categories: SkillCategory[]
}

export function SkillsSection({ categories }: SkillsSectionProps) {
  const { language, t } = useLanguage()

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order)

  return (
    <section id="skills" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            {t.skills.title}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            {t.skills.subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedCategories.map((category, categoryIndex) => {
            const categoryName = language === 'en' ? category.nameEn : category.nameFr
            const sortedSkills = [...category.skills].sort((a, b) => a.order - b.order)

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="text-2xl">⚡</span>
                      {categoryName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {sortedSkills.map((skill) => {
                        const skillName = language === 'en' ? skill.nameEn : skill.nameFr
                        return (
                          <div key={skill.id}>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium">
                                {skillName}
                              </span>
                              <span className="text-sm text-muted-foreground">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                              />
                            </div>
                          </div>
                        )
                      })}
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
