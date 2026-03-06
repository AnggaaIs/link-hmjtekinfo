# Link HMJ Tekinfo

URL shortener untuk HMJ Tekinfo.

## Fitur

- Dynamic routing `/[slug]`
- Supabase untuk database
- Click counter otomatis
- Loading spinner
- Auto redirect
- Tailwind CSS v4 + dark mode
- TypeScript

## Setup

```bash
pnpm install
cp .env.example .env
# Edit .env dengan Supabase credentials
pnpm dev
```

### Environment Variables

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Database Schema

```sql
create table links (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  url text not null,
  clicks integer default 0,
  active boolean default true,
  created_at timestamp with time zone default now()
);
```

## Development

```bash
pnpm dev     # http://localhost:5173
pnpm build   # Production build
pnpm preview # Preview build
```

## Struktur

```
src/
├── routes/
│   ├── [slug]/+page.server.ts  # Fetch data dari Supabase
│   └── [slug]/+page.svelte     # Render redirect component
├── lib/components/
│   └── RedirectClient.svelte   # Loading + redirect logic
└── app.css                     # Tailwind + theme
```

## Deploy

Vercel, Netlify, atau Cloudflare Pages. Jangan lupa set environment variables.
