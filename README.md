# Express + Drizzle PostgreSQL API

This project uses Express, Drizzle ORM, and PostgreSQL.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your PostgreSQL connection string. You can use the same URI format you use for Prisma.
3. Install dependencies with `npm install`.
4. Start the server with `npm run dev` or `npm start`.

## Endpoints

- `GET /health`
- `GET /api/health`
- `GET /api/users`
- `POST /api/users`

On startup, the app attempts to ensure a `users` table exists and seeds a few users if the table is empty. The health endpoint still responds even if the database is not configured yet.

## Local API checks

```sh
curl http://localhost:3000/health
```

```sh
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Test User\",\"email\":\"test.user@example.com\"}"
```
