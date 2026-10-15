import { a as CANCELLABLE_STATUSES } from "./AppProvider-Dey2SDbi.mjs";
import { _ as integrationPending } from "./AppShell-B3q1XuMP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orderService-MIBQFc8I.js
var orderService = {
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
	}
};
//#endregion
export { orderService as t };
