This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Testing

Run tests:

```bash
npm run test
```

Run tests in watch mode:

```bash
npm run test:watch
```

Run tests with coverage:

```bash
npm run test:coverage
```

### Adding New Tests

- Put utility tests under `__tests__/utils/`.
- Put component tests under `__tests__/components/`.
- Put auth-specific tests under `__tests__/auth/`.
- Use filenames ending in `.test.ts` or `.test.tsx`.
- Reuse shared testing helpers from `__tests__/utils/test-utils.tsx`.

## Database Migration Workflow

The workflow file `.github/workflows/database-migrations.yml` deploys Supabase migrations automatically.

### Triggers

- Pushes to `main` or `production` when files under `supabase/migrations/**` change.
- Manual run through **Actions → Database Migrations → Run workflow**.

### Required GitHub Secrets

Configure these repository secrets before enabling production deployments:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_PROJECT_REF`
- `SUPABASE_DB_PASSWORD`

### What the workflow does

1. Checks out the repository.
2. Verifies required secrets are present.
3. Installs the Supabase CLI.
4. Links to the target Supabase project.
5. Runs `supabase db push` to apply pending migrations.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
