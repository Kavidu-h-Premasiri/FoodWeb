# FoodWeb

A full-stack food ordering website. Customers sign up, browse food categories, fill a cart and place orders; an admin manages the menu and views orders.

## Features
- Customer sign up / login (passwords hashed with bcrypt, signed JWT sessions)
- Food pages: Home specials, Fast Foods, Chicken Meals, Rice Meals
- Cart with quantity handling and checkout → order saved in MongoDB
- Admin panel (protected by a server-checked admin token): add, edit and delete foods in every category, and view all orders
- Contact page

## Tech stack
- **Client:** React 19, Vite, React Router 7, React Bootstrap, axios
- **Server:** Node.js, Express 5, Mongoose (MongoDB), bcryptjs, jsonwebtoken, express-rate-limit

## Run it locally

You need Node 20+ and a MongoDB database (local or MongoDB Atlas).

```bash
# 1. server
cd server
cp .env.example .env      # then fill in the values
npm install
npm start                 # http://localhost:3002

# 2. client (in a second terminal)
cd client
cp .env.example .env      # VITE_API_URL=http://localhost:3002
npm install
npm run dev               # http://localhost:5173
```

### Environment variables (`server/.env`)
| Name | Purpose |
|------|---------|
| `MONGO_URL` | MongoDB connection string |
| `JWT_SECRET` | long random string used to sign login tokens |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | the admin login |
| `CLIENT_ORIGIN` | allowed website address(es) for CORS |
| `PORT` | server port (default 3002) |

Never commit `.env` – it is listed in `.gitignore`.

## Security notes
- Passwords are stored as bcrypt hashes (older plain-text accounts are upgraded the first time they log in).
- Admin routes (create / edit / delete foods, view orders) require a valid admin token on the server.
- Order totals are calculated on the server, and login endpoints are rate limited.
