// Reuse the owner's exact approved artwork. Each SVG viewport displays one region
// of the unchanged reference image; controls and text remain real HTML.
const regions = {
 logo:[45,113,39,39], hero:[366,163,393,289],
 Math:[69,610,105,95], Reading:[190,610,126,95], Writing:[328,610,125,95],
 Science:[462,610,126,95], 'Social Studies':[603,610,127,95],
 family:[48,815,190,104], landscape:[580,815,159,104],
 counters:[1147,292,157,137], mascot:[1340,704,160,180], ornament:[779,734,149,222],
} as const;
export default function ReferenceArt({name,className='',label}:{name:keyof typeof regions;className?:string;label?:string}){
 const [x,y,w,h]=regions[name];
 return <svg className={`reference-art ${className}`} viewBox={`${x} ${y} ${w} ${h}`} role={label?'img':undefined} aria-label={label} aria-hidden={label?undefined:true} preserveAspectRatio="xMidYMid meet"><image href="approved-design-art.webp" width="1536" height="1024"/></svg>;
}
