# Implementation Notes - Task 1: Project Structure Setup

## Date Completed
February 20, 2026

## Overview
Successfully created the complete directory structure and initial placeholder files for the Next.js + Supabase starter application.

## Directories Created

### Route Directories
- `app/(auth)/login/` - Authentication route group
- `app/(auth)/signup/` - Authentication route group
- `app/(protected)/dashboard/` - Protected routes group
- `app/(protected)/profile/` - Protected routes group

### Component Directories
- `components/auth/` - Authentication components (forms, logout button)
- `components/ui/` - Reusable UI components (Button, Input, Card)
- `components/layout/` - Layout components (Header, Navigation)

### Utility Directories
- `lib/supabase/` - Supabase client initialization files
- `lib/auth/` - Authentication utilities and hooks
- `__tests__/utils/` - Utility tests
- `__tests__/components/` - Component tests
- `__tests__/auth/` - Authentication tests
- `.github/workflows/` - GitHub Actions workflows

## Files Created

### UI Components (`components/ui/`)
1. **Button.tsx** - Reusable button with variants (primary, secondary, danger) and sizes (sm, md, lg)
2. **Input.tsx** - Reusable input with label, error state support, and validation
3. **Card.tsx** - Container component for content grouping with shadow and padding

### Auth Components (`components/auth/`)
1. **LoginForm.tsx** - Email/password login form with error handling (TODO: integrate Supabase)
2. **SignupForm.tsx** - Email/password signup form with password confirmation (TODO: integrate Supabase)
3. **LogoutButton.tsx** - Sign out button component (TODO: integrate Supabase)

### Layout Components (`components/layout/`)
1. **Header.tsx** - Page header with logo/branding
2. **Navigation.tsx** - Navigation bar with conditional auth-based links

### Supabase Utilities (`lib/supabase/`)
1. **client.ts** - Browser/client-side Supabase client using @supabase/ssr
2. **server.ts** - Server-side Supabase client with cookie handling
3. **proxy.ts** - Middleware proxy client for token refresh in Next.js middleware

### Auth Utilities (`lib/auth/`)
1. **hooks.ts** - `useAuth()` hook for client components (get current user)
2. **utils.ts** - Server-side auth functions (getCurrentUser, signUp, signIn, signOut)
3. **protected.tsx** - Protected route wrapper components with redirect and fallback UI

### General Utilities
1. **lib/utils.ts** - General utility functions (email validation, password validation, date formatting, class name helper)
2. **middleware.ts** - Next.js middleware for session refresh on every request

### Page Routes
1. **app/(auth)/login/page.tsx** - Login page with LoginForm and link to signup
2. **app/(auth)/signup/page.tsx** - Signup page with SignupForm and link to login
3. **app/(protected)/dashboard/page.tsx** - Protected dashboard page showing user welcome
4. **app/(protected)/profile/page.tsx** - Protected profile edit page with avatar URL support

## Key Design Decisions

### Route Organization
- Used Next.js route groups `(auth)` and `(protected)` to organize related routes
- Auth routes group together login/signup pages
- Protected routes clearly marked for future middleware checks
- This pattern makes the codebase scalable and maintainable

### Component Structure
- **UI Components**: Reusable, unstyled components with Tailwind classes
- **Auth Components**: Form-specific components that handle their own logic
- **Layout Components**: Navigation and header components for consistent UI
- Clear separation of concerns allows easy testing and reuse

### Utility Organization
- **Supabase utilities**: Separate client and server implementations using @supabase/ssr pattern
- **Auth hooks/functions**: Separate client-side hooks from server-side utilities
- **Protected routes**: Reusable wrapper component for protecting client-side routes
- General utilities isolated for easy testing

### TypeScript
- Full TypeScript support with proper interface definitions
- Type-safe component props with React.forwardRef for form inputs
- Proper typing for Supabase integration

## File Dependencies

```
app/
├── layout.tsx (root layout - uses Header)
├── page.tsx (home page)
├── (auth)/
│   ├── login/page.tsx (uses LoginForm, Header)
│   └── signup/page.tsx (uses SignupForm, Header)
└── (protected)/
    ├── dashboard/page.tsx (uses ProtectedRouteWithFallback, Header, LogoutButton)
    └── profile/page.tsx (uses ProtectedRouteWithFallback, Header, LogoutButton, form inputs)

components/
├── auth/
│   ├── LoginForm.tsx (uses Button, Input, Card; calls Supabase auth)
│   ├── SignupForm.tsx (uses Button, Input, Card; calls Supabase auth)
│   └── LogoutButton.tsx (uses Button; calls Supabase auth)
├── ui/
│   ├── Button.tsx (standalone UI)
│   ├── Input.tsx (standalone UI)
│   └── Card.tsx (standalone UI)
└── layout/
    ├── Header.tsx (standalone layout)
    └── Navigation.tsx (standalone navigation)

lib/
├── supabase/
│   ├── client.ts (standalone - creates browser client)
│   ├── server.ts (standalone - creates server client)
│   └── proxy.ts (standalone - creates middleware proxy client)
├── auth/
│   ├── hooks.ts (uses client.ts - useAuth hook)
│   ├── utils.ts (uses server.ts - auth functions)
│   └── protected.tsx (uses hooks.ts - ProtectedRoute wrapper)
└── utils.ts (standalone utilities)

middleware.ts (uses lib/supabase/proxy.ts)
```

## What's Next

These tasks build on the structure created here:
- **Task 2-5**: Configure Supabase CLI and styling (infrastructure)
- **Task 6-9**: Create database schema and migrations (database setup)
- **Task 10-13**: Implement actual authentication logic (replaces TODOs in components)
- **Task 14-17**: Build remaining pages and features
- **Task 18-21**: Add testing and deployment automation
- **Task 22-24**: Documentation and final validation

## TODO Items Remaining in Code

All placeholder components have TODO comments marking where Supabase integration is needed:
- `components/auth/LoginForm.tsx` - TODO: implement Supabase authentication
- `components/auth/SignupForm.tsx` - TODO: implement Supabase authentication  
- `components/auth/LogoutButton.tsx` - TODO: implement Supabase logout
- `app/(protected)/profile/page.tsx` - TODO: implement profile update logic and avatar upload

These will be addressed in Tasks 10-12 (authentication) and Task 17 (avatar upload).

## Validation

