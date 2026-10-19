// Illustrations for lessons. Files live in public/lesson-art/<lesson id>/.
// scene: shown with the worked example (am/en: optional caption, written as real text, never inside the picture).
// words: picture cards with the Amharic word, its sound, and its English meaning. choices: one picture per answer option, by question index.
export type WordPicture={src:string;alt:string;am:string;say:string;en:string};
export type LessonPictures={scene?:{src:string;alt:string;am?:string;en?:string};words?:WordPicture[];choices?:Record<number,{src:string;alt:string}[]>};
const base="lesson-art/";

const fidel=base+"amharic/";
const word={
 bet:{src:fidel+"bet-house.webp",alt:"A small round Ethiopian house with a thatched cone roof and a wooden door",am:"ቤት",say:"bet",en:"house"},
 buna:{src:fidel+"buna-coffee.webp",alt:"A clay coffee pot, a jebena, beside three small coffee cups on a tray",am:"ቡና",say:"buna",en:"coffee"},
 dabo:{src:fidel+"dabo-bread.webp",alt:"A round golden loaf of Ethiopian bread on a woven straw plate",am:"ዳቦ",say:"dabo",en:"bread"},
 lam:{src:fidel+"lam-cow.webp",alt:"A friendly brown and white cow standing on green grass",am:"ላም",say:"lam",en:"cow"},
 abeba:{src:fidel+"abeba-flower.webp",alt:"Bright yellow Meskel daisies, adey abeba",am:"አበባ",say:"abeba",en:"flower"},
 beg:{src:fidel+"beg-sheep.webp",alt:"A fluffy white sheep standing on green grass",am:"በግ",say:"beg",en:"sheep"},
};
export const lessonPictures:Record<string,LessonPictures>={
 "3-reading":{
  scene:{src:base+"3-reading/scene.webp",alt:"Ada puts an umbrella in her backpack while dark clouds fill the sky outside the window."},
  choices:{
   0:[{src:base+"3-reading/q1-a.webp",alt:"A girl drawing clouds with crayons"},{src:base+"3-reading/q1-b.webp",alt:"A girl holding an umbrella, thinking about rain"},{src:base+"3-reading/q1-c.webp",alt:"A girl carrying a stack of books"}],
   1:[{src:base+"3-reading/q2-a.svg",alt:"Dark rain clouds over little houses"},{src:base+"3-reading/q2-b.svg",alt:"A sunny beach with an umbrella and a sand bucket"},{src:base+"3-reading/q2-c.svg",alt:"An open pencil case with no pencil inside"}],
  },
 },
 "pre-amharic-2":{words:[word.bet,word.lam,word.abeba]},
 "k-amharic-3":{words:[word.bet,word.buna,word.beg]},
 "k-amharic-4":{words:[word.bet,word.lam,word.buna,word.dabo,word.beg]},
 "1-amharic":{words:[word.abeba,word.lam,word.dabo]},
 "1-amharic-2":{scene:{src:fidel+"coffee-ceremony.webp",alt:"An Ethiopian family at a coffee ceremony. A mother pours coffee from a clay jebena into seven small cups on a low tray, while two children, their father and grandmother watch and smile. Fresh grass, yellow flowers, popcorn and incense are nearby.",am:"የቡና ሥነ ሥርዓት",en:"Coffee ceremony. How many cups can you count in Amharic?"}},
 "1-amharic-3":{scene:{src:fidel+"injera-mesob.webp",alt:"A family shares injera with colorful stews from a woven mesob basket. The mother feeds her little girl a bite while the boy reaches in, and the grandmother and father smile.",am:"ቤተሰብ በመሶብ ዙሪያ",en:"A family around the mesob. Who is the mother, father, grandmother, brother and sister?"}},
 "2-amharic-2":{scene:{src:fidel+"meskel-bonfire.webp",alt:"A family in white traditional clothes celebrates Meskel at dusk. Two children hold small torches beside their parents and grandmother, near a tall bonfire topped with a cross and yellow Meskel daisies.",am:"መስቀል ደመራ",en:"Meskel bonfire, celebrated in the month of Meskerem."}},
};
