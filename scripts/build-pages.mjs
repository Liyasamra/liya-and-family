import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readFileSync, cpSync, rmSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
// Bundle the same public React learning center for either GitHub Pages source folder.
mkdirSync('.preview', {recursive:true});mkdirSync('docs',{recursive:true});
// Reuse the prerendered home screen when it is there (no redraw of the cover); otherwise draw fresh.
writeFileSync('.preview/entry.tsx',`import {createRoot,hydrateRoot} from 'react-dom/client';import LearningCenter from '../app/learn/learning-center';const root=document.getElementById('root')!;if(root.firstElementChild)hydrateRoot(root,<LearningCenter/>);else createRoot(root).render(<LearningCenter/>);`);
writeFileSync('.preview/link.tsx',`import type {AnchorHTMLAttributes} from 'react';export default function Link({href,...props}:AnchorHTMLAttributes<HTMLAnchorElement>){return <a href={href==='/'?'#':href} {...props}/>;}`);
execFileSync('npx',['--yes','--package=esbuild@0.28.2','esbuild','.preview/entry.tsx','--bundle','--minify','--jsx=automatic','--alias:next/link='+resolve('.preview/link.tsx'),'--alias:@='+process.cwd(),'--outfile=.preview/bundle.js'],{stdio:'inherit'});
// Prerender the home screen so the cover and heading appear before the app code runs (phone speed).
writeFileSync('.preview/ssr.tsx',`import {renderToString} from 'react-dom/server';import LearningCenter from '../app/learn/learning-center';process.stdout.write(renderToString(<LearningCenter/>));`);
execFileSync('npx',['--yes','--package=esbuild@0.28.2','esbuild','.preview/ssr.tsx','--bundle','--platform=node','--jsx=automatic','--loader:.css=empty','--log-level=error','--alias:next/link='+resolve('.preview/link.tsx'),'--alias:@='+process.cwd(),'--outfile=.preview/ssr.cjs'],{stdio:'inherit'});
const rendered=execFileSync('node',['.preview/ssr.cjs'],{encoding:'utf8'});
const headLinks=(rendered.match(/^(<link [^>]*\/>)+/)||[''])[0];
const shell=rendered.slice(headLinks.length);
const js=readFileSync('.preview/bundle.js','utf8');
// Home page: the app code loads after the cover picture, so the cover shows first. Links to other screens load it at once.
// The app code is its own cached file, named by its content so a new version is always fetched.
const jsName='app-'+createHash('sha256').update(js).digest('hex').slice(0,12)+'.js';
// Keep the previous version too, so a page cached just before an update can still load its code.
for(const dir of ['assets','docs/assets']){mkdirSync(dir,{recursive:true});const old=readdirSync(dir).filter(f=>/^app-[0-9a-f]{12}\.js$/.test(f)&&f!==jsName).sort((a,b)=>statSync(dir+'/'+b).mtimeMs-statSync(dir+'/'+a).mtimeMs);for(const f of old.slice(1))rmSync(dir+'/'+f);if(!existsSync(dir+'/'+jsName))writeFileSync(dir+'/'+jsName,js);}
const css=readFileSync('.preview/bundle.css','utf8');
const html=`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Ewket Kids — Free Learning</title><meta name="description" content="Free preschool through sixth-grade learning, separate local learner profiles, and printable parent reports."><link rel="canonical" href="https://liyasamra.github.io/liya-and-family/"><meta property="og:type" content="website"><meta property="og:title" content="Ewket Kids — Free Learning"><meta property="og:description" content="Free preschool–Grade 6 practice: 160 lessons, picture activities, and family reports. A four-week supplement, not a full curriculum."><meta property="og:url" content="https://liyasamra.github.io/liya-and-family/"><meta property="og:image" content="https://liyasamra.github.io/liya-and-family/social-preview.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="Ewket Kids: free Math, Reading, Writing, Science, and Social Studies practice for preschool through Grade 6"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="Ewket Kids — Free Learning"><meta name="twitter:description" content="160 free practice lessons, picture activities, and family reports."><meta name="twitter:image" content="https://liyasamra.github.io/liya-and-family/social-preview.png"><link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%23675090'/%3E%3Ctext x='32' y='44' font-family='Arial' font-size='40' fill='white' text-anchor='middle'%3EE%3C/text%3E%3C/svg%3E">${headLinks}<style>body{margin:0}*{box-sizing:border-box}${css}</style></head><body><noscript><main style="max-width:760px;margin:40px auto;padding:24px;font-family:system-ui"><h1>Ewket Kids — Free Learning</h1><p>Free Math, Reading, Writing, Science, and Social Studies practice for preschool through Grade 6. This is a four-week supplement, not a full curriculum or tutoring service.</p><p>Interactive lessons and browser progress need JavaScript. You can still use these printable resources:</p><ul><li><a href="community-kit/family-start-guide.pdf">Family start guide (PDF)</a></li><li><a href="community-kit/family-flyer.pdf">Family flyer (PDF)</a></li><li><a href="community-kit/group-leader-guide.pdf">Group-leader guide (PDF)</a></li></ul></main></noscript><div id="root">${shell}</div><script>(function(){function go(){var s=document.createElement('script');s.src='assets/${jsName}';document.body.appendChild(s)}if(location.hash.length>1||location.search){document.getElementById('root').textContent='';go()}else if(document.readyState==='complete')go();else addEventListener('load',go)})()</script></body></html>`;
for(const path of ['index.html','docs/index.html'])writeFileSync(path,html);
writeFileSync('.nojekyll','');writeFileSync('docs/.nojekyll','');
for(const target of ['community-kit','docs/community-kit'])cpSync('public/community-kit',target,{recursive:true});
console.log('Built matching root and docs public learning websites.');

for(const target of ["social-preview.png","docs/social-preview.png"])cpSync("public/social-preview.png",target);

for(const target of ["lesson-art","docs/lesson-art"])cpSync("public/lesson-art",target,{recursive:true});
for(const name of ["ewket-kids-cover.webp","ewket-kids-cover-640.webp","ewket-kids-cover-960.webp","ewket-kids-cover-1280.webp"])for(const target of [name,"docs/"+name])cpSync("public/"+name,target);
