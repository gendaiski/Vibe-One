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
