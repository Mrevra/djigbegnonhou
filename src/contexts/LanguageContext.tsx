'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { Language, translations } from '@/lib/translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: typeof translations[Language]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // Only run on client
    const savedLang = localStorage.getItem('language') as Language | null
    
    if (savedLang && (savedLang === 'en' || savedLang === 'fr')) {
      setLanguageState(savedLang)
    } else {
      const browserLang = navigator.language.toLowerCase()
      const detectedLang = browserLang.startsWith('fr') ? 'fr' : 'en'
      setLanguageState(detectedLang)
      localStorage.setItem('language', detectedLang)
    }
    
    setIsMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  // Provide default context even before mount
  return (
    <LanguageContext.Provider
      value={{
        language: isMounted ? language : 'en',
        setLanguage,
        t: translations[isMounted ? language : 'en'],
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    // Return default context if not found
    return {
      language: 'en' as Language,
      setLanguage: () => {},
      t: translations.en,
    }
  }
  return context
}
