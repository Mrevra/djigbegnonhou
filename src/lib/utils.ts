import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string | null): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateFr(date: Date | string | null): string {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function getPreferredLanguage(): 'en' | 'fr' {
  if (typeof window === 'undefined') return 'en'
  
  const savedLang = localStorage.getItem('language')
  if (savedLang === 'en' || savedLang === 'fr') return savedLang
  
  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('fr') ? 'fr' : 'en'
}
