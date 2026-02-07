create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz default now()
);

create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete set null,
  title text not null,
  status text not null check (status in ('Live', 'Draft', 'Ended', 'Archived')) default 'Draft',
  category text,
  description text,
  start_date timestamptz,
  end_date timestamptz,
  visibility text not null check (visibility in ('instant', 'hidden')) default 'instant',
  election_mode boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  label text not null,
  affiliation text,
  sort_order int default 0
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  option_id uuid not null references public.poll_options(id) on delete cascade,
  voter_id uuid references auth.users(id) on delete set null,
  device_id text,
  created_at timestamptz default now()
);

create unique index if not exists votes_unique_user_per_poll
  on public.votes (poll_id, voter_id)
  where voter_id is not null;

create unique index if not exists votes_unique_device_per_poll
  on public.votes (poll_id, device_id)
  where device_id is not null;

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists polls_set_updated_at on public.polls;
create trigger polls_set_updated_at
  before update on public.polls
  for each row execute function public.set_updated_at();

create or replace function public.prevent_poll_changes_if_votes()
returns trigger as $$
begin
  if old.status = 'Ended' then
    return new;
  end if;
  if exists (select 1 from public.votes v where v.poll_id = old.id limit 1) then
    if (new.title is distinct from old.title)
      or (new.category is distinct from old.category)
      or (new.description is distinct from old.description)
      or (new.start_date is distinct from old.start_date)
      or (new.end_date is distinct from old.end_date)
      or (new.election_mode is distinct from old.election_mode)
    then
      raise exception 'Poll is locked because voting has started';
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists polls_lock_changes on public.polls;
create trigger polls_lock_changes
  before update on public.polls
  for each row execute function public.prevent_poll_changes_if_votes();

create or replace function public.prevent_option_changes_if_votes()
returns trigger as $$
declare
  poll_to_check uuid;
  poll_status text;
begin
  poll_to_check := coalesce(new.poll_id, old.poll_id);
  select p.status into poll_status from public.polls p where p.id = poll_to_check;
  if poll_status = 'Ended' then
    return new;
  end if;
  if exists (select 1 from public.votes v where v.poll_id = poll_to_check limit 1) then
    raise exception 'Poll options are locked because voting has started';
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists poll_options_lock_changes on public.poll_options;
create trigger poll_options_lock_changes
  before insert or update or delete on public.poll_options
  for each row execute function public.prevent_option_changes_if_votes();

alter table public.profiles enable row level security;
alter table public.polls enable row level security;
alter table public.poll_options enable row level security;
alter table public.votes enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (id = auth.uid());

drop policy if exists "polls_select_all" on public.polls;
create policy "polls_select_all"
  on public.polls for select
  using (true);

drop policy if exists "polls_insert_owner" on public.polls;
create policy "polls_insert_owner"
  on public.polls for insert
  with check (owner_id = auth.uid());

drop policy if exists "polls_update_owner" on public.polls;
create policy "polls_update_owner"
  on public.polls for update
  using (owner_id = auth.uid());

drop policy if exists "polls_delete_owner" on public.polls;
create policy "polls_delete_owner"
  on public.polls for delete
  using (owner_id = auth.uid());

drop policy if exists "poll_options_select_all" on public.poll_options;
create policy "poll_options_select_all"
  on public.poll_options for select
  using (true);

drop policy if exists "poll_options_owner_mutations" on public.poll_options;
create policy "poll_options_owner_mutations"
  on public.poll_options for insert
  with check (
    exists (
      select 1 from public.polls p
      where p.id = poll_id and p.owner_id = auth.uid()
    )
  );

drop policy if exists "poll_options_owner_updates" on public.poll_options;
create policy "poll_options_owner_updates"
  on public.poll_options for update
  using (
    exists (
      select 1 from public.polls p
      where p.id = poll_id and p.owner_id = auth.uid()
    )
  );

drop policy if exists "poll_options_owner_deletes" on public.poll_options;
create policy "poll_options_owner_deletes"
  on public.poll_options for delete
  using (
    exists (
      select 1 from public.polls p
      where p.id = poll_id and p.owner_id = auth.uid()
    )
  );

drop policy if exists "votes_select_visible" on public.votes;
create policy "votes_select_visible"
  on public.votes for select
  using (
    exists (
      select 1 from public.polls p
      where p.id = poll_id
        and (
          p.visibility = 'instant'
          or p.status = 'Ended'
          or p.owner_id = auth.uid()
        )
    )
  );

drop policy if exists "votes_insert_live" on public.votes;
create policy "votes_insert_live"
  on public.votes for insert
  with check (
    exists (
      select 1 from public.polls p
      where p.id = poll_id
        and p.status = 'Live'
        and (p.end_date is null or p.end_date > now())
    )
    and (voter_id is null or voter_id = auth.uid())
  );

create or replace function public.get_poll_counts(poll_ids uuid[])
returns table(poll_id uuid, option_id uuid, votes int)
language sql stable as $$
  select poll_id, option_id, count(*)::int as votes
  from public.votes
  where poll_id = any(poll_ids)
  group by poll_id, option_id;
$$;

create or replace function public.merge_device_votes(p_device_id text)
returns int
language plpgsql
security definer
as $$
declare
  merged_count int := 0;
begin
  if auth.uid() is null then
    return 0;
  end if;

  update public.votes v
  set voter_id = auth.uid()
  where v.voter_id is null
    and v.device_id = p_device_id
    and not exists (
      select 1 from public.votes v2
      where v2.poll_id = v.poll_id
        and v2.voter_id = auth.uid()
    );

  get diagnostics merged_count = row_count;
  return merged_count;
end;
$$;

grant execute on function public.merge_device_votes(text) to anon, authenticated;

alter publication supabase_realtime add table public.votes;
alter publication supabase_realtime add table public.polls;
