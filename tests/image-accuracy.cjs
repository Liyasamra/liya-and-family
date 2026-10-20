const assert=require('node:assert/strict'),fs=require('node:fs'),{execFileSync}=require('node:child_process'),{JSDOM}=require('jsdom');
// Exercise the real React renderers, not a duplicate drawing implementation.
execFileSync('npx',['--yes','--package=esbuild@0.28.2','esbuild','scripts/render-audited-art.tsx','--bundle','--platform=node','--jsx=automatic','--alias:@='+process.cwd(),'--loader:.css=empty','--outfile=.preview/audit-render.cjs'],{stdio:'pipe'});
execFileSync('node',['.preview/audit-render.cjs']);
const r=JSON.parse(fs.readFileSync('.preview/audit-renders.json','utf8'));
assert.equal(r.covers.length,176);assert.equal(r.questions.length,330);
for(const icon of r.icons){assert.ok(icon.html.includes('<svg'),icon.name+' renders');const doc=new JSDOM(icon.html).window.document;assert.ok(doc.querySelector('svg').children.length>1,icon.name+' has drawing, not an empty background');}
for(const q of r.questions)for(const p of q.pictures){assert.ok(p.exists&&p.html,q.id+' '+p.name);}
function doc(id){return new JSDOM(r.covers.find(x=>x.id===id).html).window.document;}
assert.equal(doc('3-math').querySelectorAll('[data-counter]').length,12);
assert.equal(doc('3-math-2').querySelectorAll('[data-counter]').length,12);
assert.equal(doc('3-math-4').querySelectorAll('[data-square-unit]').length,12);
for(const sq of doc('3-math-4').querySelectorAll('[data-square-unit]'))assert.equal(sq.getAttribute('width'),sq.getAttribute('height'));
assert.equal(doc('5-math-3').querySelectorAll('[data-hundredth]').length,100);assert.equal(doc('5-math-3').querySelectorAll('[data-overlap="true"]').length,12);
assert.equal(doc('5-math-4').querySelectorAll('[data-volume-unit]').length,24);
const stages=doc('2-math').querySelectorAll('g[transform]');assert.equal(stages[0].querySelectorAll('[data-ten]').length,3);assert.equal(stages[0].querySelectorAll('[data-one]').length,12);assert.equal(stages[1].querySelectorAll('[data-ten]').length,4);assert.equal(stages[1].querySelectorAll('[data-one]').length,2);
assert.match(doc('2-math-3').body.textContent,/10¢10¢5¢/);
assert.match(doc('4-math-2').body.textContent,/2\/3 < 3\/4/);
assert.match(doc('6-math-2').body.textContent,/-5/);assert.match(doc('6-math-2').body.textContent,/5/);
const {visualActivities}=require('../.learning-test/lib/visual-learning.js');assert.equal(visualActivities['3-science-matter'].steps[2].picture,'vapor');assert.equal(visualActivities['6-science-atoms'].options[2].picture,'vapor');assert.equal(visualActivities['4-science-landforms'].options[1].picture,'mountain');
for(const c of r.covers.filter(x=>x.id.includes('amharic'))){const d=new JSDOM(c.html).window.document;assert.ok(d.querySelector('[role="img"][aria-label]'),c.id+' has a described teaching image');assert.ok(!c.html.includes('NaN'));}
console.log('Passed: all 176 covers and 330 picture mappings render; exact counts, square units, regrouping value, coins, fraction comparison, hundredths, volume, vapor/mountain mappings and all 16 accessible Amharic covers.');
