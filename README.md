
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key if you use the Gemini features
3. Run the app:
   `npm run dev`

## Build For Production

1. Build the site:
   `npm run build`
2. Preview the production output locally:
   `npm run preview`

## GitHub Pages Deployment

The app is set up to work from a GitHub Pages subpath by using a relative Vite base and base-aware local asset URLs.

1. Push this repository to GitHub.
2. In your repository settings, enable GitHub Pages from `GitHub Actions`.
3. Commit the workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml).
4. Push to `main` and GitHub Actions will build and publish the static `dist/` folder.

Note: the site still uses some remote image URLs. Those will load from the third-party hosts at runtime. If you want a fully self-contained deployment, download those images into `public/` and update the corresponding `src` or `backgroundImage` values.
