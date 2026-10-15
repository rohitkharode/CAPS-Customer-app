import { useState } from "react";
import { AppShell } from "../components/AppShell";
import { Card, Notice } from "../components/ui";

function Public({ title, children }) {
  // Info pages are reachable signed-out too (linked from registration).
  return (
    <div className="auth">
      <div className="integration-banner" role="note">
        CAPS frontend information. Final legal text and backend policies are pending confirmation.
      </div>
      <main className="auth__main wide">
        <button type="button" className="link link-btn" onClick={() => window.history.back()}>
          ← Back
        </button>
        <h1 className="h1">{title}</h1>
        {children}
      </main>
    </div>
  );
}

export function PrivacyPage() {
  return (
    <Public title="Privacy Policy">
      <Notice tone="warn">
        Placeholder. This describes how CAPS is designed to work under the SRS. These protections
        are not active in this frontend.
      </Notice>
      <Card className="prose">
        <h2 className="h3">Your documents</h2>
        <p>
          Uploaded documents are kept in encrypted storage. Only you, the destination shop's
          authenticated print agent and platform administrators can access them.
        </p>
        <p>
          Documents are deleted automatically within a configurable retention window (for example 30
          minutes after printing, or 24 hours at most), whatever the print outcome. The shop's
          computer deletes its temporary copy as soon as the printer accepts the job, or if it fails
          or is cancelled.
        </p>
        <h2 className="h3">Connections</h2>
        <p>All traffic between your device and CAPS is encrypted in transit (HTTPS/WSS).</p>
        <h2 className="h3">Payments</h2>
        <p>Online payments are handled by a payment gateway. CAPS doesn't store card numbers.</p>
        <h2 className="h3">Current frontend behavior</h2>
        <p>
          Nothing is uploaded. Accounts, orders and settings are stored only in this browser's local
          storage and can be cleared from Settings → Clear local data.
        </p>
      </Card>
    </Public>
  );
}

export function TermsPage() {
  return (
    <Public title="Terms of Service">
      <Notice tone="warn">Placeholder terms. Final terms will be provided by the CAPS team.</Notice>
      <Card className="prose">
        <p>
          CAPS connects customers with partner print shops. Shops set their own prices, urgent
          surcharges and urgent-job limits, and decide whether pay-at-counter is available.
        </p>
        <p>
          Jobs are released to a shop only after payment is confirmed, unless pay-at-counter is
          enabled for that order.
        </p>
        <p>
          Urgent jobs are printed before Flexible jobs. Within each tier, jobs are printed
          first-come, first-served.
        </p>
      </Card>
    </Public>
  );
}

const FAQ = [
  [
    "What's the difference between Urgent and Flexible?",
    "Flexible jobs are printed first-come, first-served at no extra cost. Urgent jobs pay a shop-set surcharge and are printed before every Flexible job, after the job printing now and any earlier Urgent jobs.",
  ],
  [
    "Which files can I print?",
    "PDF, DOCX, PPT, JPG and PNG. In the full system, office files are converted to PDF automatically.",
  ],
  [
    "When is my job sent to the shop?",
    "Only after your payment is confirmed, or straight away if you chose pay at counter at a shop that allows it.",
  ],
  [
    "Can I cancel?",
    "You can cancel while a job is waiting for payment or queued. This rule is an assumption until the CAPS team defines it.",
  ],
  [
    "Is any of this real?",
    "This frontend does not connect authentication, uploads, payments, queue authority or push notifications until the backend is available.",
  ],
];

export function HelpPage() {
  const [open, setOpen] = useState(0);
  return (
    <AppShell back="/profile" title="Help & Support">
      <Card>
        {FAQ.map(([q, a], i) => (
          <div key={q} className="faq">
            <button
              className="faq__q"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              {q}
            </button>
            {open === i && <p className="muted">{a}</p>}
          </div>
        ))}
      </Card>
      <Card>
        <h2 className="h3">Contact support</h2>
        <p className="muted small">
          Support contact details haven't been provided yet. This is a placeholder.
        </p>
        <a className="btn btn--secondary" href="mailto:support@caps.example?subject=CAPS%20support">
          Email support (placeholder)
        </a>
      </Card>
    </AppShell>
  );
}
