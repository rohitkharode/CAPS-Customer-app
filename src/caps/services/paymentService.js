// Backend payment contract. Payment state must be gateway- and webhook-authoritative.
// backend mode must provide gateway initiation and verified status updates.
import { integrationPending } from "./runtime";

export const paymentService = {
  /** Payment initiation remains unavailable until the backend contract is connected. */
  async initiate() {
    throw integrationPending("Payment initiation");
  },
};
