# Vibe One & Vibe Law

Two distinct offerings on one platform. Vibe One serves general builders; Vibe Law serves legal technology builders. Their original website and design interfaces are retained. Workbench is the account and project area, Project Studio retains structured briefs and uploads, and Practice is the new coding space.

## Run

Requires Windows, Node.js 22+, Git, and the official Codex CLI (the desktop-bundled CLI is preferred when installed) signed in with `codex login`.

```powershell
./Start-Platform.ps1
```

Open http://127.0.0.1:4173/frontdoor/ and choose My Workbench. The original frontend remains at http://127.0.0.1:4173/. Create a local account, then open Practice, create a project, and start with a starter or a Codex task. Files are real local files; saving refreshes the static preview on port 4184. Run checks and review changes before using generated code.

The first account adopts the existing local Workbench projects. Subsequent accounts have independent projects. Account → Your offerings activates the other offering as a local trial. There is no checkout, payment collection, or paid subscription entitlement yet.

## Areas

| URL | Purpose |
| --- | --- |
| `/frontdoor/` | Additional frontend with Vibe One / Vibe Law switching and the shared account/project flow |
| `/` | Original Vibe One / Vibe Law website, product pages and design previews |
| `/account/` | Authenticated Workbench, briefs, playbooks, bookmarks, checklists, projects and builds |
| `/account/#account` | Offering access, default offering and sign-out |
| `/practice/` | Monaco tabs, retained drafts, rename/move, source ZIP export, Codex tasks, checks, diffs and previews |
| `/studio/index.html#/dashboard` | Original project studio: categories, briefs, uploads and design choices |
| `/design-studio.html` | Original complete design studio and export tools |

## Codex only

The engine prefers the installed desktop CLI and can use a fresh local model catalog to avoid a remote catalog startup delay. It leaves the global Codex configuration unchanged.

This version uses the computer owner's official signed-in Codex CLI subscription. It does not request or reuse subscription cookies. Claude and BYOK are disabled in both the build API and the active interfaces. Local accounts separate stored project data; they do not provision separate Codex billing accounts or OS sandboxes. This is a trusted local workstation application, not a public multi-tenant code execution service.

The private hosted website is a frontend. Actual builds require this companion running locally. Browser private-network restrictions may require opening the local website instead. The hosted frontend does not execute the Node service or store your local projects in the cloud.

## Data and source

- `.runtime/` contains password hashes, hashed sessions, project metadata, studio uploads, job logs and deleted-text recovery copies. It is ignored by Git.
- Generated project directories default to the sibling `vibe-projects/`, outside this repository. Each has its own Git repository and context files.
- The original imported projects remain unchanged in `../projects/` and the standalone Workbench in `../vibe-workbench/`.
- `dist/vendor/monaco/` is self-hosted Monaco 0.52.2, including its MIT license.
- No benchmark Playground application code is copied into the new Practice implementation.

See [engineering study](docs/ENGINEERING-STUDY.md) and [architecture](docs/ARCHITECTURE.md) for the benchmark and remaining work.

## Development

```powershell
npm ci
npm run vendor
npm run check
npm test
```

Tests use isolated ignored directories, not your actual account database. Keep `.runtime/`, credentials, uploads, generated user projects, and temporary test output out of commits. The user-designated source repository is `gendaiski/Vibe-One`.

See [Practice file workflow](docs/PRACTICE-FILES.md) for draft handling, safe rename and export limits.

## Local admin entry

On this computer, use Admin access with the user-requested passkey `12345`; no email registration is required. It opens the existing owner workspace and both local trial offerings. The admin endpoint requires a loopback connection, matching local Origin and same-origin browser request. Hosted pages link to local admin entry; they cannot invoke the passkey endpoint. Regular email accounts remain optional.


## Guest demo checkout — 2026-11-02

The public Workbench now links to /plans/ and /checkout/. Guests choose Vibe One or Vibe Law and a monthly Creator or Team draft plan. Team checkout supports 3–50 seats. Admin Pay uses demo passkey 12345 and creates a browser-tab receipt only; there is no payment gateway, charge, paid entitlement, or owner access. Receipts survive reload within the tab when sessionStorage is available. Prices are recomputed from the validated offering/plan, never query totals. The same commerce sources are mirrored into the original public Workbench Site. The integrated platform keeps its existing private audience.

Validation: 45 JS syntax checks and 10 backend tests passed. Edge acceptance covered public entry, edition/plan selection, team totals/bounds, wrong/right passkey, receipt reload, query tampering, and mobile overflow at 390/768/1440px.

The public Workbench main entrance has a centered Vibe wordmark and eight quick-access links. Its original app is retained at /workbench.html. The integrated project retains its original root interface and includes the reusable entrance at /entrance/. No raster artwork was created.


## Brand entrance refresh
The entrance now gives Vibe One and Vibe Law primary logo-led choices, with eight compact shortcuts and separate offering hubs. Edition is preserved in workbench/checkout links; the last visited space is remembered when local storage is available. Original apps remain available. Editable SVG logos are stored in dist/brand.


## Original-interface flow and entrance variations
Vibe One and Vibe Law entrance choices now open the original offering websites. The public copy uses website.html, preserves the original templates and sample design runtimes, and deduplicates unchanged embedded font/image/runtime payloads. Brief submission explicitly hands the idea to the matching browser Workbench draft; separate offering keys preserve existing One drafts. Workbench, pricing, checkout, receipt, and return links preserve edition. Paid checkout remains a simulation. Canonical platform links preserve edition through account access and Practice.

The entrance has three selectable designs (Atelier, Command, Editorial), compact icon shortcuts, and a separated balancing-scales V1 Law mark. Motion supports pause, deterministic t=N preview and reduced-motion preferences. Desktop/mobile end-to-end checks cover both original websites, brief handoff, pricing, demo receipt and return, all three designs and the original sample runtime.

Build-flow audit: public legacy pairing was incompatible with the current authenticated companion. Public Build now explicitly hands the brief to the local account using a URL fragment. Local admin authentication stays loopback-only. Drafts and project creation preserve the selected offering, with migration of prior account state. Vibe One uses one V and a styled 1; Law uses a V supporting animated scales without a numeral.
