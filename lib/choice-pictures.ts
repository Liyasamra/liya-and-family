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

// Pictures for the Pre-K and K question banks (question numbers 3 and up).
const bankPictures: Record<string, ChoicePictures> = {
 "pre-math": { 3: { choices: ["n:1","n:2","n:3"] }, 4: { choices: ["n:4","n:3","n:5"] }, 5: { choices: ["n:3","n:4","n:1"] }, 6: { choices: ["n:1","n:3","n:5"] }, 7: { choices: ["n:2","n:4","n:5"] }, 8: { choices: ["n:1","n:2","n:5"] } },
 "pre-math-2": { 3: { choices: ["sock-blue","sock-red","ball"] }, 4: { choices: ["square","ball","triangle"] }, 5: { choices: ["square","triangle","circle"] }, 6: { choices: ["dots:red,red","dots:red,blue","dots:blue,red"] }, 7: { choices: ["rock","pillow","fork"] }, 9: { choices: ["blue","red","sock-red"] } },
 "pre-math-3": { 3: { choices: ["red","blue","dots:green"] }, 4: { choices: ["jump","clap","sit"] }, 5: { choices: ["sun","cat","moon"] }, 6: { choices: ["circle","square","triangle"] }, 7: { choices: ["dots:red,blue","dots:red,red","dots:blue,blue"] }, 8: { choices: ["cat","bee","dog"] } },
 "pre-math-4": { 3: { choices: ["square","circle","triangle"] }, 4: { choices: ["triangle","circle","square"] }, 5: { choices: ["circle","square","triangle"] }, 6: { choices: ["circle","triangle","square"] }, 8: { choices: ["square","triangle","circle"] }, 9: { choices: ["triangle","circle","square"] } },
 "pre-reading": { 3: { prompt: "hat", choices: ["sun","cat","bee"] }, 4: { prompt: "bee", choices: ["tree","dog","book"] }, 5: { prompt: "run", choices: ["cat","hat","sun"] }, 6: { prompt: "moon", choices: ["dog","spoon","tree"] }, 7: { prompt: "sock", choices: ["rock","cat","bee"] }, 8: { prompt: "bed", choices: ["sun","cup","red"] } },
 "pre-reading-2": { 3: { prompt: "ball", choices: ["book","cat","sun"] }, 4: { prompt: "cat", choices: ["dog","cup","moon"] }, 5: { prompt: "tree", choices: ["sun","moon","table"] }, 6: { prompt: "map", choices: ["moon","sun","bee"] }, 7: { prompt: "bee", choices: ["cat","bed","sun"] }, 8: { prompt: "sock", choices: ["cup","tree","sun"] } },
 "pre-reading-3": { 4: { choices: ["ball","bed","shoes"] }, 5: { choices: ["shoes","outside","ball"] } },
 "pre-reading-4": { 3: { choices: ["cat","toy-car","moon"] }, 4: { choices: ["rain","beach","bed"] }, 6: { choices: ["bee","toy-car","shoe"] }, 7: { choices: ["pillow","grownup","spoon"] } },
 "pre-science": { 3: { prompt: "flower", choices: ["eye","nose","ear"] }, 4: { prompt: "pillow", choices: ["hand","ear","nose"] }, 6: { choices: ["ear","eye","nose"] }, 7: { choices: ["nose","ear","hand"] }, 8: { prompt: "dog", choices: ["eye","hand","ear"] }, 9: { choices: ["ear","eye","nose"] } },
 "pre-science-2": { 3: { choices: ["tree","rock","shoe"] }, 4: { choices: ["toy-car","puppy","table"] }, 5: { choices: ["bee","plant","ball"] }, 8: { choices: ["rock","spoon","rabbit"] } },
 "pre-science-3": { 3: { choices: ["beach","rain","sun"] }, 4: { choices: ["sun","rain","storm"] }, 6: { choices: ["storm","sun","lunch"] }, 8: { choices: ["sun","rain","sand"] } },
 "pre-science-4": { 3: { choices: ["pull","push","jump"] }, 4: { choices: ["pull","push","sleep"] }, 7: { choices: ["pull","push","sound"] } },
 "k-math": { 3: { choices: ["n:3","n:4","n:5"] }, 5: { choices: ["n:9","n:8","n:10"] }, 7: { choices: ["n:10","n:9","n:8"] }, 8: { choices: ["n:8","n:10","n:9"] } },
 "k-math-2": { 4: { choices: ["n:3","n:7","n:2"] }, 5: { choices: ["n:6","n:9","n:2"] }, 7: { choices: ["n:10","n:1","n:7"] }, 8: { choices: ["n:6","n:9","n:4"] }, 9: { choices: ["n:9","n:3","n:5"] } },
 "k-math-3": { 3: { choices: ["n:4","n:5","n:6"] }, 4: { choices: ["n:4","n:3","n:5"] }, 5: { choices: ["n:6","n:8","n:7"] }, 6: { choices: ["n:1","n:2","n:3"] }, 7: { choices: ["n:3","n:2","n:4"] }, 8: { choices: ["n:5","n:7","n:6"] } },
 "k-math-4": { 3: { choices: ["n:3","n:5","n:2"] }, 4: { choices: ["n:8","n:2","n:3"] }, 6: { choices: ["n:4","n:8","n:2"] }, 7: { choices: ["n:9","n:5","n:4"] } },
 "k-reading": { 9: { choices: ["cat","sun","map"] } },
 "k-reading-2": { 3: { prompt: "moon", choices: ["l:m","l:s","l:t"] }, 4: { prompt: "sock", choices: ["l:t","l:s","l:m"] }, 5: { prompt: "table", choices: ["l:m","l:s","l:t"] }, 6: { prompt: "mat", choices: ["l:m","l:t","l:s"] }, 7: { prompt: "tree", choices: ["l:s","l:t","l:m"] }, 8: { prompt: "spoon", choices: ["l:m","l:t","l:s"] }, 9: { prompt: "mop", choices: ["l:m","l:s","l:t"] } },
 "k-reading-3": { 3: { choices: ["dog","hat","sun"] }, 6: { choices: ["cat","dog","mat"] } },
 "k-reading-4": { 7: { choices: ["garden","beach","moon-surface"] } },
 "k-science": { 5: { choices: ["flower","fruit","roots"] }, 6: { choices: ["toys","sun","dark"] } },
 "k-science-2": { 3: { choices: ["rock","pillow","towel"] }, 4: { choices: ["fork","towel","rock"] }, 7: { choices: ["spoon","towel","rock"] } },
 "k-science-3": { 3: { prompt: "robin", choices: ["fur","feathers","scales"] }, 4: { prompt: "cat", choices: ["fur","feathers","scales"] }, 5: { prompt: "goldfish", choices: ["fur","feathers","scales"] }, 6: { prompt: "dog", choices: ["scales","fur","feathers"] }, 8: { prompt: "rabbit" }, 9: { choices: ["rabbit","robin","goldfish"] } },
 "k-science-4": { 3: { choices: ["shadow","sound","water"] }, 4: { choices: ["pillow","sun","shoe"] }, 9: { choices: ["sun","book","pillow"] } },
};
for (const [id, m] of Object.entries(bankPictures)) choicePictures[id] = { ...(choicePictures[id] || {}), ...m };

