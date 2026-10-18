// Lists every Amharic text for the review page (claude.ai artifact "Ewket Kids Amharic Review"). Run after npm run test:learning and npm run build:pages:
// node scripts/amharic-review-items.cjs out.json
// Builds the review list: [id, section, where, english, amharic]. Ids are stable hashes of the English, so corrections survive rebuilds.
const fs=require('fs'),crypto=require('crypto'),ts=require('typescript');
process.chdir(require('path').join(__dirname,'..'));
const {am}=require('../.learning-test/lib/amharic.js');const {lessons,grades}=require('../.learning-test/lib/learning-content.js');
const id=(p,s)=>p+'-'+crypto.createHash('sha1').update(s).digest('hex').slice(0,10);
const where={};const files={'app/learn/learning-center.tsx':'Home and lessons','app/learn/family-trust.tsx':'About and community kit','app/learn/assessments.tsx':'Quizzes and certificates','app/learn/placement.tsx':'Level check','app/learn/device-link.tsx':'Linking a device','app/learn/read-aloud.tsx':'Read aloud','app/learn/phone-report.tsx':'Phone report','app/learn/visual-lab.tsx':'Picture lab','app/learn/amharic-help.tsx':'Lesson screen','app/parent-portal/portal.tsx':'Parent portal'};
for(const [f,label] of Object.entries(files)){const sf=ts.createSourceFile(f,fs.readFileSync(f,'utf8'),99,true,4);(function v(n){if(ts.isCallExpression(n)&&ts.isIdentifier(n.expression)&&n.expression.text==='t'&&n.arguments[0]&&ts.isStringLiteral(n.arguments[0]))where[n.arguments[0].text]??=label;ts.forEachChild(n,v);})(sf);}
const items=[];
for(const [en,a] of Object.entries(am))items.push([id('ui',en),'site',where[en]||'Levels, subjects and days',en,a]);
const help=JSON.parse(fs.readFileSync('assets/amharic-lessons.json','utf8'));const gl=g=>grades.find(x=>x.id===g).label;
for(const l of lessons){if(!help[l.id])continue;items.push([id('goal',l.id),'lessons',gl(l.grade)+' · '+l.subject+' · '+l.title+' · goal',l.objective,help[l.id].goal]);items.push([id('expl',l.id),'lessons',gl(l.grade)+' · '+l.subject+' · '+l.title+' · explanation',l.explain,help[l.id].explain]);}
for(const l of lessons.filter(l=>l.subject==='Amharic')){const w=gl(l.grade)+' · '+l.title;
 for(const f of ['title','objective','explain','example','activity'])items.push([id('fidel',l.id+f),'fidel',w+' · '+f,'',l[f]]);
 l.questions.forEach((q,i)=>items.push([id('fidel',l.id+'q'+i),'fidel',w+' · question '+(i+1),'',q.prompt+'\n✓ '+q.options[q.answer]+'\n✗ '+q.options.filter((_,j)=>j!==q.answer).join('\n✗ ')+'\n'+q.explanation]));}
const ids=new Set(items.map(i=>i[0]));if(ids.size!==items.length)throw Error('duplicate ids');
fs.writeFileSync(process.argv[2],JSON.stringify(items));console.log(items.length,'items',items.filter(i=>i[1]==='site').length,items.filter(i=>i[1]==='lessons').length,items.filter(i=>i[1]==='fidel').length);
