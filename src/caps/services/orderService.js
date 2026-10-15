import { CANCELLABLE_STATUSES } from "../lib/config";
import { integrationPending } from "./runtime";

export const orderService = {
  list() {
    return [];
  },
  get() {
    return null;
  },
  async create() {
    throw integrationPending("Order creation");
  },
  canCancel(o) {
    return CANCELLABLE_STATUSES.includes(o.status);
  },
  async cancel() {
    throw integrationPending("Order cancellation");
  },
};
