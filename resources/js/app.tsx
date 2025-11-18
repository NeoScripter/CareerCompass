import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "preact/compat/client";
import "../css/app.css";
const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.tsx");
        return pages[`./pages/${name}.tsx`]();
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: "#CCFB55",
    },
});