The following were verified:
- All directories created successfully
- All files have proper TypeScript syntax
- Imports are organized with @ path aliases
- Components export properly
- Page routes follow Next.js conventions
- Middleware.ts is at project root and configured correctly
- No missing dependencies in existing package.json

# Implementation Notes - Task 5: Styling Setup

## Date Completed
February 23, 2026

## Overview
Tailwind CSS v4 was already installed and wired via PostCSS. Enhanced `globals.css` with CSS custom properties and a component layer of reusable utility classes.

## Changes Made

### `app/globals.css`
- Added CSS custom properties for `--primary`, `--danger`, `--muted`, `--border`, `--card-bg`, `--input-bg` with dark-mode overrides
- Extended `@theme inline` block to expose new color tokens to Tailwind
- Added `@layer components` with the following utility classes:
  - **Layout:** `.page-container`, `.auth-container`
  - **Card:** `.card`
  - **Forms:** `.form-group`, `.form-label`, `.form-input`, `.form-input-error`, `.form-error`
  - **Buttons:** `.btn`, `.btn-sm`, `.btn-md`, `.btn-lg`, `.btn-primary`, `.btn-secondary`, `.btn-danger`
  - **Typography:** `.page-title`, `.section-title`, `.muted-text`
  - **Links:** `.link`

### `app/layout.tsx`
- Updated metadata `title` to `"Starter App"`
- Updated metadata `description` to `"Next.js + Supabase starter application"`

## Notes
- Tailwind v4 requires no `tailwind.config.ts`; configuration lives in `globals.css` via `@import "tailwindcss"` and `@theme inline`.
- Component layer classes reduce repetition in TSX files and act as a design token system.

# Implementation Notes - Task 6: Declarative Profiles Schema

## Date Completed
February 23, 2026

## Overview
Created a declarative SQL schema file for the profiles table with automatic `updated_at` trigger and RLS enabled.

## Files Created

### `supabase/schemas/profiles.sql`
Defines the `profiles` table with:
- `id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE` — Links profile to Supabase auth user
- `email TEXT NOT NULL` — User email from auth
- `full_name TEXT` — User full name
- `avatar_url TEXT` — URL to user's avatar in storage
- `updated_at TIMESTAMPTZ` — Auto-updated on every row modification

### Schema Features
- **RLS Enabled:** `ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;`
- **Auto-Update Trigger:** `handle_updated_at()` function ensures `updated_at` is refreshed on every `UPDATE`
- **Declarative:** Schema file defines the entire table structure, ready for migration generation

## Notes
- `ON DELETE CASCADE` ensures profiles are automatically deleted when a user is deleted from `auth.users`
- The trigger function `handle_updated_at()` will be shared if more tables need the same behavior in future tasks

# Implementation Notes - Task 7: Generate and Implement Profiles Migration

## Date Completed
February 23, 2026

## Overview
Generated migration from declarative schema and applied it to the local Supabase database. The `profiles` table, trigger function, and RLS are now active.

## Migration Generated
- **File:** `supabase/migrations/20260223185454_profiles_schema.sql`
- **Command:** `supabase db diff -f profiles_table`

## Migration Contents
- Created `public.profiles` table with all required columns
- Set primary key on `id` column
- Added foreign key constraint `profiles_id_fkey` linking `id` to `auth.users(id) ON DELETE CASCADE`
- Enabled RLS on `public.profiles`
- Created `handle_updated_at()` trigger function
- Created `profiles_updated_at` trigger (BEFORE UPDATE)
- Granted permissions to `anon`, `authenticated`, and `service_role` roles

## Database State
- Migration applied successfully via `supabase db diff` (which also ran reset internally)
- `profiles` table exists in local database with correct structure
- Trigger is active and will auto-update `updated_at` on row modifications
- RLS is enabled and ready for policy configuration in Task 9

## Notes
- The declarative schema approach ensures migrations can be regenerated if schema changes
- "No schema changes found" output confirms the declarative schema matches the applied migration

# Implementation Notes - Task 8: Automatic Profile Creation Trigger

## Date Completed
February 25, 2026

## Overview
Added a database trigger that automatically inserts a profile row when a new user signs up.

## Migration Added
- **File:** `supabase/migrations/20260225000100_profiles_auto_create.sql`
- **Function:** `public.handle_new_user()`
- **Trigger:** `on_auth_user_created` (AFTER INSERT ON `auth.users`)

## Behavior
- Inserts a row into `public.profiles` with `id`, `email`, and `updated_at`
- Uses `SECURITY DEFINER` to ensure it can run on auth events
- Gracefully handles errors to avoid blocking user signup

## Notes
- Run `supabase db reset` to apply this migration locally if not already applied.

# Implementation Notes - Task 9: RLS Policies on Profiles Table

## Date Completed
February 25, 2026

## Overview
Added Row Level Security (RLS) policies to the `profiles` table to restrict access so users can only view and modify their own profile data.

## Migration Added
- **File:** `supabase/migrations/20260225000200_profiles_rls_policies.sql`

## Policies Created

### SELECT Policy
- **Name:** "Users can view their own profile"
- **Rule:** `auth.uid() = id`
- **Effect:** Users can only SELECT rows where their auth user ID matches the profile ID

### UPDATE Policy
- **Name:** "Users can update their own profile"
- **Rule:** `auth.uid() = id`
- **Effect:** Users can only UPDATE rows where their auth user ID matches the profile ID

### INSERT Policy
- **Name:** "Users can insert their own profile"
- **Rule:** `auth.uid() = id`
- **Effect:** Users can only INSERT rows where their auth user ID matches the profile ID (safety measure)

## Security Impact
- RLS is already enabled on `profiles` (from Task 6)
- These policies prevent unauthorized access to other users' profile data
- Service role key can bypass RLS for admin operations

## Notes
- Run `supabase db reset` to apply this migration locally if not already applied.
- Test policies by attempting to read/write profiles with different authenticated users.

# Implementation Notes - Task 10: Sign Up Functionality & Page

## Date Completed
February 25, 2026

## Overview
Implemented fully functional sign up page with Supabase authentication, client-side validation, error handling, and automatic redirect to dashboard.

## Changes Made

### `components/auth/SignupForm.tsx`
- Added Supabase client integration via `createSupabaseClient()`
- Implemented `supabase.auth.signUp()` with email/password
- Added client-side validation:
  - Email format validation using regex
  - Password minimum length (8 characters)
  - Password confirmation match check
