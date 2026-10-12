"use client";
import {useEffect,useRef,useState,useSyncExternalStore} from "react";
const subscribeToSpeech=()=>()=>{};
const speechSupported=()=>typeof window!=="undefined"&&"speechSynthesis" in window&&"SpeechSynthesisUtterance" in window;
const speechOnServer=()=>false;
export default function ReadAloud({text}:{text:string}){
 const available=useSyncExternalStore(subscribeToSpeech,speechSupported,speechOnServer);
 const [speaking,setSpeaking]=useState(false),[message,setMessage]=useState("");
 const utterance=useRef<SpeechSynthesisUtterance|null>(null);
 useEffect(()=>{return ()=>{if(utterance.current){utterance.current.onend=null;utterance.current.onerror=null;window.speechSynthesis?.cancel();}};},[]);
 function stop(){if(utterance.current){utterance.current.onend=null;utterance.current.onerror=null;utterance.current=null;}window.speechSynthesis?.cancel();setSpeaking(false);setMessage("Reading stopped.");}
 function listen(){if(!available)return;stop();try{const speech=new SpeechSynthesisUtterance(text);speech.lang="en-US";speech.rate=.85;const voices=window.speechSynthesis.getVoices();speech.voice=voices.find(v=>v.localService&&/^en\b/i.test(v.lang))||voices.find(v=>/^en\b/i.test(v.lang))||null;speech.onend=()=>{setSpeaking(false);setMessage("Finished reading.");utterance.current=null;};speech.onerror=()=>{setSpeaking(false);setMessage("Audio is unavailable on this device. A grown-up can read the lesson aloud.");utterance.current=null;};utterance.current=speech;setSpeaking(true);setMessage("Reading the lesson. Use Stop reading whenever you like.");window.speechSynthesis.speak(speech);}catch{setSpeaking(false);setMessage("Audio is unavailable on this device. A grown-up can read the lesson aloud.");}}
 return <div className="read-aloud"><div><button type="button" className="learn-btn small outline" onClick={listen} disabled={!available||speaking}>Listen to the lesson</button>{speaking&&<button type="button" className="learn-btn small outline" onClick={stop}>Stop reading</button>}</div><p className="fine-print" role="status" aria-live="polite">{message|| (available?"Optional read-aloud uses your browser’s voices. A local voice is preferred; some devices use an online voice service.":"Read-aloud needs browser speech support. A grown-up can read the lesson with you.")}</p></div>;
}
