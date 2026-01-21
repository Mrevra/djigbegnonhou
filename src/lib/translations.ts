export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      hackathons: 'Hackathons',
      contact: 'Contact',
    },
    // Hero Section
    hero: {
      scrollDown: 'Scroll to explore',
    },
    // About Section
    about: {
      title: 'About Me',
      yearsExp: 'Years Experience',
      projectsCompleted: 'Projects Completed',
      clientsSatisfied: 'Clients Satisfied',
    },
    // Skills Section
    skills: {
      title: 'Skills & Expertise',
      subtitle: 'Technologies and tools I work with',
    },
    // Projects Section
    projects: {
      title: 'Featured Projects',
      subtitle: 'Explore my recent work and contributions',
      viewAll: 'View All Projects',
      viewProject: 'View Project',
      viewCode: 'View Code',
      viewLive: 'View Live',
      techStack: 'Tech Stack',
      role: 'Role',
      impact: 'Impact',
      duration: 'Duration',
      status: 'Status',
      published: 'Published',
      draft: 'Draft',
    },
    // Hackathons Section
    hackathons: {
      title: 'Hackathons & Competitions',
      subtitle: 'Awards and achievements from competitive coding events',
      position: 'Position',
      award: 'Award',
      date: 'Date',
      location: 'Location',
      teamSize: 'Team Size',
      techStack: 'Tech Stack',
      viewProject: 'View Project',
    },
    // Contact Section
    contact: {
      title: 'Get In Touch',
      subtitle: 'Have a project in mind? Let\'s work together',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
    },
    // Footer
    footer: {
      rights: 'All rights reserved',
      builtWith: 'Built with Next.js, TypeScript, and Tailwind CSS',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Retry',
      close: 'Close',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      filter: 'Filter',
      sort: 'Sort',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      readMore: 'Read More',
      readLess: 'Read Less',
    },
  },
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      skills: 'Compétences',
      projects: 'Projets',
      hackathons: 'Hackathons',
      contact: 'Contact',
    },
    // Hero Section
    hero: {
      scrollDown: 'Défiler pour explorer',
    },
    // About Section
    about: {
      title: 'À Propos de Moi',
      yearsExp: 'Années d\'Expérience',
      projectsCompleted: 'Projets Complétés',
      clientsSatisfied: 'Clients Satisfaits',
    },
    // Skills Section
    skills: {
      title: 'Compétences & Expertise',
      subtitle: 'Technologies et outils que j\'utilise',
    },
    // Projects Section
    projects: {
      title: 'Projets en Vedette',
      subtitle: 'Explorez mon travail récent et mes contributions',
      viewAll: 'Voir Tous les Projets',
      viewProject: 'Voir le Projet',
      viewCode: 'Voir le Code',
      viewLive: 'Voir en Direct',
      techStack: 'Stack Technique',
      role: 'Rôle',
      impact: 'Impact',
      duration: 'Durée',
      status: 'Statut',
      published: 'Publié',
      draft: 'Brouillon',
    },
    // Hackathons Section
    hackathons: {
      title: 'Hackathons & Compétitions',
      subtitle: 'Récompenses et réalisations lors d\'événements de codage compétitifs',
      position: 'Position',
      award: 'Récompense',
      date: 'Date',
      location: 'Lieu',
      teamSize: 'Taille de l\'Équipe',
      techStack: 'Stack Technique',
      viewProject: 'Voir le Projet',
    },
    // Contact Section
    contact: {
      title: 'Contactez-Moi',
      subtitle: 'Vous avez un projet en tête ? Travaillons ensemble',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      twitter: 'Twitter',
    },
    // Footer
    footer: {
      rights: 'Tous droits réservés',
      builtWith: 'Construit avec Next.js, TypeScript et Tailwind CSS',
    },
    // Common
    common: {
      loading: 'Chargement...',
      error: 'Une erreur s\'est produite',
      retry: 'Réessayer',
      close: 'Fermer',
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      create: 'Créer',
      search: 'Rechercher',
      filter: 'Filtrer',
      sort: 'Trier',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      readMore: 'Lire Plus',
      readLess: 'Lire Moins',
    },
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.en
