# Shared content model

Both self-contained HTML files embed the same application and separate brand configuration and records. `data.json` is an editable handoff/export copy; run `python shared/build.py` from any working directory after editing source records in that generator to regenerate the embedded data.

## Listing

Identity: `id`, `name`, `type`, `category`, `tags`, `mark`, `order`.

Editorial: `summary`, `description`, `capabilities`, `demo`.

Provenance: `source`, `docs`, `owner`, `ownership`, `source_status`, `license`, `licenseUrl`, `last_verified_at`, `source_version_or_commit`.

Review: `commercial`, `status`, `maintenanceNote`, `runtime`, `compatibility`, `risk`, `security_review_status`, `acquisition_status`, `execution_status`.

`demo=true` is a strict separate catalogue mode. Demo resources have no real source or commercial availability. The historical MCP entry has directory-notice evidence rather than a primary-page review.

## Brand

Separate name, logo text, tagline, opening copy, taxonomy, disclaimer, supplementary routes and default theme. Brand switching navigates between independent HTML entry files.

## Browser-local state

- Saved IDs: `<brand-id>-saved`.
- Review drafts: `<brand-id>-drafts`.
- Filters, sort and comparison: current page session only.
- Submissions: name, type, source, relationship, notes, generated ID, time, brand and `pending_review` status.

No network submission, account, checkout, installation or server data mutation exists. Queue export creates a JSON file for a future editorial process. User text is escaped before rendering. Only HTTP(S) source URLs are accepted from submissions.

## Production migration

Normalize brands, listings, listing versions, categories, tags, maintainers, source evidence, licences, commercial relationships, compatibility, permission assessments, submissions and review decisions. Record read/write/network/shell flags and ACLs as explicit evidence-backed fields. Commit references must be immutable when snapshots are acquired. A local draft must never become published solely because it was saved here.
