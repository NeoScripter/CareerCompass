import NavLink from '@/components/nav/nav-link';
import { navLinks } from '@/lib/data/navLinks';

const AppFooter = () => {
    return (
        <footer class="border-foreground mx-5 flex items-end justify-between rounded-[2rem] border p-5 font-bold sm:mx-6 sm:items-center sm:justify-start sm:rounded-[4rem] sm:p-5.5 lg:mx-9 lg:p-7.5">
            <span class="lg:text-base xl:text-lg">© 2025</span>
            <nav class="sm:mx-auto">
                <ul class="space-y-4 sm:flex sm:items-center sm:gap-6 sm:space-y-0 lg:gap-10 xl:gap-14">
                    {navLinks.map((link) => (
                        <NavLink
                            className="mr-0 text-sm lg:text-base"
                            key={link.id}
                            label={link.label}
                            href={link.href}
                        />
                    ))}
                </ul>
            </nav>
        </footer>
    );
};

export default AppFooter;
