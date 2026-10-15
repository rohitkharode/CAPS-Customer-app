import { useEffect, useId, useRef, useState } from "react";
import { Eye, EyeOff, Info, Loader2, X } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

export function Button({
  variant = "primary",
  block,
  loading,
  className,
  children,
  disabled,
  ...rest
}) {
  return (
    <button
      className={cx("btn", `btn--${variant}`, block && "btn--block", className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <Loader2 className="spin" size={18} aria-hidden />}
      {children}
    </button>
  );
}

export function Card({ as: Tag = "section", className, children, ...rest }) {
  return (
    <Tag className={cx("card", className)} {...rest}>
      {children}
    </Tag>
  );
}

export function Badge({ tone = "muted", children }) {
  return <span className={cx("badge", `badge--${tone}`)}>{children}</span>;
}

export function Notice({ tone = "info", icon: Icon = Info, children }) {
  return (
    <div className={cx("notice", `notice--${tone}`)} role={tone === "danger" ? "alert" : undefined}>
      <Icon size={18} aria-hidden />
      <div>{children}</div>
    </div>
  );
}

/** Accessible radio group rendered as pills/cards. */
export function Segmented({ label, name, options, value, onChange, columns, size }) {
  const id = useId();
  return (
    <fieldset className="seg-field">
      <legend className="field-label">{label}</legend>
      <div
        className={cx("seg", size === "lg" && "seg--lg")}
        style={columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0,1fr))` } : undefined}
      >
        {options.map((o) => (
          <label
            key={o.value}
            className={cx(
              "seg__opt",
              value === o.value && "is-selected",
              o.disabled && "is-disabled",
            )}
            title={o.disabled ? o.hint : undefined}
          >
            <input
              type="radio"
              name={name || id}
              value={o.value}
              checked={value === o.value}
              disabled={o.disabled}
              onChange={() => onChange(o.value)}
            />
            <span className="seg__label">{o.label}</span>
            {o.hint && <span className="seg__hint">{o.hint}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Field({ label, error, hint, id: idProp, as = "input", className, ...rest }) {
  const auto = useId();
  const id = idProp || auto;
  const Tag = as;
  return (
    <div className={cx("field", className)}>
      {label && (
        <label className="field-label" htmlFor={id}>
          {label}
        </label>
      )}
      <Tag
        id={id}
        className={cx("input", error && "input--error")}
        aria-invalid={!!error || undefined}
        aria-describedby={error ? id + "-err" : hint ? id + "-hint" : undefined}
        {...rest}
      />
      {error ? (
        <p className="field-error" id={id + "-err"}>
          {error}
        </p>
      ) : hint ? (
        <p className="field-hint" id={id + "-hint"}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function PasswordField(props) {
  const [show, setShow] = useState(false);
  return (
    <div className="pw">
      <Field type={show ? "text" : "password"} {...props} />
      <button
        type="button"
        className="pw__toggle"
        onClick={() => setShow((s) => !s)}
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
}

export function Toggle({ label, description, checked, onChange }) {
  const id = useId();
  return (
    <div className="toggle-row">
      <div>
        <label htmlFor={id} className="toggle-row__label">
          {label}
        </label>
        {description && <p className="muted small">{description}</p>}
      </div>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        className={cx("switch", checked && "is-on")}
        onClick={() => onChange(!checked)}
      >
        <span />
      </button>
    </div>
  );
}

export function Dialog({ open, title, children, onClose, actions }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement;
    ref.current?.querySelector("button, [href], input")?.focus();
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose?.()}
    >
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-title" ref={ref}>
        <div className="dialog__head">
          <h2 id="dlg-title">{title}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="dialog__body">{children}</div>
        {actions && <div className="dialog__actions">{actions}</div>}
      </div>
    </div>
  );
}

export function Spinner({ label = "Loading…" }) {
  return (
    <div className="spinner" role="status">
      <Loader2 className="spin" size={28} aria-hidden />
      <span>{label}</span>
    </div>
  );
}

export function EmptyState({ icon: Icon, title, children, action }) {
  return (
    <div className="empty">
      {Icon && <Icon size={36} aria-hidden />}
      <h3>{title}</h3>
      {children && <p className="muted">{children}</p>}
      {action}
    </div>
  );
}

export function Row({ label, value, strong }) {
  return (
    <div className={cx("row", strong && "row--strong")}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

export { cx };
