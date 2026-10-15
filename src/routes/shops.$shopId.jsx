import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/caps/pages/ShopPage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/shops/$shopId")({
  head: () => pageHead("Shop details", "Shop services, pricing, queue and directions."),
  component: RoutePage,
});

function RoutePage() {
  const { shopId } = Route.useParams();
  return <ShopPage shopId={shopId} key={shopId} />;
}
