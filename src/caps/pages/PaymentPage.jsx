import { Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { Card, EmptyState, Notice, Row } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { rupees, PAYMENT_STATUS, LABELS } from "../lib/format";

export function PaymentPage({ orderId }) {
  const { orders } = useApp();
  const order = orders.find((o) => o.id === orderId);

  if (!order)
    return (
      <AppShell back="/orders" title="Payment">
        <EmptyState
          icon={FileText}
          title="Order not found"
          action={
            <Link to="/orders" className="btn btn--primary">
              My orders
            </Link>
          }
        />
      </AppShell>
    );

  return (
    <AppShell back="/orders" title="Payment">
      <Notice tone="info">
        Payment is unavailable until the backend payment service is connected. No payment was
        attempted and this order remains unchanged.
      </Notice>
      <Card>
        <Row label="Order" value={`#${order.id}`} />
        <Row label="Shop" value={order.shopName} />
        <Row label="Priority" value={LABELS[order.tier]} />
        <Row label="Amount payable" value={rupees(order.price.totalPaise)} strong />
        <Row label="Payment status" value={PAYMENT_STATUS[order.payment.status]} />
      </Card>
      <Link to="/orders/$orderId" params={{ orderId }} className="btn btn--secondary btn--block">
        Back to job details
      </Link>
    </AppShell>
  );
}
