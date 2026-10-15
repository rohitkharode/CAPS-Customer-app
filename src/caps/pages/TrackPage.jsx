import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { StatusBadge, StatusTimeline } from "../components/domain";
import { Badge, Button, Card, Dialog, EmptyState, Notice } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { orderService } from "../services/orderService";
import { LABELS, relative } from "../lib/format";

export function TrackPage({ orderId }) {
  const { orders } = useApp();
  const order = orders.find((o) => o.id === orderId);
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  if (!order)
    return (
      <AppShell back="/orders" title="Track Job">
        <EmptyState
          icon={FileText}
          title="Job not found"
          action={
            <Link to="/orders" className="btn btn--primary">
              My orders
            </Link>
          }
        />
      </AppShell>
    );

  const cancel = async () => {
    setBusy(true);
    setErr("");
    try {
      await orderService.cancel(orderId);
      setConfirm(false);
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AppShell back="/orders" title="Track Job">
      <Card>
        <div className="shop-card__head">
          <strong className="truncate">{order.shopName}</strong>
          <Badge tone={order.tier === "urgent" ? "warn" : "info"}>{LABELS[order.tier]}</Badge>
        </div>
        <div className="token-row">
          <div>
            <span className="label">Queue token</span>
            <strong className="token">#{order.token}</strong>
          </div>
          <div className="right">
            <span className="label">Status</span>
            <StatusBadge status={order.status} />
          </div>
        </div>
        {(order.status === "queued" || order.status === "printing") && (
          <div className="stats3">
            <div>
              <strong>{order.queuePosition}</strong>
              <span>Current position</span>
            </div>
            <div>
              <strong>{order.status === "printing" ? 0 : order.jobsAhead}</strong>
              <span>Jobs ahead</span>
            </div>
            <div>
              <strong>{order.etaMin}m</strong>
              <span>Est. completion</span>
            </div>
          </div>
        )}
        <div className="file-card">
          <FileText size={22} aria-hidden />
          <div className="file-card__body">
            <strong className="truncate">{order.document.name}</strong>
            {order.stage === "printing" && (
              <div
                className="progress"
                role="progressbar"
                aria-valuenow={order.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Print progress"
              >
                <span style={{ width: `${order.progress}%` }} />
              </div>
            )}
          </div>
        </div>
        <p className="muted small" aria-live="polite">
          Last updated {relative(order.updatedAt, Date.now())}. Live status updates require the
          backend connection.
        </p>
      </Card>

      {order.status === "pending_payment" && (
        <Notice tone="warn">
          Awaiting payment. Your job isn't sent to the shop until payment is confirmed.{" "}
          <Link to="/payment/$orderId" params={{ orderId }} className="link">
            Complete payment
          </Link>
        </Notice>
      )}
      {order.stage === "ready" && (
        <Notice tone="ok">
          Ready for pickup at {order.shopName}. Show token #{order.token}.
          {order.payment.method === "pay_at_counter" ? " Pay at the counter." : ""}
        </Notice>
      )}
      {order.status === "failed" && (
        <Notice tone="danger">
          This job failed at the shop. Refund status:{" "}
          {order.payment.status === "refunded" ? "refunded" : "no online payment was taken"}.
        </Notice>
      )}
      {order.status === "cancelled" && <Notice>This job was cancelled.</Notice>}

      <Card>
        <h2 className="h3">Timeline</h2>
        <StatusTimeline order={order} />
      </Card>

      <div className="stack-sm">
        <Link to="/orders/$orderId" params={{ orderId }} className="btn btn--secondary btn--block">
          View Job Details
        </Link>
        {orderService.canCancel(order) && (
          <Button variant="danger" block onClick={() => setConfirm(true)}>
            Cancel Job
          </Button>
        )}
        <p className="muted small center">
          Cancelling is allowed only while a job is waiting for payment or queued (assumption; the
          SRS doesn't define this).
        </p>
      </div>

      <Dialog
        open={confirm}
        title="Cancel this job?"
        onClose={() => setConfirm(false)}
        actions={
          <>
            <Button variant="secondary" onClick={() => setConfirm(false)}>
              Keep job
            </Button>
            <Button variant="danger" loading={busy} onClick={cancel}>
              Cancel job
            </Button>
          </>
        }
      >
        <p>
          {order.payment.status === "success"
            ? "A refund would be issued according to the backend payment policy."
            : "Nothing has been charged."}
        </p>
        {err && <Notice tone="danger">{err}</Notice>}
      </Dialog>
    </AppShell>
  );
}
