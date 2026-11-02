# Additional frontend acceptance

Verified on 2026-11-02 against the running local platform at `http://127.0.0.1:4173/frontdoor/`, using headless Microsoft Edge through Playwright. The original frontend at `/` remains available.

## Result

The additional frontend passed the checks below after correcting a small navigation-panel overflow at 360 pixels. No JavaScript errors were observed in the final runs.

| Check | Result |
| --- | --- |
| Viewport widths 360, 390, 768 and 1440 pixels | Passed; no horizontal page or opened-menu overflow |
| Vibe One / Vibe Law controls operated with keyboard Enter | Passed |
| Offering-specific heading, document title and URL query | Passed |
| Selected offering survives reload | Passed |
| Browser Back / Forward restores the previous offering | Passed |
| All top-level and nested navigation panels | Passed layout and interaction checks |
| Account, Practice, Project Studio, Design Studio and original-frontend links | Present with valid platform destinations |
| Form input labels | Present |
| Light / dark theme and reload persistence | Passed |
| Law selection carried into registration | Passed |
| Sign-in modal blocks background control focus | Passed |
| Escape cancels public-page sign-in and re-enables the idea form | Passed |
| Invalid offering query falls back to Vibe One | Passed |
| New accounts created during this frontend review | None |

## Source and product review

The new interface retains the existing Vibe identity through shared embedded fonts, an editorial heading style, restrained offering colors, stroked vector icons and multilevel navigation. Vibe One and Vibe Law remain distinct offerings within one platform rather than separate applications.

The idea form uses the shared account API, checks access to the selected offering and creates a real project before opening Practice. Creating the project does not automatically start a build. The interface explains that this release has free local trial access, no active checkout, Codex-only execution and a required local companion. It links back to the original frontend and existing studio interfaces.

Public sign-in uses the shared native modal dialog. Edge can move keyboard focus into its browser chrome at a tab boundary, but background page controls remain unfocusable while the dialog is modal. Cancelling the public flow restores the form instead of leaving it disabled.

This review covers the additional frontend and its shared sign-in entry. The separate engine and original Studio build checks are recorded in `VERIFICATION.md`.