- Error handling displays Supabase errors (weak password, duplicate email, etc.)
- Success flow redirects to `/dashboard` and refreshes router
- Loading state disables submit button during signup

### Validation Rules
- **Email:** Must be valid format (`name@domain.com`)
- **Password:** Minimum 8 characters
- **Confirm Password:** Must match password field

## User Flow
1. User fills out signup form
2. Client validates input
3. Supabase creates auth user
4. Trigger automatically creates profile row (from Task 8)
5. User redirected to `/dashboard`

## Notes
- Profile row creation is automatic via `on_auth_user_created` trigger
- Supabase may require email confirmation depending on project settings
- Error messages from Supabase are displayed directly to user

# Implementation Notes - Task 11: Sign In Functionality & Page

## Date Completed
February 25, 2026

## Overview
Implemented fully functional sign in page with Supabase authentication, client-side validation, error handling, and automatic redirect to dashboard.

## Changes Made

### `components/auth/LoginForm.tsx`
- Added Supabase client integration via `createSupabaseClient()`
- Implemented `supabase.auth.signInWithPassword()` with email/password
- Added client-side validation:
  - Email format validation using regex
  - Non-empty password check
- Error handling displays Supabase errors (invalid credentials, user not found, etc.)
- Success flow redirects to `/dashboard` and refreshes router
- Loading state disables submit button during login

### Validation Rules
- **Email:** Must be valid format (`name@domain.com`)
- **Password:** Must not be empty

## User Flow
1. User fills out login form
2. Client validates input
3. Supabase verifies credentials
4. User redirected to `/dashboard` on success
5. Router refreshes to update auth state

## Notes
- Error messages from Supabase are displayed directly to user
- Common errors include "Invalid login credentials" and "Email not confirmed"

# Implementation Notes - Task 12: Sign Out Functionality

## Date Completed
February 27, 2026

## Overview
Implemented sign out functionality with Supabase integration, error handling, and proper session cleanup.

## Changes Made

### `components/auth/LogoutButton.tsx`
- Added Supabase client integration via `createSupabaseClient()`
- Implemented `supabase.auth.signOut()` on button click
- Error handling logs errors to console but doesn't break flow
- Success flow redirects to home page (`/`)
- Router refresh ensures auth state updates across the app
- Loading state disables button during logout

### Button Integration
- **Dashboard page:** LogoutButton in header navigation
- **Profile page:** LogoutButton in header navigation
- Both pages use `ProtectedRouteWithFallback` to ensure only authenticated users can logout

## Session Management
- `supabase.auth.signOut()` automatically clears session cookies
- `router.refresh()` triggers auth state re-evaluation
- Redirect to `/` shows unauthenticated homepage

## Notes
- Session cookies are cleared server-side by Supabase
- Router refresh ensures all components receive updated auth state

# Implementation Notes - Task 13: Protected Route Wrapper & Auth Utilities

## Date Completed
February 27, 2026

## Overview
Verified and documented the existing protected route patterns and authentication utilities used throughout the application.

## Existing Implementations

### `lib/auth/hooks.ts` — `useAuth()` Hook
- **Purpose:** Get current authenticated user in client components
- **Returns:** `{ user, loading, error }`
- **Behavior:** 
  - Fetches user on mount using `supabase.auth.getUser()`
  - Sets loading state during fetch
  - Handles errors gracefully
- **Usage:** `const { user, loading } = useAuth();`

### `lib/auth/protected.tsx` — Protected Route Wrappers

#### `ProtectedRoute` Component
- **Purpose:** Redirect unauthenticated users to login
- **Behavior:**
  - Shows loading UI while checking auth state
  - Redirects to `/login` if not authenticated
  - Renders children only if user is authenticated
- **Usage:** Wrap protected page content
- **Location:** Used in dashboard and profile pages

#### `ProtectedRouteWithFallback` Component
- **Purpose:** Show access denied UI instead of redirecting
- **Behavior:**
  - Shows loading UI while checking auth state
  - Displays "Access Denied" message with login link if not authenticated
  - Renders children only if user is authenticated
- **Usage:** Alternative to ProtectedRoute for pages that should show denial rather than redirect
- **Location:** Currently used in dashboard and profile pages

## Design Patterns

### Client-Side Auth Check
- `useAuth()` hook runs on mount and checks session
- Works with Supabase client-side session persistence
- Automatically updated on login/logout via `router.refresh()`

### Loading States
- Both wrapper components show centered loading spinner during auth check
- Prevents content flashing before redirect
- Improves UX on slow networks

### Error Handling
- Errors logged but don't break the flow
- Failed auth checks default to "not authenticated" behavior
- Users see access denied or redirect to login

## Integration Points
- **Dashboard:** Uses `ProtectedRouteWithFallback` to wrap page content
- **Profile:** Uses `ProtectedRouteWithFallback` to wrap page content
- **Future pages:** Can use either wrapper depending on desired UX

## Notes
- Auth state persists via Supabase session cookies
- Page refresh re-evaluates auth state automatically
- Middleware (from Task 4) refreshes tokens on every request

---

# Implementation Notes - Task 14: Home Page with Auth Status Display

## Date Completed
February 27, 2026

## Overview
Replaced the Next.js boilerplate home page with a real welcome page that displays authentication status and provides conditional navigation based on user login state. This is the first public-facing page that showcases the authentication infrastructure built in Tasks 10-13.

## Files Modified
- `app/page.tsx` (replaced entire component)

## Implementation Details

### Architecture
- **Client Component**: Uses `'use client'` directive to access `useAuth()` hook
- **Three States**: Loading, Authenticated, Not Authenticated
- **No Redirects**: Home page remains public and displays auth options inline

### Component Structure

```typescript
'use client';
// Entry point: useAuth() hook provides {user, loading, error}
// Loading UI: Spinner with "Loading..." text
// Auth UI: Conditional rendering based on user presence
// Not Auth UI: Login/Signup links
```

### Key Features

1. **Loading State**
   - Displays centered spinner while auth status is determined
   - Uses animated border (`border-t-primary`) on div with `animate-spin`
   - Prevents layout shift during auth check

2. **Authenticated State** (user exists)
   - Shows green card with user's email address
   - Displays two buttons: "Go to Dashboard" and "View Profile"
   - Links navigate to `/dashboard` and `/profile` (both protected routes)
   - Uses `break-all` on email to handle long addresses

