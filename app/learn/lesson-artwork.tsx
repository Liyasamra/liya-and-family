import type {Lesson} from '@/lib/learning-content';
import AuditIcon from './audit-icons';
import Pic from './picture-icons';
import AuditedDiagram from './audited-diagram';
import diagrams from '@/lib/audited-diagrams.json';
const revised:Record<string,{names:string[];label:string;words?:string[]}>= {
 'pre-math-3':{names:['clap','tap','clap','tap'],label:'Clap, tap, clap, tap.'},
 'pre-reading-3':{names:['shoes','outside','ball'],label:'Jo puts on shoes, goes outside, then plays ball.'},
 '1-reading-2':{names:['fix:cap','fix:cape'],label:'A cap and a cape show the silent-e contrast.',words:['cap','cape']},
 '2-reading-2':{names:['fix:clean-park','fix:water-park'],label:'Leo picks up paper while Ava waters plants.'},
 '2-reading-3':{names:['fix:nonfiction'],label:'A nonfiction page has a heading and a caption beneath a hive picture.'},
 '3-reading-2':{names:['fix:soil-pot','fix:water-seed','fix:sprout','fix:draw-sprout'],label:'Nia prepares soil, plants and waters a seed, observes a sprout, and draws it.'},
 '4-writing-2':{names:['fix:cookies'],label:'Two cookies support a homophone example.',words:['two · to · too']},
 '5-writing-4':{names:['fix:telephone','plant'],label:'A telephone and a plant illustrate word roots.',words:['tele + phone','bio + ology']},
};
const amh:Record<string,{names?:string[];glyphs?:string[];words?:string[];label:string}>= {
 'pre-amharic':{glyphs:['ሀ','ለ','መ','ሰ'],label:'Four Ethiopic characters: ሀ, ለ, መ and ሰ.'},
 'pre-amharic-2':{names:['fix:house','sun','dog'],words:['ቤት','ፀሐይ','ውሻ'],label:'A house, the Sun, and a dog.'},
 'pre-amharic-3':{names:['n:3'],words:['ሦስት'],label:'Three counters for counting in Amharic.'},
 'pre-amharic-4':{names:['dots:green','dots:yellow','dots:red'],words:['አረንጓዴ','ቢጫ','ቀይ'],label:'Green, yellow, and red color swatches.'},
 'k-amharic':{glyphs:['ሀ','ሁ','ሂ','ሃ','ሄ','ህ','ሆ'],label:'The seven forms of the ሀ family.'},
 'k-amharic-2':{glyphs:['ለ ሉ ሊ ላ ሌ ል ሎ','መ ሙ ሚ ማ ሜ ም ሞ'],label:'The ለ and መ character families.'},
 'k-amharic-3':{glyphs:['በ ቡ ቢ ባ ቤ ብ ቦ','ሰ ሱ ሲ ሳ ሴ ስ ሶ'],label:'The በ and ሰ character families.'},
 'k-amharic-4':{names:['fix:bread'],words:['ዳ + ቦ = ዳቦ'],label:'ዳ and ቦ join to form ዳቦ, bread.'},
 '1-amharic':{names:['fix:car'],words:['መ + ኪ + ና = መኪና'],label:'A car illustrates መኪና.'},
 '1-amharic-2':{names:['n:3','n:10'],words:['፫ · ሦስት','፲ · አሥር'],label:'Three and ten counters beside their Ethiopic numerals.'},
 '1-amharic-3':{names:['fix:family'],words:['እናት · አባት'],label:'One example family with children and caregivers.'},
 '1-amharic-4':{names:['fix:greeting'],words:['እንደምን አደሩ?'],label:'A child greets an older adult in the morning.'},
 '2-amharic':{names:['ball'],words:['ይህ ኳስ ነው።'],label:'A ball illustrates the sentence This is a ball.'},
 '2-amharic-2':{glyphs:['ሰኞ  ማክሰኞ  ረቡዕ','ሐሙስ  ዓርብ','ቅዳሜ  እሑድ'],label:'A week strip shows the days, with Saturday and Sunday together.'},
 '2-amharic-3':{glyphs:['ሰላም ነህ?','ቤቱ ትልቅ ነው።'],label:'An Amharic question and statement show their end marks.'},
 '2-amharic-4':{names:['ball','ball'],words:['ትልቅ','ትንሽ'],label:'The same ball shown big and small.'},
};
function LessonArtwork({lesson}:{lesson:Lesson}){
 if(lesson.id in diagrams)return <AuditedDiagram id={lesson.id}/>;
 const spec=amh[lesson.id]||revised[lesson.id];if(!spec)return null;
 if(lesson.id==='2-amharic-2')return <svg viewBox="0 0 260 124" role="img" aria-label="A seven-day week highlights Saturday and Sunday." data-lesson-art={lesson.id}><rect width="260" height="124" rx="16" fill="#fff8eb"/>{['ሰኞ','ማክሰኞ','ረቡዕ','ሐሙስ','ዓርብ','ቅዳሜ','እሑድ'].map((day,i)=><g key={day}><rect x={8+i%4*62} y={9+Math.floor(i/4)*56} width="57" height="47" rx="7" fill={i>4?'#f3e2a9':'#efe3f7'} stroke={i>4?'#71419a':'#d8c7e3'} strokeWidth={i>4?3:1}/><text x={36+i%4*62} y={39+Math.floor(i/4)*56} textAnchor="middle" fontSize="13" fill="#71419a" fontFamily="Ewket Ethiopic,system-ui,sans-serif">{day}</text></g>)}</svg>;
 const glyphs='glyphs' in spec?spec.glyphs:undefined;
 if(glyphs){const across=glyphs.every(s=>Array.from(s).length===1);const rows=across?1:glyphs.length;return <svg viewBox="0 0 260 124" role="img" aria-label={spec.label} data-lesson-art={lesson.id}><rect width="260" height="124" rx="16" fill="#fff8eb"/>{glyphs.map((s,i)=><text key={s} x={across?(i+.5)*260/glyphs.length:130} y={across?75:33+i*(86/rows)} textAnchor="middle" fontSize={across?(glyphs.length>4?25:32):s.length>8?18:25} fill="#71419a" fontFamily="Ewket Ethiopic,system-ui,sans-serif">{s}</text>)}</svg>}
 const names=spec.names||[];return <svg viewBox="0 0 260 124" role="img" aria-label={spec.label} data-lesson-art={lesson.id}><rect width="260" height="124" rx="16" fill="#fff8eb"/>{names.map((n,i)=>{const w=240/names.length,size=lesson.id==='2-amharic-4'&&i===1?45:Math.min(w-6,88);return <g key={i}><svg x={10+i*w+(w-size)/2} y={5+(88-size)/2} width={size} height={size} viewBox="0 0 100 100">{n.startsWith('fix:')?<AuditIcon name={n.slice(4)}/>:<Pic name={n}/>}</svg>{spec.words?.[i]&&<text x={10+i*w+w/2} y="113" textAnchor="middle" fontSize={names.length>2?13:16} fill="#71419a" fontFamily="Ewket Ethiopic,system-ui,sans-serif">{spec.words[i]}</text>}</g>})}</svg>;
}
LessonArtwork.has=(id:string)=>id in revised||id in amh||id in diagrams;
export default LessonArtwork;
