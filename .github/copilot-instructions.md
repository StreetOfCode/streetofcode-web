# Copilot Instructions for AI Agents

Welcome to the `streetofcode-web` codebase! This guide is for AI coding agents to be productive and consistent with project conventions. Please follow these instructions for best results.

## Architecture & Structure

- **Framework:** Next.js (React, TypeScript). Entry point: `src/pages/_app.tsx`.
- **Pages:** All routes are in `src/pages`. Dynamic and static routes follow Next.js conventions.
- **Components:**
  - Core UI components: `src/components/core` (custom replacements for Material UI)
  - Other components: `src/components/`
- **Hooks:** Custom React hooks in `src/hooks/`
- **Admin:** Admin interface uses React Admin, code in `src/admin/`
- **API Layer:** API calls and data fetching logic in `src/api/` and `src/wp/` (WordPress GraphQL integration)
- **Theming:** Theme and device breakpoints in `src/theme/`
- **Global styles:** `src/globalStyles.tsx`

## Data & Integration

- **Authentication:** Firebase Authentication (`src/firebase.tsx`)
- **Analytics:** Google Analytics via Firebase, gated by cookie consent
- **Monitoring:** Sentry integration (`sentry.*.config.*`)
- **Blog/Content:** Data fetched from WordPress via WPGraphQL (`src/wp/`)
- **Payments:** Stripe integration for checkout

## Developer Workflow

- **Install dependencies:** `yarn`
- **Start dev server:** `yarn dev` (runs on `localhost:3000`)
- **Build:** `yarn build`
- **Lint:** `yarn lint`
- **Format:** `yarn prettier`
- **Type check:** `yarn tsc`
- **Full check:** `yarn test` (runs audit, type check, lint, prettier)
- **Environment:** Copy `.env.template` to `.env` and fill in secrets as needed

## Project Conventions

- **Styling:** Use styled-components for all custom styles
- **Component Design:** Prefer custom components in `src/components/core` over Material UI
- **Type Safety:** Use TypeScript types throughout, especially for API and component props
- **Error Handling:** Use Sentry for error reporting; see `_error.tsx` for custom error page
- **SSR/Client Data:** Use `QueryGuard` and `UserAndQueryGuard` for safe data fetching and SSR/CSR fallback logic
- **Constants:** Centralized in `src/constants.ts`
- **Routing:** Use `src/routes.ts` for route constants

## Patterns & Examples

- **Custom Checkbox:** See `src/components/core/CheckBox.tsx` for project-specific UI patterns
- **API Example:** See `src/api/` for REST/GraphQL data fetching patterns
- **Theming Example:** See `src/theme/theme.ts` for color and theme structure

## External Services

- **Firebase:** Used for auth and analytics; config in `.env` and `src/firebase.tsx`
- **Sentry:** Error monitoring; config in `sentry.*.config.*`
- **Stripe:** Payment processing; see `src/api/checkout.ts`
- **WordPress:** Blog and content via WPGraphQL; see `src/wp/`

## CI/CD

- **GitHub Actions:** Used for CI (see workflows in `.github/` if present)
- **Deployment:** Railway.app via GitHub hooks

---

For more details, see the [README.md](../README.md) or ask for clarification. If you find unclear or missing conventions, please suggest improvements!
