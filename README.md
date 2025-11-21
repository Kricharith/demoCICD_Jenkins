# Weaverbase Smart Asset

## Development

```bash
docker compose up -d

cd apps

yarn install
yarn turbo prisma:generate
yarn turbo build
yarn turbo supabase:start
yarn turbo db:migrate:deploy
yarn turbo dev
```

### .env files
- apps/backend/.env  
- apps/frontend/.env  
- packages/database/.env  

### Default Local Development URLs
- Supabase Studio → http://localhost:54323/  
- Frontend → http://localhost:3000/  
- Backend → http://localhost:3001/  

### Tech Stack
**Frontend**  
- Next.js – React Framework  
- Mantine – UI Library  
- Storybook – UI Component Development  
- TanStack Query – Data Fetching & Caching  

**Backend**  
- NestJS – Node.js Framework  
- Swagger – API Documentation  

**Database & Supabase**  
- Supabase (PostgreSQL) – Database, Auth, Storage  
- Prisma ORM – Database schema & migrations  
- Supabase Studio – DB management UI  

**DevOps & Tooling**  
- Turborepo – Monorepo build system  
- Yarn – Package manager  

### Run Storybook
```bash
cd apps/frontend
yarn storybook
```
