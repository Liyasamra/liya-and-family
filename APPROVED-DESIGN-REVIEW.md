# Corrected two-page design — awaiting review

The owner clarified that the approved reference is the two-panel Welcome / Learning Center board supplied in this conversation. This branch reuses that reference artwork and matches its two layouts. It has not been pushed or deployed.

- Welcome: `/` (static `index.html`).
- Learning Center: `/learn` (static `learning-center.html`).
- Start Learning opens the learning route. Subjects opens the catalog; the dashboard shows the focus activity.
- Progress is calculated from the current learner’s completed lessons. New learners start at 0%. No sample scores are stored.
- Try changes the equal-groups model without saving a practice result; Practice opens the existing lesson.
- Existing lessons, accounts, consent and access controls are retained.

Validation: production build; TypeScript; learning-content checks; all 24 picture activities; two-route/navigation/focus-activity tests; home and report/audio regression checks; Amharic interface coverage. Both pages visually reviewed through the managed internal browser preview.

Review image: `/workspace/scratch/ewket-kids-corrected-two-pages-review-v2.jpg`.

Before publication, confirm the owner’s response to this corrected review. Do not reuse the approval of the earlier mismatched deployment.
