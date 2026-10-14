import {execFileSync} from 'node:child_process';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
mkdirSync('.preview',{recursive:true});
writeFileSync('.preview/admin-entry.tsx',`import {createRoot} from 'react-dom/client';import Portal from '../app/admin-portal/admin';createRoot(document.getElementById('root')).render(<Portal/>);`);
execFileSync('npx',['--yes','--package=esbuild@0.28.2','esbuild','.preview/admin-entry.tsx','--bundle','--minify','--jsx=automatic','--alias:@='+process.cwd(),'--outfile=.preview/admin.js'],{stdio:'inherit'});
const css=readFileSync('.preview/admin.css','utf8'),js=readFileSync('.preview/admin.js','utf8').replace(/<\/script/gi,'<\\/script');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="referrer" content="no-referrer"><title>Ewket Kids · Admin Sign-in</title><style>body{margin:0}input,select{font:inherit;padding:12px;border-radius:10px;border:1px solid #bca4d2;margin:10px;max-width:100%}label{margin:12px 0}fieldset{border:1px solid #ddd4e5;padding:20px;border-radius:18px}${css}</style></head><body><noscript>This parent portal requires JavaScript. Public learning resources remain available on the main site.</noscript><div id="root"></div><script>${js}</script></body></html>`;
for(const f of ['admin.html','docs/admin.html'])writeFileSync(f,html);
