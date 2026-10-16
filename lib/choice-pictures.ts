// Which hand-drawn picture goes with each answer choice (and, optionally, each question).
// Names refer to app/learn/picture-icons.tsx: a picture name, "n:3" for counting dots,
// "l:m" for a letter block, or "dots:red,blue" for a colour pattern.
// A question gets pictures only when every one of its choices has one.
export type ChoicePictures = Record<number, { choices?: string[]; prompt?: string }>;
export const choicePictures: Record<string, ChoicePictures> = {
 "pre-math": { 0: { choices: ["n:2", "n:3", "n:4"] }, 1: { choices: ["n:2", "n:4", "n:1"] }, 2: { choices: ["n:3", "n:5", "n:2"] } },
 "pre-math-2": { 0: { prompt: "sock-red", choices: ["sock-blue", "sock-red", "socks"] }, 1: { choices: ["red", "pillow", "circle"] } },
 "pre-math-3": { 0: { choices: ["clap", "jump", "tap"] }, 1: { choices: ["dots:blue,blue", "dots:red,blue", "dots:red,red"] }, 2: { choices: ["sit", "sleep", "jump"] } },
 "pre-math-4": { 0: { choices: ["square", "triangle", "circle"] }, 1: { prompt: "triangle", choices: ["n:3", "n:4", "n:5"] }, 2: { prompt: "square-turned", choices: ["triangle", "square", "circle"] } },
 "pre-reading": { 0: { prompt: "cat", choices: ["hat", "sun", "dog"] }, 1: { prompt: "sun", choices: ["tree", "run", "book"] }, 2: { prompt: "tree", choices: ["cup", "dog", "bee"] } },
 "pre-reading-2": { 0: { prompt: "sun", choices: ["moon", "sock", "apple"] }, 1: { prompt: "moon", choices: ["sun", "dog", "map"] } },
 "pre-reading-3": { 0: { choices: ["shoes", "outside", "ball"] }, 1: { choices: ["lunch", "outside", "bed"] }, 2: { choices: ["shoes", "outside", "ball"] } },
 "pre-reading-4": { 0: { choices: ["table", "shoe", "grownup"] }, 1: { choices: ["puppy", "numbers", "mountain"] } },
 "pre-science": { 0: { choices: ["eye", "ear", "nose"] }, 1: { prompt: "bell", choices: ["hand", "ear", "eye"] } },
 "pre-science-2": { 0: { choices: ["toy-car", "plant", "shoe"] }, 1: { choices: ["toy-dog", "dog-picture", "real-dog"] } },
 "pre-science-3": { 0: { choices: ["rain", "sand", "leaves"] }, 1: { choices: ["toys", "wind", "book"] } },
 "pre-science-4": { 0: { choices: ["sleep", "pull", "push"] }, 1: { choices: ["pull", "push", "paint"] } },
 "k-math": { 0: { choices: ["n:2", "n:3", "n:4"] }, 1: { choices: ["n:10", "n:5", "n:9"] }, 2: { choices: ["n:9", "n:6", "n:10"] } },
 "k-math-2": { 2: { choices: ["n:5", "n:8", "n:9"] } },
 "k-math-3": { 0: { choices: ["n:5", "n:6", "n:4"] }, 1: { choices: ["n:4", "n:5", "n:3"] } },
 "k-math-4": { 0: { choices: ["n:7", "n:2", "n:3"] }, 1: { choices: ["n:5", "n:6", "n:7"] } },
 "k-reading": { 0: { choices: ["mat", "map", "mop"] }, 1: { choices: ["sun", "sit", "sip"] }, 2: { choices: ["sun", "cat", "map"] } },
 "k-reading-2": { 0: { prompt: "map", choices: ["l:s", "l:m", "l:t"] }, 1: { prompt: "sun", choices: ["l:t", "l:m", "l:s"] }, 2: { prompt: "top", choices: ["l:t", "l:m", "l:s"] } },
 "k-reading-3": { 0: { prompt: "cat", choices: ["mat", "dog", "sun"] } },
 "k-reading-4": { 0: { choices: ["word", "garden", "boy"] }, 1: { choices: ["garden", "moon-surface", "beach"] } },
 "k-science": { 0: { choices: ["light-water", "toys", "dark"] }, 1: { choices: ["flower", "roots", "fruit"] } },
 "k-science-2": { 0: { choices: ["rock", "towel", "water"] }, 1: { choices: ["spoon", "fork", "towel"] } },
 "k-science-3": { 0: { prompt: "robin", choices: ["feathers", "paper", "fur"] }, 1: { prompt: "rabbit", choices: ["metal", "fur", "feathers"] }, 2: { prompt: "goldfish", choices: ["feathers", "cloth", "scales"] } },
 "k-science-4": { 0: { choices: ["smell", "sound", "shadow"] }, 1: { choices: ["flashlight", "pillow", "shoe"] } },
};
