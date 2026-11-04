# Agentic Atlas Q&A

Edition 02 expands the initial guide to **34 categories, 93 topics, and 320 answered questions**. Every topic contains **Basic, Intermediate, and Advanced** Q&A. The initial 100 question IDs are retained for stable links.

## Frontend design

The Agentic Atlas identity uses a dark category explorer, a quiet neutral canvas, a serif Q&A accent, connected-concept shortcuts, responsive search/filter controls, and readable answer cards. `frontend.css` is embedded into the standalone HTML by `build.py`; no remote fonts or scripts are required. Inside the Vibe One checkout, rebuilding also updates `dist/atlas/index.html`. With the platform running locally, open `http://127.0.0.1:4173/atlas/`.

## Use

Open [the standalone HTML document](qa-session-agentic-ai.html) in a browser, or read the [PDF](qa-session-agentic-ai.pdf). The HTML works offline without external scripts or fonts. It includes category and topic navigation, search, difficulty and provenance filters, collapsible answers, randomized practice, permanent question links, responsive layout, and print styling.

The original 72 visible question prompts came from the user-supplied bhavs.ai carousel. All answers are newly written. The carousel references a 223-question PDF that was not provided; this guide does not claim to reproduce its unseen content. The remaining 248 questions are labeled additions. Categories are a broad learning taxonomy, not a claim of exhaustive coverage of a changing field.

## Edit and rebuild

`questions.json` is the current content source. To render edits:

```sh
python build.py
```

To regenerate the expansion from the preserved first edition and curated additions:

```sh
python expand.py
python build.py
```

`expand.py` reads `questions-edition-01.json`, `level-expansion.txt`, and `expansion.txt`. Running it replaces `questions.json`; edit the appropriate source additions for persistent regeneration.

## Verification

The local browser check in `check.cjs` uses Playwright. Supply Playwright and a Chromium executable; the saved environment used `/usr/bin/chromium`. It checks source counts, all three levels in every topic, search, combined category/topic/level filters, expand/collapse, practice, empty state, stable deep links, mobile navigation, overflow, and script errors. It also exports the PDF and preview screenshots. Run `node check.cjs` after configuring the local browser dependency.

Primary implementation references and editorial notes are included at the end of the HTML/PDF. These are explanatory educational answers, not a live-verified vendor capability matrix or claims of the reader's personal work experience.
