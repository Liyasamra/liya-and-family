"use client";
import { setLang, type Lang } from "@/lib/i18n";
// One button that switches the whole site between English and Amharic. The choice is saved on this device.
export default function LangSwitch({lang,inline=false}:{lang:Lang;inline?:boolean}){
 return <button type="button" className={`lang-switch ${inline?"inline-switch":""}`} onClick={()=>setLang(lang==="am"?"en":"am")} lang={lang==="am"?"en":"am"} aria-label={lang==="am"?"Switch to English":"ወደ አማርኛ ቀይር (Switch to Amharic)"}>{lang==="am"?"English":inline?"English / አማርኛ":"አማርኛ"}</button>;
}
