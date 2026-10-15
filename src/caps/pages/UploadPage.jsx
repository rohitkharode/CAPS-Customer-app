import { useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { FileText, Plus, ShieldCheck, Store, Trash2, UploadCloud } from "lucide-react";
import { AppShell } from "../components/AppShell";
import { Button, Card, EmptyState, Field, Notice, cx } from "../components/ui";
import { useApp } from "../context/AppProvider";
import { shopService } from "../services/shopService";
import { uploadService } from "../services/uploadService";
import {
  ACCEPTED_FORMATS,
  ACCEPT_ATTR,
  MAX_FILE_MB,
  PAGE_COUNT_MAX,
  DEFAULT_SETTINGS,
} from "../lib/config";
import { bytes } from "../lib/format";

export function UploadPage() {
  const { draft, setDraft } = useApp();
  const nav = useNavigate();
  const input = useRef(null);
  const abort = useRef(null);
  const [drag, setDrag] = useState(false);
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(null);
  const shop = draft.shopId ? shopService.get(draft.shopId) : null;
  const doc = draft.document;
  const documents = uploadService.documents(doc);

  if (!shop)
    return (
      <AppShell back="/" title="Upload Document">
        <EmptyState
          icon={Store}
          title="Choose a shop first"
          action={
            <Link to="/" className="btn btn--primary">
              Browse shops
            </Link>
          }
        >
          Pick the print shop where you want to print.
        </EmptyState>
      </AppShell>
    );

  const handle = async (file) => {
    setError("");
    const v = uploadService.validate(file);
    if (!v.ok) return setError(v.error);
    abort.current = new AbortController();
    setPending(file.name);
    setProgress(0);
    try {
      const meta = await uploadService.upload(file, {
        onProgress: setProgress,
        signal: abort.current.signal,
      });
      setDraft((previous) => ({
        ...previous,
        document: uploadService.collection([...uploadService.documents(previous.document), meta]),
        settings: previous.document
          ? { ...previous.settings, pageRange: { mode: "all", value: "" } }
          : { ...DEFAULT_SETTINGS },
      }));
    } catch (e) {
      if (e.name !== "AbortError") setError(e.message);
    } finally {
      setProgress(null);
      setPending(null);
    }
  };
  const onDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files?.[0];
    if (f) handle(f);
  };
  const updateDocuments = (next) => {
    setDraft({
      document: uploadService.collection(next),
      settings: { ...draft.settings, pageRange: { mode: "all", value: "" } },
    });
  };
  const setPages = (index, v) => {
    const n = Math.max(1, Math.min(PAGE_COUNT_MAX, parseInt(v, 10) || 1));
    updateDocuments(
      documents.map((document, i) =>
        i === index ? { ...document, pageCount: n, pageCountSource: "edited" } : document,
      ),
    );
  };

  return (
    <AppShell
      back={`/shops/${shop.id}`}
      title="Upload Document"
      footer={
        <Button
          block
          disabled={!doc || progress !== null}
          onClick={() => nav({ to: "/configure" })}
        >
          Continue
        </Button>
      }
    >
      <Card>
        <span className="label">Printing at</span>
        <strong>{shop.name}</strong>
        <p className="meta truncate">
          {shop.address} · {shop.distanceKm} km
        </p>
      </Card>

      <input
        ref={input}
        type="file"
        accept={ACCEPT_ATTR}
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) handle(file);
        }}
      />

      {progress !== null ? (
        <Card>
          <p className="truncate">
            <strong>{pending}</strong>
          </p>
          <div
            className="progress"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Upload progress"
          >
            <span style={{ width: `${progress}%` }} />
          </div>
          <p className="muted small">Preparing local file metadata. No upload has occurred.</p>
          <Button variant="ghost" onClick={() => abort.current?.abort()}>
            Cancel upload
          </Button>
        </Card>
      ) : doc ? (
        <>
          {documents.map((document, index) => (
            <Card className="file-card" key={`${document.uploadedAt}-${index}`}>
              <FileText size={32} aria-hidden />
              <div className="file-card__body">
                <strong className="truncate" title={document.name}>
                  {document.name}
                </strong>
                <p className="meta">
                  {document.format} · {bytes(document.size)}
                </p>
                <Field
                  label={`Pages ${document.pageCountSource === "detected" ? "(detected from PDF)" : document.pageCountSource === "image" ? "(image = 1 page)" : "(estimated — please check)"}`}
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={PAGE_COUNT_MAX}
                  value={document.pageCount}
                  onChange={(e) => setPages(index, e.target.value)}
                  hint="Estimated page count. The backend will provide the authoritative count."
                />
                {document.needsConversion && (
                  <Notice>
                    This {document.format} file requires backend conversion before it can be sent to
                    a shop.
                  </Notice>
                )}
              </div>
              <Button
                type="button"
                variant="ghost"
                className="document-delete"
                aria-label={`Delete ${document.name}`}
                title={`Delete ${document.name}`}
                onClick={() => updateDocuments(documents.filter((_, i) => i !== index))}
              >
                <Trash2 size={20} aria-hidden />
              </Button>
            </Card>
          ))}
          <Button variant="secondary" onClick={() => input.current?.click()}>
            <Plus size={18} aria-hidden /> Add more
          </Button>
        </>
      ) : (
        <button
          type="button"
          className={cx("dropzone", drag && "is-drag")}
          onClick={() => input.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDrag(true);
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={onDrop}
        >
          <UploadCloud size={36} aria-hidden />
          <strong>Tap to upload or drag & drop</strong>
          <span className="muted">Select a file from your device to begin.</span>
          <span className="formats">
            {ACCEPTED_FORMATS.map((f) => (
              <span key={f.key} className="badge badge--muted">
                {f.key}
              </span>
            ))}
          </span>
          <span className="muted small">Maximum file size: {MAX_FILE_MB} MB</span>
        </button>
      )}
      {error && <Notice tone="danger">{error}</Notice>}
      <Notice icon={ShieldCheck}>
        <strong>Secure processing (policy).</strong> In the full CAPS system, documents are kept in
        encrypted storage and deleted automatically within a set retention window (for example 30
        minutes after printing, or 24 hours at most), whatever the print outcome. This frontend does
        not upload or store your file.
      </Notice>
    </AppShell>
  );
}
