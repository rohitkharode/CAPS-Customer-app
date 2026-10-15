import { useEffect } from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Bell, FileText, Home, Printer, User } from "lucide-react";
import { useApp } from "../context/AppProvider";
import { CAPS_RUNTIME } from "../services/runtime";
import { Spinner } from "./ui";

const TABS = [
  { to: "/", label: "Home", icon: Home, exact: true },
  { to: "/orders", label: "Orders", icon: FileText },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
];

/** Authenticated page layout with header, integration status and navigation. */
export function AppShell({ title, back, children, footer, hideNav }) {
  const { hydrated, user, unread } = useApp();
  const navigate = useNavigate();
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !user) navigate({ to: "/login", replace: true });
  }, [hydrated, user, navigate]);

  const goBack = () => {
    if (typeof back === "string") navigate({ to: back });
    else router.history.back();
  };

  return (
    <div className="shell">
      <nav className="sidenav" aria-label="Main">
        <Link to="/" className="brand">
          <Printer size={22} aria-hidden /> CAPS
        </Link>
        {TABS.map((t) => (
          <NavItem key={t.to} tab={t} unread={unread} />
        ))}
      </nav>
      <div className="shell__main">
        <div className="integration-banner" role="note">
          {CAPS_RUNTIME.backendConfigured
            ? "Backend URL configured — endpoint integration is pending confirmation."
            : "Backend integration pending — local-only features remain available."}
        </div>
        <header className="topbar">
          {back ? (
            <button className="icon-btn" onClick={goBack} aria-label="Go back">
              <ArrowLeft size={22} />
            </button>
          ) : (
            <span className="topbar__brand">
              <Printer size={20} aria-hidden /> CAPS
            </span>
          )}
          {title && <h1 className="topbar__title">{title}</h1>}
          <span className="topbar__spacer" />
        </header>
        <main className="content" id="main">
          {!hydrated || !user ? <Spinner /> : children}
        </main>
        {footer && hydrated && user && <div className="sticky-footer">{footer}</div>}
        {!hideNav && (
          <nav className="bottomnav" aria-label="Main">
            {TABS.map((t) => (
              <NavItem key={t.to} tab={t} unread={unread} />
            ))}
          </nav>
        )}
      </div>
    </div>
  );
}

function NavItem({ tab, unread }) {
  const Icon = tab.icon;
  return (
    <Link
      to={tab.to}
      className="navitem"
      activeProps={{ className: "navitem is-active", "aria-current": "page" }}
      activeOptions={{ exact: !!tab.exact }}
    >
      <span className="navitem__icon">
        <Icon size={22} aria-hidden />
        {tab.to === "/notifications" && unread > 0 && (
          <span className="dot" aria-label={`${unread} unread`}>
            {unread}
          </span>
        )}
      </span>
      <span>{tab.label}</span>
    </Link>
  );
}

/** Layout for signed-out screens. */
export function AuthLayout({ children }) {
  return (
    <div className="auth">
      <div className="integration-banner" role="note">
        Backend authentication is pending. This temporary session is not production authentication.
      </div>
      <main className="auth__main">
        <div className="auth__brand">
          <Printer size={28} aria-hidden /> CAPS
        </div>
        {children}
      </main>
    </div>
  );
}
