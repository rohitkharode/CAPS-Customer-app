import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordPage } from "@/caps/pages/AuthPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/forgot-password")({
  head: () => pageHead("Reset password", "Reset your CAPS account password."),
  component: ForgotPasswordPage,
});
