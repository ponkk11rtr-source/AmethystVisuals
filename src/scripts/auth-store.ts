/**
 * Local demo account store.
 *
 * Everything lives in `localStorage` so the template works without a backend.
 * When you add a real API, replace the bodies of these helpers with `fetch`
 * calls — the UI only depends on the exported signatures.
 */

export type StoredUser = {
  nickname: string;
  email: string;
  hash: string;
  created: string;
};

export const USERS_KEY = 'amethyst:users';
export const SESSION_KEY = 'amethyst:session';

/** Ник аккаунта - это игровой ник: по нему мод и сайт узнают друг друга. */
const NICK_PATTERN = /^[A-Za-z0-9_]{3,16}$/;

export function readUsers(): StoredUser[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function currentUser(): StoredUser | null {
  const email = localStorage.getItem(SESSION_KEY);
  if (!email) return null;
  return readUsers().find((user) => user.email === email) || null;
}

export async function hashPassword(password: string): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const data = new TextEncoder().encode(`amethyst::${password}`);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }
  return btoa(`amethyst::${password}`);
}

export function setSession(email: string) {
  localStorage.setItem(SESSION_KEY, email);
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
  syncAccountTriggers();
}

export async function registerUser(input: { nickname: string; email: string; password: string }): Promise<StoredUser> {
  const nickname = input.nickname.trim();
  const email = input.email.trim().toLowerCase();
  const password = input.password;

  if (!NICK_PATTERN.test(nickname)) {
    throw new Error('Никнейм: 3-16 символов, только A-Z, 0-9 и _. Он должен совпадать с игровым ником.');
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('Похоже, email указан неверно.');
  if (password.length < 6) throw new Error('Пароль должен быть не короче 6 символов.');

  const users = readUsers();
  if (users.some((user) => user.email === email)) {
    throw new Error('Этот email уже зарегистрирован. Попробуй войти.');
  }

  const user: StoredUser = {
    nickname,
    email,
    hash: await hashPassword(password),
    created: new Date().toISOString(),
  };

  users.push(user);
  writeUsers(users);
  setSession(email);
  syncAccountTriggers();

  return user;
}

export async function loginUser(emailInput: string, password: string): Promise<StoredUser> {
  const email = emailInput.trim().toLowerCase();
  if (!email || !password) throw new Error('Заполни email и пароль.');

  const user = readUsers().find((item) => item.email === email);
  if (!user) throw new Error('Аккаунт с таким email не найден. Зарегистрируйся.');

  const hash = await hashPassword(password);
  if (hash !== user.hash) throw new Error('Неверный пароль. Попробуй ещё раз.');

  setSession(user.email);
  syncAccountTriggers();

  return user;
}

export function updateNickname(email: string, nickname: string): StoredUser {
  const clean = nickname.trim();
  if (!NICK_PATTERN.test(clean)) {
    throw new Error('Никнейм: 3-16 символов, только A-Z, 0-9 и _. Он должен совпадать с игровым ником.');
  }

  const users = readUsers();
  const index = users.findIndex((user) => user.email === email);
  if (index === -1) throw new Error('Аккаунт не найден.');

  users[index] = { ...users[index], nickname: clean };
  writeUsers(users);
  syncAccountTriggers();

  return users[index];
}

/** Keep every header/nav account button in sync with the current session. */
export function syncAccountTriggers() {
  if (typeof document === 'undefined') return;
  const user = currentUser();

  document.querySelectorAll<HTMLElement>('[data-account-label]').forEach((element) => {
    element.textContent = user ? user.nickname : 'Войти';
  });

  document.querySelectorAll<HTMLElement>('[data-account-trigger]').forEach((element) => {
    element.dataset.signedIn = String(!!user);
    element.classList.toggle('border-violet-400/50', !!user);
    element.classList.toggle('bg-violet-500/15', !!user);
    element.classList.toggle('text-white', !!user);
  });
}
