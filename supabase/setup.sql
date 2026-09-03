-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- This creates all tables needed for the CTC app

-- Profiles table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  identity text,
  goal text,
  onboarded boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Journal entries
create table if not exists public.journal_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  time_of_day text not null check (time_of_day in ('morning', 'evening')),
  energy integer not null check (energy between 1 and 10),
  mind integer not null check (mind between 1 and 10),
  checked_items integer[] default '{}',
  gratitude text,
  affirmation text,
  created_at timestamptz default now(),
  unique(user_id, date, time_of_day)
);

alter table public.journal_entries enable row level security;

create policy "Users can manage own journal entries"
  on public.journal_entries for all
  using (auth.uid() = user_id);

-- Weight entries
create table if not exists public.weight_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  weight numeric(5,1) not null,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table public.weight_entries enable row level security;

create policy "Users can manage own weight entries"
  on public.weight_entries for all
  using (auth.uid() = user_id);

-- Completed sessions
create table if not exists public.completed_sessions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  day_index integer not null,
  program_id text not null,
  completed_sets jsonb default '{}',
  created_at timestamptz default now()
);

alter table public.completed_sessions enable row level security;

create policy "Users can manage own sessions"
  on public.completed_sessions for all
  using (auth.uid() = user_id);

-- Weekly check-ins
create table if not exists public.check_ins (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  sessions integer default 0,
  nutrition integer check (nutrition between 1 and 10),
  sleep integer check (sleep between 1 and 10),
  energy integer check (energy between 1 and 10),
  wins text,
  struggles text,
  goals text,
  created_at timestamptz default now(),
  unique(user_id, date)
);

alter table public.check_ins enable row level security;

create policy "Users can manage own check-ins"
  on public.check_ins for all
  using (auth.uid() = user_id);

-- Personal records (PRs)
create table if not exists public.personal_records (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lift text not null,
  value text not null,
  date date not null,
  created_at timestamptz default now(),
  unique(user_id, lift)
);

alter table public.personal_records enable row level security;

create policy "Users can manage own PRs"
  on public.personal_records for all
  using (auth.uid() = user_id);

-- Broadcasts (coach messages to all athletes)
create table if not exists public.broadcasts (
  id uuid default gen_random_uuid() primary key,
  coach_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.broadcasts enable row level security;

create policy "Anyone can read broadcasts"
  on public.broadcasts for select
  using (auth.role() = 'authenticated');

create policy "Coach can insert broadcasts"
  on public.broadcasts for insert
  with check (auth.uid() = coach_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
