import { createFileRoute } from "@tanstack/react-router";
import { ReviewPage } from "@/caps/pages/ReviewPage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/review")({
  head: () =>
    pageHead(
      "Review & payment",
      "Choose Urgent or Flexible priority, review price and pick a payment method.",
    ),
  component: ReviewPage,
});
