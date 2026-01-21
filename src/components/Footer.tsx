'use client'

import Link from 'next/link'
import { Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mr-evra', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/evra-djigbegnonhou', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/mr_evra', label: 'Twitter' },
    { icon: Mail, href: 'mailto:evra@example.com', label: 'Email' },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            © {currentYear} Evra DJIGBEGNONHOU (Mr_Evra). {t.footer.rights}.
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          {/* Built With */}
          <div className="text-sm text-muted-foreground">
            {t.footer.builtWith}
          </div>
        </div>
      </div>
    </footer>
  )
}
