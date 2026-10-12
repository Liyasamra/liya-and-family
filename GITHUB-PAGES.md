# Public learning site on GitHub Pages

Live learning center: https://liyasamra.github.io/liya-and-family/

The root and docs folders contain identical bundled public learning websites, so either main /root or main /docs is supported as a Pages source.

After editing app/learn or the imported learning modules, run `npm run build:pages` and commit BOTH index.html and docs/index.html. The build script regenerates them together; never hand-edit only one generated copy.

Public learning includes 33 lessons, up to four local learner profiles, dated attempts and reading logs, weekly parent reports, and backups. It does not host the separate private family-account server routes.

The complete Next.js account foundation remains in app/ and lib/. See LEARNING-CENTER.md for local-storage migration and limitations.
