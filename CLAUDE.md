# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ETCETER4 is a static artistic website with a custom SPA architecture. No build step - JavaScript runs directly in the browser using global scope for cross-file communication.

## Commands

```bash
npm run dev              # Start dev server at localhost:3000 (browser-sync with hot reload)
npm run lint             # Run ESLint on core JS files
npm run lint:fix         # Auto-fix ESLint issues
npm run format           # Format all files with Prettier
npm run format:check     # Check formatting
npm run validate:package-lock  # Validate package-lock.json consistency
npm audit                # Security audit
```

## Architecture

### Page-Based SPA with Global Scope

The site uses a custom navigation system without a framework. Code intentionally uses **global scope** for cross-file communication (ESLint `no-undef` is disabled).

**Core files:**

- `js/page.js` - Page class with state management, navigation logic, and global `currentPage`
- `js/pageData.js` - Page tree configuration defining all pages and their relationships
- `js/main.js` - Application entry point and document ready handler

**Page Class** (`js/page.js`):

```javascript
class Page {
  constructor({ id, tier, upLinks, downLinks, initialize, load }) {
    // id: HTML element ID (e.g., "#menu")
    // tier: Navigation hierarchy level (1-4, higher = deeper)
    // upLinks: Parent page IDs (for back navigation)
    // downLinks: Child page IDs (for forward navigation)
  }
  static findPage(pageId) {
    /* lookup in global pages array */
  }
}
```

**Navigation flow:**

```
Tier 1: #landing → Tier 2: #menu → Tier 3: #sound, #vision, #words → Tier 4: #stills, #diary, #video
```

**Key globals** (shared across files):

- `currentPage` - Currently active Page instance
- `pages` - Array of all Page instances
- `showNewSection(pageId)` - Navigate to a page with fade animation

### Libraries

- jQuery 3.7+ for DOM manipulation
- Velocity.js for animations (fadeIn/fadeOut transitions)
- P5.js for generative art sketches
- Howler.js for audio
- Tachyons CSS for utility-first styling

### Content Loading

- Static HTML pages with JavaScript-controlled visibility
- iframes for isolated content (Bandcamp embeds, etc.)
- Lazy loading for images via `replacePlaceholders()`

## Code Patterns

### JavaScript Style (enforced by ESLint)

- Use `const`/`let`, never `var`
- Always use `===` and `!==`
- Always use curly braces for blocks
- Prefer arrow functions for callbacks
- Prefer template literals over concatenation

### Naming Conventions

- **Functions:** `verbNoun` pattern (e.g., `showNewSection`, `fadeInPage`, `loadPageData`)
- **Booleans:** `is`/`has`/`can` prefix (e.g., `isLoading`, `hasAllData`, `isVisible`)
- **Page IDs:** `#kebab-case` (e.g., `#landing`, `#sound`, `#stills`)
- **CSS classes:** Tachyons utilities + custom `prefix-modifier` (e.g., `et-page-container`)

### Global Scope Pattern

When adding new functionality that needs cross-file access:

1. Declare at file top level (not inside functions)
2. Document with JSDoc comment
3. Check for existing globals to avoid conflicts

## Deployment

- **Vercel:** Auto-deploys on push. Preview URLs for branches: `etceter4-git-{branch}.vercel.app`
- **GitHub Pages:** Deploys from `main`/`master` via GitHub Actions
- CI runs: lint → format check → security audit → deploy

## File Structure

Key directories:

- `js/` - Core application logic and vendor libraries
- `css/` - Stylesheets (Tachyons in `vendor/`)
- `labyrinth/` - Diary entry HTML pages (MMDDYY.html format)
- `ogod/` - OGOD visual album assets
- `akademia/` - Academic content and CV system

<!-- ORGANVM:AUTO:START -->

## System Context (auto-generated — do not edit)

**Organ:** ORGAN-II (Art) | **Tier:** flagship | **Status:** PUBLIC_PROCESS
**Org:** `organvm-ii-poiesis` | **Repo:** `a-mavs-olevm`

### Edges

