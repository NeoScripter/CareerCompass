import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "preact/compat/client";
import '../css/app.css';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx')
        return pages[`./pages/${name}.tsx`]()
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
