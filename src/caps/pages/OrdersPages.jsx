import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Download, FileText, Inbox, Printer, Search, Share2 } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { OrderCard, PriceBreakdown, SettingsGrid, StatusBadge } from "../components/domain";
import { Button, Card, EmptyState, Notice, Row, cx } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { LABELS, PAYMENT_STATUS, STATUS, dateTime, rupees } from "../lib/format";

const FILTERS = [
  "all",
  "pending_payment",
  "queued",
  "printing",
  "completed",
  "failed",
  "cancelled",
];
const WEEK = 7 * 24 * 3600 * 1000;

export function OrdersPage() {
  const { orders, user } = useApp();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const mine = orders.filter((o) => o.customerId === user?.id);
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return mine
      .filter((o) => status === "all" || o.status === status)
      .filter(
        (o) =>
          !s ||
          o.document.name.toLowerCase().includes(s) ||
          o.shopName.toLowerCase().includes(s) ||
          o.id.toLowerCase().includes(s),
      )
      .sort((a, b) => b.createdAt - a.createdAt);
  }, [mine, q, status]);
  const now = Date.now();
  const recent = list.filter((o) => now - o.createdAt < WEEK);
  const older = list.filter((o) => now - o.createdAt >= WEEK);

  return (
    <AppShell title="My Orders">
      <div className="search">
        <Search size={18} aria-hidden />
        <input
          type="search"
          placeholder="Search jobs or shops"
          aria-label="Search orders"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      <div className="chips scroll-x" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={cx("chip", status === f && "is-on")}
            aria-pressed={status === f}
            onClick={() => setStatus(f)}
          >
            {f === "all" ? "All statuses" : STATUS[f].label}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <EmptyState
          icon={Inbox}
          title="No orders found"
          action={
            <Link to="/" className="btn btn--primary">
              Find a shop
            </Link>
          }
        >
          {mine.length ? "Try another search or filter." : "Your print jobs will appear here."}
        </EmptyState>
      ) : (
        <>
          {recent.length > 0 && <h2 className="section-title">Recent</h2>}
          <div className="list">
            {recent.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
          {older.length > 0 && <h2 className="section-title">Older</h2>}
          <div className="list">
            {older.map((o) => (
              <OrderCard key={o.id} order={o} />
            ))}
          </div>
        </>
      )}
    </AppShell>
  );
}

function receiptText(o) {
  const p = o.price;
  const lines = [
    "CAPS RECEIPT",
    "==========================================",
    `Order / token : #${o.id}`,
    `Shop          : ${o.shopName}`,
    `Date          : ${dateTime(o.createdAt)}`,
    `Document      : ${o.document.name}`,
    `Settings      : ${o.settings.paper}, ${LABELS[o.settings.color]}, ${LABELS[o.settings.sides]}, ${LABELS[o.settings.orientation]}, ${o.settings.copies} copies, ${LABELS[o.settings.binding]}`,
    `Priority      : ${LABELS[o.tier]}`,
    `Status        : ${STATUS[o.status].label}`,
    "------------------------------------------",
  ];
  if (p.printPaise !== undefined) {
    lines.push(`Print         : ${rupees(p.printPaise)}`);
    if (p.bindingPaise) lines.push(`Binding       : ${rupees(p.bindingPaise)}`);
    if (p.urgentPaise) lines.push(`Urgent        : ${rupees(p.urgentPaise)}`);
    lines.push(`GST (${Math.round(p.gstRate * 100)}%): ${rupees(p.gstPaise)}`);
  }
  lines.push(`TOTAL         : ${rupees(p.totalPaise)}`);
  lines.push(`Payment       : ${LABELS[o.payment.method]} — ${PAYMENT_STATUS[o.payment.status]}`);
  if (o.payment.ref) lines.push(`Payment ref   : ${o.payment.ref}`);
  lines.push("", "Receipt data supplied by CAPS.");
  return lines.join("\n");
}

export function OrderDetailPage({ orderId }) {
  const { orders } = useApp();
  const o = orders.find((x) => x.id === orderId);
  const [msg, setMsg] = useState("");
  if (!o)
    return (
      <AppShell back="/orders" title="Order">
        <EmptyState
          icon={FileText}
          title="Order not found"
          action={
            <Link to="/orders" className="btn btn--primary">
              Back to orders
            </Link>
          }
        />
      </AppShell>
    );

  const download = () => {
    const blob = new Blob([receiptText(o)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `CAPS-receipt-${o.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  };
  const share = async () => {
    const text = receiptText(o);
    try {
      if (navigator.share) await navigator.share({ title: `CAPS receipt #${o.id}`, text });
      else {
        await navigator.clipboard.writeText(text);
        setMsg("Receipt copied to clipboard.");
      }
    } catch (e) {
      if (e?.name !== "AbortError") setMsg("Couldn't share. Try Download instead.");
    }
  };

  const hasBreakdown = o.price.printPaise !== undefined;
  return (
    <AppShell back="/orders" title="Order Details">
      <Card>
        <div className="shop-card__head">
          <div>
            <strong>{o.shopName}</strong>
            <p className="meta">{dateTime(o.createdAt)}</p>
          </div>
          <StatusBadge status={o.status} />
        </div>
        <div className="token-box">
          <span className="label">Queue token</span>
          <strong className="token">#{o.token}</strong>
        </div>
        <p className="truncate">
          <strong>{o.document.name}</strong>
        </p>
        <p className="meta">{o.price.pages ?? o.document.pageCount} pages</p>
        <SettingsGrid settings={o.settings} document={o.document} />
        <Row label="Priority" value={LABELS[o.tier]} />
        {["queued", "printing", "pending_payment"].includes(o.status) || o.stage === "completed" ? (
          <Link
            to="/track/$orderId"
            params={{ orderId: o.id }}
            className="btn btn--primary btn--block"
          >
            Track live status
          </Link>
        ) : null}
      </Card>

      <Card className="receipt">
        <h2 className="h3">Payment summary</h2>
        {hasBreakdown ? (
          <PriceBreakdown price={o.price} tier={o.tier} />
        ) : (
          <Row label="Total" value={rupees(o.price.totalPaise)} strong />
        )}
        <Row label="Method" value={LABELS[o.payment.method]} />
        <Row label="Payment status" value={PAYMENT_STATUS[o.payment.status]} />
        {o.payment.ref && <Row label="Payment reference" value={o.payment.ref} />}
        <p className="muted small">
          Receipt availability and payment authority depend on the backend connection.
        </p>
      </Card>
      {msg && <Notice>{msg}</Notice>}
      <div className="btn-row no-print">
        <Button variant="secondary" onClick={() => window.print()}>
          <Printer size={16} aria-hidden /> View / Print
        </Button>
        <Button variant="secondary" onClick={download}>
          <Download size={16} aria-hidden /> Download
        </Button>
        <Button variant="secondary" onClick={share}>
          <Share2 size={16} aria-hidden /> Share
        </Button>
      </div>
    </AppShell>
  );
}
