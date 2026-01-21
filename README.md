# Evra DJIGBEGNONHOU - Portfolio Web Application

A production-grade, bilingual (English/French) portfolio web application with full content management system (CMS). Built with Next.js 14, TypeScript, Prisma, PostgreSQL, and NextAuth.js.

## 🚀 Features

### Public Portfolio
- **Fully Responsive Design** - Mobile-first approach
- **Dark/Light Mode** - Theme toggle with system preference detection
- **Bilingual Support** - English & French with auto-detection
- **SEO Optimized** - Meta tags, Open Graph, optimized for search engines
- **Smooth Animations** - Framer Motion for premium feel
- **Dynamic Content** - All content manageable through admin panel

### Portfolio Sections
- **Hero Section** - Name, title, tagline, CTA with animated background
- **About Section** - Bio, experience stats, achievements
- **Skills Section** - Categorized skills with progress bars
- **Projects Section** - Detailed project cards with tech stack, impact metrics
- **Hackathons & Competitions** - Awards, achievements, competition entries
- **Contact Section** - Social links and contact information

### Admin Dashboard
- **Secure Authentication** - Credentials-based with bcrypt hashing
- **Protected Routes** - Session-based access control
- **Full CRUD Operations** - Manage all content types
- **Content Management** - Edit Hero, About, Skills, Projects, Hackathons
- **Publish/Unpublish** - Control content visibility
- **Bilingual Content Editor** - Edit both EN and FR versions

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - App Router, Server Components, Server Actions
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Shadcn/UI** - Beautiful, accessible components
- **next-themes** - Dark mode support

### Backend
- **Next.js API Routes** - RESTful endpoints
- **Server Actions** - Type-safe mutations
- **Prisma ORM** - Database abstraction
- **NextAuth.js** - Authentication
- **bcryptjs** - Password hashing
- **Zod** - Schema validation

### Database
- **PostgreSQL** - Production database

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- pnpm, npm, or yarn

### 1. Clone the repository

```bash
git clone <repository-url>
cd djigbegnonhou
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env` and update the values:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/portfolio_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret-key-here"

# Admin Credentials (for seeding)
ADMIN_EMAIL="admin@evradjigbe.com"
ADMIN_PASSWORD="YourSecurePassword123!"

# Environment
NODE_ENV="development"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Setup Database

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations (recommended for production)
npm run db:migrate
```

### 5. Seed Database

Populate the database with example content:

```bash
npm run db:seed
```

This creates:
- Admin user with credentials from `.env`
- Hero section with default content
- About section with bio
- 5 skill categories with 30+ skills
- 5 sample projects (AI, Healthcare, Fintech, Security, E-commerce)
- 5 hackathon entries
- All content in both English and French

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Access Admin Dashboard

Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

**Default Admin Credentials:**
- Email: Value from `ADMIN_EMAIL` in `.env`
- Password: Value from `ADMIN_PASSWORD` in `.env`

## 🏗️ Project Structure

```
djigbegnonhou/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Seed script with example data
├── src/
│   ├── app/
│   │   ├── actions.ts         # Server Actions for CRUD
│   │   ├── admin/
│   │   │   ├── login/         # Admin login page
│   │   │   ├── dashboard/     # Admin dashboard
│   │   │   │   ├── hero/      # Edit Hero section
│   │   │   │   ├── about/     # Edit About section
│   │   │   │   ├── skills/    # Manage Skills
│   │   │   │   ├── projects/  # Manage Projects
│   │   │   │   └── hackathons/# Manage Hackathons
│   │   ├── api/
│   │   │   └── auth/          # NextAuth configuration
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── admin/             # Admin-specific components
│   │   ├── sections/          # Homepage sections
│   │   ├── ui/                # Shadcn UI components
│   │   ├── Navbar.tsx         # Main navigation
│   │   ├── Footer.tsx         # Footer component
│   │   └── theme-provider.tsx # Theme provider
│   ├── contexts/
│   │   └── LanguageContext.tsx# Language switching context
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   ├── prisma.ts          # Prisma client
│   │   ├── translations.ts    # Translation strings
│   │   └── utils.ts           # Utility functions
│   └── types/
│       └── next-auth.d.ts     # NextAuth type definitions
├── public/                    # Static assets
├── .env.example               # Environment variables template
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies
```

## 📝 Usage

### Managing Content

#### Hero Section
1. Login to admin dashboard
2. Navigate to "Hero Section"
3. Edit personal information, titles, taglines
4. Update in both English and French
5. Save changes

#### Projects
1. Go to "Projects" in admin panel
2. Click "Add Project"
3. Fill in all fields (title, description, tech stack, etc.)
4. Add content for both languages
5. Set featured/published status
6. Save project

#### Skills
1. Navigate to "Skills"
2. Create skill categories first
3. Add skills to each category
4. Set skill levels (0-100%)
5. Organize with order numbers

### Language Switching

The application automatically detects the user's browser language and displays content accordingly. Users can manually switch languages using the globe icon in the navigation bar.

### Theme Switching

Users can toggle between light and dark modes using the sun/moon icon. The preference is saved locally.

## 🔒 Security Features

- **Password Hashing** - bcrypt with salt rounds
- **Session Management** - JWT-based sessions
- **Protected Routes** - Server-side authentication checks
- **CSRF Protection** - Built into Next.js
- **Input Validation** - Zod schemas for all forms
- **SQL Injection Prevention** - Prisma ORM parameterized queries
- **XSS Protection** - React's built-in escaping

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
DATABASE_URL="your-production-postgres-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret"
NODE_ENV="production"
```

### Database Migration

```bash
npx prisma migrate deploy
```

## 🧪 Database Management

### Prisma Studio

Visual database editor:

```bash
npm run db:studio
```

Opens at [http://localhost:5555](http://localhost:5555)

### Reset Database

```bash
npx prisma migrate reset
npm run db:seed
```

## 🎨 Customization

### Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: "your-color",
      // ... other colors
    }
  }
}
```

### Translations

Edit `src/lib/translations.ts` to add or modify translations.

### Default Content

Modify `prisma/seed.ts` to change default content when seeding.

## 📊 Performance

- **Image Optimization** - Next.js Image component
- **Server Components** - Reduced client-side JavaScript
- **Static Generation** - Where possible
- **Code Splitting** - Automatic route-based splitting
- **Font Optimization** - Next.js font optimization

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

See LICENSE file for details.

## 👨‍💻 Developer

**Evra DJIGBEGNONHOU** (Mr_Evra)
- Portfolio: [Your URL]
- GitHub: [@mr-evra](https://github.com/mr-evra)
- LinkedIn: [evra-djigbegnonhou](https://linkedin.com/in/evra-djigbegnonhou)
- Email: evra@example.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting platform
- Shadcn for beautiful UI components
- Open source community

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**
This is the portfolio of software engeneer Mr Evra. Here he present his projects, his profil ... There is not tomorrow 
