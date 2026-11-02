# Someone.lawyer + AI Company Market

Two original, self-contained HTML directory prototypes based on Documents 38, 38.1 and 38.2.

- `someone-lawyer/index.html`: editorial legal technology directory.
- `ai-company-market/index.html`: technical AI company resource catalogue.
- Each includes four view controls, independent branding, light/dark/high-contrast themes, reviewed-source and fictional-demo modes, search, filters, sort, detail views, source credit, comparison, saved items and a browser-local review queue.

Open either HTML file directly. All styling, code and catalogue data are embedded; the prototype does not need network access to render or navigate. External source links naturally require a connection. Browser clipboard and local storage may be restricted when opening files directly; graceful fallback messaging is included.

Optional local preview:

```powershell
python -m http.server 4193 --bind 127.0.0.1 --directory 'D:\Dropbox\AI Agents Office\Someone Lawyer and AI Company Market\output'
```

Then open http://127.0.0.1:4193/someone-lawyer/index.html or http://127.0.0.1:4193/ai-company-market/index.html.

Source editing: change `shared/style.css`, `shared/app.js` and the brand/data definitions in `shared/build.py`. Run the generator to refresh both standalone HTML files and JSON exports. No build is needed for viewing.

Research, data schema, route map, source register and verification notes live in `shared`. These are prototypes, not published services. Production needs reviewed content ingestion, full field-level evidence, identity/access control, live submissions, moderation, binding terms, privacy review and operational monitoring.
