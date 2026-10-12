# Public learning site on GitHub Pages

The docs folder contains the self-contained public learning center.
In repository Settings > Pages, select Deploy from a branch, main, /docs, then Save.
The public address will be https://liyasamra.github.io/liya-and-family/.
This static edition includes lessons, practice, routine, reading log, and local backups. It does not include the separate private family-account server routes.
The complete Next.js application remains in app/ and lib/. The GitHub Pages HTML was bundled from app/learn/learning-center.tsx and its imported learning modules. Regenerate the docs bundle after updating those sources.
