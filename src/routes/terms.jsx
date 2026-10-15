import { createFileRoute } from "@tanstack/react-router";
import { TermsPage } from "@/caps/pages/InfoPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/terms")({
  head: () => pageHead("Terms of Service", "CAPS terms of service."),
  component: TermsPage,
});
