import { sequenceLessons } from "./learning-sequences";
import { questionBanks } from "./question-banks";
import { socialLessons } from "./social-studies";
import { writingLessons } from "./writing-lessons";
export type Grade = "pre" | "k" | "1" | "2" | "3" | "4" | "5" | "6";
export type Subject = "Math" | "Reading" | "Writing" | "Science" | "Social Studies";
export type Lesson = {id:string;grade:Grade;subject:Subject;title:string;objective:string;explain:string;example:string;activity:string;questions:{prompt:string;options:string[];answer:number;explanation:string}[]};
export const grades: {id:Grade;label:string;focus:string}[] = [{"id": "pre", "label": "Preschool", "focus": "Play, notice, and explore"}, {"id": "k", "label": "Kindergarten", "focus": "Build a strong beginning"}, {"id": "1", "label": "Grade 1", "focus": "Read and count with confidence"}, {"id": "2", "label": "Grade 2", "focus": "Connect ideas"}, {"id": "3", "label": "Grade 3", "focus": "Grow independent thinking"}, {"id": "4", "label": "Grade 4", "focus": "Explain how and why"}, {"id": "5", "label": "Grade 5", "focus": "Reason and support ideas"}, {"id": "6", "label": "Grade 6", "focus": "Prepare for the next chapter"}];
const starterLessons:Lesson[] = [
  {
    "id": "pre-math",
    "grade": "pre",
    "subject": "Math",
    "title": "Count, touch, and compare",
    "objective": "Count objects one at a time up to five.",
    "explain": "Touch each object once as you count. The last number tells how many objects there are. More means a bigger group; fewer means a smaller group.",
    "example": "● ● ● — Touch and count: one, two, three. There are three dots.",
    "activity": "With a grown-up, collect five large, safe objects. Make groups of two and three. Touch and count each group.",
    "questions": [
      {
        "prompt": "How many dots? ● ● ●",
        "options": [
          "2",
          "3",
          "4"
        ],
        "answer": 1,
        "explanation": "Touch each dot once: one, two, three."
      },
      {
        "prompt": "Which group has more?",
        "options": [
          "● ●",
          "● ● ● ●",
          "●"
        ],
        "answer": 1,
        "explanation": "Four is more than two or one."
      },
      {
        "prompt": "What comes after four?",
        "options": [
          "3",
          "5",
          "2"
        ],
        "answer": 1,
        "explanation": "Count aloud: one, two, three, four, five."
      }
    ]
  },
  {
    "id": "k-math",
    "grade": "k",
    "subject": "Math",
    "title": "Make ten",
    "objective": "Combine two groups to make ten.",
    "explain": "Adding puts groups together. Ten can be split into two smaller groups in many ways. Use fingers or drawings to see the parts.",
    "example": "Six dots and four dots make ten: 6 + 4 = 10.",
    "activity": "Draw ten boxes. Color seven. How many boxes are left?",
    "questions": [
      {
        "prompt": "7 + what makes 10?",
        "options": [
          "2",
          "3",
          "4"
        ],
        "answer": 1,
        "explanation": "Seven plus three equals ten."
      },
      {
        "prompt": "5 + 5 = ?",
        "options": [
          "10",
          "5",
          "9"
        ],
        "answer": 0,
        "explanation": "Two groups of five make ten."
      },
      {
        "prompt": "8 + 2 = ?",
        "options": [
          "9",
          "6",
          "10"
        ],
        "answer": 2,
        "explanation": "Count two more after eight: nine, ten."
      }
    ]
  },
  {
    "id": "1-math",
    "grade": "1",
    "subject": "Math",
    "title": "Tens and ones",
    "objective": "Read two-digit numbers as tens and ones.",
    "explain": "A group of ten ones is one ten. In 24, the 2 means two tens and the 4 means four ones.",
    "example": "24 = 20 + 4. Two tens and four ones make twenty-four.",
    "activity": "Draw three bundles of ten sticks and six single sticks. Say and write the number.",
    "questions": [
      {
        "prompt": "How many tens are in 35?",
        "options": [
          "5",
          "3",
          "35"
        ],
        "answer": 1,
        "explanation": "The tens digit is 3: three groups of ten."
      },
      {
        "prompt": "2 tens and 7 ones make…",
        "options": [
          "27",
          "72",
          "9"
        ],
        "answer": 0,
        "explanation": "Twenty plus seven is twenty-seven."
      },
      {
        "prompt": "Which is 40 + 6?",
        "options": [
          "64",
          "10",
          "46"
        ],
        "answer": 2,
        "explanation": "Four tens and six ones make forty-six."
      }
    ]
  },
  {
    "id": "2-math",
    "grade": "2",
    "subject": "Math",
    "title": "Add with regrouping",
    "objective": "Add two-digit numbers when ones make a new ten.",
    "explain": "Add the ones first. If there are ten or more ones, exchange ten ones for one ten. Then add all the tens.",
    "example": "27 + 15: 7 + 5 = 12 ones. Regroup as 1 ten and 2 ones. 2 + 1 + 1 = 4 tens. Answer: 42.",
    "activity": "Use drawings of tens and ones to solve 36 + 28. Explain where the new ten comes from.",
    "questions": [
      {
        "prompt": "27 + 15 = ?",
        "options": [
          "32",
          "42",
          "412"
        ],
        "answer": 1,
        "explanation": "Twelve ones become one ten and two ones; the total is 42."
      },
      {
        "prompt": "36 + 28 = ?",
        "options": [
          "64",
          "54",
          "614"
        ],
        "answer": 0,
        "explanation": "Six plus eight is fourteen; regroup one ten. Three plus two plus one is six tens."
      },
      {
        "prompt": "How many tens equal 10 ones?",
        "options": [
          "10",
          "0",
          "1"
        ],
        "answer": 2,
        "explanation": "Ten ones can be exchanged for one ten."
      }
    ]
  },
  {
    "id": "3-math",
    "grade": "3",
    "subject": "Math",
    "title": "Equal groups and multiplication",
    "objective": "Represent multiplication as equal groups.",
    "explain": "Multiplication counts equal groups efficiently. In 4 × 3, we can think of four groups with three in each group.",
    "example": "4 × 3 = 3 + 3 + 3 + 3 = 12.",
    "activity": "Draw three rows of five dots. Count by fives and write the multiplication equation.",
    "questions": [
      {
        "prompt": "4 groups of 3 make…",
        "options": [
          "7",
          "12",
          "16"
        ],
        "answer": 1,
        "explanation": "Add three four times: 3 + 3 + 3 + 3 = 12."
      },
      {
        "prompt": "3 × 5 = ?",
        "options": [
          "15",
          "8",
          "10"
        ],
        "answer": 0,
        "explanation": "Three groups of five total fifteen."
      },
      {
        "prompt": "Which shows 2 × 4?",
        "options": [
          "2 + 4",
          "4 + 4",
          "2 + 2 + 2"
        ],
        "answer": 1,
        "explanation": "Two groups of four can be written 4 + 4."
      }
    ]
  },
  {
    "id": "4-math",
    "grade": "4",
    "subject": "Math",
    "title": "Equivalent fractions",
    "objective": "Find fractions that name the same amount.",
    "explain": "A fraction describes equal parts of a whole. Multiply the numerator and denominator by the same positive whole number to make an equivalent fraction.",
    "example": "1/2 = 2/4: dividing each half into two equal pieces makes four pieces, with two shaded.",
    "activity": "Draw two equal rectangles. Shade half of one and two fourths of the other. Compare.",
    "questions": [
      {
        "prompt": "Which equals 1/2?",
        "options": [
          "1/4",
          "2/4",
          "3/4"
        ],
        "answer": 1,
        "explanation": "Two out of four equal parts is half."
      },
      {
        "prompt": "2/3 equals…",
        "options": [
          "4/6",
          "2/6",
          "3/4"
        ],
        "answer": 0,
        "explanation": "Multiply both 2 and 3 by 2 to get 4/6."
      },
      {
        "prompt": "3/4 equals…",
        "options": [
          "3/8",
          "6/4",
          "6/8"
        ],
        "answer": 2,
        "explanation": "Multiply numerator and denominator by 2: 6/8."
      }
    ]
  },
  {
    "id": "5-math",
    "grade": "5",
    "subject": "Math",
    "title": "Add unlike fractions",
    "objective": "Use a common denominator to add fractions.",
    "explain": "Before adding fractions with different denominators, rename them with the same denominator. Then add the numerators and keep that denominator.",
    "example": "1/2 + 1/4 = 2/4 + 1/4 = 3/4.",
    "activity": "Draw a rectangle split into sixths. Use it to explain 1/2 + 1/3.",
    "questions": [
      {
        "prompt": "1/2 + 1/4 = ?",
        "options": [
          "2/6",
          "3/4",
          "1/6"
        ],
        "answer": 1,
        "explanation": "Rename one half as two fourths. Two fourths plus one fourth is three fourths."
      },
      {
        "prompt": "1/3 + 1/6 = ?",
        "options": [
          "1/2",
          "2/9",
          "1/9"
        ],
        "answer": 0,
        "explanation": "One third is two sixths. Three sixths simplifies to one half."
      },
      {
        "prompt": "A useful common denominator for 1/2 and 1/3 is…",
        "options": [
          "5",
          "1",
          "6"
        ],
        "answer": 2,
        "explanation": "Six is a multiple of both two and three."
      }
    ]
  },
  {
    "id": "6-math",
    "grade": "6",
    "subject": "Math",
    "title": "Ratios and unit rates",
    "objective": "Describe a ratio and calculate a rate per one.",
    "explain": "A ratio compares two quantities. A unit rate tells how much for one unit. Keep the order and units clear.",
    "example": "Four notebooks cost $12. The unit price is $12 ÷ 4 = $3 per notebook.",
    "activity": "Make a pretend shop. Price six pencils at $18. Find the cost per pencil and then the cost of two.",
    "questions": [
      {
        "prompt": "4 notebooks cost $12. Cost per notebook?",
        "options": [
          "$4",
          "$3",
          "$8"
        ],
        "answer": 1,
        "explanation": "Divide total cost by number of notebooks: 12 ÷ 4 = 3."
      },
      {
        "prompt": "2 red beads and 3 blue beads. Red-to-blue ratio?",
        "options": [
          "2:3",
          "3:2",
          "2:5"
        ],
        "answer": 0,
        "explanation": "Keep the stated order: two red to three blue."
      },
      {
        "prompt": "At $3 each, 5 notebooks cost…",
        "options": [
          "$8",
          "$12",
          "$15"
        ],
        "answer": 2,
        "explanation": "Multiply the unit rate by the quantity: 3 × 5 = 15."
      }
    ]
  },
  {
    "id": "pre-reading",
    "grade": "pre",
    "subject": "Reading",
    "title": "Listen for rhymes",
    "objective": "Hear words that end with the same sound.",
    "explain": "Rhyming words share an ending sound. Listen first; you do not need to read the words yet. Ask a grown-up to read the choices aloud.",
    "example": "Cat and hat rhyme. Cat and sun do not.",
    "activity": "Say a word, then invent a silly rhyming word together.",
    "questions": [
      {
        "prompt": "Which rhymes with cat?",
        "options": [
          "Hat",
          "Sun",
          "Dog"
        ],
        "answer": 0,
        "explanation": "Cat and hat share the /at/ ending sound."
      },
      {
        "prompt": "Which rhymes with sun?",
        "options": [
          "Tree",
          "Run",
          "Book"
        ],
        "answer": 1,
        "explanation": "Sun and run share the same ending sound."
      },
      {
        "prompt": "Which rhymes with tree?",
        "options": [
          "Cup",
          "Dog",
          "Bee"
        ],
        "answer": 2,
        "explanation": "Tree and bee end with the same sound."
      }
    ]
  },
  {
    "id": "k-reading",
    "grade": "k",
    "subject": "Reading",
    "title": "Blend short words",
    "objective": "Blend individual sounds into a word.",
    "explain": "Letters can represent sounds. Say each sound slowly, then slide the sounds together. Start with simple consonant-vowel-consonant words.",
    "example": "The sounds /m/ /a/ /p/ blend to make map.",
    "activity": "With a grown-up, tap once for each sound in sun, then blend them.",
    "questions": [
      {
        "prompt": "Blend /m/ /a/ /p/.",
        "options": [
          "Mat",
          "Map",
          "Mop"
        ],
        "answer": 1,
        "explanation": "The last sound is /p/, making map."
      },
      {
        "prompt": "Blend /s/ /u/ /n/.",
        "options": [
          "Sun",
          "Sat",
          "Sip"
        ],
        "answer": 0,
        "explanation": "Slide the three sounds together: sun."
      },
      {
        "prompt": "Which word starts with /m/?",
        "options": [
          "Sun",
          "Cat",
          "Map"
        ],
        "answer": 2,
        "explanation": "Map begins with the /m/ sound."
      }
    ]
  },
  {
    "id": "1-reading",
    "grade": "1",
    "subject": "Reading",
    "title": "Read and recall",
    "objective": "Find details stated in a short story.",
    "explain": "Read the story, then look back for the answer. A detail is a specific piece of information.",
    "example": "Mina has a red kite. She takes it to the park. The wind lifts the kite high.",
    "activity": "Draw the story. Tell a grown-up who was in it, where it happened, and what happened.",
    "questions": [
      {
        "prompt": "What color is the kite?",
        "options": [
          "Blue",
          "Red",
          "Green"
        ],
        "answer": 1,
        "explanation": "The first sentence says the kite is red."
      },
      {
        "prompt": "Where does Mina go?",
        "options": [
          "The park",
          "The store",
          "The school"
        ],
        "answer": 0,
        "explanation": "The story says she takes the kite to the park."
      },
      {
        "prompt": "What lifts the kite?",
        "options": [
          "Rain",
          "A car",
          "The wind"
        ],
        "answer": 2,
        "explanation": "The final sentence says the wind lifts it."
      }
    ]
  },
  {
    "id": "2-reading",
    "grade": "2",
    "subject": "Reading",
    "title": "Put events in order",
    "objective": "Retell events in their order.",
    "explain": "First, next, and finally help us describe a sequence. Find what happened before and after each event.",
    "example": "Jon planted a bean. Next, he watered the soil. Days later, a green sprout appeared.",
    "activity": "Write or draw three boxes: first, next, finally. Retell the bean story.",
    "questions": [
      {
        "prompt": "What happened first?",
        "options": [
          "A sprout appeared",
          "Jon planted a bean",
          "Jon watered the soil"
        ],
        "answer": 1,
        "explanation": "The planting happens before watering and sprouting."
      },
      {
        "prompt": "What happened after planting?",
        "options": [
          "Watering",
          "Harvesting",
          "Cooking"
        ],
        "answer": 0,
        "explanation": "The story says he watered the soil next."
      },
      {
        "prompt": "What appeared days later?",
        "options": [
          "A flowerpot",
          "A kite",
          "A sprout"
        ],
        "answer": 2,
        "explanation": "The final sentence describes a green sprout."
      }
    ]
  },
  {
    "id": "3-reading",
    "grade": "3",
    "subject": "Reading",
    "title": "Make an inference",
    "objective": "Combine story clues with what you know.",
    "explain": "An inference is a reasonable conclusion using clues. It is not a random guess. Explain the clue that supports your idea.",
    "example": "Ada saw dark clouds. She put an umbrella in her bag before leaving.",
    "activity": "Explain why Ada packed an umbrella. Then name the clue you used.",
    "questions": [
      {
        "prompt": "Why did Ada probably pack an umbrella?",
        "options": [
          "To draw clouds",
          "She expected rain",
          "To carry books"
        ],
        "answer": 1,
        "explanation": "Dark clouds and an umbrella together suggest she expected rain."
      },
      {
        "prompt": "Which clue supports that idea?",
        "options": [
          "Dark clouds",
          "A sunny beach",
          "A missing pencil"
        ],
        "answer": 0,
        "explanation": "Dark clouds can signal coming rain."
      },
      {
        "prompt": "A good inference uses…",
        "options": [
          "Only a guess",
          "Only the title",
          "Clues and what you know"
        ],
        "answer": 2,
        "explanation": "Combine evidence from the text with relevant knowledge."
      }
    ]
  },
  {
    "id": "4-reading",
    "grade": "4",
    "subject": "Reading",
    "title": "Find the main idea",
    "objective": "Identify the central point and supporting details.",
    "explain": "The main idea tells what a passage is mostly about. Supporting details explain or show that idea.",
    "example": "Trees help a neighborhood. Their shade cools sidewalks. Their roots hold soil in place. They offer homes for birds.",
    "activity": "Write one main-idea sentence and underline two supporting details.",
    "questions": [
      {
        "prompt": "What is the main idea?",
        "options": [
          "Birds can fly",
          "Trees help neighborhoods",
          "Sidewalks are gray"
        ],
        "answer": 1,
        "explanation": "All the examples show ways trees help a neighborhood."
      },
      {
        "prompt": "Which detail supports the main idea?",
        "options": [
          "Roots hold soil",
          "Cars need fuel",
          "Books have pages"
        ],
        "answer": 0,
        "explanation": "Holding soil in place is one benefit named in the passage."
      },
      {
        "prompt": "A main idea should…",
        "options": [
          "Name one tiny detail",
          "Ignore the passage",
          "Cover the central point"
        ],
        "answer": 2,
        "explanation": "It includes the point that the supporting details develop."
      }
    ]
  },
  {
    "id": "5-reading",
    "grade": "5",
    "subject": "Reading",
    "title": "Support an opinion",
    "objective": "Use reasons and evidence for a claim.",
    "explain": "An opinion is a viewpoint. A strong argument states a claim, gives relevant reasons, and uses evidence. Evidence can be a specific example or fact.",
    "example": "Claim: Our class should read outdoors sometimes. Reason: A shaded, quiet space can offer a different setting. Evidence we could collect: compare student reflections after indoor and outdoor reading.",
    "activity": "Write a claim about a classroom activity. Give two reasons and one example. Do not invent research results.",
    "questions": [
      {
        "prompt": "Which is a claim?",
        "options": [
          "A book has 80 pages",
          "Our class should read outdoors sometimes",
          "Today is Tuesday"
        ],
        "answer": 1,
        "explanation": "The sentence argues for an action rather than just stating a detail."
      },
      {
        "prompt": "Strong evidence should be…",
        "options": [
          "Relevant and accurate",
          "Invented",
          "Unrelated"
        ],
        "answer": 0,
        "explanation": "Evidence must support the claim and be truthful."
      },
      {
        "prompt": "What strengthens an opinion?",
        "options": [
          "Repeating it louder",
          "Leaving out reasons",
          "Giving reasons and examples"
        ],
        "answer": 2,
        "explanation": "Reasons and specific examples help a reader understand your view."
      }
    ]
  },
  {
    "id": "6-reading",
    "grade": "6",
    "subject": "Reading",
    "title": "Evaluate a source",
    "objective": "Ask who created a source and what supports its claims.",
    "explain": "Check the author or organization, purpose, date, evidence, and whether other reliable sources agree. A polished page or popular post is not proof.",
    "example": "A post says a plant grows best without light, but offers no experiment. Before accepting it, look for evidence and check a reliable science source.",
    "activity": "Choose a nonpersonal factual claim. With a grown-up, compare two sources and record their evidence.",
    "questions": [
      {
        "prompt": "What should you check before trusting a claim?",
        "options": [
          "The brightest color",
          "Author and evidence",
          "Number of emojis"
        ],
        "answer": 1,
        "explanation": "Who made the claim and what evidence supports it matter."
      },
      {
        "prompt": "A popular post with no evidence is…",
        "options": [
          "A claim to verify",
          "Automatically correct",
          "A scientific experiment"
        ],
        "answer": 0,
        "explanation": "Popularity does not replace evidence."
      },
      {
        "prompt": "Two sources disagree. What next?",
        "options": [
          "Pick the shorter one",
          "Ignore both forever",
          "Compare evidence and expertise"
        ],
        "answer": 2,
        "explanation": "Assess the quality and relevance of the evidence and sources."
      }
    ]
  },
  {
    "id": "pre-science",
    "grade": "pre",
    "subject": "Science",
    "title": "Use your senses",
    "objective": "Describe objects by looking, listening, and touching safely.",
    "explain": "We can observe with our senses. A grown-up should choose safe objects. Never taste unknown things or touch something hot, sharp, or unsafe.",
    "example": "A soft cloth feels different from a smooth, cool spoon.",
    "activity": "With a grown-up, describe a cloth and a large spoon using words such as soft, smooth, and shiny.",
    "questions": [
      {
        "prompt": "Which sense helps you see a color?",
        "options": [
          "Sight",
          "Hearing",
          "Smell"
        ],
        "answer": 0,
        "explanation": "We use our eyes to see colors."
      },
      {
        "prompt": "Which sense helps you hear a bell?",
        "options": [
          "Touch",
          "Hearing",
          "Sight"
        ],
        "answer": 1,
        "explanation": "We use our ears to hear sounds."
      },
      {
        "prompt": "An unknown object is safe to taste?",
        "options": [
          "Always",
          "If it is colorful",
          "Ask a grown-up; do not taste it"
        ],
        "answer": 2,
        "explanation": "A grown-up must check safety. Never taste unknown objects."
      }
    ]
  },
  {
    "id": "k-science",
    "grade": "k",
    "subject": "Science",
    "title": "What plants need",
    "objective": "Identify basic needs of most plants.",
    "explain": "Most plants need light, water, air, and space to grow. Soil can provide support and nutrients. Different plants need different amounts of water and light.",
    "example": "A bean plant placed near light and watered appropriately can grow leaves.",
    "activity": "With a grown-up, look at a plant. Point to leaves and roots if visible. Draw it.",
    "questions": [
      {
        "prompt": "Most plants need…",
        "options": [
          "Light and water",
          "Only toys",
          "Only darkness"
        ],
        "answer": 0,
        "explanation": "Light and water support plant growth."
      },
      {
        "prompt": "Which part often takes in water?",
        "options": [
          "Flower petals",
          "Roots",
          "Fruit"
        ],
        "answer": 1,
        "explanation": "Roots commonly absorb water from soil."
      },
      {
        "prompt": "Should every plant get the same amount of water?",
        "options": [
          "Yes, always",
          "No plants need water",
          "No, needs vary"
        ],
        "answer": 2,
        "explanation": "Different plants require different amounts."
      }
    ]
  },
  {
    "id": "1-science",
    "grade": "1",
    "subject": "Science",
    "title": "Solids and liquids",
    "objective": "Compare a solid with a liquid.",
    "explain": "A solid usually keeps its shape. A liquid flows and takes the shape of its container. Both take up space.",
    "example": "A block keeps its shape on a table. Water takes the shape of a cup.",
    "activity": "With a grown-up, move water between two containers. Observe how its shape changes.",
    "questions": [
      {
        "prompt": "Which is a solid?",
        "options": [
          "A wooden block",
          "Water",
          "Juice"
        ],
        "answer": 0,
        "explanation": "A wooden block keeps its own shape."
      },
      {
        "prompt": "Which takes the shape of its container?",
        "options": [
          "A rock",
          "Water",
          "A pencil"
        ],
        "answer": 1,
        "explanation": "Water is a liquid and flows into the container shape."
      },
      {
        "prompt": "Both solids and liquids…",
        "options": [
          "Have no volume",
          "Are always cold",
          "Take up space"
        ],
        "answer": 2,
        "explanation": "Both are matter and occupy space."
      }
    ]
  },
  {
    "id": "2-science",
    "grade": "2",
    "subject": "Science",
    "title": "Match animals to habitats",
    "objective": "Explain how habitats meet animal needs.",
    "explain": "A habitat is a place an organism lives. It provides resources such as food, water, shelter, and space. Animals have features that help them live there.",
    "example": "A fish lives in water and uses gills to take oxygen from it.",
    "activity": "Draw an animal in its habitat. Label one source of food and one shelter.",
    "questions": [
      {
        "prompt": "A habitat is…",
        "options": [
          "A place an organism lives",
          "Only a toy",
          "A kind of book"
        ],
        "answer": 0,
        "explanation": "A habitat is the living environment of an organism."
      },
      {
        "prompt": "A fish uses gills to…",
        "options": [
          "Climb trees",
          "Take oxygen from water",
          "Grow feathers"
        ],
        "answer": 1,
        "explanation": "Gills help many fish obtain oxygen from water."
      },
      {
        "prompt": "A habitat should provide…",
        "options": [
          "Only decorations",
          "Only noise",
          "Resources animals need"
        ],
        "answer": 2,
        "explanation": "Food, water, shelter, and space support survival."
      }
    ]
  },
  {
    "id": "3-science",
    "grade": "3",
    "subject": "Science",
    "title": "Follow the water cycle",
    "objective": "Describe evaporation, condensation, and precipitation.",
    "explain": "Evaporation changes liquid water to water vapor. Condensation changes vapor into tiny liquid drops. Precipitation is water falling from clouds, such as rain or snow.",
    "example": "A puddle can shrink as its water evaporates. Cloud droplets can grow and fall as rain.",
    "activity": "Draw arrows from a puddle to a cloud and back. Label evaporation and precipitation.",
    "questions": [
      {
        "prompt": "Liquid water becoming vapor is…",
        "options": [
          "Evaporation",
          "Condensation",
          "Freezing"
        ],
        "answer": 0,
        "explanation": "Evaporation changes liquid water into water vapor."
      },
      {
        "prompt": "Water vapor forming liquid drops is…",
        "options": [
          "Melting",
          "Condensation",
          "Erosion"
        ],
        "answer": 1,
        "explanation": "Condensation forms tiny liquid droplets."
      },
      {
        "prompt": "Rain falling from clouds is…",
        "options": [
          "Evaporation",
          "Reflection",
          "Precipitation"
        ],
        "answer": 2,
        "explanation": "Rain and snow are forms of precipitation."
      }
    ]
  },
  {
    "id": "4-science",
    "grade": "4",
    "subject": "Science",
    "title": "Build a food chain",
    "objective": "Trace energy through a simple food chain.",
    "explain": "A food chain shows one path of energy transfer. Plants capture light energy. Some animals eat plants; other animals eat those animals. Arrows point in the direction energy moves.",
    "example": "Sun → grass → rabbit → hawk. Energy moves from the grass to the rabbit when it eats the grass.",
    "activity": "Draw a food chain. Explain each arrow as energy moving from food to eater.",
    "questions": [
      {
        "prompt": "Which organism is a producer?",
        "options": [
          "Grass",
          "Rabbit",
          "Hawk"
        ],
        "answer": 0,
        "explanation": "Grass makes its own food using light energy."
      },
      {
        "prompt": "Energy moves from grass to…",
        "options": [
          "The sun",
          "A rabbit eating it",
          "A stone"
        ],
        "answer": 1,
        "explanation": "Eating transfers energy from the grass to the rabbit."
      },
      {
        "prompt": "A food-chain arrow shows…",
        "options": [
          "Who is tallest",
          "Where an animal sleeps",
          "Direction of energy transfer"
        ],
        "answer": 2,
        "explanation": "Arrows point from a food source toward its consumer."
      }
    ]
  },
  {
    "id": "5-science",
    "grade": "5",
    "subject": "Science",
    "title": "Matter can change",
    "objective": "Distinguish a change of state from formation of new substances.",
    "explain": "A physical change can alter shape or state without making a new substance. A chemical change forms different substances. Evidence must be considered carefully; one observation alone may not prove a chemical change.",
    "example": "Ice melting is still water. Rusting iron produces new substances.",
    "activity": "With a grown-up, observe an ice cube melting in a bowl. Describe it without using heat or chemicals.",
    "questions": [
      {
        "prompt": "Melting ice is…",
        "options": [
          "A physical change",
          "A new metal",
          "No matter at all"
        ],
        "answer": 0,
        "explanation": "The ice becomes liquid water; it is still water."
      },
      {
        "prompt": "Rust forming on iron is…",
        "options": [
          "Only a shape change",
          "A chemical change",
          "Freezing"
        ],
        "answer": 1,
        "explanation": "Rusting produces different substances."
      },
      {
        "prompt": "A chemical change forms…",
        "options": [
          "Only a new shape",
          "Only larger pieces",
          "Different substances"
        ],
        "answer": 2,
        "explanation": "Formation of different substances is the key distinction."
      }
    ]
  },
  {
    "id": "6-science",
    "grade": "6",
    "subject": "Science",
    "title": "Design a fair test",
    "objective": "Identify variables and compare results fairly.",
    "explain": "Change one independent variable. Measure the dependent variable. Keep other important conditions controlled. Repeated trials help you see whether a result is consistent.",
    "example": "To compare paper airplane wing shapes, use the same paper and launch method. Change the wings and measure flight distance over several trials.",
    "activity": "Plan a paper-airplane test with a grown-up in a clear space. Write what changes, what is measured, and what stays the same.",
    "questions": [
      {
        "prompt": "The variable deliberately changed is…",
        "options": [
          "Independent",
          "Dependent",
          "The result"
        ],
        "answer": 0,
        "explanation": "The independent variable is the factor you choose to change."
      },
      {
        "prompt": "Flight distance is the…",
        "options": [
          "Paper type",
          "Dependent variable",
          "Wing design"
        ],
        "answer": 1,
        "explanation": "Flight distance is the measured outcome."
      },
      {
        "prompt": "Repeated trials help you…",
        "options": [
          "Guarantee a favorite answer",
          "Change all conditions",
          "Check consistency"
        ],
        "answer": 2,
        "explanation": "Repeating a fair test helps assess whether results are consistent."
      }
    ]
  }
];

// Each lesson keeps its original three questions first, then any extra bank questions.
export const lessons:Lesson[] = [...starterLessons,...sequenceLessons,...writingLessons,...socialLessons].map(l=>({...l,questions:[...l.questions,...(questionBanks[l.id]||[])]}));
export function lessonSequence(grade:Grade,subject:Subject){return lessons.filter(l=>l.grade===grade&&l.subject===subject);}
