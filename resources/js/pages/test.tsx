import Nav from "@/components/nav";
import { Link } from "@inertiajs/react";
import { FC } from "preact/compat";

const Test: FC<{ className?: string }> = ({ className }) => {
    return (
        <div>
            <Nav />
            This is a test page
        </div>
    );
};

export default Test;