// Pictures for Social Studies lessons (Preschool and Kindergarten).
import { socialPictures } from "./social-studies";
for (const [id, m] of Object.entries(socialPictures)) choicePictures[id] = { ...(choicePictures[id] || {}), ...m };
import { writingPictures } from "./writing-lessons";
for (const [id, m] of Object.entries(writingPictures)) choicePictures[id] = { ...(choicePictures[id] || {}), ...m };

import { scienceOhioPictures } from "./science-ohio";
for (const [id, m] of Object.entries(scienceOhioPictures)) choicePictures[id] = { ...(choicePictures[id] || {}), ...m };

// Pictures for Grades 1 and 2 (2026-10-17). Keys follow each question's answer order as shown.
const grade12Pictures: Record<string, ChoicePictures> = {
 "1-reading": { 0: { choices: ["dots:blue", "dots:red", "dots:green"] }, 1: { choices: ["tree", "store", "school"] }, 2: { choices: ["rain", "car", "wind"] }, 3: { prompt: "dog" }, 4: { choices: ["dots:red", "dots:yellow", "dots:blue"] }, 6: { prompt: "cat" }, 9: { choices: ["n:3", "n:2", "n:5"] } },
 "1-reading-3": { 3: { prompt: "kite" }, 4: { prompt: "towel" } },
 "1-science": { 0: { choices: ["toys", "water", "cup"] }, 3: { choices: ["spoon", "cup", "rock"] }, 6: { prompt: "water" }, 8: { choices: ["rain", "cup", "spoon"] } },
 "1-science-3": { 6: { prompt: "rabbit" }, 8: { choices: ["car", "water", "tree"] }, 9: { prompt: "goldfish" } },
 "1-science-sun": { 1: { choices: ["tree", "sun", "dark"] }, 2: { choices: ["globe", "rain", "sun"] }, 9: { choices: ["sun", "window", "moon"] } },
 "1-science-motion": { 6: { choices: ["eye", "ball", "sound"] }, 8: { choices: ["hand", "clap", "eye"] } },
 "1-social-2": { 4: { choices: ["water", "tree", "store"] }, 7: { prompt: "sun" } },
 "1-social-3": { 1: { choices: ["shoes", "apple", "car"] }, 4: { prompt: "plant" }, 7: { prompt: "toys" }, 8: { prompt: "bus" } },
 "1-writing": { 2: { choices: ["jump", "school", "run"] }, 3: { choices: ["sound", "dots:blue", "grownup"] }, 4: { prompt: "cat" }, 8: { choices: ["apple", "jump", "grownup"] }, 9: { choices: ["eye", "run", "book"] } },
 "1-writing-2": { 0: { choices: ["water", "goldfish", "dots:blue"] } },
 "1-writing-3": { 9: { choices: ["n:1", "n:3", "n:5"] } },
 "1-math-2": { 1: { prompt: "n:8", choices: ["n:3", "n:5", "n:2"] }, 4: { prompt: "n:7", choices: ["n:2", "n:3", "n:4"] } },
 "2-math": { 2: { choices: ["n:10", "n:0", "n:1"] } },
 "2-math-3": { 1: { prompt: "coin" }, 3: { prompt: "coin" }, 4: { prompt: "coin" } },
 "2-math-4": { 3: { prompt: "apple", choices: ["n:5", "n:1", "n:10"] }, 4: { prompt: "dog", choices: ["n:8", "n:4", "n:3"] }, 5: { choices: ["dots:red", "dots:green", "dots:blue"] }, 6: { choices: ["n:6", "n:3", "n:5"] } },
 "2-reading-4": { 3: { prompt: "dog" }, 4: { prompt: "rain" }, 5: { prompt: "plant" }, 6: { prompt: "sleep" }, 7: { prompt: "sun" } },
 "2-social": { 5: { prompt: "bus" } },
 "2-social-2": { 8: { prompt: "water" } },
};
for (const [id, m] of Object.entries(grade12Pictures)) choicePictures[id] = { ...(choicePictures[id] || {}), ...m };
