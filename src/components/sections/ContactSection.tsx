'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function ContactSection() {
  const { t } = useLanguage()

  const contactMethods = [
    {
      icon: Mail,
      label: t.contact.email,
      value: 'evra@example.com',
      href: 'mailto:evra@example.com',
      color: 'text-red-500',
    },
    {
      icon: Github,
      label: t.contact.github,
      value: 'github.com/mr-evra',
      href: 'https://github.com/mr-evra',
      color: 'text-gray-900 dark:text-gray-100',
    },
    {
      icon: Linkedin,
      label: t.contact.linkedin,
      value: 'linkedin.com/in/evra-djigbegnonhou',
      href: 'https://linkedin.com/in/evra-djigbegnonhou',
      color: 'text-blue-600',
    },
    {
      icon: Twitter,
      label: t.contact.twitter,
      value: 'twitter.com/mr_evra',
      href: 'https://twitter.com/mr_evra',
      color: 'text-sky-500',
    },
  ]

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold gradient-text">
            {t.contact.title}
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <a
                      href={method.href}
                      target={method.href.startsWith('http') ? '_blank' : undefined}
                      rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 group"
                    >
                      <div className={`p-3 rounded-full bg-muted group-hover:scale-110 transition-transform`}>
                        <method.icon className={`h-6 w-6 ${method.color}`} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-muted-foreground">
                          {method.label}
                        </div>
                        <div className="text-sm group-hover:text-primary transition-colors break-all">
                          {method.value}
                        </div>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Card className="glass-effect">
              <CardContent className="p-8">
                <p className="text-lg text-muted-foreground mb-6">
                  {t.contact.subtitle}
                </p>
                <Button size="lg" asChild>
                  <a href="mailto:evra@example.com">
                    <Mail className="h-5 w-5 mr-2" />
                    {t.contact.email}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
