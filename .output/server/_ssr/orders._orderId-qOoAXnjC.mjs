import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Route } from "./orders._orderId-B7JorVCo.mjs";
import { t as OrderDetailPage } from "./OrdersPages-B7aMKMAE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._orderId-qOoAXnjC.js
var import_jsx_runtime = require_jsx_runtime();
function RoutePage() {
	const { orderId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderDetailPage, { orderId }, orderId);
}
//#endregion
export { RoutePage as component };
