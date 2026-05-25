# GraceCanvas Architecture

## Overview

GraceCanvas is a premium SaaS platform for churches, ministries, and gospel creatives to generate AI-powered poster and flyer designs. It pairs visual style analysis with a responsive editor workspace, brand kit management, and multi-format export.

## Frontend Architecture

- **Framework:** Next.js with TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Canvas:** Konva.js (or Fabric.js) for interactive poster editing
- **Pages:** Landing, Pricing, Template Marketplace, AI Generator, Editor Workspace, Dashboard, Brand Kit Manager, Authentication, Admin
- **Components:**
  - `Layout` / `Header` / `Footer`
  - `HeroSection`, `FeatureGrid`, `TemplateCard`
  - `PosterCanvas`, `LayerPanel`, `PropertiesSidebar`
  - `BrandKitCard`, `TemplateLibrary`, `ExportToolbar`
  - `AuthForm`, `SubscriptionCards`, `AdminTable`

## Backend Architecture

- **Runtime:** Node.js
- **Server:** Next.js API routes or Express.js
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Storage:** Supabase Storage or Cloudinary
- **AI Services:** OpenAI API, Google Vision AI, proprietary image generation pipeline
- **Payments:** Stripe for subscription management
- **Authentication:** NextAuth.js with Email + OAuth (Google)

## Core Entities

- `User`
- `Workspace`
- `BrandKit`
- `Template`
- `Project`
- `Upload`
- `AIAnalysis`
- `Subscription`
- `AICredit`
- `Admin`

## Database Schema

```sql
-- Users and workspaces
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text,
  password_hash text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE workspaces (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  user_id uuid REFERENCES users(id),
  plan text NOT NULL DEFAULT 'free',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE brand_kits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  name text NOT NULL,
  colors jsonb,
  fonts jsonb,
  logos jsonb,
  overlays jsonb,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  title text NOT NULL,
  category text,
  metadata jsonb,
  design jsonb,
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  title text NOT NULL,
  description text,
  poster_data jsonb,
  export_settings jsonb,
  status text DEFAULT 'draft',
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  user_id uuid REFERENCES users(id),
  file_url text,
  analysis jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE ai_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  credits_used int DEFAULT 0,
  credits_remaining int DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id uuid REFERENCES workspaces(id),
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text,
  status text,
  current_period_end timestamptz,
  created_at timestamptz DEFAULT now()
);
```

## API Structure

### Public endpoints

- `GET /api/templates` — fetch featured templates
- `GET /api/pricing` — fetch plan data
- `POST /api/auth/login` — email/password login
- `POST /api/auth/signup` — create account
- `POST /api/auth/oauth` — Google OAuth

### Workspace / user endpoints

- `GET /api/dashboard` — summary of usage, projects, credits
- `GET /api/brand-kit` — list brand kits
- `POST /api/brand-kit` — create or update brand kit
- `GET /api/projects` — list design projects
- `POST /api/projects` — create a new poster project
- `GET /api/projects/:id` — fetch a project
- `PUT /api/projects/:id` — update project state
- `POST /api/projects/:id/export` — export poster asset

### AI endpoints

- `POST /api/analysis/upload` — analyze uploaded reference poster
- `POST /api/ai/generate` — generate poster concepts from inputs
- `POST /api/ai/regenerate` — regenerate concept variations
- `GET /api/ai/presets` — fetch AI style presets

### Admin endpoints

- `GET /api/admin/users` — list accounts
- `POST /api/admin/templates` — approve marketplace templates
- `GET /api/admin/usage` — analytics and credit usage

## Authentication Flow

1. User visits `auth` page.
2. User signs in with Google or email/password.
3. NextAuth verifies credentials and creates a session cookie.
4. User is routed to `/dashboard`.
5. Workspace and subscription data are loaded from the backend.

## SaaS Subscription Architecture

- `Free Plan` includes limited exports, template access, and style analysis credits.
- `Pro Plan` unlocks unlimited exports, multi-format exports, premium templates, and brand kits.
- `Team/Ministry` plan includes workspace collaboration, shared assets, advanced AI credits, and marketplace access.
- Billing handled by Stripe with webhook support for subscription updates.

## Deployment Strategy

- **Frontend:** Deploy to Vercel or Netlify
- **Backend:** Serverless API routes or Node.js server on Vercel/Render
- **Database:** Managed PostgreSQL (Supabase, Neon, Heroku)
- **Storage:** Supabase Storage or Cloudinary for reference uploads and generated assets
- **Secrets:** Store API keys and database credentials in environment variables
- **CI/CD:** GitHub Actions for build/test/deploy

## Environment Variables

- `NEXT_PUBLIC_APP_URL`
- `DATABASE_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `OPENAI_API_KEY`
- `CLOUDINARY_URL` or `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY`

## Suggested Folder Structure

```
/src
  /components
    Header.tsx
    Footer.tsx
    HeroSection.tsx
    PosterCanvas.tsx
    TemplateCard.tsx
    BrandKitCard.tsx
    EditorToolbar.tsx
    ExportModal.tsx
  /pages
    index.tsx
    pricing.tsx
    templates.tsx
    ai-generator.tsx
    editor.tsx
    dashboard.tsx
    brand-kit.tsx
    auth.tsx
    admin.tsx
  /pages/api
    auth/[...nextauth].ts
    templates.ts
    pricing.ts
    dashboard.ts
    brand-kit.ts
    projects.ts
    ai/analysis.ts
    ai/generate.ts
    export.ts
    admin/users.ts
    admin/usage.ts
  /lib
    prisma.ts
    stripe.ts
    openai.ts
    upload.ts
  /hooks
    useAuth.ts
    useWorkspace.ts
    usePosterEditor.ts
  /styles
    globals.css
    tailwind.css
```

## Admin Dashboard Structure

- User management
- Subscription overview
- AI credit usage
- Template approval queue
- Workspace and brand kit auditing
- Billing and webhook status

## Naming and Positioning

GraceCanvas is a faith-inspired creative platform name designed for a modern church media SaaS product. Other strong options include:

- GloryCanvas
- ZionStudio
- HaloCreate
- KingdomFlow
- GraceFrame
- Revival Studio AI
- LuminaFaith
