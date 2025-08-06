# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.3 application using:
- App Router (not Pages Router)
- TypeScript with strict mode
- React 19.0.0
- Tailwind CSS v4 with CSS variables
- shadcn/ui component system (configured via components.json)

## Essential Commands

```bash
# Development with Turbopack
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

Note: No test runner is currently configured.

## Architecture

The application follows Next.js App Router conventions:

- `app/` - App Router directory containing pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Home page component
  - `globals.css` - Global styles and Tailwind directives
- `lib/utils.ts` - Contains the `cn()` utility for combining class names with clsx and tailwind-merge
- `components/` - Component directory (empty, ready for shadcn/ui components)
- Path alias: `@/*` maps to the root directory

## Key Configuration

- **TypeScript**: Strict mode enabled, ES2017 target
- **Styling**: Tailwind CSS v4 with PostCSS
- **Components**: Configured for shadcn/ui with class-variance-authority
- **Development**: Uses Turbopack for fast refresh

## Component Development

When adding shadcn/ui components:
```bash
npx shadcn@latest add [component-name]
```

Use the `cn()` utility from `@/lib/utils` for conditional classes:
```typescript
import { cn } from "@/lib/utils"
className={cn("base-classes", conditionalClass && "conditional-classes")}
```