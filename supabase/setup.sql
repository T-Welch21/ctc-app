-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- Safe to run multiple times — all statements handle "already exists"

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

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "Users can insert own profile" on public.profiles;
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

drop policy if exists "Users can manage own journal entries" on public.journal_entries;
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

drop policy if exists "Users can manage own weight entries" on public.weight_entries;
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

drop policy if exists "Users can manage own sessions" on public.completed_sessions;
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

drop policy if exists "Users can manage own check-ins" on public.check_ins;
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

drop policy if exists "Users can manage own PRs" on public.personal_records;
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

drop policy if exists "Anyone can read broadcasts" on public.broadcasts;
create policy "Anyone can read broadcasts"
  on public.broadcasts for select
  using (auth.role() = 'authenticated');

drop policy if exists "Coach can insert broadcasts" on public.broadcasts;
create policy "Coach can insert broadcasts"
  on public.broadcasts for insert
  with check (auth.uid() = coach_id);

-- Community posts (athlete feed)
create table if not exists public.community_posts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  user_name text not null,
  message text not null,
  post_type text default 'general' check (post_type in ('win', 'general')),
  created_at timestamptz default now()
);

alter table public.community_posts enable row level security;

drop policy if exists "Anyone can read community posts" on public.community_posts;
create policy "Anyone can read community posts"
  on public.community_posts for select
  using (auth.role() = 'authenticated');

drop policy if exists "Users can create community posts" on public.community_posts;
create policy "Users can create community posts"
  on public.community_posts for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can delete own community posts" on public.community_posts;
create policy "Users can delete own community posts"
  on public.community_posts for delete
  using (auth.uid() = user_id);

-- Enable realtime for community posts (safe to re-run)
do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and tablename = 'community_posts'
  ) then
    alter publication supabase_realtime add table public.community_posts;
  end if;
end $$;

-- Food entries (nutrition tracking)
create table if not exists public.food_entries (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  time text not null,
  name text not null,
  calories integer not null default 0,
  protein integer not null default 0,
  carbs integer not null default 0,
  fat integer not null default 0,
  created_at timestamptz default now()
);

alter table public.food_entries enable row level security;

drop policy if exists "Users can manage own food entries" on public.food_entries;
create policy "Users can manage own food entries"
  on public.food_entries for all
  using (auth.uid() = user_id);

-- Macro goals
create table if not exists public.macro_goals (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  calories integer not null default 2500,
  protein integer not null default 180,
  carbs integer not null default 280,
  fat integer not null default 80,
  updated_at timestamptz default now()
);

alter table public.macro_goals enable row level security;

drop policy if exists "Users can manage own macro goals" on public.macro_goals;
create policy "Users can manage own macro goals"
  on public.macro_goals for all
  using (auth.uid() = user_id);

-- Body stats (for macro calculator)
create table if not exists public.body_stats (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  age integer not null,
  gender text not null check (gender in ('male', 'female')),
  height_ft integer not null,
  height_in integer not null default 0,
  weight_lbs integer not null,
  activity text not null check (activity in ('sedentary', 'light', 'moderate', 'active', 'very_active')),
  nutrition_goal text not null check (nutrition_goal in ('lose', 'gain', 'maintain')),
  updated_at timestamptz default now()
);

alter table public.body_stats enable row level security;

drop policy if exists "Users can manage own body stats" on public.body_stats;
create policy "Users can manage own body stats"
  on public.body_stats for all
  using (auth.uid() = user_id);

-- Water intake tracking
create table if not exists public.water_intake (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  cups integer not null default 0,
  updated_at timestamptz default now(),
  unique(user_id, date)
);

alter table public.water_intake enable row level security;

drop policy if exists "Users can manage own water intake" on public.water_intake;
create policy "Users can manage own water intake"
  on public.water_intake for all
  using (auth.uid() = user_id);

-- Exercise notes (weights and notes per exercise per session)
create table if not exists public.exercise_notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date not null,
  day_index integer not null,
  exercise_name text not null,
  weight text,
  notes text,
  created_at timestamptz default now(),
  unique(user_id, date, day_index, exercise_name)
);

alter table public.exercise_notes enable row level security;

drop policy if exists "Users can manage own exercise notes" on public.exercise_notes;
create policy "Users can manage own exercise notes"
  on public.exercise_notes for all
  using (auth.uid() = user_id);

-- Subscription fields on profiles
alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists subscription_status text;
alter table public.profiles add column if not exists subscription_id text;
alter table public.profiles add column if not exists trial_end timestamptz;

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

-- Add subscription_source column to profiles
alter table public.profiles add column if not exists subscription_source text;

-- Invite codes table
create table if not exists public.invite_codes (
  code text primary key,
  label text not null default '',
  max_uses integer not null default 1,
  used_count integer not null default 0,
  created_at timestamptz default now(),
  expires_at timestamptz,
  active boolean default true
);

alter table public.invite_codes enable row level security;

drop policy if exists "Coach can manage invite codes" on public.invite_codes;
create policy "Coach can manage invite codes"
  on public.invite_codes for all
  using (auth.jwt() ->> 'email' in ('tyler21welch@gmail.com', 'test@ctctest.com'));

drop policy if exists "Anyone can read invite codes for validation" on public.invite_codes;
create policy "Anyone can read invite codes for validation"
  on public.invite_codes for select
  using (true);

-- RPC to atomically redeem an invite code
create or replace function public.redeem_invite_code(code_input text)
returns void as $$
begin
  update public.invite_codes
  set used_count = used_count + 1
  where code = code_input
    and active = true
    and used_count < max_uses
    and (expires_at is null or expires_at > now());

  if not found then
    raise exception 'Invalid or expired invite code';
  end if;
end;
$$ language plpgsql security definer;
