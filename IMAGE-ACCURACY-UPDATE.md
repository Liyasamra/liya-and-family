# Lesson-image accuracy update

Owner approved the image audit and instructed implementation. The Welcome and Learning Center remain separate, with the approved layout and Welcome illustration preserved.

## Applied

- 72 lesson covers now use specific, accessible illustrations instead of the flagged generic or mismatched images. All 32 math covers use deterministic quantities, equal fraction wholes, square units, correct coin values, and appropriate models; all 16 Amharic covers show the lesson's letters, vocabulary or concept.
- 41 picture-question mappings use literal objects/actions: crayon, truck, milk, juice, ice, lamp, mirror, paths, spinning, kicking, swimming, workers, handwashing, transport, snow, needs/wants pairs, and coin denominations. Correct-answer order and scoring are unchanged.
- The Continue card now uses the actual focused lesson artwork. Grade 3's illustration has exactly four groups of three.
- Rain clouds no longer stand for water vapor, a tree no longer stands for a mountain, and the pull arrow points toward the pulling child.
- The Meskel scene retains the Ethiopian family and celebration, with children holding flowers behind a viewing boundary and the bonfire in the distance.
- Existing example toggles and their lesson text remain available. Essential new diagrams have descriptive accessible labels; answer pictures remain decorative beside the existing answer text.
- Ohio's geography illustration uses the State of Ohio OGRIP outline; source and simplification are recorded in content-src/ohio-boundary-source.md. Addis Ababa uses an explicitly identified coordinate model.

The audit's optional homepage resolution polish is not applied: the owner's exact approved Welcome art is preserved rather than reinterpreted. Existing correct cultural vocabulary and seven-cup counting pictures are retained.

## Validation

- All 176 lesson texts and all 1,696 question/answer records exactly match the pre-audit snapshot.
- Production Next build and static root/docs build; TypeScript.
- Learning content/storage validation; all 330 picture mappings resolve.
- Real renderer checks for all 176 covers; exact regrouping, fraction, area, hundredth and volume counts, science image mappings, and accessible Amharic covers.
- All 24 interactive picture-activity tests, approved two-page routing/focus tests, redesign navigation/progress tests, Amharic tests.
- Browser inspection at lesson-card size, including correcting planet-label crowding, fidel overlap, and icon clipping; actual Learning Center grade changes select the corresponding artwork.

## Reproducible artwork

Run `python scripts/build-audited-art.py` to regenerate lib/audited-diagrams.json. The native SVG icon system lives in app/learn/audit-icons.tsx. These are deterministic vector drawings, not generated bitmaps, so counts and labels remain inspectable.

Meskel replacement: public/lesson-art/amharic/meskel-family-watching.webp, created using the built-in image-generation tool with the original Meskel artwork as an edit reference.

Prompt: Preserve the welcoming soft dimensional cartoon style, Ethiopian family, traditional white clothing and embroidery, yellow Meskel daisies, evening sky and cultural celebration. Children stand with parents and grandmother in the foreground, holding yellow flowers rather than torches. Move the bonfire substantially farther into the background behind a clear viewing boundary and generous open ground. Only adults tend the distant fire. Simplify the crowd; retain the Meskel cross. No text or watermark.
