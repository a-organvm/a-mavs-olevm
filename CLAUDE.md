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

**Organ:** ORGAN-II (Art) | **Tier:** flagship | **Status:** GRADUATED
**Org:** `organvm-ii-poiesis` | **Repo:** `a-mavs-olevm`

### Edges
- **Produces** → `ORGAN-IV`: creative-artifact
- **Consumes** ← `ORGAN-I`: theory-artifact

### Siblings in Art
`core-engine`, `performance-sdk`, `example-generative-music`, `metasystem-master`, `example-choreographic-interface`, `showcase-portfolio`, `archive-past-works`, `case-studies-methodology`, `learning-resources`, `example-generative-visual`, `example-interactive-installation`, `example-ai-collaboration`, `docs`, `a-i-council--coliseum`, `.github` ... and 16 more

### Governance
- Consumes Theory (I) concepts, produces artifacts for Commerce (III).

*Last synced: 2026-05-23T00:26:31Z*

## Active Handoff Protocol

If `.conductor/active-handoff.md` exists, **READ IT FIRST** before doing any work.
It contains constraints, locked files, conventions, and completed work from the
originating agent. You MUST honor all constraints listed there.

If the handoff says "CROSS-VERIFICATION REQUIRED", your self-assessment will
NOT be trusted. A different agent will verify your output against these constraints.

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


## System Library

Plans: 269 indexed | Chains: 5 available | SOPs: 8 active
Discover: `organvm plans search <query>` | `organvm chains list` | `organvm sop lifecycle`
Library: `/Users/4jp/Code/organvm/praxis-perpetua/library`


## Active Directives

| Scope | Phase | Name | Description |
|-------|-------|------|-------------|
| system | any | atomic-clock | The Atomic Clock |
| system | any | execution-sequence | Execution Sequence |
| system | any | multi-agent-dispatch | Multi-Agent Dispatch |
| system | any | session-handoff-avalanche | Session Handoff Avalanche |
| system | any | system-loops | System Loops |
| system | any | prompting-standards | Prompting Standards |
| system | any | background-task-resilience | background-task-resilience |
| system | any | context-window-conservation | context-window-conservation |
| system | any | session-self-critique | session-self-critique |
| system | any | the-descent-protocol | the-descent-protocol |
| system | any | the-membrane-protocol | the-membrane-protocol |
| system | any | theory-to-concrete-gate | theory-to-concrete-gate |
| system | any | triangulation-protocol | triangulation-protocol |

Linked skills: SOP-TRIADIC-REVIEW-PROTOCOL, cicd-resilience-and-recovery, continuous-learning-agent, evaluation-to-growth, genesis-dna, multi-agent-workforce-planner, promotion-and-state-transitions, quality-gate-baseline-calibration, repo-onboarding-and-habitat-creation, session-self-critique, structural-integrity-audit, the-membrane-protocol, triple-reference


**Prompting (Anthropic)**: context 200K tokens, format: XML tags, thinking: extended thinking (budget_tokens)


## Atomization Pipeline

Run `organvm atoms pipeline --write && organvm atoms fanout --write` to generate task queue.


## System Density (auto-generated)

AMMOI: 25% | Edges: 0 | Tensions: 0 | Clusters: 0 | Adv: 27 | Events(24h): 37975
Structure: 8 organs / 148 repos / 1654 components (depth 17) | Inference: 0% | Organs: META-ORGANVM:63%, ORGAN-I:53%, ORGAN-II:48%, ORGAN-III:54% +5 more
Last pulse: 2026-05-23T00:26:28 | Δ24h: n/a | Δ7d: n/a


## Dialect Identity (Trivium)

**Dialect:** AESTHETIC_FORM | **Classical Parallel:** Music | **Translation Role:** The Poetry — proves formal structures have sensory form

Strongest translations: III (structural), V (analogical), VI (analogical)

Scan: `organvm trivium scan II <OTHER>` | Matrix: `organvm trivium matrix` | Synthesize: `organvm trivium synthesize`


## Logos Documentation Layer

**Status:** ACTIVE | **Symmetry:** 0.5 (DREAM)

Nature demands a documentation counterpart. This formation maintains its narrative record in `docs/logos/`.

### The Tetradic Counterpart
- **[Telos (Idealized Form)](../docs/logos/telos.md)** — The dream and theoretical grounding.
- **[Pragma (Concrete State)](../docs/logos/pragma.md)** — The honest account of what exists.
- **[Praxis (Remediation Plan)](../docs/logos/praxis.md)** — The attack vectors for evolution.
- **[Receptio (Reception)](../docs/logos/receptio.md)** — The account of the constructed polis.

### Alchemical I/O
- **[Source & Transmutation](../docs/logos/alchemical-io.md)** — Narrative of inputs, process, and returns.

- **[Public Essay](https://organvm-v-logos.github.io/public-process/)** — System-wide narrative entry.

*Compliance: Record exists without implementation.*

<!-- ORGANVM:AUTO:END -->


## ⚡ Conductor OS Integration

This repository is a managed component of the ORGANVM meta-workspace.

- **Orchestration:** Use `conductor patch` for system status and work queue.
- **Lifecycle:** Follow the `FRAME -> SHAPE -> BUILD -> PROVE` workflow.
- **Governance:** Promotions are managed via `conductor wip promote`.
- **Intelligence:** Conductor MCP tools are available for routing and mission synthesis.