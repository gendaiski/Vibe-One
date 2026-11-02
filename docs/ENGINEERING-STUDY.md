# Engineering study and integration decisions

Study date: 2026-11-01. This document describes the local source snapshots; benchmark deployment status is historical unless explicitly rechecked.

## Vibe One and Vibe Law

The retrieved folders are independent verified copies of the same original platform implementation. They represent distinct offerings, not two unrelated applications. The website selects its offering with `edition=one` or `edition=law`. The original `output/runtime/home.js`, `product-pages.js`, and `product-polish.js` implement the shared website, multilevel navigation, product pages and edition-specific copy. `output/design-studio.html` and the two all-designs documents retain the original design directions and exports.

The original `workspace-server.mjs` persists projects, nested categories, drafts, uploaded files and model runs. Its `/api/run` previously sent briefs to an API endpoint; it did not implement a local coding-agent lifecycle. Its bootstrap token protected a single workstation workspace rather than separate user accounts. The new `lib/studio.mjs` retains the data operations but delegates execution to the shared Codex engine, scoped to the signed-in user. Studio run records link to the real engine project and job rather than claiming an asynchronous build has finished.

Vibe One and Law retain separate account access flags and project edition metadata. Access currently means a free local trial. Original pricing pages remain product proposals; there is no active paid checkout. A production billing provider must set verified entitlements before those can become paid subscriptions.

## Playground benchmark

Reference repository: `gendaiski/Vibe-Coding-Playground`, branch `claude/install-vibecode`, retrieved commit `6af9888518ee6c8b78541718ab5fe57b8d509218`. The repository's `HANDOFF.md` provides a more accurate implementation map than the generic README. Relevant sources include:

- `app/playground/[id]/page.tsx`: editor/chat/preview layout and file application.
- `features/vibe/components/vibe-chat-panel.tsx`: task streaming and browser chat history.
- `features/vibe/lib/parse-vibe.ts` and `tree.ts`: tagged response parsing and file tree changes.
- `app/api/vibe/route.ts` and `lib/ai.ts`: model invocation and project context assembly.
- `features/webcontainers/`: browser runtime, terminal and preview lifecycle.
- `features/playground/actions/`: persistent playground operations.
- `auth.ts`, `middleware.ts`, `app/auto-login/route.ts`: identity and optional shared demo account.

The benchmark is a Next.js/React application with Monaco, WebContainers, xterm, Prisma, OAuth, chat, voice input, multiple framework templates, and model-generated file changes. Its handoff documents a shared demo user when demo auto-login is enabled and an AI Gateway billing blocker at the time of that handoff. Those historical notes are not a claim about its current live deployment.

## Workbench

The standalone Workbench combines playbooks, source attribution, UX glossary, bookmarks, project briefs and a real local coding engine. `lib/engine.mjs` provides Git initialization, context files, agent processes, durable logs, cancellation, file guards, package installation, explicit checks and static previews. The integrated Workbench retains that interface and library while requiring account authentication and limiting the active provider to Codex.

## Benchmark matrix

| Capability | Benchmark | Integrated platform |
| --- | --- | --- |
| Code editor | Monaco | Self-hosted Monaco, retained draft tabs, save conflicts, safe rename/move and source ZIP export |
| Chat-driven changes | Streams structured model text, client applies files | Official Codex CLI edits actual project files; durable events and cancellation |
| Identity | OAuth and optional shared demo mode | Separate local password accounts; no automatic shared login |
| Offering boundaries | Generic playground | Vibe One / Vibe Law access and project metadata |
| Runtime | Browser WebContainers and terminal | Local Codex + explicit package/check commands; static preview |
| File storage | Database file trees, browser runtime FS | Real local project directories and Git repositories |
| Review | Editor and model summaries | File inspection, Git diff, explicit check results, run history |
| Writing conflicts | Client applies generated files | Hash-checked saves; editing locked during active jobs |
| Reference workflow | Project files in model context | Original Studio drafts, selected attachments, categories and design tools |
| Privacy | Depends on deployed demo/auth configuration | Owner-scoped API reads/writes/jobs; project-specific expiring preview capabilities |
| Voice | Web Speech API | Web Speech API where the browser supports it |
| Framework templates | Seven wired templates | Two dependency-free starters or blank project; Codex can scaffold others |
| Inline AI completion | Ollama suggestion path | Not implemented in this Codex-only version |
| Arbitrary backend dev server | WebContainers | Not implemented; checks may build static output |
| Public SaaS / billing | Hosted benchmark infrastructure | Local-first private trial, no paid checkout or cloud execution |

The target is to exceed the benchmark through a complete, verifiable building workflow. This first integration improves the local Codex, ownership, context and review paths. It does not claim full parity with browser containers, OAuth, inline completion, or an interactive terminal. Those remain explicit roadmap items.

## Next engineering milestones

1. Add project-scoped OS execution isolation before supporting untrusted public accounts.
2. Connect real cloud identity and payment entitlements; migrate local trial access intentionally.
3. Add supervised framework development servers with authenticated proxying, lifecycle controls and resource limits.
4. Expand the starter library with tested framework projects. Multi-file draft tabs, rename/move and project export are implemented; see PRACTICE-FILES.md.
5. Add inline completion and collaboration only with a clearly supported provider and ownership model.

Original frontends and imported reference assets are preserved. Practice is an independent implementation, not a copied deployment of the benchmark.
