# Repository Guidelines

## Project Structure & Module Organization

This is a Vite React + TypeScript portfolio site. Application code lives in `src/`, with routing in `src/router`, shared hooks in `src/hooks`, shared types in `src/types`, utilities in `src/utils`, and global styles in `src/styles/globals.css`. UI is organized by feature/component under `src/components/<ComponentName>/`, usually with `index.tsx` and a matching `<ComponentName>.css`. Page-level views live in `src/pages`. Static assets are split between imported source assets in `src/assets` and public browser-served files in `public/`, including `public/images`.

## Build, Test, and Development Commands

- `npm run dev`: start the Vite development server with hot reload.
- `npm run build`: type-check with `tsc -b` and create the production Vite build.
- `npm run lint`: run ESLint for `src/**/*.ts` and `src/**/*.tsx`; warnings fail the command.
- `npm run lint:fix`: apply automatic ESLint fixes.
- `npm run format`: format files under `src` with Prettier.
- `npm run preview`: serve the production build locally for inspection.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Follow the existing style: single quotes, semicolons, two-space indentation, named exports for components, and colocated CSS imports such as `import './Header.css';`. Component folders use PascalCase (`Header`, `PortfolioSection`), hooks use camelCase with a `use` prefix (`useReveal`), and CSS classes use BEM-like names (`full-header__cta`, `mobile-menu--open`). Keep public asset paths rooted at `/images/...` when referencing files from `public`.

## Testing Guidelines

There is currently no project-level test script or established test suite. Before submitting changes, run `npm run lint` and `npm run build`. If adding tests, add an explicit script to `package.json`, keep test files near the code they cover, and use clear names such as `Header.test.tsx` or `useReveal.test.ts`.

## Commit & Pull Request Guidelines

The history uses short, direct commit messages, with occasional Conventional Commit prefixes such as `feat:` and `chore:`. Prefer concise imperative messages like `feat: add portfolio section` or `fix: correct mobile menu state`. Pull requests should include a brief summary, validation steps run, linked issues when relevant, and screenshots or screen recordings for visual changes across desktop and mobile.

## Agent-Specific Instructions

Do not overwrite existing user work. Keep changes scoped, preserve the current component/CSS organization, and update this guide when repository commands or structure change.
