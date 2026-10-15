import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { AuthLayout } from "../components/AppShell";
import { Button, Dialog, Field, Notice, PasswordField } from "../components/ui";
import { authService } from "../services/authService";
import { validateLogin, validateRegister, isEmail, isPhone } from "../lib/validation";

export function LoginPage() {
  const nav = useNavigate();
  const [f, setF] = useState({ identifier: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const [google, setGoogle] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateLogin(f);
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await authService.login(f);
      nav({ to: "/" });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="h1">Welcome back</h1>
      <p className="muted">Sign in to your print account</p>
      <p className="muted small">
        Temporary sign-in is enabled while backend authentication is pending.
      </p>
      <form onSubmit={submit} noValidate className="stack">
        {formError && <Notice tone="danger">{formError}</Notice>}
        <Field
          label="Phone number or Email"
          autoComplete="username"
          inputMode="email"
          value={f.identifier}
          onChange={(e) => setF({ ...f, identifier: e.target.value })}
          error={errors.identifier}
        />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          value={f.password}
          onChange={(e) => setF({ ...f, password: e.target.value })}
          error={errors.password}
        />
        <div className="right">
          <Link to="/forgot-password" className="link">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" block loading={loading}>
          Log In
        </Button>
      </form>
      <div className="divider">or continue with</div>
      <Button variant="secondary" block onClick={() => setGoogle(true)}>
        Google Sign-In
      </Button>
      <p className="center">
        New to CAPS?{" "}
        <Link to="/register" className="link">
          Create account
        </Link>
      </p>
      <p className="muted small center">
        In the full system, traffic between your device and CAPS will use encrypted transport
        (HTTPS). Backend authentication is not connected in this frontend.
      </p>
      <Dialog
        open={google}
        title="Google Sign-In not connected"
        onClose={() => setGoogle(false)}
        actions={<Button onClick={() => setGoogle(false)}>OK</Button>}
      >
        <p>
          Google Sign-In is not connected yet. Use the temporary sign-in form while backend
          authentication is pending.
        </p>
      </Dialog>
    </AuthLayout>
  );
}

export function RegisterPage() {
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) =>
    setF({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    const errs = validateRegister(f);
    setErrors(errs);
    setFormError("");
    if (Object.keys(errs).length) return;
    setLoading(true);
    try {
      await authService.register(f);
      nav({ to: "/" });
    } catch (err) {
      setFormError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <h1 className="h1">Create Account</h1>
      <p className="muted">Join CAPS to track your print jobs across partner shops.</p>
      <form onSubmit={submit} noValidate className="stack">
        {formError && <Notice tone="danger">{formError}</Notice>}
        <Field
          label="Full Name"
          autoComplete="name"
          placeholder="e.g. Priya Patil"
          value={f.name}
          onChange={set("name")}
          error={errors.name}
        />
        <Field
          label="Phone Number"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98765 43210"
          value={f.phone}
          onChange={set("phone")}
          error={errors.phone}
        />
        <Field
          label="Email Address"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="priya@example.com"
          value={f.email}
          onChange={set("email")}
          error={errors.email}
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          hint="Minimum 8 characters"
          value={f.password}
          onChange={set("password")}
          error={errors.password}
        />
        <PasswordField
          label="Confirm Password"
          autoComplete="new-password"
          value={f.confirm}
          onChange={set("confirm")}
          error={errors.confirm}
        />
        <div className="field">
          <label className="check">
            <input
              type="checkbox"
              checked={f.agree}
              onChange={set("agree")}
              aria-invalid={!!errors.agree || undefined}
            />
            <span>
              I agree to the{" "}
              <Link to="/terms" className="link">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="link">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {errors.agree && <p className="field-error">{errors.agree}</p>}
        </div>
        <Button type="submit" block loading={loading}>
          Create Account
        </Button>
      </form>
      <p className="center">
        Already have an account?{" "}
        <Link to="/login" className="link">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

export function ForgotPasswordPage() {
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (!isEmail(id) && !isPhone(id))
      return setError("Enter a valid email or 10-digit mobile number.");
    setError("");
    setLoading(true);
    await authService.requestPasswordReset(id);
    setLoading(false);
    setSent(true);
  };
  return (
    <AuthLayout>
      <h1 className="h1">Reset password</h1>
      {sent ? (
        <>
          <Notice tone="ok">
            If an account exists for {id}, a reset link would be sent after backend authentication
            is connected.
          </Notice>
          <Link to="/login" className="btn btn--primary btn--block">
            Back to login
          </Link>
        </>
      ) : (
        <form onSubmit={submit} noValidate className="stack">
          <p className="muted">Enter the email or phone linked to your account.</p>
          <Field
            label="Phone number or Email"
            inputMode="email"
            value={id}
            onChange={(e) => setId(e.target.value)}
            error={error}
          />
          <Button type="submit" block loading={loading}>
            Send reset link
          </Button>
          <Link to="/login" className="link center">
            Back to login
          </Link>
        </form>
      )}
    </AuthLayout>
  );
}
