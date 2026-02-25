# Starter App Implementation Plan

## Project Overview
Build a reusable Next.js + Supabase starter application with authentication, user profiles, and proper database security. This will serve as a foundation for future projects.

## Key Requirements Summary
- Next.js 13+ with TypeScript and App Router
- Supabase integration with SSR support
- User authentication (sign up, sign in, sign out)
- Declarative database schemas with migrations
- Automatic profile creation on user signup
- Row Level Security (RLS) policies
- Protected routes requiring authentication
- Avatar upload functionality
- Unit testing framework with examples
- Automated setup script
- GitHub Actions for database migrations
- Comprehensive documentation

---

## Implementation Phases

### Phase 1: Project Foundation (Tasks 1-5)
Establish the core Next.js application, Supabase integration, and styling infrastructure.

- [x] **Task 1: Create Next.js app with TypeScript**
  - [x] Use latest Next.js version with `create-next-app`
  - [x] Configure TypeScript for type safety
  - [x] Use App Router (app directory)
  - [x] Set up basic project structure (components, lib, app directories, etc.)
  - [x] **Deliverable:** Next.js application ready for Supabase integration

- [x] **Task 2: Install & configure Supabase CLI locally**
  - [x] Install Supabase CLI
  - [x] Initialize Supabase project locally (supabase init)
  - [x] Configure Docker for Supabase local development
  - [x] Start local Supabase instance
  - [x] Verify connection and credentials
  - [x] **Deliverable:** Supabase running locally with credentials available

- [x] **Task 3: Create Supabase client utilities (SSR)**
  - [x] Install @supabase/ssr and @supabase/supabase-js
  - [x] Create server-side client utility
  - [x] Create client-side client utility
  - [x] Handle token refresh patterns
  - [x] **Location:** lib/supabase/ folder
  - [x] **Deliverable:** Reusable Supabase client initialization

- [x] **Task 4: Configure Next.js middleware for token refresh**
  - [x] Create middleware.ts in project root
  - [x] Implement token refresh proxy
  - [x] Handle session validation on each request
  - [x] **Deliverable:** middleware.ts configured for automatic token refresh

- [x] **Task 5: Set up basic styling (Tailwind or CSS)**
  - [x] Install and configure Tailwind CSS (recommended) or alternative styling solution
  - [x] Set up globals.css
  - [x] Ensure styling is available across application
  - [x] **Deliverable:** Working styling solution integrated with project

---

### Phase 2: Database & Security (Tasks 6-9)
Design and implement the database schema with security measures.

- [x] **Task 6: Create declarative profiles schema**
  - [x] Create supabase/schemas/profiles.sql
  - [x] Define profiles table with id, email, full_name, avatar_url, updated_at
  - [x] Set id as primary key referencing auth.users(id)
  - [x] Configure updated_at to auto-update via trigger
  - [x] **Deliverable:** Declarative schema file ready for migration generation

- [ ] **Task 7: Generate and implement profiles migration**
  - [ ] Use `npx supabase db diff` to generate migration from schema
  - [ ] Review and verify generated migration
  - [ ] Run migration in local Supabase: `npx supabase db reset`
  - [ ] Verify profiles table created with correct structure
  - [ ] **Deliverable:** Migration file in supabase/migrations/ and table in database

- [ ] **Task 8: Create trigger for automatic profile creation**
  - [ ] Create PostgreSQL trigger function in migration
  - [ ] Function extracts email from new user record
  - [ ] Function inserts corresponding profile row
  - [ ] Handle errors gracefully
  - [ ] Add trigger to migration file
  - [ ] **Deliverable:** Trigger configured and tested in local database

- [ ] **Task 9: Implement RLS policies on profiles table**
  - [ ] Enable RLS on profiles table
  - [ ] Create SELECT policy: users access their own profile only
  - [ ] Create UPDATE policy: users update their own profile only
  - [ ] Create INSERT policy: users insert their own profile (safety measure)
  - [ ] Test policies to ensure security
  - [ ] **Deliverable:** RLS policies enforced on profiles table

---

### Phase 3: Authentication (Tasks 10-13)
Implement core authentication functionality.

- [ ] **Task 10: Build sign up functionality & page**
  - [ ] Create /signup page
  - [ ] Build sign up form (email, password)
  - [ ] Implement sign up logic using Supabase Auth
  - [ ] Add validation and error handling
  - [ ] Redirect to dashboard on successful signup
  - [ ] **Deliverable:** Functional sign up page with proper error handling