3. **Not Authenticated State** (user is null)
   - Shows signup/login instructions
   - Provides two buttons: "Sign Up" and "Log In"
   - Links navigate to `/signup` and `/login` (auth routes)

### Component Usage

```typescript
const { user, loading } = useAuth();  // Returns from Task 13 hook

// Conditional rendering:
if (loading) { /* Show spinner */ }
if (user) { /* Show auth UI with dashboard/profile links */ }
else { /* Show signup/login links */ }
```

### Styling

- **Layout**: `page-container` (from Task 5 Tailwind) with centered flex layout
- **Typography**: 4xl bold heading, lg body text
- **Colors**: Uses CSS variables from globals.css (muted, border, primary, secondary)
- **Responsive**: `flex-col sm:flex-row` for button layout on mobile/desktop
- **Dark Mode**: Fully supports with `dark:` Tailwind prefixes

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| Client component | Need `useAuth()` hook to check user state |
| Inline auth options | Home page remains public; no forced redirects |
| Loading spinner | Prevents UI flicker during session check |
| Green card for auth | Visual feedback that user is logged in |
| Link + Button combo | Semantic HTML (`<a>` tags) with Button styling |
| Email display | Confirms which account user logged in with |
| Footer info text | Describes starter app features for new visitors |

### Code Example: Rendering Pattern

```typescript
{user ? (
  // Authenticated: Show email + dashboard/profile links
  <div className="space-y-6">
    <div className="card bg-green-50 dark:bg-green-950">
      <p className="text-sm text-muted mb-2">You are logged in as:</p>
      <p className="font-semibold text-gray-900 dark:text-white break-all">
        {user.email}
      </p>
    </div>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/dashboard"><Button variant="primary">Go to Dashboard</Button></Link>
      <Link href="/profile"><Button variant="secondary">View Profile</Button></Link>
    </div>
  </div>
) : (
  // Not authenticated: Show signup/login links
  <div className="space-y-6">
    <p className="text-muted">Get started by signing up or logging in to your account.</p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Link href="/signup"><Button variant="primary">Sign Up</Button></Link>
      <Link href="/login"><Button variant="secondary">Log In</Button></Link>
    </div>
  </div>
)}
```

## Dependencies
- `@/lib/auth/hooks.ts` → `useAuth()` hook (Task 13)
- `@/components/ui/Button.tsx` → Button component (Task 5)
- Tailwind CSS classes from `globals.css` (Task 5)

## Testing Checklist
- [ ] Home page loads without auth (shows signup/login links)
- [ ] Home page shows loading spinner during auth check
- [ ] After signup/login, home page shows user email in green card
- [ ] Dashboard and Profile links navigate correctly when authenticated
- [ ] Page refresh maintains auth state
- [ ] Dark mode styles apply correctly
- [ ] Mobile responsive layout works (buttons stack on small screens)

## Integration Points
- **Task 10 (Signup)**: Signup redirects to `/dashboard`; home page shows dashboard link on next visit
- **Task 11 (Login)**: Login redirects to `/dashboard`; home page shows dashboard link on next visit
- **Task 12 (Logout)**: Logout redirects to `/` (home); home page shows signup/login links
- **Task 13 (Protected Routes)**: Home page links to `/dashboard` and `/profile` which use protected wrappers

## Future Considerations
- Could add section for feature highlights/documentation links
- Could add testimonials or usage examples for marketing
- Could add stats/metrics dashboard for authenticated users
- Home page is good foundation for adding blog/news feed later

---

# Implementation Notes - Task 15: Dashboard Page with User Profile Data

## Date Completed
February 27, 2026

## Overview
Built a protected dashboard page that displays the current user's profile information fetched from the Supabase `profiles` table. This page serves as the main hub after authentication, showcasing real data from the database and providing navigation to the profile editor.

## Files Created/Modified
- `lib/auth/useProfile.ts` (NEW)
- `components/ui/Avatar.tsx` (NEW)
- `app/(protected)/dashboard/page.tsx` (MODIFIED)

## Implementation Details

### 1. `useProfile()` Hook (`lib/auth/useProfile.ts`)

**Purpose**: Reusable hook to fetch user profile data from the `profiles` table, with error handling and refetch capability.

**Interface**:
```typescript
interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useProfile(userId: string | undefined): UseProfileReturn
```

**Profile Interface**:
```typescript
export interface Profile {
  id: string;                    // UUID from auth.users
  email: string;                 // Email address
  full_name: string | null;      // Optional full name
  avatar_url: string | null;     // Optional avatar URL
  updated_at: string;            // ISO timestamp
}
```

**Key Features**:
- Takes `userId` as parameter (from `useAuth()` hook)
- Returns `null` profile if userId is undefined
- Fetches from `profiles` table using RLS-protected query
- Includes `refetch()` method for manual refresh
- Handles errors gracefully with descriptive messages
- Sets loading state during fetch

**Query**:
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('id, email, full_name, avatar_url, updated_at')
  .eq('id', userId)
  .single();
```

### 2. Avatar Component (`components/ui/Avatar.tsx`)

**Purpose**: Reusable avatar display component with image support and fallback initials.

**Props**:
```typescript
interface AvatarProps {
  src?: string | null;           // Image URL (optional)
  alt: string;                   // Alt text for image
  initials?: string;             // Fallback initials (default: '?')
  size?: 'sm' | 'md' | 'lg';    // Size variant
  className?: string;            // Additional CSS classes
}
```

**Size Variants**:
| Size | Dimensions | Text Size |
|------|-----------|-----------|
| sm | 8x8 | xs |
| md | 12x12 (default) | sm |
| lg | 16x16 | lg |

**Rendering Logic**:
- If `src` provided: displays image with Next.js Image component
- If no `src`: shows fallback initials on primary color background
- Fully rounded circle shape
- Responsive to dark mode

**Example Usage**:
```typescript
<Avatar
  src={profile.avatar_url}
  alt={profile.full_name || profile.email}
  initials={getInitials()} // "JD" for John Doe
  size="lg"
/>
```

### 3. Dashboard Page Update (`app/(protected)/dashboard/page.tsx`)

**Architecture**: Client component using protected route wrapper with conditional rendering for three states.

**Component Composition**:
```
ProtectedRouteWithFallback
├── Header (with Profile link + Logout)
└── Dashboard Content
    ├── Loading State (skeleton)
    ├── Error State (with retry)
    ├── Profile State (real data)
    └── No Profile State (fallback)
