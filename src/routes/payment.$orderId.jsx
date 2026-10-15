import { createFileRoute } from "@tanstack/react-router";
import { PaymentPage } from "@/caps/pages/PaymentPage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/payment/$orderId")({
  head: () => pageHead("Payment", "Payment for your CAPS print order."),
  component: RoutePage,
});

function RoutePage() {
  const { orderId } = Route.useParams();
  return <PaymentPage orderId={orderId} key={orderId} />;
}
