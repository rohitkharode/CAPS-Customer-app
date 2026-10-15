// Temporary local session adapter. Future: backend authentication.
// Temporary local session adapter. Replace with the agreed auth contract later.
import { delay, read, write } from "./mockDb";
import { isEmail } from "../lib/validation";

const norm = (v) =>
  String(v || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/^\+91/, "");
export const authService = {
  currentUser() {
    const db = read();
    return db.users.find((u) => u.id === db.session) || null;
  },
  async login({ identifier, password }) {
    await delay(500);
    const id = norm(identifier);
    if (!id || !password) throw new Error("Enter your identifier and password.");
    const existing = read().users.find((u) =>
      isEmail(id) ? u.email.toLowerCase() === id : u.phone === id,
    );
    const user = existing || {
      id: "local-user-" + Date.now(),
      name: isEmail(id) ? id.split("@")[0] : "Customer",
      email: isEmail(id) ? id : "",
      phone: isEmail(id) ? "" : id,
    };
    if (!existing) write((db) => db.users.push(user));
    write((db) => (db.session = user.id));
    return user;
  },
  async register({ name, phone, email, password }) {
    await delay(600);
    const db = read();
    if (db.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase()))
      throw new Error("An account with this email already exists.");
    if (db.users.some((u) => u.phone === norm(phone)))
      throw new Error("An account with this phone number already exists.");
    const user = {
      id: "u-" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      phone: norm(phone),
    };
    write((d) => {
      d.users.push(user);
      d.session = user.id;
    });
    return user;
  },
  async requestPasswordReset() {
    await delay(500);
    return { ok: true }; // no email is actually sent
  },
  async logout() {
    await delay(200);
    write((db) => (db.session = null));
  },
};
