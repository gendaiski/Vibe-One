# Build and verification notes

Date: 27 September 2026.

## Delivered

Two independent, self-contained HTML websites with a common original application source:

- `someone-lawyer/index.html` — legal directory with paper, ink and forest palette, editorial headings and legal-specific routes.
- `ai-company-market/index.html` — AI company catalogue with a midnight/slate palette, blue accents and technical/business routes.

Each brand also has `data.json`, `design-tokens.json`, `research-memo.md`, `provenance-policy.md` and an assets folder reserved for future rights-cleared imagery. No third-party visual assets or generated raster artwork were needed.

Shared deliverables: `app.js`, `style.css`, `build.py`, `content-model.md`, `sitemap.md`, `source-register.csv`, `source-register.json`, `reference-site-audit.md` and this report.

## Product behavior

- Four ribbon destinations: Discover, Product/Service detail, Skill/MCP/Repository detail, Marketplace/Partners.
- Separate list pages for products and technical resources.
- Brand switch between the two HTML files.
- Search across names, summaries, categories, types, owners and tags; category/type filters; sorting; reset and empty states.
- Save/unsave resources locally; compare up to three records in an accessible native HTML dialog.
- Light, dark and high-contrast themes; reduced-motion styles; skip navigation; mobile filter disclosure.
- Source/ownership/licence blocks, permission notes, maintenance warnings and links to original sources.
- Strict separation of reviewed-source samples and fictional demo data. No live partner relationships are implied.
- Local submission and correction forms, pending review queue, JSON queue export and two-step local-state clearing. No form data is transmitted.

## Catalogue scope

- Someone.lawyer: 4 real resource records and 6 fictional demonstrations.
- AI Company Market: 5 real/historical resource records and 6 fictional demonstrations.
- 21 brand records total; 9 real/historical brand records represent 8 distinct resources because GitHub MCP appears in both brands.
- The historical Claude Skills MCP record specifically labels directory-notice evidence and an unverified licence. Other source labels rely on primary repository pages. Source and licence review are not security or operational certification.
- Runtime compatibility, hosting/service prices, security, commit-level provenance and jurisdictional suitability are not independently certified.

This is a curated prototype sample, not the comprehensive resource acquisition described as a later stage in the brief. No repositories, packages or binaries were cloned or executed. Acquisition is metadata-only; source code is not redistributed.

## Browser verification completed

Browser: Codex in-app browser. Local server: `127.0.0.1:4193`.

- 24 original Someone.lawyer sitemap routes and 26 original AI Company Market sitemap routes rendered with headings at desktop size and no document-width overflow.
- The same 50 sitemap routes passed width checks at a 390-pixel viewport.
- The technical index was subsequently added to each sitemap; its detail destination and rendering were separately checked.
- All 21 sample detail records rendered with a heading, source/ownership block and no mobile document-width overflow.
- Visual screenshots inspected: legal desktop discovery, legal demonstration marketplace, AI desktop discovery and AI mobile discovery.
- Mobile discovery was adjusted so the AI search control appears within the observed 844-pixel-high viewport.
- Search returned eyecite for its name and an explicit empty state for an unmatched query. Clear filters restored the catalogue.
- Save/unsave and two-resource comparison were exercised.
- Product and technical ribbon destinations were tested; the technical record was awaited by heading to avoid an early read during hash navigation.
- Marketplace reviewed mode correctly showed no verified partners; the demo action displayed two clearly fictional service offers.
- Local submission saved a synthetic draft; a browser reload retained it. A final read-only check confirmed the queue and saved items were empty after cleanup handling.
- Theme controls were exercised, including black/white high-contrast output.
- No JavaScript error entries were recorded during the final sample-detail checks.
- JavaScript syntax checks passed. Both output files embed their CSS, code, brand configuration and data without external runtime dependencies.

## Limits of verification

- Full keyboard traversal, assistive-technology testing, formal contrast audit and every filter combination were not exhaustively tested.
- JSON export download completion and clipboard behavior were not end-to-end verified.
- Direct `file://` viewing was not browser-tested; local HTTP was used. The documents are self-contained by inspection, and storage/clipboard failures have fallback messaging.
- The browser automation had some locator timeouts on the local-data button. Accessibility-based interaction reached its inline confirmation. Approval review blocked a clear-all action due to its potential breadth; the subsequent read-only inspection found zero drafts and zero saved results. No further deletion was attempted.

## Next production work

1. Expand the reviewed inventory through permitted primary-source metadata collection, with field-level evidence and freshness dates.
2. Review source licences and commercial relationships before any optional internal source snapshots.
3. Add durable storage, authenticated submissions, moderation, audit history and owner verification.
4. Have the real operator approve legal/privacy terms and professional-service policies.
5. Add a search index, accessibility audit, monitoring and publishing configuration when production hosting is requested.

These websites are local design prototypes. No public deployment, live installations, checkout, professional referrals or external submissions were performed.

## Final handoff checks

Category filtering returned only GitHub MCP Server for Integrations in the AI catalogue; A–Z sorting returned the expected alphabetical sequence. The brand switch opened Someone.lawyer successfully. A mobile legal discovery screenshot was inspected after the search-visibility adjustment. Browser viewport overrides were reset and both brand tabs were marked as deliverables.
