// Frontend upload contract. This phase validates and reads local metadata only;
// backend mode is intentionally pending until the upload contract is agreed.
import { validateFile } from "../lib/validation";
import { CAPS_RUNTIME, integrationPending } from "./runtime";

/** Count pages in a PDF by scanning page objects (best-effort, browser only). */
async function countPdfPages(file) {
  try {
    const text = new TextDecoder("latin1").decode(await file.arrayBuffer());
    const m = text.match(/\/Type\s*\/Page(?!s)/g);
    return m && m.length > 0 ? m.length : null;
  } catch {
    return null;
  }
}

/** ASSUMPTION A4: estimated page count for non-PDF office files. */
function estimatePages(format, size) {
  if (format === "JPG" || format === "PNG") return 1;
  if (format === "DOCX") return Math.max(1, Math.round(size / 30000));
  if (format === "PPT") return Math.max(1, Math.round(size / 150000));
  return Math.max(1, Math.round(size / 100000));
}

export const uploadService = {
  validate: validateFile,
  documents(document) {
    return document?.documents || (document ? [document] : []);
  },
  /** Keep the existing print flow compatible with a collection of files. */
  collection(documents) {
    if (!documents.length) return null;
    const first = documents[0];
    if (documents.length === 1) return first;
    return {
      ...first,
      name: documents.map((doc) => doc.name).join(", "),
      size: documents.reduce((sum, doc) => sum + doc.size, 0),
      pageCount: documents.reduce((sum, doc) => sum + doc.pageCount, 0),
      pageCountSource: documents.every((doc) => doc.pageCountSource === "detected")
        ? "detected"
        : "estimated",
      needsConversion: documents.some((doc) => doc.needsConversion),
      documents,
    };
  },
  /** Local metadata preparation; no upload or fake network progress occurs. */
  async upload(file, { onProgress, signal } = {}) {
    const v = validateFile(file);
    if (!v.ok) throw new Error(v.error);
    if (CAPS_RUNTIME.backendConfigured) throw integrationPending("Document upload");
    if (signal?.aborted) throw new DOMException("Upload cancelled", "AbortError");
    let pageCount = null;
    let pageCountSource = "estimated";
    if (v.format === "PDF") {
      pageCount = await countPdfPages(file);
      if (pageCount) pageCountSource = "detected";
    }
    if (!pageCount) pageCount = estimatePages(v.format, file.size);
    if (v.format === "JPG" || v.format === "PNG") pageCountSource = "image";
    return {
      name: file.name,
      size: file.size,
      format: v.format,
      ext: v.ext,
      pageCount,
      pageCountSource,
      needsConversion: v.format === "DOCX" || v.format === "PPT",
      uploadedAt: Date.now(),
      localMetadataOnly: true,
    };
  },
};
