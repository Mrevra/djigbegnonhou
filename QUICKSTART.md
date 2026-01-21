# 🚀 Quick Start Guide

## Prerequisites Check
```bash
node --version  # Should be 18+
psql --version  # PostgreSQL should be installed
```

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your values:
# - Set DATABASE_URL to your PostgreSQL connection string
# - Generate NEXTAUTH_SECRET: openssl rand -base64 32
# - Set admin credentials for first login
```

### 3. Setup Database
```bash
# Generate Prisma Client
npm run db:generate

# Create database tables
npm run db:push

# Seed with example data
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

Open http://localhost:3000 🎉

### 5. Access Admin Panel
Navigate to: http://localhost:3000/admin/login

Login with credentials from your `.env`:
- Email: ADMIN_EMAIL value
- Password: ADMIN_PASSWORD value

## Common Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build              # Build for production
npm run start              # Start production server

# Database
npm run db:generate        # Generate Prisma Client
npm run db:push           # Push schema to database
npm run db:migrate        # Run migrations
npm run db:seed           # Seed database with data
npm run db:studio         # Open Prisma Studio (DB GUI)

# Code Quality
npm run lint              # Run ESLint
```

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
sudo service postgresql status

# Create database manually if needed
psql -U postgres
CREATE DATABASE portfolio_db;
\q
```

### Prisma Issues
```bash
# Reset and regenerate
npx prisma generate
npx prisma db push --force-reset
npm run db:seed
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

## Default Content

After seeding, you'll have:
- ✅ 1 Admin user
- ✅ Hero section with Evra's info
- ✅ About section with bio
- ✅ 5 Skill categories (30+ skills)
- ✅ 5 Featured projects
- ✅ 5 Hackathon entries
- ✅ All content in English & French

## Next Steps

1. **Customize Content**: Login to admin panel and update with your information
2. **Add Your Projects**: Navigate to Projects section and add your work
3. **Update Skills**: Add your actual tech stack and skill levels
4. **Personalize Design**: Edit Tailwind config for your color scheme
5. **Deploy**: Push to GitHub and deploy on Vercel

## Support

- 📖 Read full README.md for detailed documentation
- 🐛 Check GitHub issues for common problems
- 💬 Contact: evra@example.com

**Happy coding! 🎉**
