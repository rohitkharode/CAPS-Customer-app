import { useNavigate } from "@tanstack/react-router";
import { Clock, MapPin, Navigation, Star, Store } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { Badge, Button, Card, EmptyState, Notice } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { shopService } from "../services/shopService";
import { orderQueue, urgentAvailable } from "../lib/queue";
import { describeSurcharge } from "../lib/pricing";
import { rupees } from "../lib/format";

export function ShopPage({ shopId }) {
  const { setDraft, draft } = useApp();
  const nav = useNavigate();
  const shop = shopService.get(shopId);
  if (!shop)
    return (
      <AppShell back="/" title="Shop">
        <EmptyState icon={Store} title="Shop not found" />
      </AppShell>
    );
  const q = orderQueue(shop.queue);
  const urgent = urgentAvailable(shop);
  const p = shop.pricing;
  const start = () => {
    setDraft({
      shopId: shop.id,
      tier: null,
      paymentMethod: null,
      ...(draft.shopId !== shop.id ? {} : {}),
    });
    nav({ to: "/upload" });
  };
  const maps = `https://www.google.com/maps/dir/?api=1&destination=${shop.lat},${shop.lng}`;

  return (
    <AppShell
      back="/"
      title="Shop Details"
      footer={
        <Button block onClick={start} disabled={!shop.open}>
          {shop.open ? "Start Printing" : `Closed — opens at ${shop.opensAt}`}
        </Button>
      }
    >
      <Card>
        <div className="shop-card__head">
          <h2 className="h2">{shop.name}</h2>
          <Badge tone={shop.open ? "ok" : "muted"}>{shop.open ? "Open" : "Closed"}</Badge>
        </div>
        <p className="meta">
          <Star size={14} className="star" aria-hidden /> {shop.rating} ({shop.reviews}) ·{" "}
          {shop.distanceKm} km · <Clock size={14} aria-hidden /> {shop.hours}
        </p>
        <p className="meta">
          <MapPin size={14} aria-hidden /> {shop.address}
        </p>
        <a className="btn btn--secondary" href={maps} target="_blank" rel="noopener noreferrer">
          <Navigation size={16} aria-hidden /> Get Directions
        </a>
        <p className="muted small">Opens Google Maps in a new tab.</p>
      </Card>

      <Card className="queue-card">
        <h3 className="h3">Current Queue</h3>
        {shop.open ? (
          <>
            <p className="big">
              {q.length} <span className="muted">jobs in queue</span>
            </p>
            <p className="muted">
              Estimated wait: ~{shop.waitMin} min · Urgent jobs are served before Flexible jobs.
            </p>
          </>
        ) : (
          <p className="muted">The shop is closed. The queue opens at {shop.opensAt}.</p>
        )}
      </Card>

      <Card>
        <h3 className="h3">Services & Pricing</h3>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Paper</th>
              <th scope="col">B&W / page</th>
              <th scope="col">Color / page</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(p.perPage).map(([size, r]) => (
              <tr key={size}>
                <th scope="row">{size}</th>
                <td>{r ? rupees(r.bw) : "Not offered"}</td>
                <td>{r ? rupees(r.color) : "Not offered"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="breakdown">
          {["spiral", "staple", "lamination"].map((b) => (
            <div className="row" key={b}>
              <span className="cap">{b} (per copy)</span>
              <span>{p.binding[b] == null ? "Not offered" : rupees(p.binding[b])}</span>
            </div>
          ))}
          <div className="row">
            <span>Urgent surcharge</span>
            <span>{describeSurcharge(shop)}</span>
          </div>
          <div className="row">
            <span>Pay at counter</span>
            <span>{shop.payAtCounter ? "Available" : "Not available"}</span>
          </div>
        </div>
        {!urgent.ok && (
          <Notice tone="warn">{urgent.reason} Flexible printing is still available.</Notice>
        )}
      </Card>
      <p className="muted small">
        Under the CAPS policy, documents are kept in encrypted storage and deleted automatically
        within the retention window. Backend enforcement isn't connected in this frontend.
      </p>
    </AppShell>
  );
}
