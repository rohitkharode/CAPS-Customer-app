import { createFileRoute } from "@tanstack/react-router";
import { LoginPage } from "@/caps/pages/AuthPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/login")({
  head: () => pageHead("Log in", "Sign in to CAPS to print documents at nearby shops."),
  component: LoginPage,
});
