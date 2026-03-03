# Starter App

A reusable **Next.js + Supabase** starter application with:

- Email/password authentication (sign up, sign in, sign out)
- Protected routes and auth-aware UI
- User profiles with automatic profile row creation
- Avatar upload to Supabase Storage
- Row Level Security (RLS) policy baseline
- Vitest + Testing Library setup and example tests
- Local automation with `setup.sh`
- GitHub Actions workflow for production database migrations

This repo is intended as a practical foundation for future projects that need authenticated users and profile management from day one.

---

## Prerequisites

Install these before setup:

- **Node.js** (LTS recommended)
- **npm** (bundled with Node)
- **Docker** (required for local Supabase)

You should be able to run:

```bash
node -v
npm -v
docker info
```

---

## Quick Start (Recommended)

Use the automation script:

```bash
./setup.sh
npm run dev
```

Then open:

- App: [http://localhost:3000](http://localhost:3000)
- Supabase Studio: [http://127.0.0.1:54323](http://127.0.0.1:54323)

What `setup.sh` does:

1. Verifies required tools (`node`, `npm`, `npx`, `docker`)
2. Installs npm dependencies
3. Starts local Supabase services
4. Extracts local Supabase credentials
5. Creates/updates `.env.local`
6. Runs database migrations (`supabase db reset`)

The script is idempotent and safe to re-run.

---

## Manual Setup

If you prefer doing setup manually:

```bash
npm install
npx supabase start
npx supabase status -o env
```

Create/update `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL="http://127.0.0.1:54321"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-anon-key>"
```

Apply migrations:

```bash
npx supabase db reset --no-seed --yes
```

If you add a `supabase/seed.sql`, you can run:

```bash
npx supabase db reset --yes
```

Start development server:

```bash
npm run dev
```

---

## Environment Variables

### Runtime (app)

Required in `.env.local`:

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous/public key

These are automatically managed by `setup.sh` for local development.

### CI/CD (GitHub Actions)

Required repository secrets for migration deployment workflow:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`

---

## Project Structure

```text
app/
	layout.tsx
	page.tsx
	globals.css
	(auth)/
		login/page.tsx
		signup/page.tsx
	(protected)/
		dashboard/page.tsx
		profile/page.tsx

components/
	auth/
	layout/
	ui/

lib/
	auth/
	supabase/
	utils.ts

supabase/
	config.toml
	schemas/
	migrations/

__tests__/
	auth/
	components/
	utils/
```

Route groups `(auth)` and `(protected)` organize code without changing public URLs.

---

## Database Schema Overview

Primary table: `public.profiles`

- `id UUID PRIMARY KEY` references `auth.users(id)` with `ON DELETE CASCADE`
- `email TEXT NOT NULL`
- `full_name TEXT`
- `avatar_url TEXT`
- `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`

Security and automation:

- RLS enabled on `public.profiles`
- `updated_at` trigger updates timestamp on row changes
- Auth trigger auto-creates profile row on new signup
- RLS policies allow users to select/update/insert only their own profile (`auth.uid() = id`)

Storage:

- `avatars` bucket configured for profile images
- Public read enabled for avatar rendering
- Authenticated users restricted to their own folder paths for insert/update/delete

---

## Authentication Flow

1. User signs up via `/signup` using Supabase Auth
2. Database trigger creates profile row in `public.profiles`
3. User is redirected to `/dashboard`
4. Protected routes (`/dashboard`, `/profile`) require authenticated session
5. Profile page allows updating `full_name` and avatar upload
6. Logout clears session and redirects to `/`

Auth architecture:

- Client hook: `lib/auth/hooks.ts` (`useAuth`)
- Route protection: `lib/auth/protected.tsx`
- Profile fetch hook: `lib/auth/useProfile.ts`
- Middleware token refresh via root `proxy.ts` and Supabase proxy utilities

---

## How to Use This as a Starter

For a new project based on this repo:

1. Clone this repository
2. Rename project/package as needed
3. Run `./setup.sh` for local bootstrap
4. Update app branding and metadata in `app/layout.tsx`
5. Extend `profiles` schema and add new migrations
6. Reuse auth/profile patterns for new protected features
7. Configure production Supabase project + GitHub Secrets
8. Deploy app and keep schema changes migration-driven

Recommended workflow for new features:

- Add/modify declarative SQL in `supabase/schemas/`
- Generate migration and commit under `supabase/migrations/`
- Implement UI and hooks
- Add tests under `__tests__/`

---

## Testing

Run tests:

```bash
npm run test
```

Watch mode:

```bash
npm run test:watch
```

Coverage report:

```bash
npm run test:coverage
```

Testing conventions:

- Utilities: `__tests__/utils/`
- Components: `__tests__/components/`
- Auth/hooks: `__tests__/auth/`
- File naming: `*.test.ts` or `*.test.tsx`
- Shared helpers: `__tests__/utils/test-utils.tsx`

---

## Deployment (Vercel / Netlify)

### 1) Deploy the Next.js app

- Create a project in Vercel or Netlify connected to this repository
- Set runtime environment variables:
	- `NEXT_PUBLIC_SUPABASE_URL`
	- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2) Deploy database changes

- Use migration files in `supabase/migrations/`
- Apply to production with GitHub Actions workflow (recommended) or Supabase CLI manually

### 3) Validate post-deploy

- Verify login/signup/logout flow
- Verify `/dashboard` and `/profile` access control
- Verify avatar upload and rendering

---

## GitHub Actions: Database Migrations

Workflow file: `.github/workflows/database-migrations.yml`

Triggers:

- Push to `main` or `production` when `supabase/migrations/**` changes
- Manual `workflow_dispatch`

Workflow behavior:

1. Checks out repository
2. Validates required secrets
3. Installs Supabase CLI
4. Links target Supabase project
5. Runs `supabase db push`

Required secrets:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`

---

## Code Organization & Conventions

- Keep reusable UI in `components/ui/`
- Keep feature-specific UI in domain folders (e.g. `components/auth/`)
- Keep Supabase client/server/proxy helpers in `lib/supabase/`
- Keep auth and protection logic in `lib/auth/`
- Prefer typed hooks for data access and state handling
- Keep SQL changes migration-first and committed to source control
- Keep tests close to behavior area via `__tests__/auth|components|utils`

---

## Troubleshooting

### Docker is not running

- Symptom: `setup.sh` fails early on Docker check
- Fix: start Docker Desktop/service, then rerun `./setup.sh`

### Supabase local services fail to start

- Run: `npx supabase stop --all`
- Then: `npx supabase start`

### `.env.local` missing or stale

- Rerun: `./setup.sh`
- Or regenerate values with: `npx supabase status -o env`

### Migrations not applied locally

- Run: `npx supabase db reset --no-seed --yes`

### Auth errors on login/signup

- Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Confirm Supabase local stack is running

### Avatar images not rendering

- Confirm storage migration is applied
- Confirm uploaded file type/size matches limits
- Confirm avatar URL points to configured Supabase storage host

### Tests failing due to environment

- Reinstall dependencies: `npm install`
- Re-run tests: `npm run test`

---

## Scripts Reference

```bash
npm run dev          # Start Next.js dev server
npm run build        # Build for production
npm run start        # Run production build locally
npm run lint         # Run ESLint
npm run test         # Run Vitest once
npm run test:watch   # Run Vitest in watch mode
npm run test:coverage # Run Vitest with coverage
```
