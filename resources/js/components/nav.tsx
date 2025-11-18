import { Link } from "@inertiajs/react";
import { FC } from "preact/compat";

const Nav: FC<{ className?: string }> = ({ className }) => {
    return (
        <nav>
            <Link href={route("home")}>Link to home</Link>
            <Link href={route("test")}>Link to test</Link>
        </nav>
    );
};

export default Nav;
