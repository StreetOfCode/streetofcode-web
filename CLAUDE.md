# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Street of Code Web is the frontend for streetofcode.sk, an educational platform offering programming courses, blog posts, podcasts, and videos. The platform is built with Next.js 12 and TypeScript, using styled-components for styling.

**Related Repository**: Backend API at https://github.com/StreetOfCode/streetofcode-web-api

## Development Commands

### Setup

```bash
# Copy environment template
cp .env.template .env

# Install dependencies
yarn

# Start development server (requires backend running)
yarn dev
```

### Testing & Quality

```bash
# Run all checks (audit, type check, lint, prettier)
yarn test

# Type checking only
yarn tsc

# Linting
yarn lint

# Format checking
yarn prettier:check

# Format code
yarn prettier
```

### Build & Deploy

```bash
# Production build
yarn build

# Start production server
yarn start
```

## Architecture

### Application Structure

**Core Application Files**:

- `src/pages/_app.tsx`: Root application component with context providers (Auth, Theme, Cookie Consent, React Query)
- `src/pages/_document.tsx`: Custom Next.js document for SSR
- `src/AuthUserContext.tsx`: Firebase authentication context and hooks
- `src/theme/`: Theme configuration (light/dark mode support)
- `src/routes.ts`: Centralized route definitions

**Data Fetching Pattern**:

- API layer: `src/api.tsx` defines all API URL builders
- Query hooks: `src/api/*.ts` files contain React Query hooks for each domain (courses, lectures, users, etc.)
- Uses `react-query` for data fetching, caching, and state management
- Authentication via Firebase with custom `authFetch()` wrapper

**Page Routing** (Next.js file-based):

- `/` - Landing page (`src/pages/index.tsx`)
- `/kurzy/[slug]` - Course pages with nested routes for lectures
- `/clanky/[slug]` - Blog posts (WordPress integration)
- `/podcast/[slug]` - Podcast episodes
- `/admin` - Admin panel (React Admin, dynamically loaded)
- `/login/[redirectUri]` - Authentication pages
- `/checkout/[courseSlug]/[courseProductId]` - Stripe payment flow

**Component Organization**:

- `src/components/core/`: Reusable base components (Button, TextField, Modal, etc.)
- `src/components/domain/`: Business logic components organized by feature:
  - `course/`: Course display and navigation
  - `lecture/`: Video players, quizzes, lecture content
  - `lecture-comment/`: Comment system for lectures
  - `course-review/`: Course ratings and reviews
  - `post/`: Blog/podcast post components
  - `post-comment/`: Comment system for posts
  - `user/`: User avatars and profile components

**Admin Section**:

- Located in `src/admin/` (JavaScript, not TypeScript)
- Uses React Admin library for CRUD operations
- Dynamically loaded on `/admin` route (SSR disabled)
- Manages courses, lectures, quizzes, authors, chapters, and difficulty levels

### Key Integrations

**Firebase Authentication**:

- All auth logic in `src/auth.tsx`
- Context provider in `src/AuthUserContext.tsx`
- Use `useAuth()` hook to access user state

**WordPress CMS**:

- Blog content served from WPGraphQL at `NEXT_PUBLIC_WORDPRESS_API_URL`
- Posts displayed in `/clanky` (articles) and `/podcast` sections

**Stripe Payments**:

- Course purchases via Stripe
- Payment flow in `src/pages/checkout/` and `src/api/checkout.ts`

**Sentry Monitoring**:

- Error tracking configured in `next.config.js`
- `ErrorBoundary` fallback in `src/components/domain/ErrorBoundaryFallBack.tsx`

**Vimeo Videos**:

- Course lecture videos hosted on Vimeo
- Video player in `src/components/domain/video/VideoWrapper.tsx`

### State Management

- **Authentication**: Firebase Auth via `AuthContext`
- **Theme**: ThemeSettingContext for light/dark mode
- **Server State**: React Query for all API data
- **Local Storage**: Wrapper in `src/localStorage.ts` for theme settings and preferences

### Type System

All TypeScript types defined in `src/types.ts`:

- Course entities: `CourseOverview`, `Lecture`, `ChapterOverview`
- User data: `SocUser`, `CourseUserProduct`, `UserProgressMetadata`
- Comments: `LectureComment`, `PostComment`
- Quiz system: `Quiz`, `QuizQuestion`, `QuizQuestionAnswer`
- API requests/responses

## Important Notes

### Language

The codebase uses **Slovak language** for user-facing text, comments, and error messages. This is intentional for educational purposes targeting Slovak-speaking users.

### Styling

- Uses styled-components (not CSS modules)
- Theme accessed via `useTheme()` hook from `src/hooks/useTheme.tsx`
- Responsive breakpoints in `src/theme/device.ts`
- Material UI used selectively, prefer custom components in `src/components/core/`

### Environment Variables

Key variables in `.env.template`:

- `NEXT_PUBLIC_API_URL`: Backend API endpoint (default: http://localhost:8080)
- `NEXT_PUBLIC_HOST`: Frontend host
- Firebase config keys (authentication)
- `NEXT_PUBLIC_WORDPRESS_API_URL`: WordPress GraphQL endpoint
- Stripe, Sentry, and Google Tag Manager keys

### CI/CD

GitHub Actions workflow (`.github/workflows/main.yml`) runs on push/PR:

1. Type checking (`yarn tsc`)
2. Linting (`yarn lint`)
3. Format checking (`yarn prettier:check`)

Deployed via Railway.app with automatic GitHub integration.

### Testing

No automated test suite currently exists (`"Testy: nemáme"` per README).

### React Strict Mode

Disabled in `next.config.js` due to compatibility issue with VimeoPlayer component.
