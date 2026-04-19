# DriveAI 🚗 — AI-Navigated Car Website

## 🔗 Live

* Frontend: https://your-vercel-url
* Backend: https://driveai-4gj8.onrender.com

## 🧠 Concept

DriveAI is a single-page car dealership where a persistent AI assistant understands user queries and **actively controls the UI**—scrolling to sections, filtering cars, updating pricing, highlighting models, and pre-filling the booking form.

---

## ⚙️ Tech Stack (and why)

* **React (Vite)** — fast SPA, easy state control for UI actions
* **Tailwind CSS** — rapid, consistent UI styling
* **Node.js + Express** — lightweight API for intent detection
* **(Optional) OpenAI/Groq** — natural language replies (free tier)
* **Deployment:** Vercel (frontend), Render (backend)

---

## ✨ Features

* Horizontal model carousel (snap + hidden scrollbar)
* Premium hero + features + booking sections
* AI assistant (floating chat) with quick queries
* Smooth scrolling + visual highlight on actions
* Comparison view (top 2 models)
* Booking form auto-fill
* Currency switch (INR ↔ USD)

---

## 🧩 Supported Queries (6+)

1. **Filter**

   * “Show SUVs under 20 lakhs”
   * Filters grid + scrolls to models

2. **Compare**

   * “Compare top models”
   * Loads top 2 cars + scrolls to comparison

3. **Book**

   * “Book test drive for Terra Pro in Kochi”
   * Prefills form + scrolls to booking

4. **Recommend**

   * “Best car for family”
   * Highlights suitable model(s)

5. **Currency**

   * “Show prices in USD”
   * Updates all prices live

6. **Navigation**

   * “Show features section”
   * Scrolls to section + highlight

---

## 🏗️ Setup

```bash
# frontend
cd client
npm install
npm run dev

# backend
cd server
npm install
npm run dev
```

Create `.env` in server:

```
PORT=5000
# OPENAI_API_KEY=...
```

---

## 🔌 API

POST `/ai`

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

## 🔮 If I had more time

* Voice input (speech-to-text)
* Better NLP (entity extraction for city/date)
* Saved comparisons + shareable links
* Accessibility improvements
