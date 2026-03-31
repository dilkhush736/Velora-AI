$ErrorActionPreference = 'Stop'

$repoRoot = Resolve-Path (Join-Path $PSScriptRoot '..')
Set-Location $repoRoot

# Stop early so `git add .` only captures the changes created by this script.
if (git status --porcelain) {
  throw 'The working tree must be clean before running batch-progress-updates.ps1.'
}

$progressDir = Join-Path $repoRoot 'docs\progress'
$ledgerPath = Join-Path $progressDir 'updates.md'

if (-not (Test-Path $progressDir)) {
  New-Item -ItemType Directory -Path $progressDir | Out-Null
}

if (-not (Test-Path $ledgerPath)) {
  @(
    '# Progress Updates'
    ''
    'This file records 100 intentionally small, repo-safe documentation updates.'
    ''
  ) | Set-Content -Path $ledgerPath -Encoding utf8
}

# Keep the batch limited to documentation so the app behavior stays unchanged.
$areas = @(
  'client app shell'
  'client auth flow'
  'chat composer'
  'chat header'
  'chat message renderer'
  'empty state'
  'sidebar interactions'
  'auth context'
  'API client setup'
  'format helpers'
  'server bootstrap'
  'Express app wiring'
  'database connection'
  'auth controller'
  'chat controller'
  'auth middleware'
  'error middleware'
  'chat model'
  'user model'
  'auth routes'
  'chat routes'
  'assistant service'
  'demo assistant'
  'local knowledge service'
  'math assistant'
  'OpenAI service'
  'async utilities'
  'token generation'
  'README setup steps'
  'environment examples'
  'build outputs'
  'development scripts'
  'Vite proxy behavior'
  'JWT token lifecycle'
  'Mongo persistence'
  'Markdown rendering'
  'syntax highlighting'
  'mobile layout'
  'desktop layout'
  'loading states'
  'error handling'
  'request validation'
  'response formatting'
  'session recovery'
  'route protection'
  'chat history loading'
  'message persistence'
  'AI fallback handling'
  'logout behavior'
  'signup flow'
  'login flow'
  'form feedback'
  'placeholder copy'
  'component naming'
  'folder structure'
  'API route surface'
  'deployment assumptions'
  'local demo mode'
  'history sidebar'
  'chat deletion flow'
  'new chat creation'
  'message submit path'
  'copy button behavior'
  'scroll behavior'
  'environment variable usage'
  'port configuration'
  'client entry point'
  'server entry point'
  'Mongoose models'
  'React pages'
  'shared utilities'
  'documentation tone'
  'setup clarity'
  'runbook details'
  'debug logs hygiene'
  'production build notes'
  'package scripts'
  'dependency boundaries'
  'frontend state flow'
  'backend service boundaries'
  'error messages'
  'API fallback paths'
  'response timing notes'
  'prompt handling'
  'request auth headers'
  'client routing'
  'server routing'
  'modular file layout'
  'project overview'
  'feature list'
  'testing gaps'
  'maintenance checklist'
  'future backlog'
  'troubleshooting notes'
  'developer onboarding'
  'release notes'
  'repo hygiene'
  'safe commit cadence'
  'change log structure'
  'documentation coverage'
)

if ($areas.Count -ne 100) {
  throw "Expected 100 update areas, found $($areas.Count)."
}

$existingCount = 0

if (Test-Path $ledgerPath) {
  $existingCount = (Select-String -Path $ledgerPath -Pattern '^- Update \d{3}:' | Measure-Object).Count
}

if ($existingCount -ge $areas.Count) {
  Write-Host 'No pending updates. The ledger already contains 100 entries.'
  exit 0
}

for ($i = $existingCount; $i -lt $areas.Count; $i++) {
  $updateNumber = $i + 1
  $line = "- Update {0:D3}: Recorded a small progress note about the {1}." -f $updateNumber, $areas[$i]

  Add-Content -Path $ledgerPath -Value $line -Encoding utf8
  Write-Host ("Applying update {0:D3}/100" -f $updateNumber)

  git add .
  git commit -m ("docs: add progress update {0:D3}" -f $updateNumber)
  git push origin main
}

Write-Host 'Completed 100 small updates.'
