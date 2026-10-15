import { createFileRoute } from "@tanstack/react-router";
import { RegisterPage } from "@/caps/pages/AuthPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/register")({
  head: () =>
    pageHead("Create account", "Create a CAPS account to upload, configure and track print jobs."),
  component: RegisterPage,
});