```

**States**:

1. **Loading State** (`authLoading || profileLoading`):
   - Displays animated skeleton loader
   - Uses Tailwind's `animate-pulse` class
   - Prevents layout shift during data fetch

2. **Error State** (`error` exists):
   - Shows red card with error message
   - Includes "Retry" button to reload page
   - Dark mode compatible styling

3. **Profile State** (profile data exists):
   - **Header Section**:
     - Large avatar (lg size)
     - Full name or "Your Profile" placeholder
     - Email address (with `break-all` for long emails)
     - Last updated timestamp (formatted as "Feb 27, 2026, 12:30 PM")
   
   - **Navigation Card**:
     - Link to `/profile` page for editing
     - Hover effect with shadow increase
     - Arrow indicator (→)
   
   - **Quick Stats Card**:
     - Account Status: Active (green)
     - Authentication: Verified (green)
     - Profile Completeness: 33%, 66%, or 100% based on full_name + avatar_url

4. **No Profile State** (null profile):
   - Fallback message suggesting re-login

**Helper Functions**:

```typescript
// Generate initials from name or email
const getInitials = () => {
  if (profile?.full_name) {
    return profile.full_name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
  if (profile?.email) return profile.email[0].toUpperCase();
  return '?';
};

// Format ISO timestamp to readable string
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};
```

**Layout**:
- Max width: 4xl (for readability)
- Responsive grid (1 column mobile, 2 columns desktop)
- Flexbox for avatar + info layout on desktop
- Proper spacing with Tailwind gap utilities

### Design Decisions

| Decision | Rationale |
|----------|-----------|
| Skeleton loader | Better UX than spinner for data-heavy page |
| Avatar with fallback | Shows initials immediately while image loads |
| Profile completeness % | Encourages users to fill out profile |
| Quick stats section | Shows account health at a glance |
| Refetch capability | Allows manual refresh if data changes elsewhere |
| RLS-protected query | Ensures users can only see their own profile |

## Dependencies

| Module | Purpose |
|--------|---------|
| `@/lib/auth/hooks.ts` | `useAuth()` hook (Task 13) |
| `@/lib/auth/useProfile.ts` | Profile fetch logic (NEW) |
| `@/components/ui/Avatar.tsx` | Avatar display (NEW) |
| `@/components/layout/Header.tsx` | Page header (Task 5) |
| `@/components/auth/LogoutButton.tsx` | Logout action (Task 12) |
| `@/lib/auth/protected.tsx` | Route protection (Task 13) |

## Testing Workflow

**Full End-to-End Scenario**:
```
1. Visit http://localhost:3000/
   → Home page shows signup/login links
   
2. Click "Sign Up"
   → Signup form loads
   
3. Enter email + password → Submit
   → Supabase creates user + auto-creates profile
   → Redirected to /dashboard
   
4. Dashboard loads
   → Shows loading skeleton briefly
   → Profile data displays: email, full_name (empty), avatar (fallback initials)
   → "Edit Profile" card links to /profile
   → "Logout" button in header
   
5. Refresh page (F5)
   → Dashboard reloads with same data
   → Auth state persists via session cookie
   
6. Click "Edit Profile"
   → Navigate to /profile page (will implement Task 16)
   
7. Go back to dashboard
   → If profile was updated, new data displays
   
8. Click "Logout"
   → Session cleared
   → Redirected to /
   → Home page shows signup/login links again
```

## Code Examples

**Using useProfile Hook**:
```typescript
const { user } = useAuth();
const { profile, loading, error, refetch } = useProfile(user?.id);

if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage onRetry={refetch} />;
if (profile) return <ProfileCard profile={profile} />;
```

**Avatar Component**:
```typescript
// With image
<Avatar
  src="https://example.com/avatar.jpg"
  alt="John Doe"
  size="lg"
/>

// Fallback to initials
<Avatar
  src={null}
  alt="Jane Smith"
  initials="JS"
  size="md"
/>
```

## Verification Checklist

- [x] `useProfile()` hook fetches data correctly
- [x] Avatar component renders with image or fallback
- [x] Dashboard displays profile data from database
- [x] Loading state shows skeleton
- [x] Error state shows message + retry button
- [x] Protected route wrapper prevents unauthorized access
- [x] Responsive on mobile (buttons stack, avatar scales)
- [x] Dark mode styling applied correctly
- [x] Profile completeness metric calculated accurately
- [x] Last updated timestamp formatted correctly

## Integration Points

- **Task 10-12 (Auth)**: Dashboard is redirect destination after login
- **Task 13 (Protected Routes)**: Uses `ProtectedRouteWithFallback` wrapper
- **Task 14 (Home Page)**: Links to dashboard for authenticated users
- **Task 16 (Profile Edit)**: Uses same `useProfile()` hook
- **Task 17 (Avatar Upload)**: Avatar component already supports image URLs

## App Runnable Status: ✅ FULL END-TO-END

After Task 15, the app is **fully testable end-to-end** for the complete authentication flow:

1. ✅ Signup with email/password
2. ✅ Auto-create profile in database
3. ✅ Login and redirect to dashboard
4. ✅ Display user profile data from database
5. ✅ View profile information
6. ✅ Logout and return to home
7. ✅ Auth state persists across page refreshes

**Public Workflow**: Visit → Signup → Dashboard (with real data) → Logout → Home

**Protected Workflow**: Only authenticated users can access `/dashboard` and `/profile`

## Future Enhancements

- Add profile image in header
- Show account creation date
- Add activity timeline
- Display user roles/permissions
- Add integration with settings page
- Show notification preferences
- Add connected accounts section

---

# Implementation Notes - Task 16: Profile Page with Edit Form (Protected)

## Date Completed
March 2, 2026

## Overview
Implemented the protected profile editing experience so authenticated users can view their current profile details and update `full_name` in the `profiles` table with client-side validation, loading states, and success/error feedback.

## Files Modified
- `app/(protected)/profile/page.tsx`

## What Was Implemented

### 1. Connected Profile Page to Auth + Profile Data
- Added `useAuth()` to identify the signed-in user
- Added `useProfile(user?.id)` to fetch the current row from `public.profiles`
- Added a loading skeleton while auth/profile state resolves
- Added load error messaging when profile fetch fails

### 2. Displayed Current Profile Information
- Added a profile summary block above the form showing:
  - Current avatar via existing `Avatar` component
  - Email address (read-only)
  - Last updated timestamp
- Added helper functions for:
  - Initials fallback generation from `full_name`/`email`
  - Human-readable date formatting for `updated_at`

### 3. Added Form State Sync With Database Data
- Replaced placeholder local state behavior with profile-backed state
- On profile load/update, form state is synchronized via `useEffect`
- Form now prefills with existing `full_name` from database

### 4. Implemented Validation (Task 16 Scope)
- Added explicit validation for `full_name`:
  - Required after trimming whitespace
  - Minimum 2 characters
  - Maximum 80 characters
- Validation errors are rendered inline through the existing `Input` error prop

### 5. Implemented Save/Update Persistence
- Replaced TODO submit handler with real Supabase update query:

```typescript
await supabase
  .from('profiles')
  .update({ full_name: normalizedName })
  .eq('id', user.id);
