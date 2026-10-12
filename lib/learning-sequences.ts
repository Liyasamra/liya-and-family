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
  },
  {
    "id": "pre-math-2",
    "grade": "pre",
    "subject": "Math",
    "title": "Sort by one feature",
    "objective": "Learn to sort by one feature and explain your thinking.",
    "explain": "Sorting means putting things together that share a feature, such as color or shape. A grown-up can name the feature while you point. Use large safe objects, never small choking hazards.",
    "example": "Put a red sock with another red sock. A blue sock belongs in a different color group.",
    "activity": "With a grown-up, sort large socks by color. Then mix them and sort by size.",
    "questions": [
      {
        "prompt": "When sorting by color, a red sock goes with…",
        "options": [
          "A blue sock",
          "A red sock",
          "Every sock"
        ],
        "answer": 1,
        "explanation": "Both red socks have the same color."
      },
      {
        "prompt": "Which feature names a shape?",
        "options": [
          "Red",
          "Soft",
          "Round"
        ],
        "answer": 2,
        "explanation": "Round tells about shape, not color or texture."
      },
      {
        "prompt": "Can the same socks be sorted another way?",
        "options": [
          "Yes, by size",
          "No",
          "Only once"
        ],
        "answer": 0,
        "explanation": "Objects can be grouped by different features."
      }
    ]
  },
  {
    "id": "pre-math-3",
    "grade": "pre",
    "subject": "Math",
    "title": "Copy a repeating pattern",
    "objective": "Learn to copy a repeating pattern and explain your thinking.",
    "explain": "A repeating pattern follows a little part again and again. Say the part aloud and find what comes next. A grown-up helps you listen and copy.",
    "example": "Clap, tap, clap, tap repeats the part clap, tap. After the last tap comes a clap.",
    "activity": "Make a clap-tap pattern with a grown-up. Take turns adding the next sound.",
    "questions": [
      {
        "prompt": "Clap, tap, clap, tap. What comes next?",
        "options": [
          "Clap",
          "Jump",
          "Tap"
        ],
        "answer": 0,
        "explanation": "The clap-tap part repeats, so clap comes next."
      },
      {
        "prompt": "Red, blue, red, blue repeats…",
        "options": [
          "Blue, blue",
          "Red, blue",
          "Red, red"
        ],
        "answer": 1,
        "explanation": "The two-color part is red followed by blue."
      },
      {
        "prompt": "Jump, sit, jump, sit. After sit comes…",
        "options": [
          "Sit",
          "Sleep",
          "Jump"
        ],
        "answer": 2,
        "explanation": "The repeating jump-sit part begins again with jump."
      }
    ]
  },
  {
    "id": "pre-math-4",
    "grade": "pre",
    "subject": "Math",
    "title": "Name shapes around you",
    "objective": "Learn to name shapes around you and explain your thinking.",
    "explain": "A circle has a curved edge and no corners. A triangle has three straight sides. A square has four equal straight sides. Turn a shape: its name stays the same.",
    "example": "A drawn triangle still has three sides when the paper turns. A square still has four equal sides.",
    "activity": "Ask a grown-up to draw these shapes. Trace their edges with a finger and count sides.",
    "questions": [
      {
        "prompt": "Which shape has no corners?",
        "options": [
          "Square",
          "Triangle",
          "Circle"
        ],
        "answer": 2,
        "explanation": "A circle has a curved edge without corners."
      },
      {
        "prompt": "A triangle has how many sides?",
        "options": [
          "Three",
          "Four",
          "Five"
        ],
        "answer": 0,
        "explanation": "A triangle has three straight sides."
      },
      {
        "prompt": "Turning a square changes it into…",
        "options": [
          "A triangle",
          "It stays a square",
          "A circle"
        ],
        "answer": 1,
        "explanation": "Turning does not change the square’s four equal sides."
      }
    ]
  },
  {
    "id": "pre-reading-2",
    "grade": "pre",
    "subject": "Reading",
    "title": "Hear the first sound",
    "objective": "Learn to hear the first sound and explain your thinking.",
    "explain": "Words begin with sounds you can hear. A grown-up says a word slowly while you listen to its first sound. This is about sounds, not memorizing letter names.",
    "example": "Sun starts with /s/. Sock starts with /s/ too. Moon starts with /m/.",
    "activity": "With a grown-up, say sun, sock, and moon. Find the two that start alike.",
    "questions": [
      {
        "prompt": "Which word starts like sun?",
        "options": [
          "Moon",
          "Sock",
          "Apple"
        ],
        "answer": 1,
        "explanation": "Sun and sock both start with the /s/ sound."
      },
      {
        "prompt": "Which word starts like moon?",
        "options": [
          "Sun",
          "Dog",
          "Map"
        ],
        "answer": 2,
        "explanation": "Moon and map begin with the /m/ sound."
      },
      {
        "prompt": "What do you listen for in this game?",
        "options": [
          "The first sound",
          "The color",
          "The size"
        ],
        "answer": 0,
        "explanation": "The game matches the sounds at the start of words."
      }
    ]
  },
  {
    "id": "pre-reading-3",
    "grade": "pre",
    "subject": "Reading",
    "title": "Tell a story in order",
    "objective": "Learn to tell a story in order and explain your thinking.",
    "explain": "A story has things that happen in order. A grown-up can help you say first, next, and last. Use your own words or point to pictures to tell what happened.",
    "example": "First, Jo puts on shoes. Next, Jo goes outside. Last, Jo plays with a ball.",
    "activity": "Draw or point to three pictures of getting ready to play. Tell a grown-up the order.",
    "questions": [
      {
        "prompt": "What did Jo do first?",
        "options": [
          "Put on shoes",
          "Go outside",
          "Play ball"
        ],
        "answer": 0,
        "explanation": "The story begins with Jo putting on shoes."
      },
      {
        "prompt": "What happened next?",
        "options": [
          "Jo ate lunch",
          "Jo went outside",
          "Jo went to bed"
        ],
        "answer": 1,
        "explanation": "After shoes, Jo went outside in this story."
      },
      {
        "prompt": "What happened last?",
        "options": [
          "Put on shoes",
          "Go outside",
          "Play with a ball"
        ],
        "answer": 2,
        "explanation": "Playing with the ball is the last event given."
      }
    ]
  },
  {
    "id": "pre-reading-4",
    "grade": "pre",
    "subject": "Reading",
    "title": "Talk about a book cover",
    "objective": "Learn to talk about a book cover and explain your thinking.",
    "explain": "A book cover can show a title and a picture. A grown-up reads the title. You can guess what the book might be about, then listen to see whether your guess fits.",
    "example": "A cover shows a puppy beside a title called Puppy’s Day. You might guess the story follows a puppy.",
    "activity": "Choose a book with a grown-up. Point at the cover, make a guess, and listen to the first page.",
    "questions": [
      {
        "prompt": "Who can read the title aloud with you?",
        "options": [
          "A table",
          "A shoe",
          "A grown-up"
        ],
        "answer": 2,
        "explanation": "A grown-up can help you hear the title."
      },
      {
        "prompt": "A puppy on the cover could suggest a story about…",
        "options": [
          "A puppy",
          "Only numbers",
          "A mountain with no animals"
        ],
        "answer": 0,
        "explanation": "The puppy is a clue, but you check your guess by reading."
      },
      {
        "prompt": "After a guess, what helps you find out?",
        "options": [
          "Never open it",
          "Listen to the story",
          "Hide the book"
        ],
        "answer": 1,
        "explanation": "Reading or listening helps you check your cover guess."
      }
    ]
  },
  {
    "id": "pre-science-2",
    "grade": "pre",
    "subject": "Science",
    "title": "Notice living things",
    "objective": "Learn to notice living things and explain your thinking.",
    "explain": "Plants and animals are living things. Plants need water and light; animals need food and water. A toy may look like an animal, but it does not grow or need food.",
    "example": "A real plant can grow new leaves. A toy plant does not grow when watered.",
    "activity": "With a grown-up, look at a plant without touching unknown leaves. Talk about what it needs.",
    "questions": [
      {
        "prompt": "Which is a living thing?",
        "options": [
          "Toy car",
          "Real plant",
          "Shoe"
        ],
        "answer": 1,
        "explanation": "A real plant grows and needs water and light."
      },
      {
        "prompt": "Which needs food and water?",
        "options": [
          "A toy dog",
          "A picture of a dog",
          "A real dog"
        ],
        "answer": 2,
        "explanation": "A living dog needs food and water."
      },
      {
        "prompt": "A toy plant…",
        "options": [
          "Does not grow",
          "Grows roots",
          "Needs lunch"
        ],
        "answer": 0,
        "explanation": "A toy can resemble a plant but is not alive."
      }
    ]
  },
  {
    "id": "pre-science-3",
    "grade": "pre",
    "subject": "Science",
    "title": "Talk about today’s weather",
    "objective": "Learn to talk about today’s weather and explain your thinking.",
    "explain": "Weather is what the air and sky are like today. You may notice sun, clouds, rain, or wind. Look from a safe place with a grown-up; never stare at the sun.",
    "example": "Leaves moving outside can be a clue that wind is blowing. Drops on the window can show rain.",
    "activity": "Look out a window with a grown-up. Draw one weather clue you notice.",
    "questions": [
      {
        "prompt": "Drops falling from clouds are…",
        "options": [
          "Rain",
          "Sand",
          "Leaves"
        ],
        "answer": 0,
        "explanation": "Rain is water that falls from clouds."
      },
      {
        "prompt": "Moving leaves can be a clue for…",
        "options": [
          "A toy indoors",
          "Wind",
          "A quiet book"
        ],
        "answer": 1,
        "explanation": "Wind can push leaves and make them move."
      },
      {
        "prompt": "How should you observe outside weather?",
        "options": [
          "Stare at the sun",
          "Go into a storm",
          "From a safe place"
        ],
        "answer": 2,
        "explanation": "A safe place with a grown-up lets you observe without danger."
      }
    ]
  },
  {
    "id": "pre-science-4",
    "grade": "pre",
    "subject": "Science",
    "title": "Explore pushes and pulls",
    "objective": "Learn to explore pushes and pulls and explain your thinking.",
    "explain": "A push moves something away from your hand. A pull brings it toward you. A grown-up can help you move a large toy gently and notice what happens.",
    "example": "Push a toy car away. Pull a toy wagon toward you. Both actions can make objects move.",
    "activity": "With a grown-up, gently push a large toy across a clear floor, then bring it back.",
    "questions": [
      {
        "prompt": "Moving a toy away with your hand is a…",
        "options": [
          "Nap",
          "Pull",
          "Push"
        ],
        "answer": 2,
        "explanation": "A push sends the toy away from your hand."
      },
      {
        "prompt": "Bringing a wagon toward you is a…",
        "options": [
          "Pull",
          "Push",
          "Color"
        ],
        "answer": 0,
        "explanation": "A pull brings the wagon toward you."
      },
      {
        "prompt": "Pushes and pulls can change…",
        "options": [
          "Yesterday",
          "An object’s motion",
          "A word’s spelling"
        ],
        "answer": 1,
        "explanation": "Forces such as pushes and pulls can make objects move."
      }
    ]
  },
  {
    "id": "k-math-2",
    "grade": "k",
    "subject": "Math",
    "title": "Compare numbers to ten",
    "objective": "Learn to compare numbers to ten and explain your thinking.",
    "explain": "Count each group once. More means a larger number; fewer means a smaller number. If groups have the same count, they are equal even when spread out differently.",
    "example": "Four blocks are fewer than six blocks. Six is more than four.",
    "activity": "Draw four circles and six circles. Pair them to see which group has extra circles.",
    "questions": [
      {
        "prompt": "Which number is greater?",
        "options": [
          "4",
          "6",
          "They are equal"
        ],
        "answer": 1,
        "explanation": "Six is greater because it counts two more than four."
      },
      {
        "prompt": "Three dots and three spread-out dots are…",
        "options": [
          "Always different",
          "Zero dots",
          "Equal in number"
        ],
        "answer": 2,
        "explanation": "Spacing does not change the number of dots."
      },
      {
        "prompt": "Which group has fewer?",
        "options": [
          "5 dots",
          "8 dots",
          "9 dots"
        ],
        "answer": 0,
        "explanation": "Five is smaller than eight and nine."
      }
    ]
  },
  {
    "id": "k-math-3",
    "grade": "k",
    "subject": "Math",
    "title": "Add with pictures",
    "objective": "Learn to add with pictures and explain your thinking.",
    "explain": "Addition joins groups. Draw or move objects to show each group, then count the total. The plus sign means join and the equals sign shows the same amount.",
    "example": "Two apples plus three apples make five apples: 2 + 3 = 5.",
    "activity": "Draw two stars and then three more. Count every star once.",
    "questions": [
      {
        "prompt": "2 + 3 equals…",
        "options": [
          "5",
          "6",
          "4"
        ],
        "answer": 0,
        "explanation": "Joining two objects and three objects gives five."
      },
      {
        "prompt": "1 + 4 equals…",
        "options": [
          "4",
          "5",
          "3"
        ],
        "answer": 1,
        "explanation": "One and four together make five."
      },
      {
        "prompt": "The plus sign tells you to…",
        "options": [
          "Hide both groups",
          "Change their color",
          "Join groups"
        ],
        "answer": 2,
        "explanation": "Addition joins amounts to find their total."
      }
    ]
  },
  {
    "id": "k-math-4",
    "grade": "k",
    "subject": "Math",
    "title": "Take away with pictures",
    "objective": "Learn to take away with pictures and explain your thinking.",
    "explain": "Subtraction can show taking some objects away. Start with the whole group, cross out the number removed, then count what remains. The minus sign means subtract.",
    "example": "Five birds sit on a fence. Two fly away. Three remain: 5 − 2 = 3.",
    "activity": "Draw six circles. Cross out one and count how many are left.",
    "questions": [
      {
        "prompt": "5 − 2 equals…",
        "options": [
          "7",
          "2",
          "3"
        ],
        "answer": 2,
        "explanation": "Taking two from five leaves three."
      },
      {
        "prompt": "6 − 1 equals…",
        "options": [
          "5",
          "6",
          "7"
        ],
        "answer": 0,
        "explanation": "One fewer than six is five."
      },
      {
        "prompt": "To model taking away, you can…",
        "options": [
          "Add more objects",
          "Cross out removed objects",
          "Count only removed objects"
        ],
        "answer": 1,
        "explanation": "Crossing out shows which objects no longer remain."
      }
    ]
  },
  {
    "id": "k-reading-2",
    "grade": "k",
    "subject": "Reading",
    "title": "Match letters and sounds",
    "objective": "Learn to match letters and sounds and explain your thinking.",
    "explain": "Letters can stand for sounds. Today practice m as in map, s as in sun, and t as in top. A grown-up says each sound clearly and helps you connect it to its letter.",
    "example": "The first sound in map is /m/, represented by m. The first sound in top is /t/, represented by t.",
    "activity": "Ask a grown-up to write m, s, t. Say a word and point to its starting letter.",
    "questions": [
      {
        "prompt": "Map begins with the sound represented by…",
        "options": [
          "s",
          "m",
          "t"
        ],
        "answer": 1,
        "explanation": "Map begins with /m/, represented here by m."
      },
      {
        "prompt": "Sun starts with…",
        "options": [
          "t",
          "m",
          "s"
        ],
        "answer": 2,
        "explanation": "Sun begins with /s/, represented here by s."
      },
      {
        "prompt": "Top starts with…",
        "options": [
          "t",
          "m",
          "s"
        ],
        "answer": 0,
        "explanation": "Top begins with /t/, represented here by t."
      }
    ]
  },
  {
    "id": "k-reading-3",
    "grade": "k",
    "subject": "Reading",
    "title": "Build a word family",
    "objective": "Learn to build a word family and explain your thinking.",
    "explain": "Some short words share an ending. Cat, mat, and sat have the ending -at. Change the beginning sound and blend again. A grown-up can help you stretch and join sounds.",
    "example": "Blend /m/ /a/ /t/ to read mat. Change /m/ to /s/ to read sat.",
    "activity": "With a grown-up, write cat, mat, sat. Circle the shared ending and read each word.",
    "questions": [
      {
        "prompt": "Which word shares cat’s -at ending?",
        "options": [
          "Mat",
          "Dog",
          "Sun"
        ],
        "answer": 0,
        "explanation": "Mat and cat both end with the sounds /a/ /t/."
      },
      {
        "prompt": "Change m in mat to s. The word is…",
        "options": [
          "Sit",
          "Sat",
          "Map"
        ],
        "answer": 1,
        "explanation": "Keeping -at and changing the first sound gives sat."
      },
      {
        "prompt": "What is shared by cat, mat, and sat?",
        "options": [
          "The first letter",
          "The number of animals",
          "The ending -at"
        ],
        "answer": 2,
        "explanation": "The words share the same ending and rhyme."
      }
    ]
  },
  {
    "id": "k-reading-4",
    "grade": "k",
    "subject": "Reading",
    "title": "Find who and where",
    "objective": "Learn to find who and where and explain your thinking.",
    "explain": "A story has characters, the people or animals in it. The setting tells where it happens. A grown-up can read the story while you find who and where.",
    "example": "Ben and his dog play in a garden. Ben and the dog are characters. The garden is the setting.",
    "activity": "Draw Ben, the dog, and the garden. Point to the characters and then the place.",
    "questions": [
      {
        "prompt": "Who is a character?",
        "options": [
          "The word play",
          "The garden",
          "Ben"
        ],
        "answer": 2,
        "explanation": "Ben takes part in the story, so he is a character."
      },
      {
        "prompt": "Where does the story happen?",
        "options": [
          "In a garden",
          "On the moon",
          "At the beach"
        ],
        "answer": 0,
        "explanation": "The story says Ben and his dog play in a garden."
      },
      {
        "prompt": "A setting tells…",
        "options": [
          "Only a sound",
          "Where a story happens",
          "Only a name"
        ],
        "answer": 1,
        "explanation": "The setting is the place, and can also include the time."
      }
    ]
  },
  {
    "id": "k-science-2",
    "grade": "k",
    "subject": "Science",
    "title": "Use materials wisely",
    "objective": "Learn to use materials wisely and explain your thinking.",
    "explain": "Objects are made from materials such as paper, wood, cloth, or plastic. Different materials have different properties. Notice how a material feels and works without tasting it.",
    "example": "A cloth towel bends and absorbs water. A plastic spoon keeps its shape and does not absorb water like a towel.",
    "activity": "With a grown-up, compare a dry towel and a spoon. Describe bendy, stiff, soft, or hard.",
    "questions": [
      {
        "prompt": "A cloth towel is usually…",
        "options": [
          "Made of rock",
          "Soft and bendy",
          "A liquid"
        ],
        "answer": 1,
        "explanation": "Cloth towels can bend and feel soft."
      },
      {
        "prompt": "Which often absorbs water?",
        "options": [
          "A plastic spoon",
          "A metal fork",
          "A cloth towel"
        ],
        "answer": 2,
        "explanation": "A towel’s cloth takes in water better than a spoon or fork."
      },
      {
        "prompt": "When exploring materials, you should…",
        "options": [
          "Look and touch safe objects",
          "Taste unknown objects",
          "Touch sharp edges"
        ],
        "answer": 0,
        "explanation": "Observe safe objects with a grown-up and avoid tasting materials."
      }
    ]
  },
  {
    "id": "k-science-3",
    "grade": "k",
    "subject": "Science",
    "title": "Compare animal coverings",
    "objective": "Learn to compare animal coverings and explain your thinking.",
    "explain": "Animals can have different body coverings. Many birds have feathers, many mammals have hair or fur, and many fish have scales. Coverings help animals in their environments.",
    "example": "A robin has feathers. A rabbit has fur. A goldfish has scales.",
    "activity": "Draw these three animals and label their coverings. Observe pictures rather than handling wildlife.",
    "questions": [
      {
        "prompt": "A robin has…",
        "options": [
          "Feathers",
          "Paper",
          "Fur"
        ],
        "answer": 0,
        "explanation": "Robins are birds, and birds have feathers."
      },
      {
        "prompt": "A rabbit has…",
        "options": [
          "Metal",
          "Fur",
          "Feathers"
        ],
        "answer": 1,
        "explanation": "A rabbit is a mammal with fur."
      },
      {
        "prompt": "A goldfish has…",
        "options": [
          "Feathers",
          "Cloth",
          "Scales"
        ],
        "answer": 2,
        "explanation": "Goldfish have scales covering their bodies."
      }
    ]
  },
  {
    "id": "k-science-4",
    "grade": "k",
    "subject": "Science",
    "title": "Watch a shadow change",
    "objective": "Learn to watch a shadow change and explain your thinking.",
    "explain": "A shadow appears when an object blocks light. You need a light source, an object, and a surface to see the shadow. Never aim bright lights into eyes.",
    "example": "A hand between a flashlight and a wall blocks some light and makes a hand-shaped shadow.",
    "activity": "With a grown-up, use a flashlight and your hand near a wall. Notice the shadow when the hand moves.",
    "questions": [
      {
        "prompt": "What makes a shadow?",
        "options": [
          "A smell",
          "Sound",
          "An object blocking light"
        ],
        "answer": 2,
        "explanation": "A shadow forms where an object blocks light."
      },
      {
        "prompt": "Which can be a light source?",
        "options": [
          "A flashlight",
          "A pillow",
          "A shoe"
        ],
        "answer": 0,
        "explanation": "A flashlight produces the light needed for this activity."
      },
      {
        "prompt": "How should you use a flashlight?",
        "options": [
          "Touch its battery contacts",
          "Point away from eyes",
          "Shine into eyes"
        ],
        "answer": 1,
        "explanation": "Keep light away from eyes while observing shadows safely."
      }
    ]
  },
  {
    "id": "1-math-2",
    "grade": "1",
    "subject": "Math",
    "title": "Add using ten",
    "objective": "Learn to add using ten and explain your thinking.",
    "explain": "Making ten can make addition easier. Split one number so part fills the first number to ten. Add the leftover part to ten. Draw counters if you need help.",
    "example": "For 8 + 5, use 2 of the 5 to make 10. The remaining 3 gives 10 + 3 = 13.",
    "activity": "Draw eight dots and five dots. Circle a group of ten, then count the dots left outside.",
    "questions": [
      {
        "prompt": "8 + 5 equals…",
        "options": [
          "12",
          "13",
          "15"
        ],
        "answer": 1,
        "explanation": "Eight needs two to make ten; three more makes thirteen."
      },
      {
        "prompt": "How many does 8 need to make 10?",
        "options": [
          "3",
          "5",
          "2"
        ],
        "answer": 2,
        "explanation": "Ten minus eight is two."
      },
      {
        "prompt": "9 + 4 can become…",
        "options": [
          "10 + 3",
          "10 + 4",
          "9 + 1"
        ],
        "answer": 0,
        "explanation": "Use one from four to make ten, leaving three."
      }
    ]
  },
  {
    "id": "1-math-3",
    "grade": "1",
    "subject": "Math",
    "title": "Subtract within twenty",
    "objective": "Learn to subtract within twenty and explain your thinking.",
    "explain": "Subtraction can tell how many are left or how far apart two amounts are. Use a drawing or count backward from the starting number. Check by adding the amount taken away.",
    "example": "14 − 4 = 10. Check: 10 + 4 = 14.",
    "activity": "Draw fifteen tally marks. Cross out three and count the remaining marks.",
    "questions": [
      {
        "prompt": "14 − 4 equals…",
        "options": [
          "10",
          "18",
          "8"
        ],
        "answer": 0,
        "explanation": "Removing four from fourteen leaves ten."
      },
      {
        "prompt": "15 − 3 equals…",
        "options": [
          "18",
          "12",
          "13"
        ],
        "answer": 1,
        "explanation": "Fifteen with three removed is twelve."
      },
      {
        "prompt": "Which checks 12 − 2 = 10?",
        "options": [
          "12 + 2 = 14",
          "10 − 2 = 8",
          "10 + 2 = 12"
        ],
        "answer": 2,
        "explanation": "Adding the removed two to the remaining ten gives twelve."
      }
    ]
  },
  {
    "id": "1-math-4",
    "grade": "1",
    "subject": "Math",
    "title": "Measure with equal units",
    "objective": "Learn to measure with equal units and explain your thinking.",
    "explain": "Measure length by placing equal units end to end. Start at one end, leave no gaps, and do not overlap units. The count tells the length in those units.",
    "example": "A pencil spans six equal blocks without gaps. Its length is six block units.",
    "activity": "Measure a book edge using equal paper squares. Line them up neatly and count.",
    "questions": [
      {
        "prompt": "Measurement units should be…",
        "options": [
          "Random sizes",
          "Different sizes",
          "Equal sizes"
        ],
        "answer": 2,
        "explanation": "Equal units give a consistent measurement."
      },
      {
        "prompt": "Six blocks covering an edge mean…",
        "options": [
          "Six block units",
          "Six minutes",
          "Six colors"
        ],
        "answer": 0,
        "explanation": "The count measures length in the block units used."
      },
      {
        "prompt": "For accurate measurement, place units…",
        "options": [
          "Overlapping",
          "End to end without gaps",
          "With big gaps"
        ],
        "answer": 1,
        "explanation": "Gaps or overlaps change the count incorrectly."
      }
    ]
  },
  {
    "id": "1-reading-2",
    "grade": "1",
    "subject": "Reading",
    "title": "Read long-vowel words",
    "objective": "Learn to read long-vowel words and explain your thinking.",
    "explain": "In many short words, a final silent e helps the first vowel say its name. Compare cap and cape, or kit and kite. This is a useful pattern, although English has exceptions.",
    "example": "Cap has a short a. Cape ends with silent e and has a long a sound.",
    "activity": "Write cap/cape and kit/kite. Read each pair aloud and underline the added e.",
    "questions": [
      {
        "prompt": "Which word has a long a in this pair?",
        "options": [
          "Cap",
          "Cape",
          "Cat"
        ],
        "answer": 1,
        "explanation": "In cape, final silent e helps a say its long sound."
      },
      {
        "prompt": "Add e to kit to make…",
        "options": [
          "Cat",
          "Cut",
          "Kite"
        ],
        "answer": 2,
        "explanation": "Kit becomes kite, with a long i sound."
      },
      {
        "prompt": "The final e in kite is usually…",
        "options": [
          "Silent",
          "Spoken as ee",
          "The first sound"
        ],
        "answer": 0,
        "explanation": "The final e is not pronounced in kite."
      }
    ]
  },
  {
    "id": "1-reading-3",
    "grade": "1",
    "subject": "Reading",
    "title": "Find a story’s problem",
    "objective": "Learn to find a story’s problem and explain your thinking.",
    "explain": "A story’s problem is a difficulty a character faces. A solution is what helps resolve it. Look for what went wrong and what the character did next.",
    "example": "Nia cannot find her library book. She looks under the bed and finds it. The missing book is the problem; finding it solves it.",
    "activity": "Draw the problem and solution in two boxes. Tell the story in your own words.",
    "questions": [
      {
        "prompt": "What is Nia’s problem?",
        "options": [
          "She cannot find her book",
          "She has a pencil",
          "Her bed is blue"
        ],
        "answer": 0,
        "explanation": "The difficulty in the story is the missing library book."
      },
      {
        "prompt": "What helps solve it?",
        "options": [
          "Losing another book",
          "Looking under the bed",
          "Closing her eyes"
        ],
        "answer": 1,
        "explanation": "Nia finds the book by looking under the bed."
      },
      {
        "prompt": "A solution…",
        "options": [
          "Always starts a problem",
          "Is only a character’s name",
          "Helps resolve a problem"
        ],
        "answer": 2,
        "explanation": "A solution answers or resolves the difficulty."
      }
    ]
  },
  {
    "id": "1-reading-4",
    "grade": "1",
    "subject": "Reading",
    "title": "Use a sentence clue",
    "objective": "Learn to use a sentence clue and explain your thinking.",
    "explain": "A sentence can help you understand a new word. Look for nearby actions or descriptions. Try a meaning and check that it fits the whole sentence.",
    "example": "The puppy was tiny; it fit inside a small basket. Tiny means very small because the basket clue shows its size.",
    "activity": "Make a drawing for tiny. Say another sentence that uses the word correctly.",
    "questions": [
      {
        "prompt": "Tiny most likely means…",
        "options": [
          "Very old",
          "Very noisy",
          "Very small"
        ],
        "answer": 2,
        "explanation": "Fitting in a small basket is a clue for very small."
      },
      {
        "prompt": "Which clue helps you?",
        "options": [
          "Small basket",
          "The word the",
          "The punctuation alone"
        ],
        "answer": 0,
        "explanation": "The basket’s small size helps explain tiny."
      },
      {
        "prompt": "How can you check a word meaning?",
        "options": [
          "Guess its color",
          "See whether it fits the sentence",
          "Ignore the sentence"
        ],
        "answer": 1,
        "explanation": "A useful meaning should make sense with the surrounding words."
      }
    ]
  },
  {
    "id": "1-science-2",
    "grade": "1",
    "subject": "Science",
    "title": "Follow a day and night pattern",
    "objective": "Learn to follow a day and night pattern and explain your thinking.",
    "explain": "Day and night repeat. During daytime your area faces the Sun; at night it faces away as Earth turns. The Sun is still shining even when your area is dark.",
    "example": "Morning, afternoon, night, and another morning form a repeating daily pattern.",
    "activity": "Draw things you notice in daylight and at night. Observe from a safe place with a grown-up.",
    "questions": [
      {
        "prompt": "What makes day and night repeat?",
        "options": [
          "Clouds eat the Sun",
          "Earth turns",
          "The Sun turns off"
        ],
        "answer": 1,
        "explanation": "Earth’s rotation changes whether your area faces the Sun."
      },
      {
        "prompt": "At night, the Sun…",
        "options": [
          "Disappears forever",
          "Becomes the Moon",
          "Still shines"
        ],
        "answer": 2,
        "explanation": "The Sun still shines while your area faces away from it."
      },
      {
        "prompt": "After night usually comes…",
        "options": [
          "Day again",
          "Another year immediately",
          "No more daylight"
        ],
        "answer": 0,
        "explanation": "Day and night follow a repeating pattern."
      }
    ]
  },
  {
    "id": "1-science-3",
    "grade": "1",
    "subject": "Science",
    "title": "Notice animal needs",
    "objective": "Learn to notice animal needs and explain your thinking.",
    "explain": "Animals need food, water, air, and suitable shelter or space. Different animals meet these needs in different ways. Watch animals safely without feeding or approaching wildlife.",
    "example": "A bird may find seeds for food and use a nest to raise young. A pet needs care from a responsible grown-up.",
    "activity": "Draw an animal and show where it could find food, water, and shelter.",
    "questions": [
      {
        "prompt": "Which is a basic animal need?",
        "options": [
          "Water",
          "A pencil",
          "A television"
        ],
        "answer": 0,
        "explanation": "Water is one of an animal’s basic needs."
      },
      {
        "prompt": "Shelter can help an animal…",
        "options": [
          "Become a plant",
          "Stay protected",
          "Read a book"
        ],
        "answer": 1,
        "explanation": "Suitable shelter offers protection in an animal’s environment."
      },
      {
        "prompt": "When watching wildlife, you should…",
        "options": [
          "Chase it",
          "Feed it sweets",
          "Keep a safe distance"
        ],
        "answer": 2,
        "explanation": "Observe without disturbing or feeding wild animals."
      }
    ]
  },
  {
    "id": "1-science-4",
    "grade": "1",
    "subject": "Science",
    "title": "Listen for vibrations",
    "objective": "Learn to listen for vibrations and explain your thinking.",
    "explain": "Sound is made by vibrating objects. Vibrating means moving back and forth. You can sometimes feel a gentle vibration while you hear the sound it makes.",
    "example": "When you hum, your voice makes vibrations you can feel by resting fingers gently on your throat.",
    "activity": "Hum softly and gently touch your throat. Then stop and compare what you feel.",
    "questions": [
      {
        "prompt": "Sound begins with…",
        "options": [
          "A color",
          "A shadow",
          "Vibrations"
        ],
        "answer": 2,
        "explanation": "Vibrating objects produce sound."
      },
      {
        "prompt": "Vibrating means moving…",
        "options": [
          "Back and forth",
          "Only once forever",
          "Without any motion"
        ],
        "answer": 0,
        "explanation": "A vibration is repeated back-and-forth motion."
      },
      {
        "prompt": "When you stop humming, the throat vibration…",
        "options": [
          "Turns into light",
          "Usually stops",
          "Must get stronger"
        ],
        "answer": 1,
        "explanation": "The sound-making vibration stops when you stop humming."
      }
    ]
  },
  {
    "id": "2-math-2",
    "grade": "2",
    "subject": "Math",
    "title": "Subtract with regrouping",
    "objective": "Learn to subtract with regrouping and explain your thinking.",
    "explain": "When there are not enough ones to subtract, trade one ten for ten ones. The total value stays the same. Subtract ones, then tens, and check with addition.",
    "example": "42 − 17: trade one ten to get 3 tens and 12 ones. 12 − 7 = 5 and 3 − 1 = 2 tens, so 25.",
    "activity": "Draw four tens and two ones. Trade a ten into ten ones, then cross out seventeen.",
    "questions": [
      {
        "prompt": "42 − 17 equals…",
        "options": [
          "35",
          "25",
          "29"
        ],
        "answer": 1,
        "explanation": "Regrouping gives 12 − 7 = 5 ones and 3 − 1 = 2 tens."
      },
      {
        "prompt": "One ten can be traded for…",
        "options": [
          "One one",
          "Two ones",
          "Ten ones"
        ],
        "answer": 2,
        "explanation": "A ten and ten ones have the same value."
      },
      {
        "prompt": "Which checks the answer 25?",
        "options": [
          "25 + 17 = 42",
          "25 − 17 = 8",
          "42 + 17 = 59"
        ],
        "answer": 0,
        "explanation": "Adding the removed amount back recovers the original forty-two."
      }
    ]
  },
  {
    "id": "2-math-3",
    "grade": "2",
    "subject": "Math",
    "title": "Count equal coin values",
    "objective": "Learn to count equal coin values and explain your thinking.",
    "explain": "U.S. coins have different values: penny 1 cent, nickel 5 cents, dime 10 cents, quarter 25 cents. Add coin values, not just the number of coins.",
    "example": "Two dimes and one nickel are 10 + 10 + 5 = 25 cents.",
    "activity": "Draw two dimes and three pennies. Label their values and find the total; use drawings instead of small coins.",
    "questions": [
      {
        "prompt": "Two dimes and a nickel total…",
        "options": [
          "25 cents",
          "3 cents",
          "15 cents"
        ],
        "answer": 0,
        "explanation": "Ten plus ten plus five equals twenty-five cents."
      },
      {
        "prompt": "A nickel is worth…",
        "options": [
          "25 cents",
          "5 cents",
          "10 cents"
        ],
        "answer": 1,
        "explanation": "A U.S. nickel has a value of five cents."
      },
      {
        "prompt": "Two dimes and three pennies total…",
        "options": [
          "5 cents",
          "32 cents",
          "23 cents"
        ],
        "answer": 2,
        "explanation": "Twenty cents plus three cents equals twenty-three cents."
      }
    ]
  },
  {
    "id": "2-math-4",
    "grade": "2",
    "subject": "Math",
    "title": "Read a picture graph",
    "objective": "Learn to read a picture graph and explain your thinking.",
    "explain": "A picture graph uses symbols to show counts. Always read the key: one picture may stand for one or several items. Compare totals to answer questions.",
    "example": "Each star means one vote. Apples have four stars; bananas have two. Apples have two more votes.",
    "activity": "Make a graph of favorite fruits using one star per vote. Write a key and compare two rows.",
    "questions": [
      {
        "prompt": "Four stars with one vote each mean…",
        "options": [
          "8 votes",
          "2 votes",
          "4 votes"
        ],
        "answer": 2,
        "explanation": "The key says one star is one vote, so four stars mean four."
      },
      {
        "prompt": "Four votes compared with two are…",
        "options": [
          "Two more",
          "One fewer",
          "Equal"
        ],
        "answer": 0,
        "explanation": "Four minus two is two more votes."
      },
      {
        "prompt": "What should you read before counting symbols?",
        "options": [
          "The page number",
          "The graph key",
          "Only the title color"
        ],
        "answer": 1,
        "explanation": "The key tells how many items each symbol represents."
      }
    ]
  },
  {
    "id": "2-reading-2",
    "grade": "2",
    "subject": "Reading",
    "title": "Compare two characters",
    "objective": "Learn to compare two characters and explain your thinking.",
    "explain": "Compare means notice what is alike. Contrast means notice what differs. Use details from the story rather than guessing what a character is like.",
    "example": "Leo and Ava both help clean the park. Leo picks up paper; Ava waters plants. Both help, but they do different jobs.",
    "activity": "Draw a two-column chart for Leo and Ava. Write one shared action and one difference.",
    "questions": [
      {
        "prompt": "What is alike about Leo and Ava?",
        "options": [
          "They both water plants",
          "They both help the park",
          "They both pick up paper"
        ],
        "answer": 1,
        "explanation": "Both characters help clean or care for the park."
      },
      {
        "prompt": "What does Leo do?",
        "options": [
          "Waters plants",
          "Paints a wall",
          "Picks up paper"
        ],
        "answer": 2,
        "explanation": "The story says Leo picks up paper."
      },
      {
        "prompt": "A difference is that…",
        "options": [
          "Ava waters plants and Leo picks up paper",
          "Neither helps",
          "Both do the same job"
        ],
        "answer": 0,
        "explanation": "Their shared goal is helping, but their tasks differ."
      }
    ]
  },
  {
    "id": "2-reading-3",
    "grade": "2",
    "subject": "Reading",
    "title": "Use nonfiction features",
    "objective": "Learn to use nonfiction features and explain your thinking.",
    "explain": "Nonfiction gives information. A heading names a section’s topic; a caption explains a picture. Use these features along with the text to find and understand information.",
    "example": "A page has a heading called Bee Homes. Under a hive photo, a caption says Bees live together in this hive.",
    "activity": "Find a heading and a caption in an informational book. Explain what each helps you learn.",
    "questions": [
      {
        "prompt": "Bee Homes is a…",
        "options": [
          "Heading",
          "Question answer",
          "Character"
        ],
        "answer": 0,
        "explanation": "It labels what the section discusses."
      },
      {
        "prompt": "A caption usually explains…",
        "options": [
          "Only the cover color",
          "A picture",
          "Every book ever written"
        ],
        "answer": 1,
        "explanation": "Captions add information about a nearby picture."
      },
      {
        "prompt": "To learn details, use headings and…",
        "options": [
          "Ignore all text",
          "Only count pages",
          "Read the section text"
        ],
        "answer": 2,
        "explanation": "Headings help you navigate, while the text supplies details."
      }
    ]
  },
  {
    "id": "2-reading-4",
    "grade": "2",
    "subject": "Reading",
    "title": "Find cause and effect",
    "objective": "Learn to find cause and effect and explain your thinking.",
    "explain": "A cause tells why something happens. An effect tells what happens as a result. Words such as because and so can help you connect the two.",
    "example": "The rain filled the puddle, so Omar wore boots. Rain filling the puddle is the cause; wearing boots is the effect described.",
    "activity": "Draw a cause arrow pointing to an effect. Use an example from the story.",
    "questions": [
      {
        "prompt": "Why did Omar wear boots?",
        "options": [
          "The sky was clear",
          "He wanted to swim",
          "Rain filled the puddle"
        ],
        "answer": 2,
        "explanation": "The wet puddle caused him to choose boots."
      },
      {
        "prompt": "What is the effect described?",
        "options": [
          "Omar wore boots",
          "Rain began last year",
          "A book opened"
        ],
        "answer": 0,
        "explanation": "Wearing boots is the result of the wet conditions."
      },
      {
        "prompt": "Which word can connect a cause to an effect?",
        "options": [
          "Triangle",
          "Because",
          "Purple"
        ],
        "answer": 1,
        "explanation": "Because often introduces the reason something happened."
      }
    ]
  },
  {
    "id": "2-science-2",
    "grade": "2",
    "subject": "Science",
    "title": "Follow a simple life cycle",
    "objective": "Learn to follow a simple life cycle and explain your thinking.",
    "explain": "A life cycle describes stages as a living thing grows and produces new life. A butterfly develops through egg, caterpillar, chrysalis, and adult butterfly stages.",
    "example": "A caterpillar grows after hatching from an egg. Later a chrysalis forms, and an adult butterfly emerges.",
    "activity": "Draw four butterfly stages in order and connect them with arrows.",
    "questions": [
      {
        "prompt": "Which comes after an egg in this cycle?",
        "options": [
          "Adult butterfly",
          "Caterpillar",
          "Stone"
        ],
        "answer": 1,
        "explanation": "A caterpillar hatches from the butterfly egg."
      },
      {
        "prompt": "Which stage comes before the adult butterfly?",
        "options": [
          "Rock",
          "Seed",
          "Chrysalis"
        ],
        "answer": 2,
        "explanation": "The adult emerges after the chrysalis stage."
      },
      {
        "prompt": "A life cycle shows…",
        "options": [
          "Stages of growth and reproduction",
          "Only where an animal lives",
          "Only its color"
        ],
        "answer": 0,
        "explanation": "Life cycles describe how living things develop and produce new life."
      }
    ]
  },
  {
    "id": "2-science-3",
    "grade": "2",
    "subject": "Science",
    "title": "Test what absorbs water",
    "objective": "Learn to test what absorbs water and explain your thinking.",
    "explain": "Some materials absorb water, taking it into spaces inside them. Others let water remain on the surface. Compare equal small drops on safe materials to observe this property.",
    "example": "A paper towel takes in a drop of water. On waxed paper, a drop often stays on the surface.",
    "activity": "With a grown-up, place equal small drops on a paper towel and waxed paper over a tray. Compare.",
    "questions": [
      {
        "prompt": "Absorb means…",
        "options": [
          "Take in water",
          "Make noise",
          "Make light"
        ],
        "answer": 0,
        "explanation": "An absorbent material takes water into itself."
      },
      {
        "prompt": "Which is likely to absorb the drop?",
        "options": [
          "Plastic lid",
          "Paper towel",
          "Waxed paper"
        ],
        "answer": 1,
        "explanation": "A paper towel has spaces that take in water."
      },
      {
        "prompt": "For a fair comparison, use…",
        "options": [
          "Different huge amounts",
          "No water at all",
          "Equal small drops"
        ],
        "answer": 2,
        "explanation": "Equal amounts help you compare the materials rather than water quantity."
      }
    ]
  },
  {
    "id": "2-science-4",
    "grade": "2",
    "subject": "Science",
    "title": "Notice changes to land",
    "objective": "Learn to notice changes to land and explain your thinking.",
    "explain": "Water and wind can move soil and sand. Erosion is the movement of this material. Plants can help hold soil with roots. Observe small models with a grown-up and protect real habitats.",
    "example": "A little water poured over loose sand can carry grains downhill. Roots can help keep soil in place.",
    "activity": "Over a tray, ask a grown-up to trickle water over a small sand mound. Notice where grains move.",
    "questions": [
      {
        "prompt": "Movement of soil by water is called…",
        "options": [
          "Melting",
          "Reading",
          "Erosion"
        ],
        "answer": 2,
        "explanation": "Erosion moves soil or other material from one place to another."
      },
      {
        "prompt": "What can help hold soil in place?",
        "options": [
          "Plant roots",
          "Loose paper",
          "A flashlight"
        ],
        "answer": 0,
        "explanation": "Roots can help keep soil from being carried away."
      },
      {
        "prompt": "In the model, moved sand shows…",
        "options": [
          "That water cannot move things",
          "Water can carry material",
          "That sand is alive"
        ],
        "answer": 1,
        "explanation": "Moving grains provide evidence that flowing water transports material."
      }
    ]
  },
  {
    "id": "4-math-2",
    "grade": "4",
    "subject": "Math",
    "title": "Compare fractions",
    "objective": "Learn to compare fractions and explain your thinking.",
    "explain": "To compare fractions, use equal wholes. Rewrite fractions with a common denominator or draw equal-sized models. A larger numerator means more parts only when the denominators match.",
    "example": "Compare 2/3 and 3/4: 2/3 = 8/12 and 3/4 = 9/12. Since 8 < 9, 2/3 < 3/4.",
    "activity": "Draw two equal rectangles. Shade two thirds of one and three fourths of the other.",
    "questions": [
      {
        "prompt": "Which is larger: 2/3 or 3/4?",
        "options": [
          "2/3",
          "3/4",
          "They are equal"
        ],
        "answer": 1,
        "explanation": "They become 8/12 and 9/12, so three fourths is larger."
      },
      {
        "prompt": "2/3 equals…",
        "options": [
          "2/12",
          "6/12",
          "8/12"
        ],
        "answer": 2,
        "explanation": "Multiplying numerator and denominator by four gives eight twelfths."
      },
      {
        "prompt": "Fraction models should use…",
        "options": [
          "Equal-sized wholes",
          "Different-sized wholes",
          "Only the bigger numerator"
        ],
        "answer": 0,
        "explanation": "Equal wholes allow a meaningful comparison of parts."
      }
    ]
  },
  {
    "id": "4-math-3",
    "grade": "4",
    "subject": "Math",
    "title": "Multiply with place value",
    "objective": "Learn to multiply with place value and explain your thinking.",
    "explain": "Break a factor into tens and ones. Multiply each part and add the partial products. This uses the distributive property and keeps the value of every digit clear.",
    "example": "23 × 4 = (20 × 4) + (3 × 4) = 80 + 12 = 92.",
    "activity": "Draw an area model with twenty-three columns split into twenty and three, and four rows.",
    "questions": [
      {
        "prompt": "23 × 4 equals…",
        "options": [
          "92",
          "27",
          "82"
        ],
        "answer": 0,
        "explanation": "The partial products eighty and twelve add to ninety-two."
      },
      {
        "prompt": "The tens part of 23 × 4 is…",
        "options": [
          "3 × 4",
          "20 × 4",
          "2 × 4"
        ],
        "answer": 1,
        "explanation": "The digit two in twenty-three represents twenty."
      },
      {
        "prompt": "After finding partial products, you…",
        "options": [
          "Always subtract them",
          "Ignore one",
          "Add them"
        ],
        "answer": 2,
        "explanation": "The parts together represent the whole product."
      }
    ]
  },
  {
    "id": "4-math-4",
    "grade": "4",
    "subject": "Math",
    "title": "Find perimeter",
    "objective": "Learn to find perimeter and explain your thinking.",
    "explain": "Perimeter is the distance around a shape. Add all side lengths using the same unit. For a rectangle, opposite sides have equal lengths. Perimeter differs from area, which measures inside space.",
    "example": "A rectangle 6 cm long and 4 cm wide has perimeter 6 + 4 + 6 + 4 = 20 cm.",
    "activity": "Draw a rectangle and label all four sides. Add the labels to find its perimeter.",
    "questions": [
      {
        "prompt": "A 6 cm by 4 cm rectangle has perimeter…",
        "options": [
          "24 cm",
          "10 cm",
          "20 cm"
        ],
        "answer": 2,
        "explanation": "Adding all four sides gives twenty centimeters."
      },
      {
        "prompt": "Perimeter measures…",
        "options": [
          "Distance around a shape",
          "Space inside a shape",
          "Weight"
        ],
        "answer": 0,
        "explanation": "Perimeter follows the boundary around the shape."
      },
      {
        "prompt": "A square with sides of 3 cm has perimeter…",
        "options": [
          "9 cm",
          "12 cm",
          "6 cm"
        ],
        "answer": 1,
        "explanation": "Four sides of three centimeters total twelve centimeters."
      }
    ]
  },
  {
    "id": "4-reading-2",
    "grade": "4",
    "subject": "Reading",
    "title": "Summarize a passage",
    "objective": "Learn to summarize a passage and explain your thinking.",
    "explain": "A summary gives the main idea and key details in your own words. Leave out minor details and your opinion. Keep the meaning of the original passage.",
    "example": "Students planted a garden. They watered seedlings and measured growth each week. A summary: Students cared for a garden and tracked its growth.",
    "activity": "Write a one-sentence summary of the example, then check that it includes the central action.",
    "questions": [
      {
        "prompt": "Which is the best summary?",
        "options": [
          "Gardens are always perfect",
          "Students cared for a garden and tracked growth",
          "Someone had a blue pencil"
        ],
        "answer": 1,
        "explanation": "It captures the main action and important detail."
      },
      {
        "prompt": "A summary should use…",
        "options": [
          "Only your opinion",
          "Every original sentence",
          "Your own words"
        ],
        "answer": 2,
        "explanation": "A summary restates key information briefly in your own words."
      },
      {
        "prompt": "Which detail is central in this passage?",
        "options": [
          "Measuring plant growth",
          "The color of shoes",
          "The day of a birthday"
        ],
        "answer": 0,
        "explanation": "Tracking growth is a key action explicitly described."
      }
    ]
  },
  {
    "id": "4-reading-3",
    "grade": "4",
    "subject": "Reading",
    "title": "Infer a word from context",
    "objective": "Learn to infer a word from context and explain your thinking.",
    "explain": "Context clues are nearby words that suggest meaning. A contrast can be especially useful. Check a possible definition by replacing the word in the sentence and rereading it.",
    "example": "Unlike the crowded bus, the library was tranquil and quiet. Quiet and the contrast with crowded suggest tranquil means calm.",
    "activity": "Replace tranquil with calm in the sentence. Explain why that meaning fits.",
    "questions": [
      {
        "prompt": "Tranquil most likely means…",
        "options": [
          "Calm and quiet",
          "Very tiny",
          "Busy and loud"
        ],
        "answer": 0,
        "explanation": "Quiet and the contrast with the bus suggest calm."
      },
      {
        "prompt": "Which clue helps most?",
        "options": [
          "The word was alone",
          "Quiet",
          "The word the"
        ],
        "answer": 1,
        "explanation": "Quiet directly supports the meaning of tranquil."
      },
      {
        "prompt": "To check your meaning, you can…",
        "options": [
          "Count all letters only",
          "Ignore context",
          "Replace the word and reread"
        ],
        "answer": 2,
        "explanation": "The replacement should make sense within the sentence."
      }
    ]
  },
  {
    "id": "4-reading-4",
    "grade": "4",
    "subject": "Reading",
    "title": "Compare firsthand and secondhand accounts",
    "objective": "Learn to compare firsthand and secondhand accounts and explain your thinking.",
    "explain": "A firsthand account comes from someone who experienced an event. A secondhand account describes it using other people’s information. Compare perspectives and details; neither type is automatically accurate.",
    "example": "A gardener writes I planted the seeds yesterday. A reporter writes The gardener said she planted seeds yesterday. The first is firsthand; the second reports another person’s account.",
    "activity": "Write one sentence as the gardener and one as a reporter. Label each account type.",
    "questions": [
      {
        "prompt": "Which is firsthand?",
        "options": [
          "A friend repeats a rumor",
          "A reporter quotes a gardener",
          "The gardener describes planting her own seeds"
        ],
        "answer": 2,
        "explanation": "The gardener personally experienced planting the seeds."
      },
      {
        "prompt": "A secondhand account uses…",
        "options": [
          "Information from others",
          "Only personal memories",
          "No information"
        ],
        "answer": 0,
        "explanation": "Secondhand accounts rely on what others report or record."
      },
      {
        "prompt": "Should you check both types for accuracy?",
        "options": [
          "Neither type",
          "Yes, both",
          "Only firsthand accounts"
        ],
        "answer": 1,
        "explanation": "Being firsthand or secondhand does not guarantee accuracy."
      }
    ]
  },
  {
    "id": "4-science-2",
    "grade": "4",
    "subject": "Science",
    "title": "Trace energy in a food chain",
    "objective": "Learn to trace energy in a food chain and explain your thinking.",
    "explain": "A food chain shows energy moving between living things. Plants use sunlight to make food. An animal gets energy by eating a plant or another animal. Arrows point toward the organism receiving energy.",
    "example": "Sunlight supports grass. A rabbit eats grass; a fox eats the rabbit. Energy moves grass → rabbit → fox.",
    "activity": "Draw the example chain and explain what each arrow represents.",
    "questions": [
      {
        "prompt": "In grass → rabbit, energy moves to…",
        "options": [
          "Grass",
          "Rabbit",
          "Soil only"
        ],
        "answer": 1,
        "explanation": "The rabbit receives energy by eating grass."
      },
      {
        "prompt": "Which uses sunlight to make food?",
        "options": [
          "Fox",
          "Rabbit",
          "Grass"
        ],
        "answer": 2,
        "explanation": "Grass is a plant and can make food using sunlight."
      },
      {
        "prompt": "Food-chain arrows show…",
        "options": [
          "Energy transfer",
          "Only body size",
          "The direction animals walk"
        ],
        "answer": 0,
        "explanation": "Arrows point toward the organism receiving energy from food."
      }
    ]
  },
  {
    "id": "4-science-3",
    "grade": "4",
    "subject": "Science",
    "title": "Observe waves",
    "objective": "Learn to observe waves and explain your thinking.",
    "explain": "Waves transfer energy. In a simple water model, ripples move outward while a floating object mostly bobs near its place. This helps distinguish wave motion from transporting material across the whole container.",
    "example": "A gentle tap on water creates ripples. A floating leaf bobs as the ripples pass.",
    "activity": "With a grown-up, use a shallow tray of water and a floating leaf. Tap gently and record observations.",
    "questions": [
      {
        "prompt": "Waves transfer…",
        "options": [
          "Energy",
          "No motion at all",
          "Only labels"
        ],
        "answer": 0,
        "explanation": "Waves carry energy through a system."
      },
      {
        "prompt": "A floating leaf in gentle ripples often…",
        "options": [
          "Becomes water",
          "Bobs near its place",
          "Flies into space"
        ],
        "answer": 1,
        "explanation": "The wave travels while the leaf mainly moves up and down nearby."
      },
      {
        "prompt": "Which is an observation?",
        "options": [
          "All waves are identical",
          "Water has feelings",
          "The leaf bobbed when ripples passed"
        ],
        "answer": 2,
        "explanation": "It reports what you can directly see in the model."
      }
    ]
  },
  {
    "id": "4-science-4",
    "grade": "4",
    "subject": "Science",
    "title": "Model weathering and erosion",
    "objective": "Learn to model weathering and erosion and explain your thinking.",
    "explain": "Weathering breaks rock into smaller pieces. Erosion moves those pieces. The two processes can work together but describe different actions. A model helps you see the difference.",
    "example": "A cracker broken into crumbs models weathering. Sliding the crumbs across a tray models erosion; the cracker is only a model, not actual rock.",
    "activity": "With a grown-up, break a cracker over a tray, then gently move crumbs with a spoon. Label both actions.",
    "questions": [
      {
        "prompt": "Breaking rock into smaller pieces is…",
        "options": [
          "Condensation",
          "Evaporation",
          "Weathering"
        ],
        "answer": 2,
        "explanation": "Weathering breaks rock down without requiring movement to another place."
      },
      {
        "prompt": "Moving the pieces models…",
        "options": [
          "Erosion",
          "Photosynthesis",
          "Freezing"
        ],
        "answer": 0,
        "explanation": "Erosion carries weathered material from place to place."
      },
      {
        "prompt": "A cracker model…",
        "options": [
          "Proves every land change",
          "Shows selected parts of a process",
          "Is exactly the same as rock"
        ],
        "answer": 1,
        "explanation": "Models simplify reality and have limits."
      }
    ]
  },
  {
    "id": "5-math-2",
    "grade": "5",
    "subject": "Math",
    "title": "Multiply a fraction by a whole number",
    "objective": "Learn to multiply a fraction by a whole number and explain your thinking.",
    "explain": "Multiplying a fraction by a whole number can mean repeated equal portions. Multiply the numerator by the whole number and keep the denominator, then simplify if possible.",
    "example": "Three servings of 2/5 cup use 3 × 2/5 = 6/5 = 1 1/5 cups.",
    "activity": "Draw three bars, each showing two fifths. Count all fifths and regroup one whole.",
    "questions": [
      {
        "prompt": "3 × 2/5 equals…",
        "options": [
          "5/5",
          "6/5",
          "6/15"
        ],
        "answer": 1,
        "explanation": "Three groups of two fifths contain six fifths."
      },
      {
        "prompt": "6/5 as a mixed number is…",
        "options": [
          "1 2/5",
          "2 1/5",
          "1 1/5"
        ],
        "answer": 2,
        "explanation": "Five fifths make one whole, leaving one fifth."
      },
      {
        "prompt": "4 × 1/3 equals…",
        "options": [
          "4/3",
          "1/12",
          "4/12"
        ],
        "answer": 0,
        "explanation": "Four groups of one third give four thirds."
      }
    ]
  },
  {
    "id": "5-math-3",
    "grade": "5",
    "subject": "Math",
    "title": "Multiply decimals with place value",
    "objective": "Learn to multiply decimals with place value and explain your thinking.",
    "explain": "Decimal multiplication uses the value of each digit. You can first multiply whole-number digits, then scale by their place values. Estimate to check that the result is reasonable.",
    "example": "0.4 × 0.3 means four tenths times three tenths: twelve hundredths, or 0.12.",
    "activity": "Shade four tenths of a square one way and three tenths the other way. Count overlap squares on a hundred-grid.",
    "questions": [
      {
        "prompt": "0.4 × 0.3 equals…",
        "options": [
          "0.12",
          "12",
          "1.2"
        ],
        "answer": 0,
        "explanation": "Tenths times tenths are hundredths, so the result is twelve hundredths."
      },
      {
        "prompt": "0.5 × 2 equals…",
        "options": [
          "10",
          "1",
          "0.1"
        ],
        "answer": 1,
        "explanation": "Two halves make one whole."
      },
      {
        "prompt": "Why is 0.12 reasonable for 0.4 × 0.3?",
        "options": [
          "Products must be whole",
          "It is greater than both factors",
          "Taking 0.3 of 0.4 gives less than 0.4"
        ],
        "answer": 2,
        "explanation": "Multiplying a positive number by a factor less than one scales it down."
      }
    ]
  },
  {
    "id": "5-math-4",
    "grade": "5",
    "subject": "Math",
    "title": "Find volume with unit cubes",
    "objective": "Learn to find volume with unit cubes and explain your thinking.",
    "explain": "Volume measures space inside a solid. A rectangular prism filled without gaps has length × width × height unit cubes. Keep the units consistent and report cubic units.",
    "example": "A box 3 cm long, 2 cm wide, and 4 cm high has volume 3 × 2 × 4 = 24 cubic centimeters.",
    "activity": "Sketch four layers of six cubes each. Show how layer count gives total volume.",
    "questions": [
      {
        "prompt": "A 3 by 2 by 4 prism has volume…",
        "options": [
          "12 cubic units",
          "9 cubic units",
          "24 cubic units"
        ],
        "answer": 2,
        "explanation": "Each layer has six cubes and four layers contain twenty-four."
      },
      {
        "prompt": "Volume uses…",
        "options": [
          "Cubic units",
          "Only centimeters of length",
          "Square units only"
        ],
        "answer": 0,
        "explanation": "Three-dimensional space is measured in cubic units."
      },
      {
        "prompt": "A 2 by 2 by 2 cube has volume…",
        "options": [
          "4 cubic units",
          "8 cubic units",
          "6 cubic units"
        ],
        "answer": 1,
        "explanation": "Two times two times two equals eight."
      }
    ]
  },
  {
    "id": "5-reading-2",
    "grade": "5",
    "subject": "Reading",
    "title": "Identify theme with evidence",
    "objective": "Learn to identify theme with evidence and explain your thinking.",
    "explain": "A theme is an idea about life that a story develops. It differs from a one-word topic or a plot summary. Explain a theme using specific choices and events from the text.",
    "example": "Eli practices a difficult song each day and eventually performs it. A supported theme is that steady practice can help people improve.",
    "activity": "Write the theme and underline the event that supports it. Suggest another event that would fit.",
    "questions": [
      {
        "prompt": "Which theme fits the story?",
        "options": [
          "Songs always sound alike",
          "Steady practice can help improvement",
          "Every task is easy"
        ],
        "answer": 1,
        "explanation": "Eli’s repeated practice followed by improvement supports this idea."
      },
      {
        "prompt": "What is the best evidence?",
        "options": [
          "Eli has a name",
          "Songs have notes",
          "Eli practiced daily and later performed"
        ],
        "answer": 2,
        "explanation": "This detail links effort to the outcome."
      },
      {
        "prompt": "A theme is usually…",
        "options": [
          "An idea the story develops",
          "Only a character’s name",
          "Only the setting"
        ],
        "answer": 0,
        "explanation": "Themes express broader ideas supported by story events."
      }
    ]
  },
  {
    "id": "5-reading-3",
    "grade": "5",
    "subject": "Reading",
    "title": "Compare two texts on one topic",
    "objective": "Learn to compare two texts on one topic and explain your thinking.",
    "explain": "Two texts can discuss the same topic with different focus or evidence. Identify what both say and what each adds. Keep track of which source supports each detail.",
    "example": "Text A says trees shade playgrounds. Text B says tree roots help hold soil. Both describe benefits of trees, but focus on different benefits.",
    "activity": "Make a chart with one shared topic and one unique detail from each text.",
    "questions": [
      {
        "prompt": "What topic do both texts share?",
        "options": [
          "Benefits of trees",
          "Cooking rice",
          "Ocean animals"
        ],
        "answer": 0,
        "explanation": "Both passages explain something helpful that trees do."
      },
      {
        "prompt": "Which detail comes from Text B?",
        "options": [
          "Trees are blue",
          "Roots help hold soil",
          "Trees shade playgrounds"
        ],
        "answer": 1,
        "explanation": "The roots detail is explicitly in Text B."
      },
      {
        "prompt": "When combining information, you should…",
        "options": [
          "Invent missing facts",
          "Forget the source",
          "Track which text supports each detail"
        ],
        "answer": 2,
        "explanation": "Source tracking helps you represent both texts accurately."
      }
    ]
  },
  {
    "id": "5-reading-4",
    "grade": "5",
    "subject": "Reading",
    "title": "Recognize figurative language",
    "objective": "Learn to recognize figurative language and explain your thinking.",
    "explain": "A simile compares using like or as. A metaphor describes one thing as another. These expressions create an image rather than always stating a literal fact. Use context to interpret them.",
    "example": "Her smile was like sunshine is a simile. Her smile was sunshine is a metaphor. Both suggest warmth or happiness.",
    "activity": "Write a simile about a friendly sound. Explain the feeling your comparison suggests.",
    "questions": [
      {
        "prompt": "Which is a simile?",
        "options": [
          "She smiled",
          "Her smile was sunshine",
          "Her smile was like sunshine"
        ],
        "answer": 2,
        "explanation": "The comparison uses like, which marks a simile here."
      },
      {
        "prompt": "Her smile was sunshine is a…",
        "options": [
          "Metaphor",
          "Measurement",
          "Literal weather report"
        ],
        "answer": 0,
        "explanation": "It directly describes a smile as sunshine to suggest warmth."
      },
      {
        "prompt": "The comparison most likely suggests…",
        "options": [
          "A precise temperature",
          "Warmth or happiness",
          "A dangerous storm"
        ],
        "answer": 1,
        "explanation": "Context connects sunshine’s pleasant feeling with the smile."
      }
    ]
  },
  {
    "id": "5-science-2",
    "grade": "5",
    "subject": "Science",
    "title": "Follow matter in the water cycle",
    "objective": "Learn to follow matter in the water cycle and explain your thinking.",
    "explain": "Water changes location and state in the water cycle. Evaporation changes liquid water into water vapor; condensation changes vapor into liquid droplets. Water is still matter even when vapor is invisible.",
    "example": "Water on a wet cloth can evaporate into the air. Water vapor can condense into droplets on a cool surface.",
    "activity": "With a grown-up, observe droplets outside a cold cup. Describe the change without using hot water.",
    "questions": [
      {
        "prompt": "Evaporation changes liquid water to…",
        "options": [
          "Rock",
          "Water vapor",
          "Metal"
        ],
        "answer": 1,
        "explanation": "Evaporation produces water in its gas state."
      },
      {
        "prompt": "Condensation changes vapor into…",
        "options": [
          "Sand",
          "Light",
          "Liquid droplets"
        ],
        "answer": 2,
        "explanation": "Cooling can cause water vapor to become liquid water."
      },
      {
        "prompt": "Invisible water vapor…",
        "options": [
          "Is still matter",
          "Is not matter",
          "Has no mass"
        ],
        "answer": 0,
        "explanation": "Gases such as water vapor have mass and occupy space."
      }
    ]
  },
  {
    "id": "5-science-3",
    "grade": "5",
    "subject": "Science",
    "title": "Explain decomposers",
    "objective": "Learn to explain decomposers and explain your thinking.",
    "explain": "Decomposers, including many fungi and bacteria, break down dead organisms and wastes. This helps return nutrients to the environment. Do not handle unknown fungi or mold; use pictures or observations at a distance.",
    "example": "Fungi breaking down a fallen log help return nutrients that plants can use. The log gradually changes as it decomposes.",
    "activity": "Draw a fallen leaf, decomposers, soil nutrients, and a plant. Use arrows to show the connections.",
    "questions": [
      {
        "prompt": "Decomposers help…",
        "options": [
          "Break down dead material",
          "Make plastic toys",
          "Stop all plant growth"
        ],
        "answer": 0,
        "explanation": "Decomposers break down remains and wastes."
      },
      {
        "prompt": "Which can be a decomposer?",
        "options": [
          "A stone",
          "A fungus",
          "A plastic bag"
        ],
        "answer": 1,
        "explanation": "Many fungi break down dead organic matter."
      },
      {
        "prompt": "Returned nutrients can…",
        "options": [
          "Disappear from every ecosystem",
          "Only make noise",
          "Be used by growing plants"
        ],
        "answer": 2,
        "explanation": "Plants can take up nutrients returned to the environment."
      }
    ]
  },
  {
    "id": "5-science-4",
    "grade": "5",
    "subject": "Science",
    "title": "Use evidence in a science explanation",
    "objective": "Learn to use evidence in a science explanation and explain your thinking.",
    "explain": "A science explanation connects a claim to observations. Evidence is recorded information, not just a guess. Explain why your evidence supports your claim and mention what your test cannot show.",
    "example": "A seedling near a window grew more than one in a dark cupboard in this small test. That observation supports a light-related explanation, but one trial is not proof for every plant.",
    "activity": "Write a claim, one measured observation, and one limitation for the seedling example.",
    "questions": [
      {
        "prompt": "Which is evidence?",
        "options": [
          "A wish for faster growth",
          "Plants prefer my favorite color",
          "Recorded seedling heights"
        ],
        "answer": 2,
        "explanation": "Recorded measurements are observable information."
      },
      {
        "prompt": "Why repeat a test?",
        "options": [
          "To check whether results are consistent",
          "To guarantee your first guess",
          "To hide results"
        ],
        "answer": 0,
        "explanation": "Repeating helps you assess reliability and variation."
      },
      {
        "prompt": "One small test proves…",
        "options": [
          "All questions are settled",
          "Only limited conclusions from its evidence",
          "Every plant behaves identically"
        ],
        "answer": 1,
        "explanation": "A small test has limits; explain them rather than overgeneralizing."
      }
    ]
  },
  {
    "id": "6-math-2",
    "grade": "6",
    "subject": "Math",
    "title": "Work with negative numbers",
    "objective": "Learn to work with negative numbers and explain your thinking.",
    "explain": "Negative numbers are less than zero. On a number line, values increase to the right. A number farther left is smaller, even when its distance from zero is greater.",
    "example": "−5 is less than −2 because −5 lies farther left. The opposite of −5 is 5; both are five units from zero.",
    "activity": "Draw a number line from −6 to 6. Mark −5, −2, 0, and 5.",
    "questions": [
      {
        "prompt": "Which is greater?",
        "options": [
          "−5",
          "−2",
          "They are equal"
        ],
        "answer": 1,
        "explanation": "Negative two lies to the right of negative five."
      },
      {
        "prompt": "The opposite of −5 is…",
        "options": [
          "−5",
          "0",
          "5"
        ],
        "answer": 2,
        "explanation": "Opposites lie the same distance from zero on different sides."
      },
      {
        "prompt": "The absolute value of −5 is…",
        "options": [
          "5",
          "−5",
          "0"
        ],
        "answer": 0,
        "explanation": "Absolute value is distance from zero, which is five units."
      }
    ]
  },
  {
    "id": "6-math-3",
    "grade": "6",
    "subject": "Math",
    "title": "Evaluate an expression",
    "objective": "Learn to evaluate an expression and explain your thinking.",
    "explain": "A variable represents a value. Substitute its given value, then follow order of operations: grouping, exponents, multiplication or division left to right, addition or subtraction left to right.",
    "example": "For x = 4, 3x + 2 = 3 × 4 + 2 = 14. Multiplication happens before addition.",
    "activity": "Evaluate 2n + 5 for n = 3 and n = 6. Show your substitution steps.",
    "questions": [
      {
        "prompt": "3x + 2 when x = 4 is…",
        "options": [
          "14",
          "9",
          "18"
        ],
        "answer": 0,
        "explanation": "Multiply three by four, then add two to get fourteen."
      },
      {
        "prompt": "2n + 5 when n = 3 is…",
        "options": [
          "10",
          "11",
          "16"
        ],
        "answer": 1,
        "explanation": "Substituting three gives six plus five, or eleven."
      },
      {
        "prompt": "In 3 × 4 + 2, first…",
        "options": [
          "Add 4 and 2",
          "Add 3 and 2",
          "Multiply 3 and 4"
        ],
        "answer": 2,
        "explanation": "Multiplication comes before addition in this expression."
      }
    ]
  },
  {
    "id": "6-math-4",
    "grade": "6",
    "subject": "Math",
    "title": "Describe data with mean and median",
    "objective": "Learn to describe data with mean and median and explain your thinking.",
    "explain": "The mean is the total divided by the number of values. The median is the middle value after ordering the data; with two middle values, average them. A very large or small value can affect the mean strongly.",
    "example": "For 2, 3, 4, 5, 16, the mean is 30 ÷ 5 = 6. The median is 4. The large value 16 pulls the mean upward.",
    "activity": "Order the values 8, 2, 4, 6. Find their mean and median and compare.",
    "questions": [
      {
        "prompt": "The mean of 2, 3, 4, 5, 16 is…",
        "options": [
          "16",
          "4",
          "6"
        ],
        "answer": 2,
        "explanation": "The total is thirty, divided by five values gives six."
      },
      {
        "prompt": "The median of 2, 3, 4, 5, 16 is…",
        "options": [
          "4",
          "6",
          "5"
        ],
        "answer": 0,
        "explanation": "The third value is the middle of the ordered five values."
      },
      {
        "prompt": "For 2, 4, 6, 8, the median is…",
        "options": [
          "6",
          "5",
          "4"
        ],
        "answer": 1,
        "explanation": "The two middle values are four and six; their average is five."
      }
    ]
  },
  {
    "id": "6-reading-2",
    "grade": "6",
    "subject": "Reading",
    "title": "Build a text-based inference",
    "objective": "Learn to build a text-based inference and explain your thinking.",
    "explain": "An inference combines text details with reasonable thinking. It goes beyond a stated fact but stays supported by evidence. Distinguish a strong inference from a possibility with no supporting detail.",
    "example": "Mara rehearsed her speech three times and checked her notes before stepping onstage. We can infer she wanted to be prepared, but not that she won an award.",
    "activity": "Write one supported inference and list two details behind it. Add one unsupported guess for comparison.",
    "questions": [
      {
        "prompt": "Which inference is best supported?",
        "options": [
          "Mara won a prize",
          "Mara wanted to be prepared",
          "Mara dislikes everyone"
        ],
        "answer": 1,
        "explanation": "Rehearsal and checking notes both support preparation."
      },
      {
        "prompt": "Which detail is evidence?",
        "options": [
          "She must be famous",
          "She will win tomorrow",
          "She rehearsed three times"
        ],
        "answer": 2,
        "explanation": "Rehearsing three times is explicitly stated in the passage."
      },
      {
        "prompt": "Why is winning an award unsupported?",
        "options": [
          "The text gives no award information",
          "Awards never exist",
          "Mara has no notes"
        ],
        "answer": 0,
        "explanation": "The passage describes preparation, not an award outcome."
      }
    ]
  },
  {
    "id": "6-reading-3",
    "grade": "6",
    "subject": "Reading",
    "title": "Check a claim and its evidence",
    "objective": "Learn to check a claim and its evidence and explain your thinking.",
    "explain": "A claim is a statement an author wants you to accept. Evidence should be relevant and sufficient for that claim. Ask what was measured, how the information was gathered, and whether the conclusion goes beyond it.",
    "example": "A poster says Everyone loves the new lunch because three friends liked it. Three friends’ opinions do not establish what everyone thinks.",
    "activity": "Rewrite the poster claim so it matches the evidence. Suggest how to learn about more students.",
    "questions": [
      {
        "prompt": "What is the claim?",
        "options": [
          "Everyone loves the new lunch",
          "The poster has words",
          "Three friends were asked"
        ],
        "answer": 0,
        "explanation": "Everyone loves the new lunch is the statement being argued."
      },
      {
        "prompt": "What does the evidence actually show?",
        "options": [
          "No student disliked it",
          "Three friends liked the lunch",
          "Every student liked it"
        ],
        "answer": 1,
        "explanation": "The evidence concerns only three friends."
      },
      {
        "prompt": "A better next step is to…",
        "options": [
          "Repeat the claim louder",
          "Ignore other students",
          "Survey a broader range of students"
        ],
        "answer": 2,
        "explanation": "A broader sample can give more representative evidence."
      }
    ]
  },
  {
    "id": "6-reading-4",
    "grade": "6",
    "subject": "Reading",
    "title": "Write a focused summary",
    "objective": "Learn to write a focused summary and explain your thinking.",
    "explain": "A focused summary presents the central idea and important support objectively. Use your own words and avoid adding unsupported opinions. When summarizing a source, identify it so readers can check the original.",
    "example": "A school report describes a garden club planting vegetables, recording growth, and donating produce. A summary: The garden club grew vegetables, tracked growth, and shared its harvest.",
    "activity": "Write a summary of the example in one sentence. Check that every statement is supported.",
    "questions": [
      {
        "prompt": "Which summary fits best?",
        "options": [
          "All students love gardening",
          "The club is the greatest club ever",
          "The club grew vegetables, tracked growth, and shared its harvest"
        ],
        "answer": 2,
        "explanation": "It includes the main actions without adding unsupported judgments."
      },
      {
        "prompt": "A summary should avoid…",
        "options": [
          "Unsupported opinions",
          "Main ideas",
          "Important details"
        ],
        "answer": 0,
        "explanation": "A summary represents the source rather than your personal judgment."
      },
      {
        "prompt": "Why identify the source?",
        "options": [
          "To hide the original",
          "So readers can check the original",
          "To make it longer only"
        ],
        "answer": 1,
        "explanation": "Source information helps readers verify the summary."
      }
    ]
  },
  {
    "id": "6-science-2",
    "grade": "6",
    "subject": "Science",
    "title": "Distinguish mass and weight",
    "objective": "Learn to distinguish mass and weight and explain your thinking.",
    "explain": "Mass describes the amount of matter in an object. Weight is the gravitational force on that object. Moving to a place with different gravity changes weight but does not by itself change mass.",
    "example": "An astronaut’s mass is the same on Earth and the Moon, but the astronaut weighs less on the Moon because its gravity is weaker.",
    "activity": "Make a two-column comparison of mass and weight. Explain the astronaut example in your own words.",
    "questions": [
      {
        "prompt": "On the Moon, the astronaut’s mass is…",
        "options": [
          "Zero",
          "The same as on Earth",
          "Always twice as large"
        ],
        "answer": 1,
        "explanation": "Changing location does not by itself change the amount of matter."
      },
      {
        "prompt": "Weight is a…",
        "options": [
          "Color",
          "Volume measurement",
          "Gravitational force"
        ],
        "answer": 2,
        "explanation": "Weight measures the force due to gravity on an object."
      },
      {
        "prompt": "Weight is lower on the Moon because…",
        "options": [
          "The Moon’s gravity is weaker",
          "The astronaut loses all matter",
          "There is no gravity"
        ],
        "answer": 0,
        "explanation": "The Moon has gravity, but it pulls less strongly than Earth."
      }
    ]
  },
  {
    "id": "6-science-3",
    "grade": "6",
    "subject": "Science",
    "title": "Trace energy transformations",
    "objective": "Learn to trace energy transformations and explain your thinking.",
    "explain": "Energy can transfer and change form. In a battery-powered flashlight, stored chemical energy becomes electrical energy, then light and thermal energy. The device does not create energy from nothing.",
    "example": "A flashlight battery supplies energy to a circuit. The lamp produces light and also warms slightly.",
    "activity": "Draw an energy-flow diagram for a flashlight. Label chemical, electrical, light, and thermal energy.",
    "questions": [
      {
        "prompt": "The battery stores primarily…",
        "options": [
          "Chemical energy",
          "Only light",
          "Sound energy"
        ],
        "answer": 0,
        "explanation": "Battery chemicals store energy that can power the circuit."
      },
      {
        "prompt": "A flashlight produces light and…",
        "options": [
          "No other energy",
          "Thermal energy",
          "New matter from nothing"
        ],
        "answer": 1,
        "explanation": "Some energy becomes heat in the device."
      },
      {
        "prompt": "Energy transformations mean energy…",
        "options": [
          "Appears from nothing",
          "Must vanish completely",
          "Changes form"
        ],
        "answer": 2,
        "explanation": "Energy can change form while being conserved overall."
      }
    ]
  },
  {
    "id": "6-science-4",
    "grade": "6",
    "subject": "Science",
    "title": "Improve an investigation",
    "objective": "Learn to improve an investigation and explain your thinking.",
    "explain": "A useful investigation changes one independent variable, measures a dependent variable, and keeps important other conditions consistent. Repeat trials, record results, and describe limitations instead of forcing the outcome you expected.",
    "example": "To compare paper airplane designs, keep paper size and launch method consistent, measure flight distance, and repeat each design’s trials. Launch differences can affect the result.",
    "activity": "Plan three trials for each of two designs. Make a data table and list conditions to keep consistent.",
    "questions": [
      {
        "prompt": "The independent variable here is…",
        "options": [
          "The table color",
          "The measured distance",
          "Airplane design"
        ],
        "answer": 2,
        "explanation": "Design is the factor deliberately changed between groups."
      },
      {
        "prompt": "The dependent variable is…",
        "options": [
          "Flight distance",
          "Paper size kept constant",
          "The student’s name"
        ],
        "answer": 0,
        "explanation": "Distance is the outcome measured in response to design."
      },
      {
        "prompt": "Repeating trials helps you…",
        "options": [
          "Guarantee no variation",
          "See variation and compare more reliably",
          "Choose only your favorite result"
        ],
        "answer": 1,
        "explanation": "Repeated measurements reveal variation and strengthen comparisons."
      }
    ]
  }
];
