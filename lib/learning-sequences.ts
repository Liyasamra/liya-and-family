import type { Lesson } from "./learning-content";
export const sequenceLessons:Lesson[] = [
  {
    "id": "3-math-2",
    "grade": "3",
    "subject": "Math",
    "title": "Use arrays to multiply",
    "objective": "Connect rows and columns to equal groups.",
    "explain": "An array arranges objects in equal rows and columns. Count the rows and the number in each row. Multiply to find the total. Turning the array changes its orientation, but not the number of objects.",
    "example": "Three rows of four dots make 3 × 4 = 12 dots. Turn the drawing: four rows of three also make 12.",
    "activity": "Draw two rows of six dots. Turn the paper. Explain why 2 × 6 and 6 × 2 have the same total.",
    "questions": [
      {
        "prompt": "3 rows with 4 dots each contain…",
        "options": [
          "7 dots",
          "12 dots",
          "16 dots"
        ],
        "answer": 1,
        "explanation": "There are three equal groups of four: 4 + 4 + 4 = 12."
      },
      {
        "prompt": "Turn a 2-by-6 array. The total…",
        "options": [
          "Stays 12",
          "Becomes 8",
          "Doubles"
        ],
        "answer": 0,
        "explanation": "Turning an array does not add or remove any dots."
      },
      {
        "prompt": "Which array shows 4 × 5?",
        "options": [
          "Four rows of four",
          "Five rows of five",
          "Four rows of five"
        ],
        "answer": 2,
        "explanation": "Four equal rows, each containing five dots, represent four groups of five."
      }
    ]
  },
  {
    "id": "3-math-3",
    "grade": "3",
    "subject": "Math",
    "title": "Share equally with division",
    "objective": "Use multiplication to check equal sharing.",
    "explain": "Division can answer how many are in each equal group. If 12 counters are shared among 3 groups, each group gets 4. Check by multiplying the number of groups by the number in each group.",
    "example": "12 ÷ 3 = 4, because 3 × 4 = 12. Everyone receives the same number.",
    "activity": "Draw 18 dots. Circle them into three equal groups. Count each group and write a multiplication check.",
    "questions": [
      {
        "prompt": "12 shared among 3 equal groups gives…",
        "options": [
          "9 in each",
          "4 in each",
          "3 in each"
        ],
        "answer": 1,
        "explanation": "Three groups of four use all twelve: 3 × 4 = 12."
      },
      {
        "prompt": "18 ÷ 3 = ?",
        "options": [
          "6",
          "15",
          "9"
        ],
        "answer": 0,
        "explanation": "Three equal groups of six total eighteen."
      },
      {
        "prompt": "Which checks 20 ÷ 4 = 5?",
        "options": [
          "20 + 4 = 24",
          "5 − 4 = 1",
          "4 × 5 = 20"
        ],
        "answer": 2,
        "explanation": "Multiplying the four groups by five in each gives the original twenty."
      }
    ]
  },
  {
    "id": "3-math-4",
    "grade": "3",
    "subject": "Math",
    "title": "Find area with square units",
    "objective": "Measure a rectangle by counting equal square units.",
    "explain": "Area measures the space inside a flat shape. Cover it with equal squares without gaps or overlaps. For a rectangle with whole-number side lengths, multiply its length by its width. Count square units, not just the border.",
    "example": "A rectangle 3 units long and 4 units wide has 3 × 4 = 12 square units of area.",
    "activity": "Draw a rectangle on square grid paper that is 2 squares wide and 5 squares long. Count the squares, then check with multiplication.",
    "questions": [
      {
        "prompt": "A 3-by-4 rectangle has area…",
        "options": [
          "7 square units",
          "12 square units",
          "14 square units"
        ],
        "answer": 1,
        "explanation": "Its twelve equal squares cover the inside of the rectangle."
      },
      {
        "prompt": "A 2-by-5 rectangle has area…",
        "options": [
          "10 square units",
          "7 units",
          "5 square units"
        ],
        "answer": 0,
        "explanation": "Two rows of five squares make ten square units."
      },
      {
        "prompt": "Area describes…",
        "options": [
          "Distance around the edge",
          "How tall a solid is",
          "Space inside a flat shape"
        ],
        "answer": 2,
        "explanation": "The distance around the edge is perimeter; area measures the inside surface."
      }
    ]
  },
  {
    "id": "3-reading-2",
    "grade": "3",
    "subject": "Reading",
    "title": "Follow the order of events",
    "objective": "Retell important events in the order they happened.",
    "explain": "A sequence is the order of events. Words such as first, next, and finally help, but you can also use clues about what must happen before something else. A retelling keeps the important events in order.",
    "example": "First, Nia mixed soil into a pot. Next, she planted a seed and watered it. A week later, a sprout appeared. Finally, she drew the sprout in her notebook.",
    "activity": "Make four boxes. Draw or write the events in the example. Explain why the sprout cannot appear before the seed is planted.",
    "questions": [
      {
        "prompt": "What happened first?",
        "options": [
          "Nia drew a sprout",
          "Nia prepared the pot",
          "A sprout appeared"
        ],
        "answer": 1,
        "explanation": "The opening event is mixing soil into a pot."
      },
      {
        "prompt": "What happened after planting and watering?",
        "options": [
          "A sprout appeared",
          "Nia bought a kite",
          "The pot disappeared"
        ],
        "answer": 0,
        "explanation": "A week after planting and watering, a sprout appeared."
      },
      {
        "prompt": "A good retelling should…",
        "options": [
          "Invent an ending",
          "Mix up events",
          "Keep important events in order"
        ],
        "answer": 2,
        "explanation": "A reader should be able to follow the same sequence as the original story."
      }
    ]
  },
  {
    "id": "3-reading-3",
    "grade": "3",
    "subject": "Reading",
    "title": "Connect cause and effect",
    "objective": "Identify an event and what happened because of it.",
    "explain": "A cause explains why something happens. An effect is what happens as a result. Look for connections supported by the text. Two events happening near each other do not always mean one caused the other.",
    "example": "Heavy rain filled the path with puddles. Because the path was flooded, the walkers chose another route.",
    "activity": "Draw two arrows: rain → puddles; flooded path → different route. Tell which part is the cause and which is the effect.",
    "questions": [
      {
        "prompt": "Why did the walkers choose another route?",
        "options": [
          "They lost their shoes",
          "The path was flooded",
          "They found a shop"
        ],
        "answer": 1,
        "explanation": "The text explicitly connects the flooded path to their route change."
      },
      {
        "prompt": "What was an effect of heavy rain?",
        "options": [
          "Puddles filled the path",
          "The sun became hotter",
          "The path became dry"
        ],
        "answer": 0,
        "explanation": "The passage says heavy rain filled the path with puddles."
      },
      {
        "prompt": "Cause and effect asks…",
        "options": [
          "Which word is longest",
          "Who wrote the title",
          "Why it happened and what resulted"
        ],
        "answer": 2,
        "explanation": "A cause answers why; an effect describes the result."
      }
    ]
  },
  {
    "id": "3-reading-4",
    "grade": "3",
    "subject": "Reading",
    "title": "Use a clue to support your answer",
    "objective": "Explain an answer with evidence from a passage.",
    "explain": "A strong reading answer includes your idea and a detail that supports it. Look back at the passage. You can explain the evidence in your own words. Do not add details that the author did not give.",
    "example": "Sam packed a water bottle and a hat. He checked a map of the trail and tied his walking shoes. These clues suggest he was preparing for a walk outdoors.",
    "activity": "Say: “I think Sam is going for a walk because…” Finish with a clue from the passage. Give a second clue if you can.",
    "questions": [
      {
        "prompt": "What is Sam probably preparing to do?",
        "options": [
          "Cook indoors",
          "Walk outdoors",
          "Go to sleep"
        ],
        "answer": 1,
        "explanation": "The trail map and walking shoes support a walk outdoors."
      },
      {
        "prompt": "Which detail supports that answer?",
        "options": [
          "He checked a trail map",
          "He watched a film",
          "He bought flour"
        ],
        "answer": 0,
        "explanation": "The map is a detail in the passage that connects to walking on a trail."
      },
      {
        "prompt": "A supported answer includes…",
        "options": [
          "An unrelated detail",
          "Only a guess",
          "An idea and a matching clue"
        ],
        "answer": 2,
        "explanation": "Evidence should support the answer and come from the passage."
      }
    ]
  },
  {
    "id": "3-science-2",
    "grade": "3",
    "subject": "Science",
    "title": "Observe the weather",
    "objective": "Describe weather at a place and time.",
    "explain": "Weather is what the atmosphere is like at a place and time. You can observe cloud cover, rain, and wind. A thermometer measures temperature. Record what you actually notice rather than guessing. Observe from a safe place; stay indoors during dangerous weather.",
    "example": "Today: cloudy, light rain, little wind. Yesterday: sunny and dry. These are weather observations, not descriptions of the whole year.",
    "activity": "From a window, record whether the sky is clear or cloudy and whether it is raining. Draw a symbol. Ask a grown-up about any temperature measurement.",
    "questions": [
      {
        "prompt": "Which describes weather today?",
        "options": [
          "Summer is often warm",
          "It is raining this morning",
          "The town was built in 1900"
        ],
        "answer": 1,
        "explanation": "Rain this morning describes conditions at a particular place and time."
      },
      {
        "prompt": "Which tool measures temperature?",
        "options": [
          "Thermometer",
          "Ruler",
          "Compass"
        ],
        "answer": 0,
        "explanation": "A thermometer measures temperature; a ruler measures length."
      },
      {
        "prompt": "During dangerous weather, observe…",
        "options": [
          "From an exposed roof",
          "In a flooded street",
          "From a safe indoor place"
        ],
        "answer": 2,
        "explanation": "Safety comes first. Do not go outdoors to gather weather data during dangerous conditions."
      }
    ]
  },
  {
    "id": "3-science-3",
    "grade": "3",
    "subject": "Science",
    "title": "Read a simple weather record",
    "objective": "Use a small data table to compare observations.",
    "explain": "A record helps us notice patterns instead of relying on memory. Count how many days fit each category. A short record describes those days; it does not prove what every future week will be like.",
    "example": "Five-day record: Monday sunny; Tuesday rainy; Wednesday sunny; Thursday cloudy; Friday rainy. There are two sunny days, two rainy days, and one cloudy day.",
    "activity": "Make five boxes for the example week. Draw a weather symbol in each. Count each category and explain which categories occurred equally often.",
    "questions": [
      {
        "prompt": "How many days were rainy in the example?",
        "options": [
          "1",
          "2",
          "3"
        ],
        "answer": 1,
        "explanation": "Tuesday and Friday were rainy: two days."
      },
      {
        "prompt": "Which categories occurred equally often?",
        "options": [
          "Sunny and rainy",
          "Cloudy and rainy",
          "Sunny and cloudy"
        ],
        "answer": 0,
        "explanation": "Sunny and rainy each occurred twice."
      },
      {
        "prompt": "What can this five-day record tell us?",
        "options": [
          "Next year will be rainy",
          "Every week is identical",
          "What was recorded on those five days"
        ],
        "answer": 2,
        "explanation": "A short observation record supports statements about the observed days, not certainty about future weather."
      }
    ]
  },
  {
    "id": "3-science-4",
    "grade": "3",
    "subject": "Science",
    "title": "Use water thoughtfully",
    "objective": "Connect daily water use to practical conservation.",
    "explain": "Water moves through the water cycle, but clean water available for people to use is not unlimited everywhere. Saving water means avoiding unnecessary waste. Drink enough water and wash properly; do not sacrifice health to save water.",
    "example": "Turning off a running tap while brushing teeth can avoid wasted water. Ask a grown-up to check leaks rather than trying to repair plumbing yourself.",
    "activity": "With a grown-up, name two safe ways to avoid wasting water at home. Draw a reminder. Do not change plumbing or leave a child unsupervised around water.",
    "questions": [
      {
        "prompt": "Which avoids wasting water?",
        "options": [
          "Leave taps running",
          "Turn off the tap while brushing",
          "Stop washing hands"
        ],
        "answer": 1,
        "explanation": "Turning off an unused tap saves water without skipping hygiene."
      },
      {
        "prompt": "What should you do about a dripping tap?",
        "options": [
          "Tell a grown-up",
          "Take apart the pipes",
          "Ignore it forever"
        ],
        "answer": 0,
        "explanation": "An adult can assess and safely handle a leak."
      },
      {
        "prompt": "Saving water should still allow…",
        "options": [
          "Skipping all drinking",
          "Skipping handwashing",
          "Enough drinking and proper hygiene"
        ],
        "answer": 2,
        "explanation": "Health needs come first: drink enough water and wash properly."
      }
    ]
  }
];
