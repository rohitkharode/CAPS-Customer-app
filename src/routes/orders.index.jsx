import { createFileRoute } from "@tanstack/react-router";
import { OrdersPage } from "@/caps/pages/OrdersPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/orders/")({
  head: () => pageHead("My orders", "Search and filter your CAPS print job history."),
  component: OrdersPage,
});
