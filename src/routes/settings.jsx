import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/caps/pages/ProfilePages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/settings")({
  head: () => pageHead("Settings", "Notification preferences, privacy and account settings."),
  component: SettingsPage,
});
