README.md = (made with help of AI)
# Sereno — Restaurant Website (Full Stack)

A complete restaurant website: a Node.js/Express REST API backend and a vanilla HTML/CSS/JS frontend. No database setup required — data is stored in JSON files on disk, so it's easy to run locally and easy to swap for a real database later.

## What's included

- **Homepage** — hero, a short "tonight's picks" preview pulled live from the menu API, about section
- **Menu page** — full menu grouped by category, pulled live from the API
- **Reservations page** — a booking form that posts to the backend and validates the input
- **Contact page** — a contact form that posts messages to the backend
- **Admin page** (`admin.html`) — view all reservations and messages, confirm/cancel bookings

## Project structure

```
sereno-restaurant/
├── backend/
│   ├── server.js           # Express app entry point
│   ├── db.js                # tiny JSON file read/write helper
│   ├── routes/
│   │   ├── menu.js
│   │   ├── reservations.js
│   │   └── contact.js
│   ├── data/
│   │   ├── menu.json        # seeded menu data
│   │   ├── reservations.json
│   │   └── messages.json
│   └── package.json
└── frontend/
    ├── index.html
    ├── menu.html
    ├── reservations.html
    ├── contact.html
    ├── admin.html
    ├── css/style.css
    └── js/api.js
```

## Running it

You need [Node.js](https://nodejs.org) (v18+) installed.

```bash
cd backend
npm install
npm start
```

The server starts at **http://localhost:5000** and also serves the frontend directly — so once it's running, just open:

```
http://localhost:5000
```

in your browser, and everything (site + API) works from that one address. No separate frontend server needed.

If you'd rather run the frontend separately (e.g. with VS Code's Live Server), that works too — `frontend/js/api.js` automatically points requests to `http://localhost:5000/api` when the page isn't served from port 5000.

## API reference

| Method | Endpoint                  | Description                          |
|--------|----------------------------|---------------------------------------|
| GET    | `/api/menu`                | Full menu (optional `?category=`)     |
| GET    | `/api/menu/categories`     | List of category names                |
| GET    | `/api/reservations`        | All reservations                      |
| POST   | `/api/reservations`        | Create a reservation                  |
| PATCH  | `/api/reservations/:id`    | Update status (pending/confirmed/cancelled) |
| DELETE | `/api/reservations/:id`    | Delete a reservation                  |
| GET    | `/api/contact`             | All contact messages                  |
| POST   | `/api/contact`             | Send a contact message                |
| GET    | `/health`                  | Health check                          |

### Example: create a reservation

```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe","email":"jane@example.com","date":"2026-10-02","time":"19:30","partySize":2}'
```

## Customizing

- **Menu items** — edit `backend/data/menu.json` (id, category, name, description, price, tags).
- **Branding / copy** — restaurant name, hours, address, and copy live directly in the HTML files and are easy to find/replace.
- **Colors & type** — all design tokens (colors, fonts) are CSS variables at the top of `frontend/css/style.css`.
- **Real database** — swap `backend/db.js` for a real DB client (e.g. PostgreSQL, MongoDB) without touching the route files' logic much, since they only call `readData`/`writeData`.
- **Email notifications** — the contact/reservation routes are the natural place to plug in an email service (e.g. Nodemailer) to notify the restaurant of new submissions.

## Notes

- This is a learning/starter project: there's no authentication on the admin page — anyone with the URL can view/manage reservations. Add auth before deploying publicly.
- Data resets are just edits to the JSON files in `backend/data/` — delete the entries or reset to `[]` to clear.
