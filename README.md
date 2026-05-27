# GOATVoters 🐐

> Who's the greatest of all time? You decide.

Head-to-head voting app powered by the Elo rating system. Two options appear. You pick one. The crowd builds the rankings.

---

## What's inside

```
goatvoters/
├── src/
│   ├── components/
│   │   ├── Header.jsx          ← Top bar with logo
│   │   ├── CategoryNav.jsx     ← Tab switcher for categories
│   │   ├── VotingCard.jsx      ← The VS matchup screen
│   │   ├── Leaderboard.jsx     ← Live rankings list
│   │   └── Divider.jsx         ← Visual separator
│   ├── hooks/
│   │   └── useVoting.js        ← All voting logic + Supabase sync
│   ├── data.js                 ← All 5 categories + contestants
│   ├── supabaseClient.js       ← Database connection
│   ├── App.jsx                 ← Main app shell
│   ├── main.jsx                ← React entry point
│   └── index.css               ← Global styles + design tokens
├── supabase_schema.sql         ← Run this in Supabase to set up your DB
├── .env.example                ← Copy to .env.local and add your keys
├── index.html
├── vite.config.js
└── package.json
```

---

## Step 1 — Set up your GitHub repo

1. Go to [github.com](https://github.com) and create a new repository called `goatvoters`
2. Make it public
3. Upload all these files into it (drag and drop in the GitHub UI, or use GitHub Desktop)

---

## Step 2 — Set up Supabase (your database)

1. Go to [supabase.com](https://supabase.com) and sign up for free
2. Click **New Project** — name it `goatvoters`
3. Once created, go to **SQL Editor** → **New Query**
4. Paste the entire contents of `supabase_schema.sql` and click **Run**
5. Go to **Settings** → **API**
6. Copy your **Project URL** and **anon public** key — you'll need these next

---

## Step 3 — Add your environment variables

1. In your project folder, duplicate `.env.example` and rename it `.env.local`
2. Open `.env.local` and fill in your Supabase values:

```
VITE_SUPABASE_URL=https://yourproject.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

---

## Step 4 — Deploy to Vercel (free, takes 2 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account
2. Click **Add New Project**
3. Import your `goatvoters` GitHub repository
4. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL` → your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` → your Supabase anon key
5. Click **Deploy**

Your app is now live at `goatvoters.vercel.app` 🎉

---

## Step 5 — Connect your custom domain (optional, ~$12/year)

1. Buy `goatvoters.com` (or similar) at [namecheap.com](https://namecheap.com) or [godaddy.com](https://godaddy.com)
2. In Vercel → your project → **Settings** → **Domains**
3. Add your domain and follow the DNS instructions

---

## Running locally (for testing)

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> Note: The app works without Supabase configured — it just runs in local memory mode.
> Votes won't persist between page refreshes until Supabase is connected.

---

## Adding new categories

Open `src/data.js` and add a new object to the `categories` array:

```js
{
  id: 'burgers',
  label: 'Burgers',
  title: 'Greatest Burger',
  subtitle: 'Of All Time',
  emoji: '🍔',
  contestants: [
    { id: 'b1', name: 'In-N-Out', sub: 'West Coast', emoji: '🌴' },
    { id: 'b2', name: "Shake Shack", sub: 'New York', emoji: '🗽' },
    // ... add as many as you want
  ]
}
```

That's it. Push to GitHub and Vercel auto-deploys.

---

## Tech stack

| Tool | What it does | Cost |
|------|-------------|------|
| React + Vite | Front end framework | Free |
| Supabase | Database + backend | Free (up to 500MB) |
| Vercel | Hosting + deployment | Free |
| GitHub | Code storage + version control | Free |

**Total cost: $0** (until you need to scale beyond free tiers)

---

## Ranking system

GOATVoters uses the **Elo rating system** — the same method used in professional chess and sports rankings. Every contestant starts at 1000. When they win a matchup they gain points; when they lose they drop. After enough votes, the rankings become statistically meaningful.

---

## Coming next

- [ ] User accounts (sign up to track your vote history)
- [ ] Push notifications for new category drops
- [ ] Share cards (auto-generated image for social media)
- [ ] More categories
- [ ] Mobile app (React Native)
