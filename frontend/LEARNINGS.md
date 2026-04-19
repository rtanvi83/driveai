# LEARNINGS.md

This project taught me how to connect AI-like behavior to UI actions rather than just returning text.

Key learnings:

* Simple intent detection (keywords + parsing) can be more reliable than full AI for deterministic UI control.
* React state is asynchronous; I had to delay scroll actions until the DOM updated (setTimeout) to ensure correct navigation.
* Designing UI for “AI control” required thinking in terms of actions (filter, scroll, highlight) instead of pages.
* Small UX details (smooth scroll, highlights, chat positioning) significantly improved perceived intelligence.

Challenges:

* Making multiple queries trigger different UI changes consistently
* Preventing chat overflow and keeping UI clean
* Ensuring all sections respond correctly to AI actions

If I had more time, I would improve natural language understanding and add voice input.