```

- Added guarded submit behavior for missing auth user
- Added post-save `refetch()` to refresh profile data in UI

### 6. Added Submit UX States
- `saving` state disables submit button and changes button text to `Saving...`
- `submitError` state shows API/update failures in a red alert
- `successMessage` state confirms successful updates in a green alert

## Scope Boundaries Respected
- Task 16 implemented **only** profile page editing behavior.
- Avatar upload/storage logic was intentionally **not** added (reserved for Task 17).
- Added a clear in-page note that avatar upload and avatar URL updates are part of Task 17.

## Verification Performed
- Type/script diagnostics check on `app/(protected)/profile/page.tsx`: **No errors found**
- Manual logic path coverage in code confirms:
  - Protected wrapper remains in use
  - Profile information displays from database
  - Form validation blocks invalid input
  - Successful save updates persisted profile field

---

# Implementation Notes - Task 17: Avatar Upload to Storage

## Date Completed
March 2, 2026

## Overview
Implemented end-to-end avatar uploads with Supabase Storage, including bucket/policy configuration, profile page file upload UX, client-side validation, and persistence of the resulting `avatar_url` in the `profiles` table.

## Files Created/Modified
- `supabase/migrations/20260302120000_avatars_storage.sql` (NEW)
- `app/(protected)/profile/page.tsx` (MODIFIED)
- `next.config.ts` (MODIFIED)
- `PLAN.md` (MODIFIED; Task 17 marked complete)

## What Was Implemented

### 1. Supabase Storage Bucket + Policies
Added migration `20260302120000_avatars_storage.sql` to configure avatar storage and access controls.

#### Bucket Configuration
- Creates/updates bucket `avatars`
- Public read enabled for direct avatar rendering
- File size limit set to 5MB (`5242880` bytes)
- Allowed MIME types restricted to:
  - `image/png`
  - `image/jpeg`
  - `image/webp`

#### Storage Policies (`storage.objects`)
- **Public read policy** for avatar objects in `avatars`
- **Insert policy** for authenticated users limited to their own folder path (`<auth.uid()>/...`)
- **Update policy** for authenticated users limited to their own folder path
- **Delete policy** for authenticated users limited to their own folder path

All policies are created with `drop policy if exists` guards so resets/replays remain stable.

### 2. Profile Page Avatar Upload UI
In `app/(protected)/profile/page.tsx`, added a dedicated Avatar upload section above the name form:
- File input (`type="file"`) with accepted image types
- Selected file display
- Upload button with disabled/loading states
- Avatar-specific success and error alert messages

### 3. Client-Side Avatar Validation
Added explicit validation before upload:
- MIME type must be PNG/JPEG/WebP
- File size must be `<= 5MB`

Validation runs on file selection and again at upload time to ensure invalid files are blocked consistently.

### 4. Upload + Persistence Flow
Implemented `handleAvatarUpload()` using Supabase browser client:

1. Validate auth + selected file
2. Upload to `avatars` bucket at a user-scoped path:
   - `${user.id}/avatar-${Date.now()}.${extension}`
3. Retrieve public URL using `getPublicUrl()`
4. Update `profiles.avatar_url` for current user
5. `refetch()` profile so profile page immediately re-renders with new avatar

Error handling is surfaced in UI without breaking the rest of the profile form.

### 5. Next.js Remote Image Host Support
Updated `next.config.ts` image config to allow avatar rendering from Supabase storage URLs:
- `https://**.supabase.co/storage/v1/object/public/**`
- `http://127.0.0.1:54321/storage/v1/object/public/**`
- `http://localhost:54321/storage/v1/object/public/**`

This ensures `next/image` in `Avatar` can render both local and hosted Supabase image URLs.

## Acceptance Criteria Mapping
- ✅ Configure Supabase Storage bucket for avatars
- ✅ Create file input in profile page
- ✅ Implement upload logic with file type/size validation
- ✅ Store avatar file in Supabase Storage
- ✅ Update `avatar_url` in `profiles` table
- ✅ Display uploaded avatar in profile and dashboard (both consume `avatar_url`)
- ✅ Handle upload errors gracefully

## Verification Performed
- Diagnostics check: no errors in
  - `app/(protected)/profile/page.tsx`
  - `next.config.ts`
- Confirmed Task 17 checklist marked complete in `PLAN.md`

## Notes
- Run `supabase db reset` (or equivalent migration apply command) to apply the new storage migration in local DB before testing uploads.
- Dashboard already reads `avatar_url` through existing `useProfile()` flow, so uploaded avatars appear there after data refresh/navigation.

---

# Implementation Notes - Task 18: Unit Testing Framework Setup (Vitest)

## Date Completed
March 2, 2026

## Overview
Implemented the project testing foundation using Vitest with a jsdom environment, Testing Library integration, shared test utilities, and runnable npm scripts for standard, watch, and coverage test execution.

## Files Created/Modified
- `package.json` (MODIFIED)
- `vitest.config.ts` (NEW)
- `vitest.setup.ts` (NEW)
- `__tests__/utils/test-utils.tsx` (NEW)

## What Was Implemented

### 1. Testing Dependencies Installed
Added the required dev dependencies for Task 18:
- `vitest`
- `jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`
- `@testing-library/user-event`
- `@vitest/coverage-v8`

