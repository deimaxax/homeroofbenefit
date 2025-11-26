# Copilot Instructions for Housing Benefit Check

## Project Overview

**Housing Benefit Check** is a high-conversion roofing lead generation website built with **Next.js 14 (App Router)**, emphasizing IP-based personalization and multi-step form conversion patterns. It serves as a funneling tool to capture qualified leads for state-approved housing restoration benefits.

## Architecture & Core Concepts

### Next.js App Router Structure

- **Dynamic routing**: Pages like `/[state]/[city]/` generate SEO-optimized landing pages for each supported state/city combination
- **Server/Client split**: Use `'use client'` directive only where needed (forms, animations, state management)
- **Middleware layer** (`middleware.ts`): Runs on every request and injects geolocation headers (from Vercel) into requests as `x-user-city`, `x-user-region`, `x-user-country`
- **Metadata generation**: Root layout defines site-wide SEO metadata; individual pages override as needed

### Geolocation & Personalization Pipeline

1. **Vercel Edge Middleware** extracts visitor's geo location from Vercel's `request.geo` object
2. **Headers passed to components** via Next.js `headers()` function
3. **Server Components** (like `Hero.tsx`) read headers and display location-specific content (e.g., "Program Active in Austin, TX")
4. **Client Components** receive defaults from parent props to avoid hydration mismatch

Example pattern in `Hero.tsx`:
```tsx
const headersList = headers()
const city = headersList.get('x-user-city') || 'Your Area'
// Pass to client component: <BenefitForm defaultCity={city} />
```

### Location Data Model

`lib/locations.ts` maintains `LOCATIONS` object mapping state codes to `StateProgramData`:
- `name`: Display name
- `programName`: Localized program title
- `cities`: Array of supported city slugs
- `utility`: Primary utility provider
- `insurers`: List of partner insurers

Add new states here to unlock city-specific pages.

## UI Component Patterns

### shadcn/ui Integration

Uses Radix UI primitives (Button, Input, Card, Label, Progress) from `components/ui/`. These are unstyled and rely on Tailwind CSS. **Do not manually edit** `components/ui/*` unless extending with custom props; regenerate via `npx shadcn-ui@latest add [component]` instead.

### Form Implementation (BenefitForm.tsx)

Multi-step form using **Framer Motion** for animations and **React Hook Form**-ready structure:
- Step-by-step progression (6 steps total) tracked by `step` state
- Progress bar shows `(step / totalSteps) * 100` percentage
- `AnimatePresence` wraps step content for smooth transitions
- Final step (6) captures leads: name, phone, email with action to "View My Report"

Example: ZIP code validation auto-advances after 5 digits entered.

### Styling Convention

- **Tailwind CSS** with CSS variables for theming in `app/globals.css`
- **Color palette**: Blue accents (primary), green (success), slate (neutral)
- **Spacing**: Use Tailwind's 4px grid (e.g., `p-4`, `gap-8`, `mb-6`)
- **Responsive**: `md:` breakpoint for tablet-up; mobile-first approach
- **Typography**: Inter font from Google Fonts (defined in `app/layout.tsx`)

## Developer Workflows

### Local Development

```bash
npm install
npm run dev
```

Opens dev server at `http://localhost:3000`. Middleware runs locally; geolocation falls back to defaults if not on Vercel.

### Building & Production

```bash
npm run build
npm start
```

Deployment recommended on **Vercel** (automatic geolocation headers, Edge middleware support). For other platforms, mock geolocation or implement custom header injection.

### Linting

```bash
next lint
```

Uses ESLint with Next.js config.

## Key Design Patterns

### Server vs. Client Components

- **Server components**: Fetch data, read headers, render SEO metadata. Default in Next.js 14.
- **Client components**: Add `'use client'` only when using hooks (useState, useEffect) or browser APIs
- **Hydration safety**: Client components receiving server-computed props (e.g., `defaultCity`) must match initial server render to avoid mismatches

Example in `BenefitForm.tsx`:
```tsx
'use client'
export default function BenefitForm({ defaultState, defaultCity }: BenefitFormProps) {
  // Client state & handlers here
}
```

### Animation Patterns (Framer Motion)

- `motion.div` with `initial`, `animate`, `exit` props for entrance/exit animations
- `AnimatePresence mode='wait'` ensures old step exits before new enters
- Transitions: `duration: 0.3` for snappy form step changes
- Use conditional rendering inside `AnimatePresence` to trigger animations on step change

### Conditional Rendering for UX

`BenefitForm` renders different UI trees based on form state:
1. If `step === 6 && isEligible`: Show lead capture (name/phone/email form)
2. If `isAnalyzing`: Show `AnalysisLoader` component (fake analysis for trust-building)
3. Otherwise: Show step-by-step form within `Card` container

This pattern avoids complex nested ternaries; each branch is a distinct view.

## Dependencies & Integrations

- **Next.js 14.2.3**: Core framework
- **React 18**: Library
- **Tailwind CSS 3.4.1**: Styling
- **Framer Motion 11.2.0**: Animations
- **React Hook Form 7.51.5**: Form state (infrastructure ready; not yet fully integrated)
- **Zod 3.23.8**: Schema validation (infrastructure ready)
- **Lucide React 0.378.0**: Icon library
- **Radix UI**: Headless component primitives
- **TypeScript 5**: Type safety

No backend API calls are currently implemented; form submissions are client-side only.

## File Organization & Naming

- **Pages**: `app/[route]/page.tsx` (Next.js convention)
- **Components**: Reusable in `components/` (PascalCase: `BenefitForm.tsx`)
- **Data**: Config/constants in `lib/` (`locations.ts`, `utils.ts`)
- **Styles**: Global in `app/globals.css`, Tailwind for component-level
- **Scripts**: Build/tooling in `scripts/` (e.g., `process-cities.js`)

## Common Pitfalls & Best Practices

1. **Don't hardcode locations**: Always reference `LOCATIONS` from `lib/locations.ts` to support new states
2. **Avoid props-based defaults in Server Components**: Instead use `headers()` and pass computed values to client children
3. **Preserve `AnimatePresence` wrapper**: Removing it breaks step animations; always include when rendering conditional content
4. **Keep form validation separate**: Zod schema should live in a dedicated file (e.g., `lib/schemas.ts`) once expanded
5. **Test geolocation fallbacks**: On non-Vercel environments, defaults kick in; verify UX works without real geo data

## Future Expansion Points

- **Backend integration**: Add API route (`app/api/leads/route.ts`) to persist form submissions
- **Lead validation**: Integrate phone/email verification before capture
- **Dynamic metadata per city**: Generate unique OG images and descriptions per location page
- **A/B testing**: Add experiment variants to form steps (consider splitting logic into composable components)