- **Produces** → `ORGAN-IV`: creative-artifact
- **Consumes** ← `ORGAN-I`: theory-artifact

### Siblings in Art

`core-engine`, `performance-sdk`, `example-generative-music`, `metasystem-master`, `example-choreographic-interface`, `showcase-portfolio`, `archive-past-works`, `case-studies-methodology`, `learning-resources`, `example-generative-visual`, `example-interactive-installation`, `example-ai-collaboration`, `docs`, `a-i-council--coliseum`, `.github` ... and 14 more

### Governance

- Consumes Theory (I) concepts, produces artifacts for Commerce (III).

_Last synced: 2026-03-08T20:11:34Z_

## Session Review Protocol

At the end of each session that produces or modifies files:

1. Run `organvm session review --latest` to get a session summary
2. Check for unimplemented plans: `organvm session plans --project .`
3. Export significant sessions: `organvm session export <id> --slug <slug>`
4. Run `organvm prompts distill --dry-run` to detect uncovered operational patterns

Transcripts are on-demand (never committed):

- `organvm session transcript <id>` — conversation summary
- `organvm session transcript <id> --unabridged` — full audit trail
- `organvm session prompts <id>` — human prompts only

## Active Directives

| Scope  | Phase | Name                                 | Description                                                    |
| ------ | ----- | ------------------------------------ | -------------------------------------------------------------- |
| system | any   | prompting-standards                  | Prompting Standards                                            |
| system | any   | research-standards-bibliography      | APPENDIX: Research Standards Bibliography                      |
| system | any   | research-standards                   | METADOC: Architectural Typology & Research Standards           |
| system | any   | sop-ecosystem                        | METADOC: SOP Ecosystem — Taxonomy, Inventory & Coverage        |
| system | any   | autopoietic-systems-diagnostics      | SOP: Autopoietic Systems Diagnostics (The Mirror of Eternity)  |
| system | any   | cicd-resilience-and-recovery         | SOP: CI/CD Pipeline Resilience & Recovery                      |
| system | any   | cross-agent-handoff                  | SOP: Cross-Agent Session Handoff                               |
| system | any   | document-audit-feature-extraction    | SOP: Document Audit & Feature Extraction                       |
| system | any   | essay-publishing-and-distribution    | SOP: Essay Publishing & Distribution                           |
| system | any   | market-gap-analysis                  | SOP: Full-Breath Market-Gap Analysis & Defensive Parrying      |
| system | any   | pitch-deck-rollout                   | SOP: Pitch Deck Generation & Rollout                           |
| system | any   | promotion-and-state-transitions      | SOP: Promotion & State Transitions                             |
| system | any   | repo-onboarding-and-habitat-creation | SOP: Repo Onboarding & Habitat Creation                        |
| system | any   | research-to-implementation-pipeline  | SOP: Research-to-Implementation Pipeline (The Gold Path)       |
| system | any   | security-and-accessibility-audit     | SOP: Security & Accessibility Audit                            |
| system | any   | session-self-critique                | session-self-critique                                          |
| system | any   | source-evaluation-and-bibliography   | SOP: Source Evaluation & Annotated Bibliography (The Refinery) |
| system | any   | stranger-test-protocol               | SOP: Stranger Test Protocol                                    |
| system | any   | strategic-foresight-and-futures      | SOP: Strategic Foresight & Futures (The Telescope)             |
| system | any   | typological-hermeneutic-analysis     | SOP: Typological & Hermeneutic Analysis (The Archaeology)      |

Linked skills: evaluation-to-growth

**Prompting (Anthropic)**: context 200K tokens, format: XML tags, thinking: extended thinking (budget_tokens)

<!-- ORGANVM:AUTO:END -->

## ⚡ Conductor OS Integration

This repository is a managed component of the ORGANVM meta-workspace.

- **Orchestration:** Use `conductor patch` for system status and work queue.
- **Lifecycle:** Follow the `FRAME -> SHAPE -> BUILD -> PROVE` workflow.
- **Governance:** Promotions are managed via `conductor wip promote`.
- **Intelligence:** Conductor MCP tools are available for routing and mission synthesis.