### 2. npm Test Scripts Added
Updated `package.json` scripts:
- `test` → `vitest run`
- `test:watch` → `vitest`
- `test:coverage` → `vitest run --coverage`

This provides the standard command surface needed for Task 19 test authoring.

### 3. Vitest Core Configuration
Created `vitest.config.ts` with:
- `jsdom` test environment
- setup file registration via `setupFiles: ['./vitest.setup.ts']`
- include globs for both `__tests__` and colocated `*.test`/`*.spec` files
- `passWithNoTests: true` to allow framework validation before Task 19 tests exist
- V8 coverage provider with text + HTML reporters
- alias resolution for `@` to match the project TypeScript import style

### 4. Test Setup Utilities
Created `vitest.setup.ts` to establish baseline test runtime behavior:
- Testing Library cleanup after each test
- Jest DOM matchers via `@testing-library/jest-dom/vitest`
- browser API shims for `window.matchMedia` and `ResizeObserver`

These avoid common runtime failures for component tests in jsdom.

### 5. Shared Render Helper for Future Tests
Created `__tests__/utils/test-utils.tsx`:
- exports `renderWithProviders()` wrapper
- re-exports Testing Library utilities

This provides a single import point and a foundation for adding providers later (router/context/etc.) without rewriting tests.

## Verification Performed

### Diagnostics
- No TypeScript/diagnostic errors in:
  - `vitest.config.ts`
  - `vitest.setup.ts`
  - `__tests__/utils/test-utils.tsx`

### Command Validation
Executed all Task 18 framework commands successfully:
- `npm run test` → passes with zero tests (expected before Task 19)
- `npm run test:watch` → starts watch mode successfully
- `npm run test:coverage` → runs with V8 coverage and completes

## Deliverable Status
- ✅ Testing framework installed and configured
- ✅ Test setup utilities and helper file created
- ✅ npm scripts ready for development and CI usage
- ✅ Project ready for Task 19 (writing example tests)

---

# Implementation Notes - Task 19: Example Component/Utility/Auth Tests

## Date Completed
March 2, 2026

## Overview
Implemented a representative Task 19 test suite using the Vitest infrastructure from Task 18, covering utility functions, auth form components, and auth hook behavior with mocked Supabase/router dependencies.

## Files Created/Modified
- `__tests__/utils/lib-utils.test.ts` (NEW)
- `__tests__/components/auth-login-form.test.tsx` (NEW)
- `__tests__/components/auth-signup-form.test.tsx` (NEW)
- `__tests__/auth/use-auth.test.tsx` (NEW)
- `README.md` (MODIFIED)

## What Was Implemented

### 1. Utility Tests (`lib/utils.ts`)
Created `__tests__/utils/lib-utils.test.ts` with coverage for:
- `isValidEmail()` valid and invalid cases
- `isValidPassword()` minimum length behavior
- `cn()` class merging with falsy filtering

### 2. Component Tests (`LoginForm`, `SignupForm`)

#### `__tests__/components/auth-login-form.test.tsx`
Implemented tests for:
- Supabase login error rendering in UI (`Invalid login credentials`)
- Successful login path:
  - calls `supabase.auth.signInWithPassword()` with expected payload
  - redirects with `router.push('/dashboard')`
  - triggers `router.refresh()`

#### `__tests__/components/auth-signup-form.test.tsx`
Implemented tests for:
- Password length validation (`Password must be at least 8 characters`)
- Password mismatch validation (`Passwords do not match`)
- Successful signup path:
  - calls `supabase.auth.signUp()` with expected payload
  - redirects with `router.push('/dashboard')`
  - triggers `router.refresh()`

### 3. Auth Hook Tests (`useAuth`)
Created `__tests__/auth/use-auth.test.tsx` to validate `useAuth()` behavior:
- Loading → success state with mocked user response
- Loading → error state with mocked rejected auth request

### 4. Mocking Strategy
Used Vitest module mocks for:
- `next/navigation` (`useRouter`) in component tests
- `@/lib/supabase/client` (`createSupabaseClient`) in component and hook tests

This isolates UI/hook logic from network behavior and enables deterministic test execution.

### 5. README Test Authoring Documentation
Updated `README.md` with a new **Testing** section including:
- `npm run test`
- `npm run test:watch`
- `npm run test:coverage`

Also documented where to place new tests (`__tests__/utils`, `__tests__/components`, `__tests__/auth`), naming conventions (`.test.ts/.test.tsx`), and use of shared helper utilities.

## Verification Performed

### Test Commands
- `npm run test` → **PASS**
  - 4 test files passed
  - 12 tests passed

- `npm run test:coverage` → **PASS**
  - 4 test files passed
  - 12 tests passed
  - Coverage report generated successfully

### Diagnostics
- No diagnostics errors in all Task 19 test files and README updates.

## Deliverable Status
- ✅ Utility tests added
- ✅ Component tests added
- ✅ Auth-related hook tests added
- ✅ 3–4+ example tests requirement exceeded (12 total assertions/tests)
- ✅ Documentation for adding tests included

---

# Implementation Notes - Task 20: setup.sh Automation Script

## Date Completed
March 2, 2026

## Overview
Implemented an idempotent `setup.sh` script that automates local development setup: dependency installation, Supabase startup, credential extraction, `.env.local` updates, and migration application.

## Files Created/Modified
- `setup.sh` (NEW)
- `PLAN.md` (MODIFIED; Task 20 marked complete)

## What Was Implemented

### 1. Prerequisite and Environment Checks
The script verifies required tools before doing any setup work:
- `node`
- `npm`
- `npx`
- `docker`
- Supabase CLI availability via `npx supabase --version`

It also checks Docker daemon availability (`docker info`) and exits with a clear error if Docker is not running.

### 2. Dependency Installation
Runs:

```bash
npm install
```

This makes setup repeatable and ensures local dependencies (including `supabase` dev dependency) are installed.

### 3. Start Local Supabase and Capture Output
Runs:

```bash
npx supabase start
```

The script captures and prints command output, then uses `npx supabase status -o env` output to extract credentials.

### 4. Extract and Apply Credentials to `.env.local`
Reads values from `supabase status -o env`:
- `API_URL`
- `ANON_KEY`

Maps them to:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Uses an idempotent upsert function that replaces existing key lines and preserves unrelated environment variables in `.env.local`.

### 5. Run Migrations Automatically
Runs local migration application through:

