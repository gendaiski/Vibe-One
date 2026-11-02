# Verification — 2026-11-02

- Backend suite: 10 tests passed. Covers password/session hashing, independent offering activation, logout, owner-scoped file/job access, traversal rejection, optimistic save conflicts, deletion recovery, verification and Codex-only invocation.
- Syntax: 44 JavaScript files checked successfully, excluding vendored dependencies.
- Browser acceptance: Chromium through installed Microsoft Edge. Account signup, Practice starter creation, Monaco loading/language worker, editor save, preview refresh and interaction, explicit project checks, second-account denial, Studio dashboard and the original Vibe Law frontend passed with no JavaScript errors.
- Real Codex build: project `codex-integrated-smoke-test-8f5af784`, job `6a24aeff-71ee-40a0-8150-21b9bd5f4b9c`. Codex changed index.html heading/title, changed app.js button behavior, updated TASKS.md and passed node --check. The engine reported completed and a separate project verification also completed.
- Studio bridge: project `studio-linked-codex-test-1643c64d`, job `f63659c0-8cbb-4b5b-b9b9-4900c571872a`. A structured Studio brief and uploaded text reference created a real Codex project; the generated page used the reference heading, and Studio history updated to complete.
- Additional frontend: independent implementation and review agents verified Vibe One/Law switching, URL/history/reload persistence, menus, links, dark theme, registration intent and modal focus/cancel behavior at 360/390/768/1440px, with no JavaScript errors or horizontal overflow. See FRONTEND-ACCEPTANCE.md.
- The original global CLI initially stalled. The working integration prefers the installed desktop-bundled CLI, uses a current local model catalog where available, pipes and closes stdin, and keeps CLI logs separate. Global Codex settings were not edited.
- Test identities and generated test projects use isolated work directories. They are not shipped in the account database or committed to source control.

This verifies a local-first integration. It does not certify public multi-tenant hosting, billing, backend development servers, or every historical design export. The hosted website still needs the local companion for builds.

## Practice file milestone

- Multi-tab draft retention, Save all, Unicode rename/move, real ZIP download and stale-save draft retention passed in the isolated browser companion, with no JavaScript errors.
- Python standard zipfile independently verified the downloaded archive CRCs and source contents.
- Focused UI checks passed dirty-tab close/cancel, tab keyboard navigation, save-all before a build request (model execution intercepted to avoid unnecessary usage), export cancellation/saved-only, before-unload warnings and 360px layout.
- New backend regressions cover deleted-file restoration, Windows path aliases, owner boundaries, no-overwrite rename, ZIP source/binary preservation, credential exclusions, active jobs and explicit export limits.

## Local admin entry

Admin passkey entry was verified in an isolated browser: wrong key rejected, `12345` opens the owner workspace with both offerings, and hosted/cross-site/originless requests are denied. Existing owner identity and session revocation are covered by the added account test.

## Editor layout correction

Read-only browser checks against the selected task demo verified visible index.html content and usable editor dimensions at 390, 800, 1000, 1200 and 1440 pixels, without horizontal overflow or JavaScript errors. File selection, Preview-to-code navigation and drawer collapse on compact resizing passed. The full 10-test regression suite and 44-file syntax check passed.
