# Antara Gavkar — Portfolio

A static, GitHub Pages-ready personal portfolio for **Antara Sushil Gavkar** / **Antara Gavkar**, a 3rd Year B.E. Computer Engineering student at Vidyalankar Institute of Technology, Mumbai.

## Run locally

Because this is a static site, any local HTTP server works:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to GitHub Pages

1. Push the contents of this folder to the repository's `main` branch.
2. Open **Settings → Pages**.
3. Choose **Deploy from a branch → main → root**.
4. Save. The site uses relative asset paths and hash navigation, so it works at both a user Pages URL and a repository Pages URL.

## Replace placeholders

- Add the verified profile image at `assets/profile/profile.jpg` and update the hero art if desired.
- Add verified project screenshots under `assets/projects/` and update `projectArt()` in `js/script.js` if you want to replace the built-in editorial visuals.
- Add verified course names and certificate files under `assets/certificates/` and update `certificateData` in `js/script.js`.
- Replace the placeholder GitHub, LinkedIn, project and live-demo actions with verified URLs only.
- Replace `assets/resume.pdf` with the final resume when ready.

No backend or database is used. The contact form validates in the browser and opens a `mailto:` link.
