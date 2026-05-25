\# GraceCanvas



A Next.js + TypeScript application for an AI-powered church poster and flyer design platform.



\## Files



\- `src/pages/index.tsx` – Landing page for GraceCanvas

\- `src/pages/pricing.tsx` – Pricing and subscription plans

\- `src/pages/templates.tsx` – Template marketplace overview

\- `src/pages/ai-generator.tsx` – AI poster generation workflow

\- `src/pages/editor.tsx` – Poster editor workspace

\- `src/pages/brand-kit.tsx` – Brand kit manager and asset system

\- `src/pages/dashboard.tsx` – User workspace and ministry dashboard

\- `src/pages/auth.tsx` – Authentication page

\- `src/pages/admin.tsx` – Admin dashboard

\- `src/styles/globals.css` – Tailwind and global styles

\- `src/components/Layout.tsx` – Shared layout wrapper

\- `src/pages/api/` – Local backend API routes for templates, pricing, auth, projects, and AI

\- `ARCHITECTURE.md` – Full architecture, schema, and SaaS design documentation



\## Platform concept



GraceCanvas is designed to support:



\- Uploading church poster references for AI style analysis

\- Generating editable gospel poster concepts

\- Drag-and-drop poster editing with modern design tools

\- Multi-format export (PNG, JPG, PDF, social sizes)

\- Template marketplace and brand kit manager

\- Church workspace collaboration and subscription tiers



\## How to use



\### Local development



1\. Run `npm install` in the project root.

2\. Copy `.env.local.example` to `.env.local` and set `OPENAI\_API\_KEY` if you want AI analysis and generation.

3\. Verify `DATABASE\_URL="file:./dev.db"` is present in `.env.local` for the local SQLite database.

4\. Run `npm run dev`.

5\. Open `http://localhost:3000` to preview the Next.js frontend.



\## Local database



\- This app now uses Prisma and SQLite for persistent user, project, and brand kit storage.

\- The local database file is created automatically as `dev.db` when Prisma is initialized.

\- If you want a fresh database, delete `dev.db` and restart the app.



\## Notes



This app is now a working Next.js prototype with a local backend and database.

It includes:



\- Server API routes in `src/pages/api/`

\- Prisma + SQLite persistence for users, projects, and brand kits

\- Authentication via email/password and token validation

\- AI endpoints with OpenAI integration fallback support



A full production implementation would still add:



\- Fabric.js / Konva.js editor integration

\- Stripe subscription flow

\- Hosted PostgreSQL or cloud database

\- Secure sessions and production auth flows

\- Image upload and export pipelines



