# Hacking AI: The Security Risks Behind AI

Publication site for Mohammed Zuoriki's guest talk at the OWASP University of Exeter Student Chapter (2026/27).

Plain HTML, CSS and JavaScript. No build step, no framework, so it runs on GitHub Pages as-is.

## Structure

```
index.html                  Home
talk/index.html             The Talk (overview)
talk/why-it-matters/        Why It Matters
talk/mental-model/          The Mental Model
talk/threat-landscape/      Five Ways to Break an AI App
talk/defences/              How Defenders Fight Back
slides/                     Slides + PDF
gallery/                    Event photos
speaker/                    About the speaker
resources/                  Further resources
css/style.css               All styling (colours at the top)
js/main.js                  Dark mode, search, back-to-top
js/search-index.js          Search data
assets/                     Photos, slide images, PDF, favicon
```

## Preview locally

Double-click `index.html`, or for the most accurate preview run `python3 -m http.server` in this folder and open http://localhost:8000.

## Publish on GitHub Pages

Repo → Settings → Pages → Source: "Deploy from a branch" → Branch: `main`, folder `/ (root)` → Save.
