// Local profile adapter. Future: `users` table via backend (SRS §7.1).
import { delay, read, write } from "./mockDb";

export const profileService = {
  async update(patch) {
    await delay(500);
    const db = read();
    if (
      db.users.some(
        (u) => u.id !== db.session && u.email.toLowerCase() === patch.email.trim().toLowerCase(),
      )
    )
      throw new Error("Another account already uses this email.");
    write((d) => {
      const u = d.users.find((x) => x.id === d.session);
      Object.assign(u, {
        name: patch.name.trim(),
        email: patch.email.trim(),
        phone: patch.phone.replace(/\s+/g, "").replace(/^\+91/, ""),
      });
    });
  },
  prefs: () => read().prefs,
  setPref(key, value) {
    write((d) => (d.prefs[key] = value));
  },
};
