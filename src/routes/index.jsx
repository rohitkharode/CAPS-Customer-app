import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/caps/pages/HomePage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead(
      "Find print shops",
      "Find nearby CAPS print shops with distance, rating, wait time and prices.",
    ),
  component: HomePage,
});
