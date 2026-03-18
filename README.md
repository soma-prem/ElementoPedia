# ElementoPedia

ElementoPedia is a full‑stack web app that turns the periodic table into an interactive learning experience. It combines a modern, responsive UI with element detail pages and an AI assistant focused on chemistry questions.

## Highlights

- Interactive periodic table with category filtering and clickable element tiles.
- Dynamic element pages with structured data (properties, discovery, uses, facts), media embeds, and reference links.
- Animated atom visualization driven by atomic number (electron shells/orbits).
- “EleMind” AI Q&A for chemistry/element questions, powered by an external LLM API.
- Full dataset view in a sortable table, backed by a MongoDB collection.
- Authentication via Firebase (Google sign‑in) for gated access to exploration.

## Tech Stack

- Frontend: Next.js (App Router), React, Tailwind CSS
- Auth: Firebase Authentication
- Backend: Node.js, Express
- Database: MongoDB + Mongoose
- AI: OpenRouter chat completions (Gemini model)
