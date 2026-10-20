import type {Subject} from '@/lib/learning-content';
type Name=Subject|'home'|'calendar'|'award'|'user'|'book';
const paths:Record<Name,string>={
 Math:'M4 18V9h4v9M10 18V4h4v14M16 18v-7h4v7M3 21h19',
 Reading:'M12 5C8 2 4 3 2 4v15c3-2 6-2 10 0 4-2 7-2 10 0V4c-2-1-6-2-10 1Zm0 0v14',
 Writing:'m4 17 12-12 4 4L8 21H4v-4Zm10-10 4 4M16 5l2-2 4 4-2 2',
 Science:'m10 3 7 7-3 3-7-7 3-3Zm-2 5-3 3m10 1c4 6 0 10-7 10H3m7-9c-3 4-1 6 2 6m-9 3v-3h18v3M8 3l4 4',
 'Social Studies':'M9 6a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM3 11a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm14 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0ZM7 21v-5c0-4 10-4 10 0v5M2 21v-5c0-2 3-3 5-1m10 0c2-2 5-1 5 1v5',
 Amharic:'M4 4v16m0-8h16M20 4v16',
 home:'m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7',
 calendar:'M4 5h16v16H4V5Zm3-3v6m10-6v6M4 10h16M8 14h3m2 0h3m-8 4h3',
 award:'M7 3h10v7a5 5 0 0 1-10 0V3Zm0 2H3v4c0 3 2 4 5 4m9-8h4v4c0 3-2 4-5 4m-4 2v5m-4 1h8',
 user:'M8 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0ZM4 22v-5c0-6 16-6 16 0v5H4Z',
 book:'M12 5C8 2 4 3 2 4v15c3-2 6-2 10 0 4-2 7-2 10 0V4c-2-1-6-2-10 1Zm0 0v14',
};
export default function UiIcon({name}:{name:Name}){return <svg className="ui-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]}/></svg>;}
