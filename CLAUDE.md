# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal site for Greg Stewart / Teacup In A Storm Ltd (`tcias.co.uk`). A single-page site with no build step, no dependencies, and no framework — everything lives in `index.html`.

## Local development

Open `index.html` directly in a browser. No server or install step required.

Optional dev server:
```bash
npx serve .
# or
python3 -m http.server 8080
```

## Architecture

The entire site is one file: `index.html`. It contains:
- All CSS in a single `<style>` block using CSS custom properties (design tokens at the top of `:root`)
- All HTML markup
- A small `<script>` at the bottom wiring up an `IntersectionObserver` for scroll-reveal (`.reveal` → `.visible`)

Design tokens (defined in `:root`): `--ink`, `--ink-mid`, `--ink-muted`, `--ink-faint`, `--paper`, `--paper-warm`, `--paper-card`, `--accent`, `--accent-light`, `--accent-mid`, `--rule`, `--rule-strong`, `--serif`, `--sans`, `--max`.

Sections in order: nav → hero → `#services` → `#experience` → `#strengths` → `#philosophy` → `#earlier` → `#contact` → footer.

## Deployment

GitHub Actions deploys automatically on push to `main` via `.github/workflows/deploy.yml`. The pipeline:
1. Syncs all files to S3 (excluding `.git`, `.github`, `README*`, `CLAUDE.md`) with `--delete` and `max-age=86400`
2. Overwrites `index.html` with `no-cache, no-store, must-revalidate` headers
3. Optionally invalidates a CloudFront distribution if `CLOUDFRONT_DISTRIBUTION_ID` is set

Required GitHub Actions secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_DEFAULT_REGION`, `S3_BUCKET_NAME`. `CLOUDFRONT_DISTRIBUTION_ID` is optional.
