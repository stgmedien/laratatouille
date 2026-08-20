'use server';

import { revalidatePath } from 'next/cache';
import { cookies, headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createCategory, createDish, createReview, deleteCategory, deleteDish, deleteReview,
  moveCategory, moveDish, moveReview, updateCategory, updateDish, updateReview, updateSettings,
  type CategoryInput, type DishInput, type ReviewInput,
} from '@/lib/db/admin';
import { DISH_TAGS, type MenuSettingsRow } from '@/lib/db/types';
import {
  authConfigured, createSessionToken, passwordMatches, SESSION_COOKIE, SESSION_MAX_AGE,
} from '@/lib/auth';
import { requireSession } from '@/lib/admin-session';
import { rateLimit } from '@/lib/rate-limit';

/* --- Login --------------------------------------------------------------- */

export interface LoginState { error?: string }

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!authConfigured()) {
    return { error: 'Der Zugang ist noch nicht eingerichtet: ADMIN_PASSWORD und AUTH_SECRET fehlen.' };
  }

  const headerList = await headers();
  const ip = headerList.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (!rateLimit(`login:${ip}`, 8, 15 * 60 * 1000)) {
    return { error: 'Zu viele Versuche. Bitte in einer Viertelstunde noch einmal probieren.' };
  }

  const password = String(formData.get('password') ?? '');
  if (!passwordMatches(password)) {
    return { error: 'Das Passwort stimmt nicht.' };
  }

  const token = await createSessionToken();
  if (!token) return { error: 'AUTH_SECRET fehlt oder ist zu kurz.' };

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });

  const next = String(formData.get('next') ?? '/admin');
  redirect(next.startsWith('/admin') ? next : '/admin');
}

export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect('/admin/login');
}

/* --- Helpers -------------------------------------------------------------- */

const text = (formData: FormData, key: string) => String(formData.get(key) ?? '').trim();
const flag = (formData: FormData, key: string) => formData.get(key) === 'on';

/** Every public page reads the menu, so one sweep keeps them all honest. */
function refreshSite() {
  revalidatePath('/', 'layout');
}

function categoryInput(formData: FormData): CategoryInput {
  return {
    is_published: flag(formData, 'is_published'),
    name_de: text(formData, 'name_de'),
    name_es: text(formData, 'name_es'),
    name_en: text(formData, 'name_en'),
    intro_de: text(formData, 'intro_de'),
    intro_es: text(formData, 'intro_es'),
    intro_en: text(formData, 'intro_en'),
  };
}

function dishInput(formData: FormData): DishInput {
  return {
    category_id: Number(formData.get('category_id')),
    is_published: flag(formData, 'is_published'),
    is_highlight: flag(formData, 'is_highlight'),
    price: text(formData, 'price'),
    name_de: text(formData, 'name_de'),
    name_es: text(formData, 'name_es'),
    name_en: text(formData, 'name_en'),
    description_de: text(formData, 'description_de'),
    description_es: text(formData, 'description_es'),
    description_en: text(formData, 'description_en'),
    origin_de: text(formData, 'origin_de'),
    origin_es: text(formData, 'origin_es'),
    origin_en: text(formData, 'origin_en'),
    tags: DISH_TAGS.filter((tag) => formData.get(`tag_${tag}`) === 'on'),
  };
}

export interface FormState { error?: string }

/* --- Categories ----------------------------------------------------------- */

export async function saveCategory(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const data = categoryInput(formData);
  if (!data.name_de) return { error: 'Der deutsche Name fehlt.' };

  const rawId = String(formData.get('id') ?? '');
  try {
    if (rawId && rawId !== 'neu') await updateCategory(Number(rawId), data);
    else await createCategory(data);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Speichern fehlgeschlagen.' };
  }

  refreshSite();
  redirect('/admin');
}

export async function removeCategory(formData: FormData): Promise<void> {
  await requireSession();
  await deleteCategory(Number(formData.get('id')));
  refreshSite();
  redirect('/admin');
}

export async function shiftCategory(formData: FormData): Promise<void> {
  await requireSession();
  const direction = formData.get('direction') === 'up' ? 'up' : 'down';
  await moveCategory(Number(formData.get('id')), direction);
  refreshSite();
  redirect('/admin');
}

/* --- Dishes --------------------------------------------------------------- */

export async function saveDish(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const data = dishInput(formData);
  if (!data.name_de) return { error: 'Der deutsche Name fehlt.' };
  if (!Number.isFinite(data.category_id)) return { error: 'Bitte eine Kategorie wählen.' };

  const rawId = String(formData.get('id') ?? '');
  try {
    if (rawId && rawId !== 'neu') await updateDish(Number(rawId), data);
    else await createDish(data);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Speichern fehlgeschlagen.' };
  }

  refreshSite();
  redirect('/admin');
}

export async function removeDish(formData: FormData): Promise<void> {
  await requireSession();
  await deleteDish(Number(formData.get('id')));
  refreshSite();
  redirect('/admin');
}

export async function shiftDish(formData: FormData): Promise<void> {
  await requireSession();
  const direction = formData.get('direction') === 'up' ? 'up' : 'down';
  await moveDish(Number(formData.get('id')), direction);
  refreshSite();
  redirect('/admin');
}

/* --- Guest reviews -------------------------------------------------------- */

function reviewInput(formData: FormData): ReviewInput {
  return {
    is_published: flag(formData, 'is_published'),
    quote: text(formData, 'quote'),
    author: text(formData, 'author'),
    source: text(formData, 'source'),
  };
}

export async function saveReview(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const data = reviewInput(formData);
  if (!data.quote) return { error: 'Das Zitat fehlt.' };

  const rawId = String(formData.get('id') ?? '');
  try {
    if (rawId && rawId !== 'neu') await updateReview(Number(rawId), data);
    else await createReview(data);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Speichern fehlgeschlagen.' };
  }

  refreshSite();
  redirect('/admin/stimmen');
}

export async function removeReview(formData: FormData): Promise<void> {
  await requireSession();
  await deleteReview(Number(formData.get('id')));
  refreshSite();
  redirect('/admin/stimmen');
}

export async function shiftReview(formData: FormData): Promise<void> {
  await requireSession();
  const direction = formData.get('direction') === 'up' ? 'up' : 'down';
  await moveReview(Number(formData.get('id')), direction);
  refreshSite();
  redirect('/admin/stimmen');
}

/* --- Menu page texts ------------------------------------------------------ */

export async function saveSettings(_prev: FormState, formData: FormData): Promise<FormState> {
  await requireSession();

  const fields = [
    'eyebrow', 'title', 'intro', 'set_menu_title', 'set_menu_body',
  ] as const;

  const data = {} as MenuSettingsRow;
  for (const field of fields) {
    for (const locale of ['de', 'es', 'en'] as const) {
      const key = `${field}_${locale}` as keyof MenuSettingsRow;
      data[key] = text(formData, key);
    }
  }

  try {
    await updateSettings(data);
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Speichern fehlgeschlagen.' };
  }

  refreshSite();
  redirect('/admin/texte?gespeichert=1');
}
