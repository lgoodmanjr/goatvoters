-- GOATVoters Database Schema
-- Run this in your Supabase project → SQL Editor → New Query

-- Contestants table: stores each contestant and their current Elo score
create table if not exists contestants (
  id text primary key,
  name text not null,
  category_id text not null,
  elo_score integer not null default 1000,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Votes table: records every individual vote cast
create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  category_id text not null,
  winner_id text not null references contestants(id),
  loser_id text not null references contestants(id),
  created_at timestamptz default now()
);

-- Index for fast leaderboard queries
create index if not exists idx_contestants_category on contestants(category_id);
create index if not exists idx_votes_category on votes(category_id);

-- Enable Row Level Security
alter table contestants enable row level security;
alter table votes enable row level security;

-- Allow anyone to read contestants (public leaderboard)
create policy "Public read contestants"
  on contestants for select
  using (true);

-- Allow anyone to upsert contestants (Elo updates after voting)
create policy "Public upsert contestants"
  on contestants for insert
  with check (true);

create policy "Public update contestants"
  on contestants for update
  using (true);

-- Allow anyone to insert votes (anonymous voting)
create policy "Public insert votes"
  on votes for insert
  with check (true);

-- Allow anyone to read vote counts
create policy "Public read votes"
  on votes for select
  using (true);
