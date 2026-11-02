$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot
Write-Host 'Vibe One & Vibe Law: http://127.0.0.1:4173/'
Write-Host 'Account: http://127.0.0.1:4173/account/'
node server.mjs
