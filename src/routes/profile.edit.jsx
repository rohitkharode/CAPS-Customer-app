import { createFileRoute } from "@tanstack/react-router";
import { EditProfilePage } from "@/caps/pages/ProfilePages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/profile/edit")({
  head: () => pageHead("Edit profile", "Update your CAPS name, email and phone."),
  component: EditProfilePage,
});
