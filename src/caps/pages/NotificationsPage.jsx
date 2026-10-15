import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  Bell,
  BellOff,
  CheckCircle2,
  CreditCard,
  Info,
  ListOrdered,
  PackageCheck,
  Printer,
  XCircle,
} from "lucide-react";
import { AppShell } from "../components/AppShell";
import { Button, EmptyState, cx } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { notificationService } from "../services/notificationService";
import { relative } from "../lib/format";

const ICONS = {
  queued: ListOrdered,
  payment: CreditCard,
  printing: Printer,
  completed: CheckCircle2,
  ready: PackageCheck,
  failed: AlertTriangle,
  cancelled: XCircle,
  info: Info,
};
const DAY = 24 * 3600 * 1000;

export function NotificationsPage() {
  const { notifications, unread } = useApp();
  const nav = useNavigate();
  const today = notifications.filter((n) => Date.now() - n.createdAt < DAY);
  const earlier = notifications.filter((n) => Date.now() - n.createdAt >= DAY);
  const open = (n) => {
    notificationService.markRead(n.id);
    if (n.orderId) nav({ to: "/orders/$orderId", params: { orderId: n.orderId } });
  };
  const Group = ({ title, items }) =>
    items.length > 0 && (
      <>
        <h2 className="section-title">{title}</h2>
        <ul className="notif-list">
          {items.map((n) => {
            const Icon = ICONS[n.type] || Bell;
            return (
              <li key={n.id}>
                <button
                  className={cx(
                    "notif",
                    !n.read && "is-unread",
                    n.type === "failed" && "is-danger",
                  )}
                  onClick={() => open(n)}
                >
                  <Icon size={20} aria-hidden />
                  <span className="notif__body">
                    <span className="notif__head">
                      <strong>{n.title}</strong>
                      <span className="muted small">{relative(n.createdAt)}</span>
                    </span>
                    <span className="muted small">{n.body}</span>
                  </span>
                  {!n.read && <span className="unread-dot" aria-label="Unread" />}
                </button>
              </li>
            );
          })}
        </ul>
      </>
    );
  return (
    <AppShell title="Notifications">
      <div className="between">
        <p className="muted small">{unread} unread · in-app notifications (push isn't connected)</p>
        <Button
          variant="ghost"
          disabled={unread === 0}
          onClick={() => notificationService.markAllRead()}
        >
          Mark all read
        </Button>
      </div>
      {notifications.length === 0 ? (
        <EmptyState icon={BellOff} title="No notifications yet">
          Updates about your print jobs will appear here.
        </EmptyState>
      ) : (
        <>
          <Group title="Today" items={today} />
          <Group title="Earlier" items={earlier} />
        </>
      )}
    </AppShell>
  );
}
