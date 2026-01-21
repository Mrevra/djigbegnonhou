import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seed...')

  // Clear existing data
  await prisma.hackathon.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.skillCategory.deleteMany()
  await prisma.project.deleteMany()
  await prisma.aboutSection.deleteMany()
  await prisma.heroSection.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || 'SecurePassword123!',
    10
  )

  const admin = await prisma.user.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@evradjigbe.com',
      password: hashedPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create Hero Section
  const hero = await prisma.heroSection.create({
    data: {
      firstName: 'Evra',
      lastName: 'DJIGBEGNONHOU',
      nickname: 'Mr_Evra',
      titleEn: 'Software Engineer | AI, Security & Fintech Systems',
      titleFr: 'Ingénieur Logiciel | IA, Sécurité & Systèmes Fintech',
      taglineEn: 'I build intelligent systems that turn data into real-world value.',
      taglineFr: 'Je construis des systèmes intelligents qui transforment les données en valeur réelle.',
      ctaTextEn: 'View My Work',
      ctaTextFr: 'Voir Mon Travail',
      ctaLink: '#projects',
      profileImage: '/images/profile.jpg',
      resumeUrl: '/resume.pdf',
    },
  })
  console.log('✅ Hero section created')

  // Create About Section
  const about = await prisma.aboutSection.create({
    data: {
      introEn: 'Building the future, one line of code at a time.',
      introFr: 'Construire l\'avenir, une ligne de code à la fois.',
      descriptionEn: `I'm Evra DJIGBEGNONHOU, a passionate software engineer specializing in AI, cybersecurity, and fintech solutions. With a strong foundation in full-stack development and a keen interest in emerging technologies, I create robust, scalable systems that solve real-world problems.

My journey in tech is driven by curiosity and a commitment to continuous learning. I thrive on challenges that push the boundaries of what's possible, whether it's developing intelligent algorithms, securing digital infrastructures, or building financial technology platforms.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community.`,
      descriptionFr: `Je suis Evra DJIGBEGNONHOU, un ingénieur logiciel passionné spécialisé dans l'IA, la cybersécurité et les solutions fintech. Avec une solide base en développement full-stack et un vif intérêt pour les technologies émergentes, je crée des systèmes robustes et évolutifs qui résolvent des problèmes du monde réel.

Mon parcours dans la tech est motivé par la curiosité et un engagement envers l'apprentissage continu. Je m'épanouis dans les défis qui repoussent les limites du possible, que ce soit développer des algorithmes intelligents, sécuriser des infrastructures numériques ou construire des plateformes de technologie financière.

Quand je ne code pas, vous me trouverez en train d'explorer de nouvelles technologies, de contribuer à des projets open-source ou de partager mes connaissances avec la communauté des développeurs.`,
      yearsExperience: 5,
      projectsCompleted: 50,
      clientsSatisfied: 30,
      image: '/images/about.jpg',
    },
  })
  console.log('✅ About section created')

  // Create Skill Categories
  const categories = await Promise.all([
    prisma.skillCategory.create({
      data: {
        nameEn: 'Programming Languages',
        nameFr: 'Langages de Programmation',
        order: 1,
        icon: 'Code',
      },
    }),
    prisma.skillCategory.create({
      data: {
        nameEn: 'Frameworks & Libraries',
        nameFr: 'Frameworks & Bibliothèques',
        order: 2,
        icon: 'Layers',
      },
    }),
    prisma.skillCategory.create({
      data: {
        nameEn: 'Databases & Cloud',
        nameFr: 'Bases de Données & Cloud',
        order: 3,
        icon: 'Database',
      },
    }),
    prisma.skillCategory.create({
      data: {
        nameEn: 'AI & Machine Learning',
        nameFr: 'IA & Machine Learning',
        order: 4,
        icon: 'Brain',
      },
    }),
    prisma.skillCategory.create({
      data: {
        nameEn: 'Security & DevOps',
        nameFr: 'Sécurité & DevOps',
        order: 5,
        icon: 'Shield',
      },
    }),
  ])
  console.log('✅ Skill categories created')

  // Create Skills
  const skills = [
    // Programming Languages
    { nameEn: 'Python', nameFr: 'Python', level: 95, categoryId: categories[0].id, order: 1 },
    { nameEn: 'TypeScript', nameFr: 'TypeScript', level: 90, categoryId: categories[0].id, order: 2 },
    { nameEn: 'JavaScript', nameFr: 'JavaScript', level: 90, categoryId: categories[0].id, order: 3 },
    { nameEn: 'Java', nameFr: 'Java', level: 85, categoryId: categories[0].id, order: 4 },
    { nameEn: 'C++', nameFr: 'C++', level: 80, categoryId: categories[0].id, order: 5 },
    { nameEn: 'Go', nameFr: 'Go', level: 75, categoryId: categories[0].id, order: 6 },
    
    // Frameworks & Libraries
    { nameEn: 'React', nameFr: 'React', level: 95, categoryId: categories[1].id, order: 1 },
    { nameEn: 'Next.js', nameFr: 'Next.js', level: 95, categoryId: categories[1].id, order: 2 },
    { nameEn: 'Node.js', nameFr: 'Node.js', level: 90, categoryId: categories[1].id, order: 3 },
    { nameEn: 'Django', nameFr: 'Django', level: 90, categoryId: categories[1].id, order: 4 },
    { nameEn: 'FastAPI', nameFr: 'FastAPI', level: 88, categoryId: categories[1].id, order: 5 },
    { nameEn: 'Spring Boot', nameFr: 'Spring Boot', level: 85, categoryId: categories[1].id, order: 6 },
    
    // Databases & Cloud
    { nameEn: 'PostgreSQL', nameFr: 'PostgreSQL', level: 90, categoryId: categories[2].id, order: 1 },
    { nameEn: 'MongoDB', nameFr: 'MongoDB', level: 88, categoryId: categories[2].id, order: 2 },
    { nameEn: 'Redis', nameFr: 'Redis', level: 85, categoryId: categories[2].id, order: 3 },
    { nameEn: 'AWS', nameFr: 'AWS', level: 85, categoryId: categories[2].id, order: 4 },
    { nameEn: 'Docker', nameFr: 'Docker', level: 90, categoryId: categories[2].id, order: 5 },
    { nameEn: 'Kubernetes', nameFr: 'Kubernetes', level: 75, categoryId: categories[2].id, order: 6 },
    
    // AI & Machine Learning
    { nameEn: 'TensorFlow', nameFr: 'TensorFlow', level: 88, categoryId: categories[3].id, order: 1 },
    { nameEn: 'PyTorch', nameFr: 'PyTorch', level: 85, categoryId: categories[3].id, order: 2 },
    { nameEn: 'Scikit-learn', nameFr: 'Scikit-learn', level: 90, categoryId: categories[3].id, order: 3 },
    { nameEn: 'OpenAI APIs', nameFr: 'APIs OpenAI', level: 92, categoryId: categories[3].id, order: 4 },
    { nameEn: 'LangChain', nameFr: 'LangChain', level: 88, categoryId: categories[3].id, order: 5 },
    { nameEn: 'Hugging Face', nameFr: 'Hugging Face', level: 85, categoryId: categories[3].id, order: 6 },
    
    // Security & DevOps
    { nameEn: 'OWASP', nameFr: 'OWASP', level: 85, categoryId: categories[4].id, order: 1 },
    { nameEn: 'Penetration Testing', nameFr: 'Tests d\'Intrusion', level: 80, categoryId: categories[4].id, order: 2 },
    { nameEn: 'CI/CD', nameFr: 'CI/CD', level: 90, categoryId: categories[4].id, order: 3 },
    { nameEn: 'GitHub Actions', nameFr: 'GitHub Actions', level: 90, categoryId: categories[4].id, order: 4 },
    { nameEn: 'OAuth & JWT', nameFr: 'OAuth & JWT', level: 92, categoryId: categories[4].id, order: 5 },
    { nameEn: 'Encryption', nameFr: 'Chiffrement', level: 88, categoryId: categories[4].id, order: 6 },
  ]

  await Promise.all(
    skills.map((skill) =>
      prisma.skill.create({
        data: skill,
      })
    )
  )
  console.log('✅ Skills created')

  // Create Projects
  const projects = [
    {
      titleEn: 'AI-Powered Fraud Detection System',
      titleFr: 'Système de Détection de Fraude basé sur l\'IA',
      shortDescEn: 'Real-time fraud detection using machine learning algorithms',
      shortDescFr: 'Détection de fraude en temps réel utilisant des algorithmes de machine learning',
      descriptionEn: `Built a comprehensive fraud detection system for a fintech startup that processes over 100,000 transactions daily. The system uses advanced machine learning algorithms to identify suspicious patterns and prevent fraudulent activities in real-time.

Key Features:
- Real-time transaction monitoring and analysis
- Anomaly detection using ensemble learning methods
- Risk scoring system with customizable thresholds
- Administrative dashboard for fraud analysts
- Automated alert system with severity classification
- Integration with payment processing APIs

The system successfully reduced fraud by 87% while maintaining a false positive rate under 2%, saving the company over $2M annually.`,
      descriptionFr: `J'ai construit un système complet de détection de fraude pour une startup fintech qui traite plus de 100 000 transactions quotidiennes. Le système utilise des algorithmes avancés de machine learning pour identifier les modèles suspects et prévenir les activités frauduleuses en temps réel.

Fonctionnalités Clés:
- Surveillance et analyse de transactions en temps réel
- Détection d'anomalies utilisant des méthodes d'apprentissage d'ensemble
- Système de notation des risques avec seuils personnalisables
- Tableau de bord administratif pour les analystes de fraude
- Système d'alerte automatisé avec classification de gravité
- Intégration avec les APIs de traitement de paiement

Le système a réussi à réduire la fraude de 87% tout en maintenant un taux de faux positifs inférieur à 2%, économisant à l'entreprise plus de 2M$ annuellement.`,
      role: 'Lead Engineer',
      impactEn: '87% reduction in fraud, $2M+ saved annually, 99.8% uptime, processing 100K+ daily transactions',
      impactFr: '87% de réduction de la fraude, +2M$ économisés annuellement, 99,8% de disponibilité, traitement de +100K transactions quotidiennes',
      techStack: ['Python', 'TensorFlow', 'FastAPI', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      githubUrl: 'https://github.com/mr-evra/fraud-detection',
      liveUrl: null,
      images: ['/images/projects/fraud-detection-1.jpg', '/images/projects/fraud-detection-2.jpg'],
      featured: true,
      published: true,
      order: 1,
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-06-30'),
    },
    {
      titleEn: 'Healthcare Data Platform',
      titleFr: 'Plateforme de Données de Santé',
      shortDescEn: 'Secure platform for managing patient records with HIPAA compliance',
      shortDescFr: 'Plateforme sécurisée pour gérer les dossiers patients conforme HIPAA',
      descriptionEn: `Developed a secure, HIPAA-compliant healthcare data platform that enables seamless sharing of patient records between healthcare providers while maintaining strict privacy and security standards.

Technical Implementation:
- End-to-end encryption for all patient data
- Role-based access control (RBAC) system
- Audit logging for compliance tracking
- RESTful API with OAuth 2.0 authentication
- Real-time data synchronization
- Automated backup and disaster recovery

The platform now serves 15+ healthcare facilities, managing records for over 50,000 patients with zero security breaches.`,
      descriptionFr: `J'ai développé une plateforme sécurisée et conforme HIPAA pour les données de santé qui permet le partage fluide des dossiers patients entre fournisseurs de soins de santé tout en maintenant des normes strictes de confidentialité et de sécurité.

Implémentation Technique:
- Chiffrement de bout en bout pour toutes les données patients
- Système de contrôle d'accès basé sur les rôles (RBAC)
- Journalisation d'audit pour le suivi de conformité
- API RESTful avec authentification OAuth 2.0
- Synchronisation de données en temps réel
- Sauvegarde automatisée et reprise après sinistre

La plateforme dessert maintenant plus de 15 établissements de santé, gérant les dossiers de plus de 50 000 patients sans aucune violation de sécurité.`,
      role: 'Full-Stack Developer',
      impactEn: '15+ facilities, 50K+ patients, 100% HIPAA compliance, zero security breaches',
      impactFr: '+15 établissements, +50K patients, 100% conformité HIPAA, zéro violation de sécurité',
      techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'OAuth'],
      githubUrl: null,
      liveUrl: null,
      images: ['/images/projects/healthcare-1.jpg', '/images/projects/healthcare-2.jpg'],
      featured: true,
      published: true,
      order: 2,
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-12-15'),
    },
    {
      titleEn: 'Smart Investment Portfolio Optimizer',
      titleFr: 'Optimiseur de Portefeuille d\'Investissement Intelligent',
      shortDescEn: 'AI-driven investment recommendations using modern portfolio theory',
      shortDescFr: 'Recommandations d\'investissement basées sur l\'IA utilisant la théorie moderne du portefeuille',
      descriptionEn: `Created an intelligent investment portfolio optimization tool that uses machine learning and modern portfolio theory to provide personalized investment recommendations based on risk tolerance, investment goals, and market conditions.

Features:
- AI-powered portfolio analysis and rebalancing
- Risk assessment and optimization algorithms
- Real-time market data integration
- Historical performance backtesting
- Tax-loss harvesting suggestions
- Multi-currency support

Used by 5,000+ investors managing over $50M in assets with average returns 15% above market benchmarks.`,
      descriptionFr: `J'ai créé un outil intelligent d'optimisation de portefeuille d'investissement qui utilise le machine learning et la théorie moderne du portefeuille pour fournir des recommandations d'investissement personnalisées basées sur la tolérance au risque, les objectifs d'investissement et les conditions du marché.

Fonctionnalités:
- Analyse et rééquilibrage de portefeuille alimentés par l'IA
- Algorithmes d'évaluation et d'optimisation des risques
- Intégration de données de marché en temps réel
- Tests historiques de performance
- Suggestions de récolte de pertes fiscales
- Support multi-devises

Utilisé par plus de 5 000 investisseurs gérant plus de 50M$ d'actifs avec des rendements moyens 15% supérieurs aux indices de référence du marché.`,
      role: 'AI/ML Engineer',
      impactEn: '5,000+ users, $50M+ assets managed, 15% above market returns',
      impactFr: '+5 000 utilisateurs, +50M$ d\'actifs gérés, 15% au-dessus des rendements du marché',
      techStack: ['Python', 'PyTorch', 'React', 'Node.js', 'MongoDB', 'Redis', 'Stripe'],
      githubUrl: 'https://github.com/mr-evra/portfolio-optimizer',
      liveUrl: 'https://portfoliooptimizer.demo',
      images: ['/images/projects/portfolio-1.jpg', '/images/projects/portfolio-2.jpg'],
      featured: true,
      published: true,
      order: 3,
      startDate: new Date('2024-01-10'),
      endDate: new Date('2024-07-20'),
    },
    {
      titleEn: 'Cybersecurity Assessment Tool',
      titleFr: 'Outil d\'Évaluation de Cybersécurité',
      shortDescEn: 'Automated security auditing and vulnerability scanning platform',
      shortDescFr: 'Plateforme d\'audit de sécurité automatisé et de scan de vulnérabilités',
      descriptionEn: `Developed a comprehensive cybersecurity assessment tool that automates vulnerability scanning, security audits, and compliance checks for web applications and infrastructure.

Capabilities:
- Automated vulnerability scanning (OWASP Top 10)
- Penetration testing automation
- Compliance checking (GDPR, SOC 2, ISO 27001)
- Security score calculation
- Detailed remediation recommendations
- Integration with CI/CD pipelines

Helped 50+ organizations identify and fix critical vulnerabilities before they could be exploited.`,
      descriptionFr: `J'ai développé un outil complet d'évaluation de cybersécurité qui automatise le scan de vulnérabilités, les audits de sécurité et les vérifications de conformité pour les applications web et l'infrastructure.

Capacités:
- Scan automatisé de vulnérabilités (OWASP Top 10)
- Automatisation des tests d'intrusion
- Vérification de conformité (RGPD, SOC 2, ISO 27001)
- Calcul du score de sécurité
- Recommandations détaillées de remédiation
- Intégration avec les pipelines CI/CD

A aidé plus de 50 organisations à identifier et corriger des vulnérabilités critiques avant qu'elles ne puissent être exploitées.`,
      role: 'Security Engineer',
      impactEn: '50+ organizations secured, 500+ vulnerabilities identified and fixed',
      impactFr: '+50 organisations sécurisées, +500 vulnérabilités identifiées et corrigées',
      techStack: ['Python', 'Go', 'Docker', 'Kubernetes', 'PostgreSQL', 'Elasticsearch'],
      githubUrl: 'https://github.com/mr-evra/security-scanner',
      liveUrl: null,
      images: ['/images/projects/security-1.jpg', '/images/projects/security-2.jpg'],
      featured: false,
      published: true,
      order: 4,
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-09-15'),
    },
    {
      titleEn: 'E-Commerce Analytics Dashboard',
      titleFr: 'Tableau de Bord d\'Analyse E-Commerce',
      shortDescEn: 'Real-time analytics platform for online retail businesses',
      shortDescFr: 'Plateforme d\'analyse en temps réel pour les commerces en ligne',
      descriptionEn: `Built a powerful analytics dashboard for e-commerce businesses to track sales, customer behavior, inventory, and marketing performance in real-time.

Key Features:
- Real-time sales and revenue tracking
- Customer segmentation and behavior analysis
- Inventory management and forecasting
- Marketing campaign performance metrics
- Customizable reports and exports
- Predictive analytics for demand forecasting

Increased average client revenue by 35% through data-driven insights.`,
      descriptionFr: `J'ai construit un tableau de bord d'analyse puissant pour les entreprises e-commerce afin de suivre les ventes, le comportement des clients, l'inventaire et les performances marketing en temps réel.

Fonctionnalités Clés:
- Suivi des ventes et revenus en temps réel
- Segmentation et analyse du comportement client
- Gestion et prévision d'inventaire
- Métriques de performance des campagnes marketing
- Rapports personnalisables et exportations
- Analyse prédictive pour la prévision de la demande

A augmenté le revenu client moyen de 35% grâce à des insights basés sur les données.`,
      role: 'Data Engineer',
      impactEn: '35% revenue increase for clients, processing 1M+ events/day',
      impactFr: '35% d\'augmentation du revenu pour les clients, traitement de +1M événements/jour',
      techStack: ['React', 'Next.js', 'Python', 'PostgreSQL', 'Redis', 'Apache Kafka', 'AWS'],
      githubUrl: 'https://github.com/mr-evra/ecommerce-analytics',
      liveUrl: 'https://analytics.demo.com',
      images: ['/images/projects/analytics-1.jpg', '/images/projects/analytics-2.jpg'],
      featured: false,
      published: true,
      order: 5,
      startDate: new Date('2024-06-01'),
      endDate: null,
    },
  ]

  await Promise.all(
    projects.map((project) =>
      prisma.project.create({
        data: project,
      })
    )
  )
  console.log('✅ Projects created')

  // Create Hackathons
  const hackathons = [
    {
      nameEn: 'Global Fintech Hackathon 2023',
      nameFr: 'Hackathon Fintech Mondial 2023',
      descriptionEn: 'Developed a decentralized payment platform using blockchain technology that enables instant cross-border transactions with minimal fees. Our solution addressed the challenge of financial inclusion in underbanked regions.',
      descriptionFr: 'Développé une plateforme de paiement décentralisée utilisant la technologie blockchain qui permet des transactions transfrontalières instantanées avec des frais minimes. Notre solution a abordé le défi de l\'inclusion financière dans les régions sous-bancarisées.',
      position: 'Winner',
      award: '1st Place - $10,000',
      date: new Date('2023-03-15'),
      location: 'San Francisco, CA',
      teamSize: 4,
      techStack: ['Solidity', 'Web3.js', 'React', 'Node.js', 'MongoDB'],
      projectUrl: 'https://devpost.com/fintech-2023',
      image: '/images/hackathons/fintech-2023.jpg',
      published: true,
      order: 1,
    },
    {
      nameEn: 'AI for Good Challenge',
      nameFr: 'Défi IA pour le Bien',
      descriptionEn: 'Created an AI-powered diagnostic tool for early detection of diseases using medical imaging. The tool uses convolutional neural networks to analyze X-rays and CT scans with 94% accuracy.',
      descriptionFr: 'Créé un outil de diagnostic alimenté par l\'IA pour la détection précoce de maladies utilisant l\'imagerie médicale. L\'outil utilise des réseaux de neurones convolutifs pour analyser les radiographies et scans CT avec 94% de précision.',
      position: 'Runner-up',
      award: '2nd Place - $5,000',
      date: new Date('2023-07-20'),
      location: 'Virtual',
      teamSize: 3,
      techStack: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'PostgreSQL'],
      projectUrl: 'https://github.com/mr-evra/ai-medical-diagnosis',
      image: '/images/hackathons/ai-good-2023.jpg',
      published: true,
      order: 2,
    },
    {
      nameEn: 'CyberSecurity CTF Championship',
      nameFr: 'Championnat CTF de Cybersécurité',
      descriptionEn: 'Competed in a 48-hour capture-the-flag cybersecurity competition. Successfully identified and exploited vulnerabilities in web applications, reverse-engineered binaries, and solved cryptographic challenges.',
      descriptionFr: 'Participé à une compétition de cybersécurité capture-the-flag de 48 heures. Identifié et exploité avec succès des vulnérabilités dans des applications web, effectué du reverse engineering sur des binaires et résolu des défis cryptographiques.',
      position: 'Top 10',
      award: 'Top 10 out of 500+ teams',
      date: new Date('2023-11-05'),
      location: 'Boston, MA',
      teamSize: 5,
      techStack: ['Python', 'Bash', 'Burp Suite', 'Wireshark', 'Metasploit'],
      projectUrl: null,
      image: '/images/hackathons/ctf-2023.jpg',
      published: true,
      order: 3,
    },
    {
      nameEn: 'Smart City Innovation Summit',
      nameFr: 'Sommet d\'Innovation Smart City',
      descriptionEn: 'Developed an IoT-based traffic management system that uses real-time data from sensors and cameras to optimize traffic flow and reduce congestion by 30% in simulated environments.',
      descriptionFr: 'Développé un système de gestion du trafic basé sur l\'IoT qui utilise des données en temps réel provenant de capteurs et caméras pour optimiser le flux de circulation et réduire la congestion de 30% dans des environnements simulés.',
      position: 'Finalist',
      award: 'Best Urban Innovation',
      date: new Date('2024-02-10'),
      location: 'New York, NY',
      teamSize: 4,
      techStack: ['Python', 'MQTT', 'PostgreSQL', 'React', 'Docker', 'AWS IoT'],
      projectUrl: 'https://github.com/mr-evra/smart-traffic',
      image: '/images/hackathons/smart-city-2024.jpg',
      published: true,
      order: 4,
    },
    {
      nameEn: 'Open Source Contribution Sprint',
      nameFr: 'Sprint de Contribution Open Source',
      descriptionEn: 'Participated in a 72-hour open source contribution sprint, submitting multiple pull requests to popular projects including bug fixes, feature implementations, and documentation improvements.',
      descriptionFr: 'Participé à un sprint de contribution open source de 72 heures, soumettant plusieurs pull requests à des projets populaires incluant des corrections de bugs, implémentations de fonctionnalités et améliorations de documentation.',
      position: 'Top Contributor',
      award: 'Most Impactful Contributions',
      date: new Date('2024-05-18'),
      location: 'Virtual',
      teamSize: 1,
      techStack: ['TypeScript', 'React', 'Node.js', 'Go', 'Rust'],
      projectUrl: 'https://github.com/mr-evra',
      image: '/images/hackathons/opensource-2024.jpg',
      published: true,
      order: 5,
    },
  ]

  await Promise.all(
    hackathons.map((hackathon) =>
      prisma.hackathon.create({
        data: hackathon,
      })
    )
  )
  console.log('✅ Hackathons created')

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
