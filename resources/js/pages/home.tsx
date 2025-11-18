import Nav from "@/components/nav";
import { FC } from "preact/compat";

const Home: FC<{ className?: string }> = ({ className }) => {
    return (
        <div>
            <Nav />
            Hello world
        </div>
    );
};

export default Home;
