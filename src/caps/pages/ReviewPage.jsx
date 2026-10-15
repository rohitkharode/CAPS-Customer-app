import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FileText, Zap } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { PriceBreakdown, SettingsGrid } from "../components/domain";
import { Badge, Button, Card, EmptyState, Notice, cx } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { shopService } from "../services/shopService";
import { orderService } from "../services/orderService";
import { calculatePrice } from "../lib/pricing";
import { estimateInsertion, urgentAvailable } from "../lib/queue";
import { parsePageRange, validateCopies } from "../lib/validation";
import { PAYMENT_METHODS } from "../lib/config";
import { bytes, rupees } from "../lib/format";
import { CAPS_RUNTIME } from "../services/runtime";

export function ReviewPage() {
  const { draft, setDraft, clearDraft } = useApp();
  const nav = useNavigate();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState("");
  const shop = draft.shopId ? shopService.get(draft.shopId) : null;
  const doc = draft.document;
  const s = draft.settings;
  const settingsOk =
    doc &&
    !validateCopies(s.copies) &&
    (s.pageRange.mode === "all" || parsePageRange(s.pageRange.value, doc.pageCount).ok);
  if (!shop || !doc || !settingsOk)
    return (
      <AppShell back="/configure" title="Review & Payment">
        <EmptyState
          icon={FileText}
          title="Your order isn't ready yet"
          action={
            <Link to={doc ? "/configure" : "/upload"} className="btn btn--primary">
              Go back
            </Link>
          }
        >
          Upload a document and finish the print settings first.
        </EmptyState>
      </AppShell>
    );

  const urgent = urgentAvailable(shop);
  const flexEst = estimateInsertion(shop.queue, "flexible", shop.avgMinPerJob);
  const urgEst = estimateInsertion(shop.queue, "urgent", shop.avgMinPerJob);
  const tier = draft.tier === "urgent" && !urgent.ok ? null : draft.tier;
  const flexPrice = calculatePrice({
    settings: s,
    pageCount: doc.pageCount,
    shop,
    tier: "flexible",
  });
  const urgPrice = calculatePrice({ settings: s, pageCount: doc.pageCount, shop, tier: "urgent" });
  const price = tier === "urgent" ? urgPrice : flexPrice;
  const methods = PAYMENT_METHODS.map((m) => ({
    ...m,
    disabled: m.value === "pay_at_counter" && !shop.payAtCounter,
  }));
  const method = methods.find((m) => m.value === draft.paymentMethod && !m.disabled)?.value || null;

  const place = async () => {
    setError("");
    setPlacing(true);
    try {
      const id = await orderService.create({
        shopId: shop.id,
        document: doc,
        settings: s,
        tier,
        paymentMethod: method,
      });
      clearDraft();
      if (method === "pay_at_counter") nav({ to: "/track/$orderId", params: { orderId: id } });
      else nav({ to: "/payment/$orderId", params: { orderId: id } });
    } catch (e) {
      setError(e.message);
      setPlacing(false);
    }
  };

  return (
    <AppShell
      back="/configure"
      title="Review & Payment"
      footer={
        <div className="stack-sm">
          <Button
            block
            disabled={!tier || !method || !CAPS_RUNTIME.backendConfigured}
            loading={placing}
            onClick={place}
          >
            {method === "pay_at_counter" ? "Place Order" : "Continue to Payment"}
          </Button>
          <p className="muted small center">
            {!tier
              ? "Choose Flexible or Urgent."
              : !method
                ? "Choose a payment method."
                : !CAPS_RUNTIME.backendConfigured
                  ? "Order submission is unavailable until the backend is connected."
                  : `Estimated total ${rupees(price.totalPaise)}`}
          </p>
        </div>
      }
    >
      <Card>
        <span className="label">Selected shop</span>
        <div className="shop-card__head">
          <strong>{shop.name}</strong>
          <Badge tone="ok">Open</Badge>
        </div>
        <p className="meta">
          {shop.distanceKm} km · ~{shop.waitMin} min wait
        </p>
      </Card>

      <section aria-labelledby="prio">
        <h2 id="prio" className="section-title">
          Priority selection
        </h2>
        <div className="tiers" role="radiogroup" aria-label="Priority">
          <TierOption
            value="flexible"
            selected={tier === "flexible"}
            onSelect={() => setDraft({ tier: "flexible" })}
            title="Flexible"
            price="No extra cost"
            desc="Standard first-come, first-served queue."
            est={flexEst}
          />
          <TierOption
            value="urgent"
            selected={tier === "urgent"}
            disabled={!urgent.ok}
            onSelect={() => setDraft({ tier: "urgent" })}
            title="Urgent"
            icon={Zap}
            price={`+${rupees(urgPrice.urgentPaise)}`}
            desc="Printed ahead of all Flexible jobs, after the job printing now and any earlier Urgent jobs."
            est={urgEst}
            extra={urgent.ok ? `Revised total ${rupees(urgPrice.totalPaise)}` : urgent.reason}
          />
        </div>
        <p className="muted small">
          Queue positions and times are estimates until the backend returns authoritative data.
        </p>
      </section>

      <Card>
        <h2 className="h3">Order summary</h2>
        <div className="file-card">
          <FileText size={24} aria-hidden />
          <div className="file-card__body">
            <strong className="truncate">{doc.name}</strong>
            <p className="meta">
              {price.pages} pages · {s.copies} cop{s.copies === 1 ? "y" : "ies"} · {bytes(doc.size)}
            </p>
          </div>
        </div>
        <SettingsGrid settings={s} document={doc} />
        <Link to="/configure" className="link small">
          Edit settings
        </Link>
      </Card>

      <Card>
        <h2 className="h3">Price breakdown</h2>
        <PriceBreakdown price={price} tier={tier} />
      </Card>

      <section aria-labelledby="pay">
        <h2 id="pay" className="section-title">
          Payment method
        </h2>
        <div className="pay-list" role="radiogroup" aria-label="Payment method">
          {methods.map((m) => (
            <label
              key={m.value}
              className={cx(
                "pay-opt",
                method === m.value && "is-selected",
                m.disabled && "is-disabled",
              )}
            >
              <input
                type="radio"
                name="pay"
                checked={method === m.value}
                disabled={m.disabled}
                onChange={() => setDraft({ paymentMethod: m.value })}
              />
              <span>
                <strong>{m.label}</strong>
                <span className="muted small">
                  {m.disabled ? "Not enabled by this shop" : m.hint}
                </span>
              </span>
            </label>
          ))}
        </div>
        {method === "pay_at_counter" && (
          <Notice>Your job joins the queue now and you pay at the shop when you collect it.</Notice>
        )}
      </section>
      {error && <Notice tone="danger">{error}</Notice>}
    </AppShell>
  );
}

function TierOption({ selected, disabled, onSelect, title, price, desc, est, extra, icon: Icon }) {
  return (
    <label className={cx("tier", selected && "is-selected", disabled && "is-disabled")}>
      <input type="radio" name="tier" checked={selected} disabled={disabled} onChange={onSelect} />
      <div className="tier__head">
        <strong className={Icon ? "tier__title-icon" : undefined}>
          {Icon && <Icon size={18} aria-hidden />}
          {title}
        </strong>
        <span>{price}</span>
      </div>
      <p className="muted small">{desc}</p>
      <p className="tier__est">
        Position #{est.position} · ~{est.etaMin} min
      </p>
      {extra && <p className={cx("small", disabled ? "text-danger" : "strong")}>{extra}</p>}
    </label>
  );
}
