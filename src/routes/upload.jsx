import { createFileRoute } from "@tanstack/react-router";
import { UploadPage } from "@/caps/pages/UploadPage";
import { pageHead } from "@/caps/lib/meta";

export const Route = createFileRoute("/upload")({
  head: () => pageHead("Upload document", "Upload a PDF, DOCX, PPT, JPG or PNG document to print."),
  component: UploadPage,
});