- [ ] **Task 11: Build sign in functionality & page**
  - [ ] Create /login page
  - [ ] Build sign in form (email, password)
  - [ ] Implement sign in logic using Supabase Auth
  - [ ] Add validation and error handling
  - [ ] Redirect to dashboard on successful login
  - [ ] **Deliverable:** Functional sign in page with proper error handling

- [ ] **Task 12: Build sign out functionality**
  - [ ] Implement sign out function (utilities or hooks)
  - [ ] Add sign out buttons to dashboard and profile pages
  - [ ] Clear session on sign out
  - [ ] Redirect to home page after sign out
  - [ ] **Deliverable:** Working sign out functionality across application

- [ ] **Task 13: Create protected route wrapper/middleware**
  - [ ] Create utility/hook for checking authentication
  - [ ] Implement protected route pattern for server/client components
  - [ ] Redirect unauthenticated users to login
  - [ ] Handle loading states during auth check
  - [ ] **Deliverable:** Reusable protected route pattern documented

---

### Phase 4: User Interface (Tasks 14-17)
Build all required pages and features.

- [ ] **Task 14: Build home page with auth status display**
  - [ ] Create / (home) page
  - [ ] Show welcome message
  - [ ] Display authentication status
  - [ ] Show login/signup links if not authenticated
  - [ ] Show dashboard link if authenticated
  - [ ] **Deliverable:** Functional home page with auth status

- [ ] **Task 15: Build dashboard page (protected route)**
  - [ ] Create /dashboard page (protected)
  - [ ] Display user profile information
  - [ ] Show sign out button
  - [ ] Link to profile page
  - [ ] Display profile data from database
  - [ ] **Deliverable:** Protected dashboard page showing user data

- [ ] **Task 16: Build profile page with edit form (protected)**
  - [ ] Create /profile page (protected)
  - [ ] Display current profile information
  - [ ] Build form to edit fields (full_name, etc.)
  - [ ] Add save/update button
  - [ ] Implement form validation
  - [ ] **Deliverable:** Functional profile editing page

- [ ] **Task 17: Implement avatar upload to Storage**
  - [ ] Configure Supabase Storage bucket for avatars
  - [ ] Create file input in profile page
  - [ ] Implement upload logic with validation (file type, size)
  - [ ] Store file in Supabase Storage
  - [ ] Update avatar_url in profiles table
  - [ ] Display uploaded avatar in profile/dashboard
  - [ ] Handle upload errors gracefully
  - [ ] **Deliverable:** Working avatar upload and display

---

### Phase 5: Testing & Tooling (Tasks 18-21)
Set up testing infrastructure and automation scripts.

- [ ] **Task 18: Set up unit testing framework (Jest/Vitest)**
  - [ ] Install Jest or Vitest
  - [ ] Configure test setup
  - [ ] Set up testing utilities and helpers
  - [ ] Create test configuration files
  - [ ] **Deliverable:** Testing framework ready to use

- [ ] **Task 19: Write example component/utility/auth tests**
  - [ ] Write tests for utility functions (authentication helpers, etc.)
  - [ ] Write tests for React components (sign in form, profile form, etc.)
  - [ ] Write tests for authentication-related code
  - [ ] Include at least 3-4 example tests
  - [ ] Document how to add new tests
  - [ ] **Deliverable:** Example tests demonstrating common patterns

- [ ] **Task 20: Create setup.sh script for automation**
  - [ ] Script installs npm dependencies
  - [ ] Script starts local Supabase
  - [ ] Script extracts Supabase credentials from output
  - [ ] Script creates/updates .env.local with credentials
  - [ ] Script runs database migrations
  - [ ] Script shows completion message and next steps
  - [ ] Make script idempotent (safe to run multiple times)
  - [ ] Handle errors with helpful messages
  - [ ] **Deliverable:** Working setup.sh script

- [ ] **Task 21: Create GitHub Actions migration workflow**
  - [ ] Create .github/workflows/database-migrations.yml
  - [ ] Workflow triggers on push to main/production branch
  - [ ] Workflow connects to production Supabase
  - [ ] Workflow runs pending migrations
  - [ ] Workflow handles errors and provides feedback
  - [ ] Workflow uses GitHub Secrets for credentials
  - [ ] Document how to configure workflow
  - [ ] **Deliverable:** GitHub Actions workflow ready to deploy

