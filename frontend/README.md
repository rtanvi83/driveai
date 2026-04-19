# DriveAI 🚗 — AI-Navigated Car Website

## Live

* Frontend: https://driveai-brown.vercel.app/
* Backend: https://driveai-4gj8.onrender.com

---

## Concept

DriveAI is a single-page car dealership where a persistent assistant interprets user queries and **directly controls the UI**—scrolling to sections, filtering models, updating pricing, highlighting cars, and pre-filling the booking form.

Instead of relying on external AI APIs, the system uses **rule-based intent detection** to ensure predictable and responsive UI behavior.

---

## Tech Stack (and why)

* **React (Vite)** — fast SPA with efficient state management
* **Tailwind CSS** — quick, consistent UI styling
* **Node.js + Express** — lightweight backend for intent handling
* **Deployment:** Vercel (frontend), Render (backend)

---

## Features

* Horizontal model carousel (snap + hidden scrollbar)
* Modern hero, features, and booking sections
* Floating AI assistant with quick query buttons
* Smooth scrolling + visual highlight feedback
* Comparison view (top 2 models)
* Booking form auto-fill
* Currency switch (INR ↔ USD)

---

## Supported Queries

1. **Filter**

   * “Show SUVs under 20 lakhs”
     → Filters models + scrolls to section

2. **Compare**

   * “Compare top models”
     → Displays comparison + auto-scroll

3. **Book**

   * “Book test drive for Terra Pro in Kochi”
     → Auto-fills form + scrolls

4. **Recommend**

   * “Best car for family”
     → Highlights suitable models

5. **Currency**

   * “Show prices in USD”
     → Updates pricing dynamically

6. **Navigation**

   * “Show features section”
     → Scrolls to section with visual highlight

---

## Setup

```bash
# frontend
cd frontend
npm install
npm run dev

# backend
cd backend
npm install
npm run dev
```

Create `.env` in backend:

```
PORT=5000
```

---

## API

**POST /ai**

Request:

```json
{ "query": "Show SUVs under 20 lakhs" }
```

Response:

```json
{
  "intent": { "type": "FILTER", "category": "SUV", "maxPrice": 2000000 },
  "reply": "Showing SUVs under your budget."
}
```

---

## AI Approach

The assistant uses **rule-based intent detection** (keyword + pattern matching) to map user queries to UI actions.

This approach ensures:

* Fast response time
* Predictable behavior
* Tight control over UI interactions