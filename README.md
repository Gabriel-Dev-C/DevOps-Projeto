# Labs Backend (TypeScript + Sequelize + Postgres)

## Quick start (Docker)
1. Copy `.env.example` to `.env` and adjust if needed.
2. Run: `docker-compose up --build`
3. API: http://localhost:3000
4. Swagger: http://localhost:3000/api/docs

## Scripts
- `npm run dev` — development with auto-reload
- `npm run build` — compile TypeScript
- `npm start` — run compiled

## Notes
- Default Sequelize sync is enabled for quick testing; for production use migrations.
- Create an admin user via POST /api/auth/register with body: { name, email, password, role: "admin" }
