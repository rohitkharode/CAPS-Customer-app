import { beforeEach, describe, expect, it } from "vitest";
import { authService } from "./authService";
import { clearLocalState, read } from "./mockDb";
import { orderService } from "./orderService";
import { paymentService } from "./paymentService";

describe("frontend service boundaries", () => {
  beforeEach(() => {
    clearLocalState();
  });

  it("accepts temporary non-empty sign-in input without storing a password", async () => {
    await authService.login({ identifier: "customer@example.test", password: "temporary" });
    const state = read();
    expect(state.users[0]).not.toHaveProperty("password");
    expect(state.session).toBe(state.users[0].id);
  });

  it("does not create orders or change payment state without the backend", async () => {
    await expect(orderService.create({})).rejects.toMatchObject({
      code: "CAPS_INTEGRATION_PENDING",
    });
    await expect(paymentService.initiate()).rejects.toMatchObject({
      code: "CAPS_INTEGRATION_PENDING",
    });
  });
});