---

### Phase 6: Documentation & Quality (Tasks 22-24)
Finalize documentation and validate the complete system.

- [ ] **Task 22: Write comprehensive README documentation**
  - [ ] Write project description and purpose
  - [ ] Document prerequisites (Node.js version, Docker, etc.)
  - [ ] Write quick start instructions (setup script)
  - [ ] Write manual setup instructions
  - [ ] Explain project structure
  - [ ] Document how to use starter app for new projects
  - [ ] Document environment variables
  - [ ] Provide database schema overview
  - [ ] Explain authentication flow
  - [ ] Write deployment instructions (Vercel/Netlify)
  - [ ] Write GitHub Actions setup guide
  - [ ] Document code organization and conventions
  - [ ] Write testing instructions
  - [ ] Add troubleshooting section
  - [ ] **Deliverable:** Complete README.md with all sections

- [ ] **Task 23: Test setup script from clean state**
  - [ ] Delete node_modules folder
  - [ ] Delete .env.local file
  - [ ] **Keep** supabase directory (migrations/schemas)
  - [ ] Run ./setup.sh from scratch
  - [ ] Verify dependencies installed
  - [ ] Verify Supabase starts
  - [ ] Verify .env.local created
  - [ ] Verify migrations applied
  - [ ] Verify application runs without errors
  - [ ] Verify all pages load correctly
  - [ ] Verify authentication flow works end-to-end
  - [ ] **Deliverable:** Confirmed full system works from clean state

- [ ] **Task 24: Remove node_modules for submission**
  - [ ] Delete node_modules folder
  - [ ] Keep all other files intact
  - [ ] Verify package.json and package-lock.json present
  - [ ] Final review of project structure
  - [ ] **Deliverable:** Project ready for submission

---

## Key Milestones

1. **Foundation Ready** - After Task 5
   - Next.js app running with Supabase configured
   - Can start building features

2. **Database Secure** - After Task 9
   - Profiles table exists with RLS policies
   - Automatic profile creation working
   - Database security enforced

3. **Authentication Complete** - After Task 13
   - Full auth flow functional (sign up, sign in, logout)
   - Protected routes working
   - Session management in place

4. **Feature Complete** - After Task 17
   - All required pages built
   - Avatar upload working
   - Full user experience ready

5. **Testing & Automation** - After Task 21
   - Tests written and passing
   - Setup script working
   - GitHub Actions configured

6. **Ready for Submission** - After Task 24
   - All documentation complete
   - Full end-to-end test passed
   - Project cleaned up

---

## Dependencies & Notes

- Tasks 10-12 depend on Task 3 (Supabase client utilities)
- Tasks 15-17 depend on Tasks 9-12 (database security and auth)
- Task 13 should be built in parallel with Tasks 10-12
- Task 14 can start anytime after Task 5
- Tasks 20-21 can start anytime after Task 7
- Task 22 should be written as you complete features
- Task 23 should be completed close to submission

---

## File Structure Expected After Completion

```
.
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # Home page
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   └── globals.css
├── components/
│   ├── auth/
│   ├── ui/                      # Reusable UI components
│   └── ...
├── lib/
│   ├── supabase/                # Supabase clients and utilities
│   ├── auth/                    # Auth utilities and helpers
│   └── ...
├── public/
├── supabase/
│   ├── config.toml
│   ├── schemas/
│   │   └── profiles.sql
│   ├── migrations/
│   │   ├── 01_*.sql            # Initial schema
│   │   └── ...
│   └── snippets/
├── .github/
│   └── workflows/
│       └── database-migrations.yml
├── middleware.ts
├── setup.sh
├── PLAN.md
├── README.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
├── postcss.config.mjs
└── ...
```

---

## Success Criteria

- ✅ Next.js app runs without errors
- ✅ Supabase authentication works (sign up → profile created → login → logout)
- ✅ RLS policies prevent unauthorized access
- ✅ Avatar upload stores and displays correctly
- ✅ Protected routes redirect unauthenticated users
- ✅ Setup script works from clean state
- ✅ Tests all pass
- ✅ GitHub Actions workflow deploys migrations
- ✅ Documentation is comprehensive and clear
- ✅ Project structure is organized and logical
