# ComradeFit AI - Smart Fitness Tracker
Made for Benson Motari

## Deployment to Vercel

### 1. Frontend & Backend Monorepo
Vercel can host both the Next.js frontend and the FastAPI backend.

1. **Push to GitHub**: Create a repository and push this entire folder.
2. **Import to Vercel**: Connect your GitHub repo.
3. **Configure Environment Variables**:
   - `OPENAI_API_KEY`: Your OpenAI key.
   - `DATABASE_URL`: Your PostgreSQL connection string (Recommended: Supabase or Neon).
   - `SECRET_KEY`: A long, random string for JWT.
   - `ALLOWED_ORIGINS`: Your Vercel domain (e.g., `https://comradefit.vercel.app`).
4. **Deployment**: Vercel will auto-detect the Next.js project. The `vercel.json` file handles routing requests to the Python backend.

### 2. Database Advice
For production, use a hosted PostgreSQL instance:

- **Neon.tech** (Serverless Postgres, perfect for Vercel)
- **Supabase** (Robust Postgres + Auth backup)

### 3. AI Coach
Ensure your `OPENAI_API_KEY` is set in the Vercel dashboard. The system is designed to use GPT-3.5-Turbo for cost-effectiveness.

---

## Production Readiness Checklist
- [x] Environment Variables configuration.
- [x] CORS security hardening.
- [x] Vercel Serverless Function compatibility.
- [x] PostgreSQL database readiness.
- [x] Mobile-responsive UI optimization.
