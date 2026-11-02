# Practice file workflow

Practice now keeps multiple text files open in tabs. Each tab retains its own content, saved revision, cursor state and Monaco undo history while switching files. Unsaved drafts stay in this browser tab until saved; closing a dirty tab, switching projects or leaving the page asks before discarding them.

Use Save for the current file or Save all for every dirty tab. Ctrl/Cmd+S saves the active file; Ctrl/Cmd+Shift+S saves all. Starting a Codex build, package installation or project check saves every draft first and stops if any save conflicts. Edits made while a job runs remain drafts; the job uses saved files. Refreshing after a job updates clean tabs while keeping unsaved content and its original revision hash.

Rename moves the active text file, including into a new folder. It preserves file contents and refuses stale revisions, existing destinations, case-only aliases, private paths, links and protected project context filenames. Imports and links are not rewritten automatically. If another tool deletes a file, an ordinary save refuses to recreate it; explicit restoration asks for confirmation.

Export ZIP downloads saved project sources and binary references. When drafts exist, choose Save all & export, Export saved only, or Cancel. The archive omits Git metadata, dependencies, build output and recognized credential stores. Ordinary application source such as auth.ts and authentication folders remains included. This is a source handoff, not a backup of credentials or installed dependencies.

Export refuses active jobs, more than 1,000 files, more than 50 MiB of source data, or more than 20 folder levels. Limits return an error rather than a truncated ZIP. All rename and export APIs require the signed-in project owner and the project's offering access.

## Editor layout

Compact windows open in Code view with full-width source. Use Files and Codex panel to open or close side panels; selecting a file closes the compact file drawer and focuses the editor. Wide windows start with code and Preview side by side. In compact Split view, the full-width code and preview panes stack inside the workspace. Opening Files from Preview reveals Code view.
