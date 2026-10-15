// Local persistence layer for session and preference continuity. Stands in for the future
// backend (SRS: PostgreSQL via Supabase). Never used on the server.
const KEY = "caps_local_state_v2";
const listeners = new Set();
const hasWindow = () => typeof window !== "undefined" && !!window.localStorage;

function seed() {
  return {
    users: [],
    session: null,
    prefs: { push: true, email: false },
    orders: [],
    notifications: [],
    counter: 1,
  };
}

function removeLegacyData(db) {
  let changed = false;
  db.users?.forEach((user) => {
    if (Object.hasOwn(user, "password")) {
      delete user.password;
      changed = true;
    }
  });
  if (db.users?.some((user) => user.id === "demo-user")) {
    db.users = db.users.filter((user) => user.id !== "demo-user");
    changed = true;
  }
  if (db.session === "demo-user") {
    db.session = null;
    changed = true;
  }
  if (db.orders?.some((order) => order.seeded)) {
    db.orders = db.orders.filter((order) => !order.seeded);
    changed = true;
  }
  if (db.notifications?.some((notification) => notification.id?.startsWith("n-seed"))) {
    db.notifications = db.notifications.filter(
      (notification) => !notification.id?.startsWith("n-seed"),
    );
    changed = true;
  }
  return changed;
}

let cache = null;
export function read() {
  if (cache) return cache;
  if (!hasWindow()) return seed();
  try {
    const raw = window.localStorage.getItem(KEY);
    cache = raw ? JSON.parse(raw) : seed();
    if (removeLegacyData(cache)) window.localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    cache = seed();
  }
  return cache;
}

export function write(mutator) {
  const next = structuredClone(read());
  mutator(next);
  cache = next;
  if (hasWindow()) window.localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((l) => l(next));
  return next;
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function clearLocalState() {
  cache = null;
  if (hasWindow()) window.localStorage.removeItem(KEY);
  const s = read();
  write(() => {});
  return s;
}

export const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));
