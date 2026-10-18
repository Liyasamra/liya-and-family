// Ohio standards each lesson practices (checked 2026-10-17).
// Math and English: Ohio's Learning Standards (2017), which use the same codes as the Common Core.
// Science: Ohio's Learning Standards for Science (2018). Social Studies: Ohio's Learning Standards for Social Studies (2018), by grade theme and strand.
// Preschool: Ohio's Early Learning and Development Standards (ELDS), by domain.
// "review" marks a skill Ohio places one grade earlier that is practiced again here.
export const standards: Record<string, string> = {
 // Math
 "pre-math": "ELDS Math: number sense (count and compare)", "pre-math-2": "ELDS Math: measurement and data (sort)", "pre-math-3": "ELDS Math: algebraic thinking (patterns)", "pre-math-4": "ELDS Math: geometry (shapes)",
 "k-math": "K.OA.4", "k-math-2": "K.CC.6, K.CC.7", "k-math-3": "K.OA.1, K.OA.2", "k-math-4": "K.OA.1, K.OA.2",
 "1-math": "1.NBT.2", "1-math-2": "1.OA.6", "1-math-3": "1.OA.6", "1-math-4": "1.MD.2",
 "2-math": "2.NBT.5", "2-math-2": "2.NBT.5", "2-math-3": "2.MD.8", "2-math-4": "2.MD.10",
 "3-math": "3.OA.1", "3-math-2": "3.OA.3", "3-math-3": "3.OA.2", "3-math-4": "3.MD.5, 3.MD.6",
 "4-math": "4.NF.1", "4-math-2": "4.NF.2", "4-math-3": "4.NBT.5", "4-math-4": "4.MD.3",
 "5-math": "5.NF.1", "5-math-2": "5.NF.4", "5-math-3": "5.NBT.7", "5-math-4": "5.MD.3, 5.MD.5",
 "6-math": "6.RP.1, 6.RP.2, 6.RP.3", "6-math-2": "6.NS.5, 6.NS.6, 6.NS.7", "6-math-3": "6.EE.2", "6-math-4": "6.SP.5",
 // Reading
 "pre-reading": "ELDS Literacy: phonological awareness (rhyme)", "pre-reading-2": "ELDS Literacy: phonological awareness (first sounds)", "pre-reading-3": "ELDS Literacy: comprehension (retell in order)", "pre-reading-4": "ELDS Literacy: print concepts",
 "k-reading": "RF.K.2", "k-reading-2": "RF.K.3a", "k-reading-3": "RF.K.2, RF.K.3", "k-reading-4": "RL.K.3",
 "1-reading": "RL.1.2", "1-reading-2": "RF.1.3c", "1-reading-3": "RL.1.3", "1-reading-4": "L.1.4a",
 "2-reading": "RL.2.5", "2-reading-2": "RL.2.3", "2-reading-3": "RI.2.5", "2-reading-4": "RI.2.3",
 "3-reading": "RL.3.1", "3-reading-2": "RL.3.3", "3-reading-3": "RI.3.3", "3-reading-4": "RI.3.1",
 "4-reading": "RI.4.2", "4-reading-2": "RL.4.2", "4-reading-3": "L.4.4a", "4-reading-4": "RI.4.6",
 "5-reading": "W.5.1", "5-reading-2": "RL.5.2", "5-reading-3": "RI.5.9", "5-reading-4": "L.5.5a",
 "6-reading": "RI.6.8, W.6.8", "6-reading-2": "RL.6.1", "6-reading-3": "RI.6.8", "6-reading-4": "RI.6.2",
 // Writing
 "pre-writing": "ELDS Literacy: writing (early marks and shapes)", "pre-writing-2": "ELDS Literacy: letter knowledge", "pre-writing-3": "ELDS Literacy: print concepts (letters form words)", "pre-writing-4": "ELDS Literacy: writing (tell a story in pictures)",
 "k-writing": "L.K.2a", "k-writing-2": "L.K.2b", "k-writing-3": "RF.K.1c", "k-writing-4": "L.K.2d",
 "1-writing": "L.1.1b", "1-writing-2": "L.1.1e", "1-writing-3": "L.1.2b", "1-writing-4": "L.1.1c",
 "2-writing": "L.2.1e", "2-writing-2": "L.2.2c", "2-writing-3": "W.2.3", "2-writing-4": "L.2.2d",
 "3-writing": "L.3.1i", "3-writing-2": "L.3.2b", "3-writing-3": "W.3.2", "3-writing-4": "L.3.4b",
 "4-writing": "L.3.1f (review)", "4-writing-2": "L.4.1g", "4-writing-3": "L.4.2b", "4-writing-4": "W.4.1",
 "5-writing": "L.5.1b, L.5.1c, L.5.1d", "5-writing-2": "L.5.1a, L.5.1e", "5-writing-3": "W.5.2", "5-writing-4": "L.5.4b",
 "6-writing": "L.6.1a, L.6.1d", "6-writing-2": "L.4.1f (review)", "6-writing-3": "W.6.1", "6-writing-4": "W.6.1d, W.6.8",
 // Science
 "pre-science": "ELDS Science: inquiry (observe with senses)", "pre-science-2": "ELDS Science: life science (living things)", "pre-science-3": "ELDS Science: earth science (weather)", "pre-science-4": "ELDS Science: physical science (motion)",
 "k-science": "K.LS.1", "k-science-3": "K.LS.2", "k-science-sky": "K.ESS.1, K.ESS.2", "k-science-props": "K.PS.1, K.PS.2",
 "1-science": "1.PS.1, 1.ESS.2", "1-science-3": "1.LS.1, 1.LS.2", "1-science-sun": "1.ESS.1", "1-science-motion": "1.PS.2",
 "2-science-air": "2.ESS.1, 2.ESS.2, 2.ESS.3", "2-science-earthchange": "2.LS.1", "2-science-fossils": "2.LS.2", "2-science-forces": "2.PS.1",
 "3-science-matter": "3.PS.1, 3.PS.2", "3-science-energy": "3.PS.3", "3-science-earth": "3.ESS.1, 3.ESS.2, 3.ESS.3", "3-science-life": "3.LS.1, 3.LS.2, 3.LS.3",
 "4-science-landforms": "4.ESS.1", "4-science-4": "4.ESS.2, 4.ESS.3", "4-science-fossils": "4.LS.1, 4.LS.2", "4-science-energy": "4.PS.1, 4.PS.2",
 "5-science-space": "5.ESS.1, 5.ESS.2", "5-science-cycles": "5.ESS.3", "5-science-3": "5.LS.1, 5.LS.2", "5-science-forces": "5.PS.1, 5.PS.2",
 "6-science-rocks": "6.ESS.1 to 6.ESS.5", "6-science-cells": "6.LS.1 to 6.LS.4", "6-science-atoms": "6.PS.1, 6.PS.2", "6-science-motion": "6.PS.3, 6.PS.4",
 // Social Studies (grade theme and strand)
 "pre-social": "ELDS Social Studies: self and family", "pre-social-2": "ELDS Social-Emotional: relationships", "pre-social-3": "ELDS Social Studies: community", "pre-social-4": "ELDS Social Studies: community helpers",
 "k-social": "Gr K Government: rules", "k-social-2": "Gr K History: past and present", "k-social-3": "Gr K Geography: maps and globes", "k-social-4": "Gr K Economics: needs and wants",
 "1-social": "Gr 1 History: timelines", "1-social-2": "Gr 1 Geography: map keys and directions", "1-social-3": "Gr 1 Economics: goods and services", "1-social-4": "Gr 1 Government: citizenship",
 "2-social": "Gr 2 Geography: communities", "2-social-2": "Gr 2 Geography: map grids and compass rose", "2-social-3": "Gr 2 Economics: producers, consumers, scarcity", "2-social-4": "Gr 2 History: cultures and traditions",
 "3-social": "Gr 3 History: primary and secondary sources", "3-social-2": "Gr 3 Geography: map scale and landforms", "3-social-3": "Gr 3 Government: local government", "3-social-4": "Gr 3 Economics: opportunity cost and specialization",
 "4-social": "Gr 4 History: early Ohio and statehood", "4-social-2": "Gr 4 Geography: Ohio and latitude/longitude", "4-social-3": "Gr 4 Government: three branches", "4-social-4": "Gr 4 History and Economics: Ohio innovation, Underground Railroad",
 "5-social": "Gr 5 History: early civilizations of the Americas", "5-social-2": "Gr 5 Geography: Western Hemisphere regions", "5-social-3": "Gr 5 History: European exploration", "5-social-4": "Gr 5 Economics: trade and budgets",
 "6-social": "Gr 6 History: early civilizations of the Eastern Hemisphere", "6-social-2": "Gr 6 Geography: coordinates and regions", "6-social-3": "Gr 6 Government: forms of government", "6-social-4": "Gr 6 Economics: markets, supply and demand",
};
