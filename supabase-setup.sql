-- 在 Supabase 的 SQL Editor 貼上並執行這整段
-- （如果之前已執行過舊版，改執行下方的「更新現有資料表」段落）

-- ════════════════════════════════════════
-- A. 全新建立（第一次設定用）
-- ════════════════════════════════════════
create table if not exists articles (
  id              uuid primary key default gen_random_uuid(),
  title           text not null,
  content         text not null,
  excerpt         text,
  movie_year      integer,
  director        text,
  genre           text,
  tags            text[],

  -- 總評分
  rating          integer check (rating between 1 and 5),

  -- 多維度子評分（各 1-5，選填）
  score_plot      integer check (score_plot between 1 and 5),    -- 劇情
  score_visual    integer check (score_visual between 1 and 5),  -- 畫面
  score_music     integer check (score_music between 1 and 5),   -- 音樂/配樂

  -- 防雷
  has_spoiler     boolean default false,  -- true = 有雷, false = 無雷

  -- 媒體
  cover_image     text,
  youtube_url     text,   -- YouTube 預告連結，例如 https://www.youtube.com/watch?v=xxxxx

  is_published    boolean default false,
  published_at    timestamptz default now(),
  created_at      timestamptz default now()
);

-- ════════════════════════════════════════
-- B. 更新現有資料表（已建過舊版用這段）
-- ════════════════════════════════════════
-- alter table articles add column if not exists score_plot   integer check (score_plot between 1 and 5);
-- alter table articles add column if not exists score_visual integer check (score_visual between 1 and 5);
-- alter table articles add column if not exists score_music  integer check (score_music between 1 and 5);
-- alter table articles add column if not exists has_spoiler  boolean default false;
-- alter table articles add column if not exists youtube_url    text;
-- alter table articles add column if not exists content_type  text default 'movie';

-- ════════════════════════════════════════
-- C. Row Level Security
-- ════════════════════════════════════════
alter table articles enable row level security;

create policy "Public read published"
  on articles for select
  using (is_published = true);

create policy "Auth read all"
  on articles for select
  to authenticated
  using (true);

create policy "Auth insert"
  on articles for insert
  to authenticated
  with check (true);

create policy "Auth update"
  on articles for update
  to authenticated
  using (true);

create policy "Auth delete"
  on articles for delete
  to authenticated
  using (true);
