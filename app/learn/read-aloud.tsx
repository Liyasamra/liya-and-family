"use client";
import { t } from "@/lib/i18n";
import {useEffect,useRef,useState,useSyncExternalStore} from "react";
const subscribeToSpeech=()=>()=>{};
const speechSupported=()=>typeof window!=="undefined"&&"speechSynthesis" in window&&"SpeechSynthesisUtterance" in window;
const speechOnServer=()=>false;
export default function ReadAloud({text,label:givenLabel,compact=false,autoPlay=false}:{text:string;label?:string;compact?:boolean;autoPlay?:boolean}){
 const label=givenLabel??t("Listen to the lesson");
 const available=useSyncExternalStore(subscribeToSpeech,speechSupported,speechOnServer);
 const [speaking,setSpeaking]=useState(false),[message,setMessage]=useState("");
 const utterance=useRef<SpeechSynthesisUtterance|null>(null);
 useEffect(()=>{return ()=>{if(utterance.current){utterance.current.onend=null;utterance.current.onerror=null;window.speechSynthesis?.cancel();}};},[]);
 function stop(){if(utterance.current){utterance.current.onend=null;utterance.current.onerror=null;utterance.current=null;}window.speechSynthesis?.cancel();setSpeaking(false);setMessage(t("Reading stopped."));}
 function listen(){if(!available)return;stop();try{const speech=new SpeechSynthesisUtterance(text);speech.lang="en-US";speech.rate=.85;const voices=window.speechSynthesis.getVoices();speech.voice=voices.find(v=>v.localService&&/^en\b/i.test(v.lang))||voices.find(v=>/^en\b/i.test(v.lang))||null;speech.onend=()=>{setSpeaking(false);setMessage(t("Finished reading."));utterance.current=null;};speech.onerror=e=>{setSpeaking(false);setMessage(e?.error==="canceled"||e?.error==="interrupted"?t("Reading stopped."):t("Audio is unavailable on this device. A grown-up can read the lesson aloud."));utterance.current=null;};utterance.current=speech;setSpeaking(true);setMessage(t("Reading the lesson. Use Stop reading whenever you like."));window.speechSynthesis.speak(speech);}catch{setSpeaking(false);setMessage(t("Audio is unavailable on this device. A grown-up can read the lesson aloud."));}}
 const listenRef=useRef<()=>void>(()=>{});
 useEffect(()=>{listenRef.current=listen;});
 useEffect(()=>{if(!autoPlay||!speechSupported())return;const t=setTimeout(()=>listenRef.current(),350);return ()=>clearTimeout(t);},[autoPlay]);
 return <div className="read-aloud"><div><button type="button" className="learn-btn small outline" aria-label={label} onClick={listen} disabled={!available||speaking}><span aria-hidden="true">🔊</span>{label}</button>{speaking&&<button type="button" className="learn-btn small outline" onClick={stop}>{t("Stop reading")}</button>}</div><p className="fine-print" role="status" aria-live="polite">{message|| (compact?(available?"":t("Audio needs browser speech support.")):(available?t("Optional read-aloud uses your browser’s voices. A local voice is preferred; some devices use an online voice service."):t("Read-aloud needs browser speech support. A grown-up can read the lesson with you.")))}</p></div>;
}
