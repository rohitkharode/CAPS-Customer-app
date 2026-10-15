import { createFileRoute } from "@tanstack/react-router";
import { TrackPage } from "@/caps/pages/TrackPage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/track/$orderId")({
  head: () => pageHead("Track job", "Queue token, position and status of your print job."),
  component: RoutePage,
});

function RoutePage() {
  const { orderId } = Route.useParams();
  return <TrackPage orderId={orderId} key={orderId} />;
}
