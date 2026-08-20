-- La Ratatouille — menu schema.
-- Every guest-facing string exists three times (de / es / en) so the kitchen can
-- keep one row per dish instead of maintaining three parallel menus.

CREATE TABLE IF NOT EXISTS categories (
  id            SERIAL PRIMARY KEY,
  sort_order    INTEGER      NOT NULL DEFAULT 0,
  is_published  BOOLEAN      NOT NULL DEFAULT TRUE,
  name_de       TEXT         NOT NULL,
  name_es       TEXT         NOT NULL DEFAULT '',
  name_en       TEXT         NOT NULL DEFAULT '',
  intro_de      TEXT         NOT NULL DEFAULT '',
  intro_es      TEXT         NOT NULL DEFAULT '',
  intro_en      TEXT         NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dishes (
  id              SERIAL PRIMARY KEY,
  category_id     INTEGER     NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  sort_order      INTEGER     NOT NULL DEFAULT 0,
  is_published    BOOLEAN     NOT NULL DEFAULT TRUE,
  -- Marked dishes appear in the excerpt on the home page.
  is_highlight    BOOLEAN     NOT NULL DEFAULT FALSE,
  price           TEXT        NOT NULL DEFAULT '',
  name_de         TEXT        NOT NULL,
  name_es         TEXT        NOT NULL DEFAULT '',
  name_en         TEXT        NOT NULL DEFAULT '',
  description_de  TEXT        NOT NULL DEFAULT '',
  description_es  TEXT        NOT NULL DEFAULT '',
  description_en  TEXT        NOT NULL DEFAULT '',
  origin_de       TEXT        NOT NULL DEFAULT '',
  origin_es       TEXT        NOT NULL DEFAULT '',
  origin_en       TEXT        NOT NULL DEFAULT '',
  -- 'vegetarian' | 'vegan' | 'signature'
  tags            TEXT[]      NOT NULL DEFAULT '{}',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS dishes_category_idx ON dishes (category_id, sort_order);

-- Free texts of the menu page. Exactly one row, id = 1.
CREATE TABLE IF NOT EXISTS menu_settings (
  id                 INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  eyebrow_de         TEXT NOT NULL DEFAULT '',
  eyebrow_es         TEXT NOT NULL DEFAULT '',
  eyebrow_en         TEXT NOT NULL DEFAULT '',
  title_de           TEXT NOT NULL DEFAULT '',
  title_es           TEXT NOT NULL DEFAULT '',
  title_en           TEXT NOT NULL DEFAULT '',
  intro_de           TEXT NOT NULL DEFAULT '',
  intro_es           TEXT NOT NULL DEFAULT '',
  intro_en           TEXT NOT NULL DEFAULT '',
  set_menu_title_de  TEXT NOT NULL DEFAULT '',
  set_menu_title_es  TEXT NOT NULL DEFAULT '',
  set_menu_title_en  TEXT NOT NULL DEFAULT '',
  set_menu_body_de   TEXT NOT NULL DEFAULT '',
  set_menu_body_es   TEXT NOT NULL DEFAULT '',
  set_menu_body_en   TEXT NOT NULL DEFAULT '',
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO menu_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Guest reviews, quoted from the restaurant's public profile. A review is a
-- quotation, so it is stored once in the language the guest wrote it in and
-- shown unchanged in all three site languages.
CREATE TABLE IF NOT EXISTS reviews (
  id            SERIAL PRIMARY KEY,
  sort_order    INTEGER     NOT NULL DEFAULT 0,
  is_published  BOOLEAN     NOT NULL DEFAULT TRUE,
  quote         TEXT        NOT NULL,
  author        TEXT        NOT NULL DEFAULT '',
  source        TEXT        NOT NULL DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
