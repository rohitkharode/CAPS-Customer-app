import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/caps/pages/ProfilePages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/profile/")({
  head: () => pageHead("Profile", "Your CAPS account and preferences."),
  component: ProfilePage,
});
