// Local notification adapter. Future: backend notification delivery.
// push (SRS FR-1.9) fed by backend job events.
import { write } from "./mockDb";

export const notificationService = {
  push(n) {
    write((db) => {
      if (db.prefs?.push === false && n.type !== "failed") return; // respect local preference
      db.notifications.unshift({
        id: "n-" + Date.now() + Math.random().toString(36).slice(2, 6),
        read: false,
        createdAt: Date.now(),
        ...n,
      });
    });
  },
  markRead(id) {
    write((db) => {
      const n = db.notifications.find((x) => x.id === id);
      if (n) n.read = true;
    });
  },
  markAllRead() {
    write((db) => db.notifications.forEach((n) => (n.read = true)));
  },
};
