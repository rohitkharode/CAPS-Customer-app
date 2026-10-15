import { createFileRoute } from "@tanstack/react-router";
import { ConfigurePage } from "@/caps/pages/ConfigurePage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/configure")({
  head: () =>
    pageHead(
      "Configure print",
      "Choose paper size, color, sides, copies, page range and binding with live pricing.",
    ),
  component: ConfigurePage,
});
