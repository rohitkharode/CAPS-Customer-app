import { Link } from "@tanstack/react-router";
import { Check, Clock, MapPin, Star, X } from "lucide-react";
import { Badge, Row, cx } from "./ui";
import { LABELS, STATUS, dateTime, rupees } from "../lib/format";
import { shopService } from "../services/shopService";

export function ShopCard({ shop }) {
  return (
    <article className="card shop-card">
      <div className="shop-card__head">
        <h3>
          <Link to="/shops/$shopId" params={{ shopId: shop.id }} className="stretched">
            {shop.name}
          </Link>
        </h3>
        <Badge tone={shop.open ? "ok" : "muted"}>{shop.open ? "Open" : "Closed"}</Badge>
      </div>
      <p className="meta">
        <Star size={14} aria-hidden className="star" /> {shop.rating} ·{" "}
        <MapPin size={14} aria-hidden /> {shop.distanceKm} km away
      </p>
      <div className="shop-card__stats">
        <div>
          <span className="label">Est. wait</span>
          <strong>{shop.open ? `${shop.waitMin} min` : "—"}</strong>
        </div>
        <div>
          <span className="label">Starting at</span>
          <strong>{rupees(shopService.startingPrice(shop))}/page</strong>
        </div>
      </div>
      {!shop.open && <p className="muted small">Opens at {shop.opensAt}</p>}
    </article>
  );
}

export function StatusBadge({ status }) {
  const s = STATUS[status] || { label: status, tone: "muted" };
  return <Badge tone={s.tone}>{s.label}</Badge>;
}

export function OrderCard({ order }) {
  return (
    <article className="card order-card">
      <div className="order-card__head">
        <h3 className="truncate">
          <Link to="/orders/$orderId" params={{ orderId: order.id }} className="stretched">
            {order.document.name}
          </Link>
        </h3>
        <StatusBadge status={order.status} />
      </div>
      <p className="meta truncate">{order.shopName}</p>
      <p className="meta">{dateTime(order.createdAt)}</p>
      <div className="order-card__foot">
        <span>
          {order.price.pages ?? order.document.pageCount} pages ·{" "}
          <Badge tone={order.tier === "urgent" ? "warn" : "info"}>{LABELS[order.tier]}</Badge>
        </span>
        <strong>{rupees(order.price.totalPaise)}</strong>
      </div>
    </article>
  );
}

export function PriceBreakdown({ price, tier, compact }) {
  const pct = Math.round(price.gstRate * 100);
  return (
    <div className="breakdown">
      <Row
        label={`Print (${price.pages} pg × ${price.copies} cop${price.copies === 1 ? "y" : "ies"} × ${rupees(price.ratePaise)})`}
        value={rupees(price.printPaise)}
      />
      {price.bindingPaise > 0 && (
        <Row
          label={`Binding (${rupees(price.bindingUnitPaise)} × ${price.copies})`}
          value={rupees(price.bindingPaise)}
        />
      )}
      {tier === "urgent" && <Row label="Urgent surcharge" value={rupees(price.urgentPaise)} />}
      <Row label={<>GST ({pct}%)</>} value={rupees(price.gstPaise)} />
      {!compact && <Row label="Estimated total" value={rupees(price.totalPaise)} strong />}
    </div>
  );
}

export function SettingsGrid({ settings, document }) {
  const range =
    settings.pageRange.mode === "all" ? `All (${document.pageCount})` : settings.pageRange.value;
  const items = [
    ["Paper", settings.paper],
    ["Color", LABELS[settings.color]],
    ["Sides", LABELS[settings.sides]],
    ["Orientation", LABELS[settings.orientation]],
    ["Copies", settings.copies],
    ["Pages", range],
    ["Binding", LABELS[settings.binding]],
  ];
  return (
    <dl className="settings-grid">
      {items.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

const STEPS = [
  { key: "queued", label: "Queued" },
  { key: "downloading", label: "Sent to shop printer" },
  { key: "printing", label: "Printing" },
  { key: "completed", label: "Completed" },
  { key: "ready", label: "Ready for pickup" },
];

export function StatusTimeline({ order }) {
  const terminal = order.status === "failed" || order.status === "cancelled";
  const idx =
    order.stage === "pending_payment" ? -1 : STEPS.findIndex((s) => s.key === order.stage);
  return (
    <ol className="timeline">
      {order.status === "pending_payment" && (
        <li className="timeline__item is-current">
          <span className="timeline__dot">
            <Clock size={14} />
          </span>
          <div>
            <strong>Pending payment</strong>
            <p className="muted small">Not sent to the shop until payment is confirmed.</p>
          </div>
        </li>
      )}
      {STEPS.map((s, i) => {
        const done = !terminal && (i < idx || (s.key === "ready" && idx === i));
        const current = !terminal && i === idx && s.key !== "ready";
        return (
          <li
            key={s.key}
            className={cx("timeline__item", done && "is-done", current && "is-current")}
          >
            <span className="timeline__dot">
              {done ? <Check size={14} /> : current ? <Clock size={14} /> : null}
            </span>
            <div>
              <strong>{s.label}</strong>
              {current && (
                <p className="muted small">
                  {s.key === "printing" ? `${order.progress}% printed` : "In progress…"}
                </p>
              )}
            </div>
          </li>
        );
      })}
      {terminal && (
        <li className="timeline__item is-failed">
          <span className="timeline__dot">
            <X size={14} />
          </span>
          <div>
            <strong>{order.status === "failed" ? "Print failed" : "Cancelled"}</strong>
            {order.payment?.status === "refunded" && (
              <p className="muted small">Refund status: refunded</p>
            )}
          </div>
        </li>
      )}
    </ol>
  );
}