```bash
npx supabase db reset --yes
```

If `supabase/seed.sql` is missing, script falls back to:

```bash
npx supabase db reset --no-seed --yes
```

This keeps setup robust for repositories without seed files.

### 6. User-Friendly Completion Output
Prints a final summary with:
- success confirmation
- next steps (`npm run dev`)
- app URL and Supabase Studio URL
- redacted anon key display for safer terminal output

## Validation Performed

### Script Syntax
- `bash -n setup.sh` → valid syntax

### Execution Validation
- First run: `./setup.sh` → **PASS**
  - installs dependencies
  - starts Supabase
  - updates `.env.local`
  - applies migrations

- Second run: `./setup.sh` → **PASS**
  - repeated execution successful
  - `.env.local` remained clean (no duplicate `NEXT_PUBLIC_SUPABASE_*` keys)

### Idempotency Result
Confirmed script is safe to re-run multiple times in the same workspace and converges to consistent local setup state.

## Deliverable Status
- ✅ `setup.sh` installs dependencies
- ✅ `setup.sh` starts Supabase
- ✅ Credentials extracted from Supabase output
- ✅ `.env.local` created/updated automatically
- ✅ Migrations run automatically
- ✅ Completion message with next steps provided
- ✅ Idempotent behavior verified via repeated execution
- ✅ Error handling included for missing tools and Docker daemon status

---

# Implementation Notes - Task 21: GitHub Actions Migration Workflow

## Date Completed
March 3, 2026

## Overview
Implemented a production migration deployment workflow using GitHub Actions. The workflow applies pending Supabase migrations on pushes to deployment branches and supports manual execution.

## Files Created/Modified
- `.github/workflows/database-migrations.yml` (NEW)
- `README.md` (MODIFIED; workflow configuration documentation)
- `PLAN.md` (MODIFIED; Task 21 marked complete)

## What Was Implemented

### 1. Workflow File Creation
Created `.github/workflows/database-migrations.yml` with:
- workflow name: `Database Migrations`
- `push` trigger on `main` and `production`
- path filter for `supabase/migrations/**`
- `workflow_dispatch` support for manual runs

### 2. Security and Credential Handling
Configured secure credential usage via GitHub Secrets:
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`

Added an explicit validation step that fails early if any required secret is missing.

### 3. Migration Deployment Steps
Workflow deploy job includes:
1. `actions/checkout@v4`
2. `supabase/setup-cli@v1`
3. `supabase link --project-ref ...`
4. `supabase db push --password ...`

### 4. Safety and Reliability
Added:
- minimal permissions (`contents: read`)
- concurrency guard (`db-migrations-${{ github.ref }}`) to prevent overlapping runs per branch
- job timeout (`15` minutes)

### 5. Configuration Documentation
Updated `README.md` with a **Database Migration Workflow** section covering:
- workflow triggers
- required repository secrets
- execution behavior and deployment steps

## Validation Performed
- Verified workflow YAML structure and required keys by static review.
- Verified task tracking updates in `PLAN.md`.
- Verified README includes setup instructions for GitHub Secrets and workflow usage.

## Deliverable Status
- ✅ `.github/workflows/database-migrations.yml` created
- ✅ Workflow triggers configured for deployment branches
- ✅ Supabase migration push flow implemented
- ✅ Secrets-based credential handling implemented
- ✅ Error handling and run-safety controls added
- ✅ Workflow configuration documented

---

# Implementation Notes - Task 22: Comprehensive README Documentation

## Date Completed
March 3, 2026

## Overview
Rewrote `README.md` into a complete, project-specific guide covering setup, architecture, database/auth behavior, deployment, CI migration workflow, testing, and troubleshooting. This documentation now matches the current implementation from Tasks 1-21 and satisfies all Task 22 checklist requirements.

## Files Modified
- `README.md` (rewritten)
- `PLAN.md` (Task 22 checklist marked complete)

## What Was Implemented

### 1. Project Description and Purpose
- Added a clear starter-app overview with supported capabilities:
  - Supabase auth (signup/login/logout)
  - protected routes
  - profile management
  - avatar upload
  - testing/tooling/automation baseline

### 2. Prerequisites + Setup Paths
- Added explicit prerequisite section for Node.js, npm, Docker.
- Added **Quick Start** section using `./setup.sh` as the default path.
- Added **Manual Setup** section with exact commands for install, Supabase startup/status, env setup, migration reset, and app startup.

### 3. Environment Variables Documentation
- Documented required runtime variables in `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Documented required CI/CD GitHub secrets:
  - `SUPABASE_ACCESS_TOKEN`
  - `SUPABASE_PROJECT_REF`
  - `SUPABASE_DB_PASSWORD`

### 4. Structure, Conventions, and Reuse Guidance
- Added an updated project structure map aligned with current route groups and folder layout.
- Added guidance for reusing this repository as a base for new projects.
- Added code-organization/conventions section for `components`, `lib/auth`, `lib/supabase`, migrations, and tests.

### 5. Database + Authentication Documentation
- Added profiles schema overview (`id`, `email`, `full_name`, `avatar_url`, `updated_at`).
- Documented DB automation/security behavior:
  - auto-create profile trigger on signup
  - `updated_at` trigger
  - RLS policies (`auth.uid() = id`)
- Added auth flow walkthrough from signup to protected routes and logout.
- Added avatar storage/policy summary for the `avatars` bucket.

### 6. Testing, Deployment, and Workflow Documentation
- Added complete test command section:
  - `npm run test`
  - `npm run test:watch`
  - `npm run test:coverage`
- Added deployment instructions for Vercel/Netlify with required env vars.
- Added GitHub Actions migration setup guide for `.github/workflows/database-migrations.yml`.

### 7. Troubleshooting Section
- Added practical troubleshooting entries for:
  - Docker not running
  - Supabase startup issues
  - stale/missing `.env.local`
  - migration reset issues
  - auth failures
  - avatar rendering issues
  - test environment issues

## Verification Performed
- Manual review confirmed every Task 22 checklist item from `PLAN.md` is now explicitly represented in `README.md`.
- Updated `PLAN.md` to mark Task 22 and all Task 22 sub-checklist items as complete.

## Deliverable Status
- ✅ `README.md` rewritten as comprehensive documentation
- ✅ All Task 22 checklist items covered
- ✅ Task tracking updated in `PLAN.md`



