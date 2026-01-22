# Vercel Deployment Guide

## Configuration de Vercel

### 1. Préparation du Projet

```bash
# Assurez-vous que tout est committé
git add .
git commit -m "Prepare for Vercel deployment"
git push
```

### 2. Connecter à Vercel

1. Visitez https://vercel.com/new
2. Connectez votre compte GitHub
3. Sélectionnez votre repository
4. Cliquez sur "Import"

### 3. Configurer les Variables d'Environnement

Dans les paramètres du projet Vercel, ajoutez les variables suivantes :

#### Variables Obligatoires

```
DATABASE_URL=postgresql://user:password@host:5432/database?schema=public
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=votre-secret-long-et-aleatoire
```

#### Variables Optionnelles

```
NODE_ENV=production
```

### Générer NEXTAUTH_SECRET

```bash
# Utilisez openssl pour générer un secret sécurisé
openssl rand -base64 32
```

### 4. Configurer la Base de Données

#### Option A : Vercel Postgres (Recommandé)

1. Dans votre dashboard Vercel, allez dans "Storage"
2. Cliquez sur "Create" → "Postgres"
3. Nommez votre base de données
4. Les variables d'environnement seront automatiquement ajoutées
5. Vercel créera automatiquement `POSTGRES_URL_NON_POOLING` (meilleur pour Prisma)

#### Option B : Base de Données Externe

Si vous utilisez une base de données externe (AWS RDS, Neon, Supabase, etc.) :

1. Obtenez la connection string
2. Ajoutez-la comme `DATABASE_URL` dans Vercel
3. S'assurer que votre base de données accepte les connexions de Vercel

### 5. Exécuter les Migrations

Après le déploiement initial :

```bash
# Exécutez les migrations depuis votre machine locale
# (Vous ne pouvez pas exécuter de commandes CLI sur Vercel directement)

# 1. Assurez-vous que DATABASE_URL pointe vers votre base de données Vercel/externe
# 2. Exécutez les migrations
npx prisma migrate deploy

# 3. Seedez la base de données (optionnel, pour ajouter des données de test)
npx prisma db seed
```

### 6. Déployer

1. Après avoir configuré les variables d'environnement, cliquez sur "Deploy"
2. Vercel construira et déploiera automatiquement votre application
3. Attendez la fin du build (environ 2-3 minutes)

## Dépannage

### Erreur : "Prisma Client not found"

**Solution** : Assurez-vous que `postinstall` script exécute `prisma generate` dans package.json.

### Erreur : "DATABASE_URL not found"

**Solution** : Vérifiez que la variable `DATABASE_URL` est configurée dans Vercel Environment Variables.

### Erreur : "Connection refused"

**Solution** : 
- Vérifiez que la connection string est correcte
- Vérifiez que votre base de données accepte les connexions externes
- Pour Vercel Postgres, utilisez `POSTGRES_URL_NON_POOLING`

### Erreur : "Relations not found"

**Solution** : Les migrations n'ont pas été exécutées. Exécutez :
```bash
npx prisma migrate deploy
```

## Recommandations de Production

### 1. Secrets de Sécurité

- Utilisez un `NEXTAUTH_SECRET` fort et aléatoire
- Ne commitez jamais les secrets dans Git
- Utilisez toujours les variables d'environnement Vercel

### 2. Base de Données

- Utilisez une base de données dédiée pour la production
- Sauvegardez régulièrement votre base de données
- Utilisez un pool de connexions ou `Prisma Accelerate`

### 3. Monitoring

- Activez les logs Vercel pour surveiller les erreurs
- Utilisez Sentry ou un service similaire pour les erreurs critiques
- Surveillez les performances avec Vercel Analytics

### 4. Domaine Personnalisé

1. Achetez un domaine
2. Dans Vercel, allez dans "Settings" → "Domains"
3. Ajoutez votre domaine
4. Configurez les enregistrements DNS selon les instructions Vercel
5. Mettez à jour `NEXTAUTH_URL` avec votre domaine personnalisé

## Mise à Jour

Pour mettre à jour votre application :

```bash
# Poussez vos changements sur GitHub
git add .
git commit -m "Your changes"
git push
```

Vercel redéploiera automatiquement votre application dès que vous poussez sur la branche configurée.

## Vercel Postgres Integration

Si vous utilisez Vercel Postgres, la connexion est automatiquement gérée :

```javascript
// Les variables suivantes sont automatiquement configurées
// POSTGRES_URL - Connection string complète
// POSTGRES_URL_NON_POOLING - Pour Prisma (recommandé)
// POSTGRES_HOST
// POSTGRES_USER
// POSTGRES_PASSWORD
// POSTGRES_DATABASE
```

Pour utiliser `POSTGRES_URL_NON_POOLING` avec Prisma :

```env
DATABASE_URL="postgresql://user:password@host.compute.vercel.sh:5432/database?schema=public&sslmode=require"
```

## Support

Pour toute question sur Vercel :
- https://vercel.com/docs
- https://vercel.com/support

Pour les questions sur Prisma :
- https://www.prisma.io/docs
- https://pris.ly/discord
