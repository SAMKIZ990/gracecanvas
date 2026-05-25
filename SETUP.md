# GraceCanvas Frontend Setup Guide

## Overview

The frontend is a full Next.js + TypeScript + Tailwind CSS SaaS application with 9 complete pages, reusable components, and modern dark-themed design.

## Project Structure

```
src/
  components/
    Header.tsx        # Navigation and branding
    Footer.tsx        # Footer layout
    Layout.tsx        # Wrapper component for all pages
  pages/
    _app.tsx          # Next.js app entry
    index.tsx         # Landing page (/)
    pricing.tsx       # Pricing page (/pricing)
    templates.tsx     # Template marketplace (/templates)
    ai-generator.tsx  # AI generator (/ai-generator)
    editor.tsx        # Editor workspace (/editor)
    brand-kit.tsx     # Brand kit manager (/brand-kit)
    dashboard.tsx     # Dashboard (/dashboard)
    auth.tsx          # Authentication (/auth)
    admin.tsx         # Admin dashboard (/admin)
  styles/
    globals.css       # Tailwind directives, base styles

Root config files:
  package.json        # Dependencies and scripts
  tsconfig.json       # TypeScript configuration (with @ alias)
  tailwind.config.js  # Tailwind theme customization
  postcss.config.js   # PostCSS setup
  next.config.js      # Next.js configuration

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

Dependencies:
- `next` 14.2.5 — React framework
- `react` 18.3.1 — UI library
- `tailwindcss` 3.4.0 — Utility CSS
- `typescript` 5.0+ — Type safety

### 2. Start Development Server

Before you start, copy `.env.local.example` to `.env.local`:

```powershell
copy .env.local.example .env.local
```

Then verify the `.env.local` file contains both `OPENAI_API_KEY` (optional) and `DATABASE_URL="file:./dev.db"` for the local SQLite database.

Then start the app:

```bash
npm run dev
```

The app will be available at **`http://localhost:3000`**.

### 2.1 Local backend support

The Next.js project now includes API routes under `src/pages/api/` for templates, pricing, poster projects, authentication, AI generation, and analysis.

- `OPENAI_API_KEY` enables real AI calls.
- `DATABASE_URL` points to `dev.db` by default and powers Prisma persistence for users, projects, and brand kits.
- If `OPENAI_API_KEY` is missing, AI endpoints return fallback responses for local testing.

### 3. Build for Production

```bash
npm run build
npm start
```

### 4. Run Linter

```bash
npm run lint
```

## Available Pages

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `pages/index.tsx` | Landing page with hero and features |
| `/pricing` | `pages/pricing.tsx` | Pricing plans |
| `/templates` | `pages/templates.tsx` | Template marketplace |
| `/ai-generator` | `pages/ai-generator.tsx` | AI poster generation |
| `/editor` | `pages/editor.tsx` | Poster editor workspace |
| `/brand-kit` | `pages/brand-kit.tsx` | Brand kit manager |
| `/dashboard` | `pages/dashboard.tsx` | User dashboard |
| `/auth` | `pages/auth.tsx` | Authentication page |
| `/admin` | `pages/admin.tsx` | Admin controls |

## Component Architecture

### Layout.tsx
Wrapper component that includes Header, Footer, and main content area. Used on every page.

```typescript
import { Layout } from '@/components/Layout';

export default function Page() {
  return (
    <Layout title="Page Title">
      <div>{/* Your content */}</div>
    </Layout>
  );
}
```

### Header.tsx
Sticky navigation with logo, menu links, and CTA button. Responsive on mobile/tablet.

### Footer.tsx
Simple footer with branding and description text.

## Design System

### Colors
- Background: `#080b18` (slate-950)
- Panels: `rgba(255, 255, 255, 0.06)`
- Text: `#f8fafc` (slate-50)
- Accent: Gradient `from-slate-800 to-violet-600`

### Typography
- Font: Inter (system fallback)
- Headings: Semibold, tracking tight
- Body: Regular, slate-300

### Spacing & Shadows
- Rounded corners: `rounded-[32px]` (32px), `rounded-3xl` (24px)
- Borders: `border-white/10` (subtle light borders)
- Shadow: `shadow-glow` custom shadow with violet tint

## TypeScript Path Aliases

The project uses TypeScript path alias `@/*` for clean imports:

```typescript
// Good
import { Header } from '@/components/Header';
import { Layout } from '@/components/Layout';

// Avoid
import { Header } from '../../../components/Header';
```

## Tailwind CSS Customization

Edit `tailwind.config.js` to:
- Add custom colors
- Extend spacing scale
- Modify breakpoints
- Add custom utilities

Current extensions:
- `colors.surface` — `#080b18`
- `colors.panel` — `rgba(255, 255, 255, 0.06)`
- `boxShadow.glow` — Violet glow effect

## Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Next Steps

1. **Backend API**: Connect to `/api` routes with authentication, database, and business logic
2. **Editor Integration**: Add Fabric.js or Konva.js for interactive poster canvas
3. **Authentication**: Implement NextAuth.js with Google OAuth and email/password
4. **AI Services**: Integrate OpenAI API for style analysis and poster generation
5. **Database**: Connect Prisma + PostgreSQL for data persistence
6. **Deployment**: Deploy to Vercel with CI/CD

## Useful Next.js Commands

- `next dev` — Start dev server (also: `npm run dev`)
- `next build` — Build for production
- `next start` — Run production build
- `next lint` — Run ESLint
- `next export` — Export static HTML (optional)

## Troubleshooting

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**TypeScript errors after adding files:**
Make sure to follow the naming convention and import types properly. Restart the dev server if needed.

**Tailwind styles not applying:**
Ensure class names are in watched files (src/ or pages/). Restart dev server.
