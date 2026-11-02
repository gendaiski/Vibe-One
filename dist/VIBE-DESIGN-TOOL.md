# Vibe Coding Design Tool

Open index.html through the existing preview at http://127.0.0.1:4193/index.html.

## Design workflow

Choose a brand, variation and page. Use Design controls to tune accent, canvas, surface, typeface, card spacing, corner radius and type scale. Studio, Warm and Crisp supply starting points. Changes are CSS overlays applied to the preview; they do not rewrite the brand websites. Restore original and one-step Undo are available. Drafts are saved separately per brand and variation in browser-local storage.

Use Build brief to write a direction or select an element in the primary preview and add a contextual note. Export provides CSS, Markdown build briefs and draft JSON. JSON imports merge settings and notes with local work. The tool does not connect to or execute an AI model.

The interface uses embedded Geist fonts, a charcoal/green palette, consistent spacing and radius tokens, vector controls, visible loading states, keyboard-accessible controls and a mobile inspector layout. The existing desktop/mobile preview, comparison and focus controls remain.

## Build

Run node shared/build-vibe-tool.mjs after editing shared/vibe-tool.js or shared/vibe-tool.css. It writes the self-contained tool interface to shared/review-hub.html and index.html. The underlying merged brand HTMLs remain separate files.

Previous hub: shared/review-hub-before-vibe.html.

## Verification

Browser verified: live preset CSS applied within the website, selected-element selector capture, adding/removing a temporary note, CSS/Markdown generation, saved draft persistence after reload, restore/undo, separate drafts by brand, zero-radius export, preview load completion, and no horizontal overflow at desktop or 390px mobile width. Export download and JSON import handlers were syntax-checked but not exercised through a browser file transfer.
