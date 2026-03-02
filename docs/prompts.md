# AI Prompts — emigrant.ge

Prompts used to guide AI assistants working on this project.

---

## Initial Setup Prompt

Use this at the start of every AI session to establish Next.js v16+ conventions.

```
You are an expert Next.js developer. We are building a production-ready
Next.js application using the LATEST Next.js v16+ conventions and file structure.

## CRITICAL RULES — Always follow these:

### File Conventions (Next.js v16+):
- Use `proxy.ts` NOT `middleware.ts` (middleware is deprecated in v16)
- Export function must be named `proxy()` NOT `middleware()`
- Use `instrumentation.ts` in root for server-side monitoring/OpenTelemetry
- Use `instrumentation-client.ts` in root for browser-side monitoring
- App Router only — NO Pages Router
- TypeScript everywhere (.ts / .tsx)

### Project Structure:
root/
├── proxy.ts                    ← (was middleware.ts, deprecated)
├── instrumentation.ts          ← server monitoring
├── instrumentation-client.ts   ← browser monitoring
├── next.config.ts              ← (not .js)
├── eslint.config.mjs           ← (new flat config format)
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── [feature]/
│   │       ├── page.tsx
│   │       ├── layout.tsx
│   │       └── loading.tsx
│   ├── components/
│   ├── lib/
│   ├── hooks/
│   ├── types/
│   └── utils/

### Directives:
- Server Components by DEFAULT (no directive needed)
- Add `'use client'` ONLY when needed (useState, useEffect, event handlers)
- Add `'use server'` for Server Actions
- Add `'use cache'` for cached data fetching (v15+)

### Data Fetching:
- Use native `fetch()` with Next.js cache options
- Use Server Actions for mutations
- Use `'use cache'` directive for expensive operations
- Never use useEffect for data fetching

### Proxy (proxy.ts) rules:
- Always use matcher config to limit scope
- Exclude: api, _next/static, _next/image, favicon.ico
- Use NextRequest and NextResponse from 'next/server'

### ESLint:
- Config in eslint.config.mjs (flat config)
- Extend: next/core-web-vitals + next/typescript
- no-console: warn
- no-unused-vars: error

When I give you a task:
1. Always specify which file you're creating/editing
2. Always use correct v16+ conventions
3. Never use deprecated patterns
4. Add TypeScript types everywhere
5. Add comments explaining WHY, not WHAT
```

---

## Migration Prompt — Lovable (Vite) → Next.js v16+

Use when migrating an existing Lovable/Vite app to this project.

### Dependencies

```bash
# Remove
npm remove react-router-dom vite @vitejs/plugin-react-swc

# Add
npm install next@latest

# Keep as-is
# shadcn, radix, tanstack, supabase — no changes needed
```

### Claude Agent Prompt

```
We are migrating a Lovable (Vite + React) app to Next.js v16+.

## Source app structure:
- react-router-dom for routing
- AuthContext provider
- QueryClientProvider
- Pages: Index, SearchResults, ListingDetail, Register, Login,
  ForgotPassword, ResetPassword, ClientDashboard,
  ProviderDashboard, CreateListing, NotFound

## Target: Next.js v16+, App Router, TypeScript, src/ structure

## Migration rules:
1. Each <Route path="/x"> becomes src/app/x/page.tsx
2. <Route path="/x/:id"> becomes src/app/x/[id]/page.tsx
3. BrowserRouter/Routes/AuthProvider → src/app/layout.tsx
4. QueryClientProvider → src/app/providers.tsx ('use client')
5. useNavigate → useRouter from 'next/navigation'
6. useParams (react-router) → useParams from 'next/navigation' or async params prop
7. <Link> from react-router-dom → <Link> from 'next/link'
8. middleware.ts → proxy.ts (Next.js v16 convention)
9. Add 'use client' only to components using hooks/events
10. Remove: react-router-dom, vite, @vitejs/plugin-react-swc
```

### Files needed from Lovable for migration

Provide these files/folders from the Lovable project:

| File / Folder | Why needed |
|---|---|
| `src/App.tsx` | Route map — defines all `<Route>` paths |
| `src/main.tsx` | Root providers (QueryClient, AuthContext, etc.) |
| `src/context/AuthContext.tsx` | Auth logic to move into `layout.tsx` or a provider |
| `src/pages/` (entire folder) | Each page becomes a Next.js route |
| `src/components/` (entire folder) | Shared UI — copied as-is, `'use client'` added where needed |
| `src/lib/` or `src/utils/` | Utilities, Supabase client, helpers |
| `src/hooks/` | Custom hooks — copied as-is |
| `src/types/` | TypeScript types — copied as-is |
| `package.json` | Dependency list to audit what stays/goes |
| `vite.config.ts` | Aliases (e.g. `@/`) to replicate in `tsconfig.json` |
| `.env` / `.env.example` | Environment variables to carry over |

Optional but helpful:
- `src/integrations/supabase/` — if Supabase client is generated there
- Any `tailwind.config.*` or `postcss.config.*` — to match styling setup

---

## Notes

- `proxy.ts` / `proxy()` replacing `middleware.ts` / `middleware()` is a Next.js v16 change (beyond AI knowledge cutoff of Aug 2025 — verify against official v16 docs if issues arise)
- `instrumentation-client.ts` was introduced in Next.js 15.4
- `'use cache'` was introduced in Next.js 15 as an experimental directive
