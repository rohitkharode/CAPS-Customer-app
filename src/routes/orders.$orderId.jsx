import { createFileRoute } from "@tanstack/react-router";
import { OrderDetailPage } from "@/caps/pages/OrdersPages";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/orders/$orderId")({
  head: () => pageHead("Order details", "Print job details and receipt."),
  component: RoutePage,
});

function RoutePage() {
  const { orderId } = Route.useParams();
  return <OrderDetailPage orderId={orderId} key={orderId} />;
}
