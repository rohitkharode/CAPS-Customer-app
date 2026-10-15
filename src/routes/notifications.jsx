import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/caps/pages/NotificationsPage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/notifications")({
  head: () => pageHead("Notifications", "Updates about your CAPS print jobs."),
  component: NotificationsPage,
});
