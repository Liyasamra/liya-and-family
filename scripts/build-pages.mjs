import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, cpSync } from 'node:fs';
import { resolve } from 'node:path';
// Bundle the same public React learning center for either GitHub Pages source folder.
mkdirSync('.preview', {recursive:true});mkdirSync('docs',{recursive:true});
writeFileSync('.preview/entry.tsx',`import {createRoot} from 'react-dom/client';import LearningCenter from '../app/learn/learning-center';createRoot(document.getElementById('root')!).render(<LearningCenter/>);`);
writeFileSync('.preview/link.tsx',`import type {AnchorHTMLAttributes} from 'react';export default function Link({href,...props}:AnchorHTMLAttributes<HTMLAnchorElement>){return <a href={href==='/'?'#':href} {...props}/>;}`);
execFileSync('npx',['--yes','--package=esbuild@0.28.2','esbuild','.preview/entry.tsx','--bundle','--minify','--jsx=automatic','--alias:next/link='+resolve('.preview/link.tsx'),'--alias:@='+process.cwd(),'--outfile=.preview/bundle.js'],{stdio:'inherit'});
const js=readFileSync('.preview/bundle.js','utf8').replace(/<\/script/gi,'<\\/script');
const css=readFileSync('.preview/bundle.css','utf8');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Liya & Family — Free Learning</title><meta name="description" content="Free preschool through sixth-grade learning, separate local learner profiles, and printable parent reports."><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23675090'/%3E%3Ctext x='32' y='44' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3EL%3C/text%3E%3C/svg%3E"><style>body{margin:0}*{box-sizing:border-box}${css}</style></head><body><div id="root"></div><script>${js}</script></body></html>`;
for(const path of ['index.html','docs/index.html'])writeFileSync(path,html);
writeFileSync('.nojekyll','');writeFileSync('docs/.nojekyll','');
for(const target of ['community-kit','docs/community-kit'])cpSync('public/community-kit',target,{recursive:true});
console.log('Built matching root and docs public learning websites.');
