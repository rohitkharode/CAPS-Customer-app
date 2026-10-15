import { createFileRoute } from "@tanstack/react-router";
import { PrivacyPage } from "@/caps/pages/InfoPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/privacy")({
  head: () => pageHead("Privacy Policy", "How CAPS handles your documents and data."),
  component: PrivacyPage,
});
