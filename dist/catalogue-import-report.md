# Catalogue import and interface upgrade

Updated: 2026-09-27

Five variations for each of Someone.lawyer and AI Company Market now share a public catalogue snapshot. Original versions are preserved in before-catalogue-import and original-design.html.

## Source coverage

| Directory | Indexed listings | Richer metadata | Index only |
|---|---:|---:|---:|
| Claude Code Marketplaces | 43,298 | 3,003 | 40,295 |
| Claude Skills Hub | 69,630 | 967 | 68,663 |
| MCP Market | 418,793 | 807 | 417,986 |
| Claude Code Marketplace | 5,500 | 5,500 | 0 |
| Total | 537,221 | 10,277 | 526,944 |

Sources: https://claudemarketplaces.com/ , https://claudeskills.info/ , https://mcpmarket.com/ , https://www.claudemarketplace.net/ . AI Templates (https://www.aitmpl.com/) remains the fifth visual reference; its catalogue is not part of the four-source import.

All qualifying record URLs from the retrieved public sitemaps are retained, plus successful public feed additions and curated products. Duplicate resources across directories remain separate with provenance. Counts describe this snapshot, not independently verified current active inventory. Index-only titles are derived from listing URL slugs. Package source files have not been downloaded; the editor displays directory-authored metadata and documentation previews.

MCP Market returned HTTP 429 during metadata enrichment. Requests stopped; its public sitemap index is retained. Rich metadata is incomplete for the first three sources. The fourth source has metadata for all 5,500 imported records.

## Changes

- Searchable and paginated landing-page catalogue in all ten variations; 24 results per page. Web Worker keeps the large index off the main UI thread.
- Source and type filters, direct imported detail links, saved resources, comparison and global search.
- Three-level sidebar with inline vector icons, desktop collapse, mobile drawer and narrow scrollbar.
- Code/Preview/Slides workbench, file tree, code search/copy/expand and replayable installation animation on landing and detail pages. Animation executes no commands.
- Publisher image references for 10,258 listings. 72 unique images are packaged locally, including all 69 unique images linked to source-marked official entries and seed publisher images. All 72 cached files were SHA-256 verified. Other images remain remote with vector fallbacks. Publisher avatars are not necessarily official product logos; source official flags are preserved rather than independently certified.
- Review hub includes coverage links. No external publishing, account connection, live installation or checkout was performed.

## Validation

- All ten generated scripts compile.
- 17 automated catalogue checks passed: totals, source/type filters, final page access, direct lookup, query matching, saved lookup, empty and invalid results. See shared/catalogue/validation.json.
- All ten landing pages checked at desktop and 390px mobile widths with sidebar, code viewer and terminal present; final stable checks showed no horizontal overflow.
- All ten imported detail pages checked at desktop 1440px and mobile 390px widths; no horizontal overflow.
- Browser interactions verified: source filtering, search, pagination, direct detail navigation, nested sidebar, mobile drawer, editor Code/Slides, copy, terminal replay/pause, and landing file-tree expansion.
- Publisher images loaded in browser; cache report records source URLs and hashes. All catalogue entries were checked structurally, not visually one by one.

## Local preview

http://127.0.0.1:4193/index.html

Keep the output folder together: HTML pages rely on shared/catalogue-worker.js and shared/catalogue/*.json. Serve through localhost rather than opening file URLs. Rebuild HTML using node output/shared/build-variations.mjs. Cached source import inputs and normalization scripts are preserved under reference-sources. Imported IDs use source and row position in this snapshot; future imports may change those IDs.
