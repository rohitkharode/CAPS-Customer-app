import { Link, useNavigate } from "@tanstack/react-router";
import { FileText, Minus, Plus } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { PriceBreakdown } from "../components/domain";
import { Button, Card, EmptyState, Field, Segmented } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { shopService } from "../services/shopService";
import { calculatePrice, perPageRate } from "../lib/pricing";
import { parsePageRange, validateCopies } from "../lib/validation";
import {
  BINDINGS,
  COLOR_MODES,
  COPIES_MAX,
  COPIES_MIN,
  ORIENTATIONS,
  PAPER_SIZES,
  SIDES,
} from "../lib/config";
import { bytes, rupees } from "../lib/format";

export function ConfigurePage() {
  const { draft, setDraft } = useApp();
  const nav = useNavigate();
  const shop = draft.shopId ? shopService.get(draft.shopId) : null;
  const doc = draft.document;
  if (!shop || !doc)
    return (
      <AppShell back="/upload" title="Configure Print">
        <EmptyState
          icon={FileText}
          title="No document selected"
          action={
            <Link to="/upload" className="btn btn--primary">
              Upload a document
            </Link>
          }
        />
      </AppShell>
    );

  const s = draft.settings;
  const set = (patch) => setDraft({ settings: { ...s, ...patch } });
  const copiesErr = validateCopies(s.copies);
  const range =
    s.pageRange.mode === "custom" ? parsePageRange(s.pageRange.value, doc.pageCount) : { ok: true };
  const price = calculatePrice({
    settings: { ...s, copies: copiesErr ? 0 : s.copies },
    pageCount: doc.pageCount,
    shop,
    tier: "flexible",
  });
  const valid = !copiesErr && range.ok && price.pages > 0;

  const paperOpts = PAPER_SIZES.map((p) => ({
    value: p,
    label: p,
    disabled: perPageRate(shop, p, s.color) === null,
    hint: "Not offered at this shop",
  }));
  const bindOpts = BINDINGS.map((b) => ({
    ...b,
    disabled: b.value !== "none" && shop.pricing.binding[b.value] == null,
    hint: "Not offered at this shop",
  }));
  const stepCopies = (d) =>
    set({ copies: Math.min(COPIES_MAX, Math.max(COPIES_MIN, (Number(s.copies) || 1) + d)) });

  return (
    <AppShell
      back="/upload"
      title="Configure Print"
      footer={
        <div className="footer-price">
          <div>
            <span className="label">Total estimate</span>
            <strong className="big">{valid ? rupees(price.totalPaise) : "—"}</strong>
          </div>
          <Button disabled={!valid} onClick={() => nav({ to: "/review" })}>
            Continue
          </Button>
        </div>
      }
    >
      <Card className="file-card">
        <FileText size={28} aria-hidden />
        <div className="file-card__body">
          <strong className="truncate">{doc.name}</strong>
          <p className="meta">
            {doc.pageCount} pages{doc.pageCountSource === "estimated" ? " (estimated)" : ""} ·{" "}
            {bytes(doc.size)}
          </p>
        </div>
      </Card>

      <Card className="stack">
        <Segmented
          label="Paper Size"
          options={paperOpts}
          value={s.paper}
          onChange={(v) => set({ paper: v })}
          columns={3}
        />
        <Segmented
          label="Color"
          options={COLOR_MODES}
          value={s.color}
          onChange={(v) => set({ color: v })}
          columns={2}
        />
        <div className="two-col">
          <Segmented
            label="Sides"
            options={SIDES}
            value={s.sides}
            onChange={(v) => set({ sides: v })}
            columns={1}
          />
          <Segmented
            label="Orientation"
            options={ORIENTATIONS}
            value={s.orientation}
            onChange={(v) => set({ orientation: v })}
            columns={1}
          />
        </div>
        <div className="field">
          <label className="field-label" htmlFor="copies">
            Copies ({COPIES_MIN}–{COPIES_MAX})
          </label>
          <div className="stepper">
            <button
              type="button"
              className="icon-btn"
              onClick={() => stepCopies(-1)}
              disabled={Number(s.copies) <= COPIES_MIN}
              aria-label="Decrease copies"
            >
              <Minus size={18} />
            </button>
            <input
              id="copies"
              className="input"
              type="number"
              inputMode="numeric"
              min={COPIES_MIN}
              max={COPIES_MAX}
              value={s.copies}
              onChange={(e) => set({ copies: e.target.value === "" ? "" : Number(e.target.value) })}
              aria-invalid={!!copiesErr || undefined}
              aria-describedby={copiesErr ? "copies-err" : undefined}
            />
            <button
              type="button"
              className="icon-btn"
              onClick={() => stepCopies(1)}
              disabled={Number(s.copies) >= COPIES_MAX}
              aria-label="Increase copies"
            >
              <Plus size={18} />
            </button>
          </div>
          {copiesErr && (
            <p className="field-error" id="copies-err">
              {copiesErr}
            </p>
          )}
        </div>
        <Segmented
          label="Page Range"
          options={[
            { value: "all", label: `All (${doc.pageCount})` },
            { value: "custom", label: "Custom" },
          ]}
          value={s.pageRange.mode}
          onChange={(v) => set({ pageRange: { ...s.pageRange, mode: v } })}
          columns={2}
        />
        {s.pageRange.mode === "custom" && (
          <Field
            label="Pages to print"
            placeholder="e.g. 1-3,5"
            inputMode="numeric"
            value={s.pageRange.value}
            onChange={(e) => set({ pageRange: { mode: "custom", value: e.target.value } })}
            error={!range.ok ? range.error : null}
            hint={range.ok ? `${range.count} page(s) selected of ${doc.pageCount}` : null}
          />
        )}
        <Segmented
          label="Binding"
          options={bindOpts}
          value={s.binding}
          onChange={(v) => set({ binding: v })}
          columns={4}
        />
      </Card>

      <Card>
        <h3 className="h3">Price estimate</h3>
        {valid ? (
          <PriceBreakdown price={price} tier="flexible" />
        ) : (
          <p className="muted">Fix the highlighted settings to see the price.</p>
        )}
        <p className="muted small">
          Current frontend estimate from this shop's price list. Double-sided is charged per printed
          page, the same as single-sided (assumption). You'll choose Urgent or Flexible on the next
          screen.
        </p>
      </Card>
    </AppShell>
  );
}
