import { lazy } from "react";

export const App = lazy(() => import(/* webpackChunkName: "App" */ "./module"));