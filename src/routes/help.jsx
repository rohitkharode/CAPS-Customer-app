import { createFileRoute } from "@tanstack/react-router";
import { HelpPage } from "@/caps/pages/InfoPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/help")({
  head: () => pageHead("Help & Support", "Answers to common CAPS questions."),
  component: HelpPage,
});
