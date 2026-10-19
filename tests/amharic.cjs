// Amharic checks (2026-10-18): every visible text has Amharic, every lesson has a "Say it in Amharic" entry,
// and the fidel lessons use Ethiopic letters. Run after npm run test:learning and npm run build:pages.
const assert=require('node:assert/strict'),fs=require('node:fs'),ts=require('typescript');
const {am}=require('../.learning-test/lib/amharic.js');const i18n=require('../.learning-test/lib/i18n.js');
const {lessons}=require('../.learning-test/lib/learning-content.js');
// Texts that stay as written in both languages: addresses, codes, and example IDs.
const same=new Set(['hello@ewketkids.org','partners@ewketkids.org','liyasamra.github.io/liya-and-family/','ABCD-EFGH','ewketkids.org','EW001']);
const files=['app/learn/welcome.tsx','app/learn/learning-overview.tsx','app/learn/learning-center.tsx','app/learn/family-trust.tsx','app/learn/assessments.tsx','app/learn/placement.tsx','app/learn/device-link.tsx','app/learn/read-aloud.tsx','app/learn/phone-report.tsx','app/learn/amharic-help.tsx','app/parent-portal/portal.tsx'];
const missing=[];
for(const f of files){const sf=ts.createSourceFile(f,fs.readFileSync(f,'utf8'),99,true,4);(function v(n){if(ts.isCallExpression(n)&&ts.isIdentifier(n.expression)&&n.expression.text==='t'&&n.arguments[0]&&ts.isStringLiteral(n.arguments[0])){const k=n.arguments[0].text;if(!am[k]&&!same.has(k))missing.push(f+': '+k);}ts.forEachChild(n,v);})(sf);}
assert.deepEqual(missing,[],'every visible text has Amharic');
for(const [en,a] of Object.entries(am)){assert.ok(/[ሀ-፿]/.test(a)||!/[A-Za-z]/.test(a)||a==='EWKET KIDS','Amharic text uses Ethiopic letters: '+en);
 const ph=s=>(s.match(/\{\d\}/g)||[]).sort().join();assert.equal(ph(a),ph(en),'same {0} blanks in Amharic and English: '+en);}
// Subjects, levels, and focus lines come from lesson data, so check them directly.
for(const s of ['Math','Reading','Writing','Science','Social Studies','Amharic'])assert.ok(am[s],s);
for(const g of require('../.learning-test/lib/learning-content.js').grades){assert.ok(am[g.label],g.label);assert.ok(am[g.focus],g.focus);}
// t() fills blanks and falls back to English.
i18n.useDrawingLang('am');assert.equal(i18n.t('{0} of {1} done',3,4),'ከ4 3 ተጠናቀዋል');assert.equal(i18n.t('No such text {0}',1),'No such text 1');i18n.useDrawingLang('en');assert.equal(i18n.t('{0} of {1} done',3,4),'3 of 4 done');
// "Say it in Amharic" covers every school lesson.
const help=JSON.parse(fs.readFileSync('assets/amharic-lessons.json','utf8'));
const noHelp=lessons.filter(l=>l.subject!=='Amharic'&&!(help[l.id]&&/[ሀ-፿]/.test(help[l.id].goal)&&help[l.id].explain.length>20)).map(l=>l.id);
assert.deepEqual(noHelp,[],'every school lesson has its goal and explanation in Amharic');
// Fidel lessons: Preschool to Grade 2 only, four steps each, and every one uses Ethiopic letters.
const fidel=lessons.filter(l=>l.subject==='Amharic');assert.equal(fidel.length,16);
for(const g of ['pre','k','1','2'])assert.equal(fidel.filter(l=>l.grade===g).length,4,g);
for(const l of fidel)assert.ok(/[ሀ-፿]/.test(l.title+l.explain+l.example),l.id);
// The Ethiopic font is bundled and only fetched for Ethiopic letters.
const html=fs.readFileSync('index.html','utf8');assert.ok(html.includes('unicode-range:U+1200-139F'));assert.ok(fs.existsSync('assets/fonts/noto-sans-ethiopic-400.woff2'));assert.ok(fs.existsSync('assets/font-licenses/Noto-Sans-Ethiopic-OFL.txt'));
console.log('Passed: '+Object.keys(am).length+' Amharic texts cover every visible text; '+Object.keys(help).length+' lessons have Amharic help; 16 fidel lessons for Preschool to Grade 2; Ethiopic font bundled.');
