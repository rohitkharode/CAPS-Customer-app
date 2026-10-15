import { describe, expect, it } from "vitest";
import { uploadService } from "../services/uploadService";

const first = { name: "first.pdf", size: 100, pageCount: 2, pageCountSource: "detected" };
const second = { name: "second.pdf", size: 200, pageCount: 3, pageCountSource: "detected" };

describe("document uploads", () => {
  it("keeps the first document when adding another", () => {
    const collection = uploadService.collection([...uploadService.documents(first), second]);
    expect(uploadService.documents(collection)).toEqual([first, second]);
    expect(collection.pageCount).toBe(5);
    expect(collection.size).toBe(300);
  });
  it("deletes only the chosen document", () => {
    const collection = uploadService.collection([first, second]);
    const remaining = uploadService.documents(collection).filter((_, index) => index !== 0);
    expect(uploadService.collection(remaining)).toEqual(second);
  });
  it("clears the document after the last deletion", () => {
    expect(uploadService.collection([])).toBeNull();
  });
});
