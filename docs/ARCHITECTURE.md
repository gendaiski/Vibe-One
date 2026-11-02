# Architecture

The public website, Workbench, Studio and Practice are served from `dist/`. A loopback Node service owns authentication, offering access and the build APIs. `lib/accounts.mjs` stores salted scrypt password hashes and SHA-256 session-token hashes. Session tokens expire after seven days, are held in tab session storage for hosted connections, and use an HttpOnly SameSite=Strict cookie for same-site local requests. Sign-out revokes the server session.

Authenticated requests enter `engine.withOwner(user.id, ...)`. Project lookup, file access, diffs, job history and cancellation enforce that owner context. Studio state lives in `.runtime/users/<user-id>/studio/`; selected attachment files are copied into that user's project context when a task is explicitly started. Input paths cannot traverse outside a project or access credential directories, `.git`, `.env` files or symbolic links.

Practice reads an editor revision hash and must submit that same hash when saving or deleting. A stale revision returns HTTP 409. Deletes retain a local recovery copy. File mutation is refused while an engine job is active. Codex jobs use the official CLI with workspace approval review and sanitized environment inheritance. Package installation disables lifecycle scripts. Check commands are explicit actions and report what actually ran.

Preview uses a separate loopback port. An authenticated request mints a random one-hour capability bound to a project and owner. The URL is `/p/<project>/<capability>/<file>`. Missing, expired or mismatched capabilities are rejected. Capabilities grant preview-file access, not account API access. Treat preview links as temporary private links; anyone who receives one can read that project's allowed preview files until expiry or restart. The preview applies a sandbox CSP and no-referrer policy.

The companion binds only to 127.0.0.1. Host and origin checks restrict requests to local URLs and the specific private hosted frontend. No wildcard CORS, API key storage, anonymous project listing, or public bootstrap secret is used. A hosted static frontend connects to this companion; it is not a deployed remote execution backend.

## Operational limits

Local accounts isolate application data, not the operating system. All builds use the host's Codex subscription and workstation permissions. Generated project scripts can execute when the owner explicitly runs checks. Do not expose this service on a public interface. A production multi-tenant platform needs isolated workers, per-user provider connections, quotas, cloud identity, entitlement webhooks, audit and backup policies.

The original design studio retains its existing browser-local exports/settings. Those are not cloud-synchronized account records. Keep original source copies available when reviewing historical features or design variants.

The root all-designs URLs redirect to their identical canonical brand index pages, preserving query and fragment state. This removes duplicate HTML bundles so the hosted static output fits the hosting size limit; original imported copies remain unchanged outside this repository.
