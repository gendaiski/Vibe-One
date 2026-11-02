# Reference audit and rebuild — 27 September 2026

## Deliverables
Five standalone HTML variations for each brand, ten total. The first four reference directions are retained; AI Templates is variation 05. Someone.lawyer remains a legal technology platform. Open ../index.html to compare them. Original HTML and previous-round copies are preserved.

## Reference coverage
| Variation | Public reference | Page families inspected |
|---|---|---|
| 01 | https://claudemarketplaces.com/ | Home, Skills, MCP, Marketplaces, Digest, Tools, Advertise, login entry, skill detail, repository detail, About |
| 02 | https://claudeskills.info/mcp/ | MCP directory, Skills, Plugins, Harness, Newsletter, Advertise, plugin and skill detail, categories, About; Learn and More menus |
| 03 | https://mcpmarket.com/tools/skills | Home, Hub, Sell, skill categories, all skills, paid and free skill details, leaderboard, skill introduction and install guide; both mega menus |
| 04 | https://www.claudemarketplace.net/mcp/claude-skills-mcp | Home, Skills, MCP, Marketplace, Digest, Blog, Learn, Advertise, Search, Submit, About, Contact, Terms, Privacy, Cookies, DMCA and resource detail |
| 05 | https://www.aitmpl.com/ | Component directory, sidebar, skill detail, Code/Preview/Slides, file tree, terminal animation; public dashboard component source |

## Implementation
Headers and dropdown destinations, footers, directory layouts, landing sections, resource metadata sidebars, install panels, guide/newsletter/advertising/hub pages. Each variation shares the brand catalogue while retaining a separate visual direction.

Variation 05 includes a collapsible/mobile sidebar, command search, stack builder, dark theme, code viewer, file tree, search with next-match navigation, clipboard copy, expanded viewer, rendered document and four-slide presentation. Installation terminal types progressively and supports pause, resume and replay. It is illustrative and executes no commands.

Code viewer records are directory-authored metadata, not full upstream repository files. Source-reviewed listings and fictional demos remain clearly distinguished. Some resource categories have no sample records.

## Verification
- All ten generated scripts compile.
- Browser route sweep: 590 destinations (58 per Someone.lawyer variation and 60 per AI Company Market variation). Every destination returned a heading and none returned the missing-page view.
- Ten landing pages and forty product/skill/MCP/repository details rendered at desktop size without horizontal document overflow.
- Twenty home/MCP pages checked at 390px viewport width: no horizontal document overflow.
- Visual screenshots inspected for all five directions plus the mobile code viewer.
- Interactions checked: Code/Preview/Slides; slide advances to 2/4; file switch; search reports three matching source lines; next-match; Copy returns Copied; expand; terminal completion, replay, pause/resume; global search; theme; collapsed sidebar; expanded header menu; sidebar route navigation; mobile navigation state and file-tree visibility.
- Found and fixed missing saved counter, correction-route binding, mobile file-tree styling, editor event bubbling and comparison-hub CSS errors. Final code-viewer tests passed after the fix.
- Browser automation initially timed out on clicks/screenshots; it later recovered. Earlier error logs are retained by the browser but correspond to the now-corrected editor build.

## Source attribution
AI Templates public source: https://github.com/davila7/claude-code-templates at fcf666b91254b62deca81136bf459fc4f6ed3030. MIT attribution and licence retained in THIRD-PARTY-NOTICES.txt. Geist and Geist Mono fonts embedded for offline use; SIL OFL licences in shared/fonts. No downloaded reference application was executed.

## Remaining fidelity limits
This is a deeper reference-matched prototype revision, not proof that every source page is pixel-identical. Branding, catalogue content, figures, legal copy and source-file content differ intentionally; all third-party catalogue records were not replicated. The audit covered public page families, not every individual URL or authenticated screen. Some secondary pages use brand-specific layouts and sample content. Paid flows, login, newsletter and installation remain local previews. No backend, payment, account or production deployment is included.

Automatic approval review rejected a reference login redirect to Google Accounts because that account access was outside the public-site audit. The Google sign-in screen was left uninspected; no account actions were performed.
