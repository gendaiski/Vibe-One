# Merged brand websites

Each brand now has one HTML containing five designs, the full compressed catalogue index, embedded fonts, styles, application scripts and cached publisher icons. Uncached publisher images remain remote with vector fallbacks.

- Someone-Lawyer-All-Designs.html
- AI-Company-Market-All-Designs.html

Use the Design selector in the website header. It preserves the current page while changing design. The brand folders index.html files contain the same merged builds. Existing variation-01 through variation-05 pages remain available and were also refined. Before-merge entry pages are preserved under before-brand-merge/.

Build: node shared/build-variations.mjs (also rebuilds merged files).

Preview: http://127.0.0.1:4193/index.html

Verification: ten desktop catalogue landings, ten mobile resource details, header design switching with route preserved, and the hub iframe loading 537,221 listings. JavaScript and generated worker compile. Direct file-protocol browsing has not been independently browser-tested.
