import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as pageHead } from "./meta-4UnJSb34.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shops._shopId-BQ-0rbwh.js
var $$splitComponentImporter = () => import("./shops._shopId-C0wLI6zw.mjs");
var Route = createFileRoute("/shops/$shopId")({
	head: () => pageHead("Shop details", "Shop services, pricing, queue and directions."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
