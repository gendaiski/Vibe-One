# Sitemap

All navigation uses hash routes, allowing each index.html to work directly from disk without a server rewrite or build tool.

## Four primary views

1. `#/discover` — search, category/type filters, sorting, save, compare.
2. `#/product/{id}` — product/service detail. The ribbon selects a representative record in the active data mode; `#/products` is the complete product list.
3. `#/repository/{id}` — technical detail. The ribbon selects a representative technical record; `#/technical` is the complete technical list. `skill`, `mcp`, `plugin` and `item` detail aliases are supported.
4. `#/marketplace` — partner disclosure, offers or an honest empty state, comparison.

## Shared pages

`categories`, `category/{name}`, `products`, `skills`, `mcp-servers`, `plugins`, `repositories`, `partners`, `marketplace`, `submit`, `report/{id}`, `about`, `how-listings-work`, `provenance-and-licences`, `security-and-installation-safety`, `terms`, `privacy`, `contact`, `saved`, `review`, `sitemap`.

## Someone.lawyer

`legal-disclaimer`, `find-a-professional`, `jurisdictions`, `legal-workflows`.

No professionals are invented as verified practitioners. The professional-discovery page explains the current empty onboarding status.

## AI Company Market

`ai-company-packages`, `agents`, `workflows`, `integrations`, `company-brain`, `mcp-safety`.

Routes with no reviewed records show an empty state. Fictional records can be explored explicitly through the data-mode switch.
