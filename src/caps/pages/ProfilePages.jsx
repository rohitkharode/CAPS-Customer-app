import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";
import { AppShell } from "../components/AppShell";
import { Button, Card, Dialog, Field, Notice, Toggle } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { authService } from "../services/authService";
import { profileService } from "../services/profileService";
import { clearLocalState } from "../services/mockDb";
import { validateProfile } from "../lib/validation";

function useLogout() {
  const nav = useNavigate();
  const { clearDraft } = useApp();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const dialog = (
    <Dialog
      open={open}
      title="Log out?"
      onClose={() => setOpen(false)}
      actions={
        <>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Stay
          </Button>
          <Button
            variant="danger"
            loading={busy}
            onClick={async () => {
              setBusy(true);
              await authService.logout();
              clearDraft();
              nav({ to: "/login" });
            }}
          >
            Log out
          </Button>
        </>
      }
    >
      <p>You'll need to sign in again to place or track print jobs.</p>
    </Dialog>
  );
  return { open: () => setOpen(true), dialog };
}

function NavRow({ to, icon: Icon, label }) {
  return (
    <Link to={to} className="nav-row">
      <Icon size={20} aria-hidden />
      <span>{label}</span>
      <ChevronRight size={18} aria-hidden />
    </Link>
  );
}

export function ProfilePage() {
  const { user } = useApp();
  const logout = useLogout();
  return (
    <AppShell title="Profile">
      <Card className="profile-head">
        <div className="avatar" aria-hidden>
          {user?.name
            .split(" ")
            .map((p) => p[0])
            .slice(0, 2)
            .join("")}
        </div>
        <div>
          <h2 className="h2">{user?.name}</h2>
          <p className="muted small">ID: {user?.id}</p>
        </div>
      </Card>
      <Card>
        <h3 className="h3">Account details</h3>
        <dl className="settings-grid one">
          <div>
            <dt>Email</dt>
            <dd className="truncate">{user?.email}</dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>+91 {user?.phone}</dd>
          </div>
        </dl>
      </Card>
      <Card className="nav-card">
        <NavRow to="/profile/edit" icon={User} label="Personal info" />
        <NavRow to="/settings" icon={Bell} label="Notifications" />
        <NavRow to="/privacy" icon={Shield} label="Privacy & Security" />
        <NavRow to="/settings" icon={Settings} label="App settings" />
        <NavRow to="/help" icon={HelpCircle} label="Help & Support" />
      </Card>
      <Button variant="danger" block onClick={logout.open}>
        <LogOut size={18} aria-hidden /> Logout
      </Button>
      {logout.dialog}
    </AppShell>
  );
}

export function EditProfilePage() {
  const { user } = useApp();
  const nav = useNavigate();
  const [f, setF] = useState(null);
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const form =
    f ||
    (user
      ? { name: user.name, email: user.email, phone: user.phone }
      : { name: "", email: "", phone: "" });
  const set = (k) => (e) => setF({ ...form, [k]: e.target.value });
  const save = async (e) => {
    e.preventDefault();
    const v = validateProfile(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    setBusy(true);
    setErr("");
    try {
      await profileService.update(form);
      nav({ to: "/profile" });
    } catch (x) {
      setErr(x.message);
      setBusy(false);
    }
  };
  return (
    <AppShell back="/profile" title="Edit Profile">
      <form className="stack" onSubmit={save} noValidate>
        {err && <Notice tone="danger">{err}</Notice>}
        <Field
          label="Full Name"
          autoComplete="name"
          value={form.name}
          onChange={set("name")}
          error={errors.name}
        />
        <Field
          label="Email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={form.email}
          onChange={set("email")}
          error={errors.email}
        />
        <Field
          label="Phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={set("phone")}
          error={errors.phone}
        />
        <Button type="submit" block loading={busy}>
          Save changes
        </Button>
        <Link to="/profile" className="btn btn--ghost btn--block">
          Cancel
        </Link>
      </form>
    </AppShell>
  );
}

export function SettingsPage() {
  const { prefs } = useApp();
  const logout = useLogout();
  const [reset, setReset] = useState(false);
  return (
    <AppShell back="/profile" title="Settings">
      <Card>
        <h3 className="h3">Notifications</h3>
        <Toggle
          label="Push notifications"
          description="Job updates appear in the app only; push delivery isn't connected."
          checked={!!prefs.push}
          onChange={(v) => profileService.setPref("push", v)}
        />
        <Toggle
          label="Email notifications"
          description="Saved as a preference only; email delivery isn't connected."
          checked={!!prefs.email}
          onChange={(v) => profileService.setPref("email", v)}
        />
      </Card>
      <Card className="nav-card">
        <h3 className="h3">Account</h3>
        <NavRow to="/profile/edit" icon={User} label="Edit profile" />
        <div className="nav-row static">
          <CreditCard size={20} aria-hidden />
          <span>
            Payment methods
            <span className="muted small block">
              No saved methods. CAPS doesn't store card or UPI credentials; you choose a method for
              each order.
            </span>
          </span>
        </div>
      </Card>
      <Card>
        <h3 className="h3">Privacy & Security</h3>
        <p className="muted small">
          Under the CAPS policy, documents are kept in encrypted storage and deleted automatically
          after the retention window. Backend enforcement isn't connected in this frontend.
        </p>
        <NavRow to="/privacy" icon={Shield} label="Privacy Policy" />
        <NavRow to="/terms" icon={Shield} label="Terms of Service" />
      </Card>
      <Card className="nav-card">
        <NavRow to="/help" icon={HelpCircle} label="Help & Support" />
      </Card>
      <Button variant="secondary" block onClick={() => setReset(true)}>
        Clear local data
      </Button>
      <Button variant="danger" block onClick={logout.open}>
        Logout
      </Button>
      {logout.dialog}
      <Dialog
        open={reset}
        title="Clear local data?"
        onClose={() => setReset(false)}
        actions={
          <>
            <Button variant="secondary" onClick={() => setReset(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                clearLocalState();
                window.location.href = "/login";
              }}
            >
              Reset
            </Button>
          </>
        }
      >
        <p>This clears local accounts, orders and notifications stored in this browser.</p>
      </Dialog>
    </AppShell>
  );
}
