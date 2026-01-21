#!/bin/bash

# Portfolio Setup Script
# This script automates the initial setup process

set -e

echo "🚀 Starting Portfolio Setup..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check Node.js version
echo -e "${BLUE}Checking Node.js version...${NC}"
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18+ is required. Current version: $(node -v)${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js version OK: $(node -v)${NC}"
echo ""

# Check PostgreSQL
echo -e "${BLUE}Checking PostgreSQL...${NC}"
if ! command -v psql &> /dev/null; then
    echo -e "${RED}⚠️  PostgreSQL not found. Please install PostgreSQL.${NC}"
    echo "   Ubuntu/Debian: sudo apt-get install postgresql"
    echo "   macOS: brew install postgresql"
    exit 1
fi
echo -e "${GREEN}✅ PostgreSQL found${NC}"
echo ""

# Install dependencies
echo -e "${BLUE}Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Setup environment file
if [ ! -f .env ]; then
    echo -e "${BLUE}Creating .env file...${NC}"
    cp .env.example .env
    
    # Generate NEXTAUTH_SECRET
    SECRET=$(openssl rand -base64 32)
    
    # Update .env with generated secret
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s|your-super-secret-key-here-generate-with-openssl-rand-base64-32|$SECRET|g" .env
    else
        # Linux
        sed -i "s|your-super-secret-key-here-generate-with-openssl-rand-base64-32|$SECRET|g" .env
    fi
    
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${BLUE}📝 Please edit .env file with your database credentials${NC}"
    echo ""
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
    echo ""
fi

# Ask for database setup
echo -e "${BLUE}Do you want to setup the database now? (y/n)${NC}"
read -r SETUP_DB

if [ "$SETUP_DB" = "y" ] || [ "$SETUP_DB" = "Y" ]; then
    echo ""
    echo -e "${BLUE}Generating Prisma Client...${NC}"
    npm run db:generate
    echo -e "${GREEN}✅ Prisma Client generated${NC}"
    echo ""
    
    echo -e "${BLUE}Pushing database schema...${NC}"
    npm run db:push
    echo -e "${GREEN}✅ Database schema pushed${NC}"
    echo ""
    
    echo -e "${BLUE}Seeding database with example data...${NC}"
    npm run db:seed
    echo -e "${GREEN}✅ Database seeded${NC}"
    echo ""
fi

# Summary
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Edit .env with your database credentials (if not done)"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo "4. Login to admin: http://localhost:3000/admin/login"
echo ""
echo -e "${BLUE}Admin credentials (from .env):${NC}"
echo "Email: Check ADMIN_EMAIL in .env"
echo "Password: Check ADMIN_PASSWORD in .env"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
