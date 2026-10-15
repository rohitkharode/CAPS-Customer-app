import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as pageHead } from "./meta-4UnJSb34.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders._orderId-B7JorVCo.js
var $$splitComponentImporter = () => import("./orders._orderId-qOoAXnjC.mjs");
var Route = createFileRoute("/orders/$orderId")({
	head: () => pageHead("Order details", "Print job details and receipt."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
