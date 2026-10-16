// Illustrations for lessons. Files live in public/lesson-art/<lesson id>/.
// scene: shown with the worked example. choices: one picture per answer option, by question index.
export type LessonPictures={scene?:{src:string;alt:string};choices?:Record<number,{src:string;alt:string}[]>};
const base="lesson-art/";
export const lessonPictures:Record<string,LessonPictures>={
 "3-reading":{
  scene:{src:base+"3-reading/scene.webp",alt:"Ada puts an umbrella in her backpack while dark clouds fill the sky outside the window."},
  choices:{
   0:[{src:base+"3-reading/q1-a.webp",alt:"A girl drawing clouds with crayons"},{src:base+"3-reading/q1-b.webp",alt:"A girl holding an umbrella, thinking about rain"},{src:base+"3-reading/q1-c.webp",alt:"A girl carrying a stack of books"}],
   1:[{src:base+"3-reading/q2-a.svg",alt:"Dark rain clouds over little houses"},{src:base+"3-reading/q2-b.svg",alt:"A sunny beach with an umbrella and a sand bucket"},{src:base+"3-reading/q2-c.svg",alt:"An open pencil case with no pencil inside"}],
  },
 },
};
