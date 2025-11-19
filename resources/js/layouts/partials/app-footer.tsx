import NavLink from '@/components/nav/nav-link';
import { navLinks } from '@/lib/data/navLinks';

const AppFooter = () => {
    return (
        <footer class="border-foreground mx-5 flex items-end justify-between rounded-[4rem] border p-5 font-bold sm:mx-6 sm:items-center sm:justify-start sm:p-5.5 lg:mx-9 lg:p-7.5">
            <span class="lg:text-lg xl:text-xl">© 2025</span>
            <nav class="sm:mx-auto">
                <ul class="space-y-4 sm:flex sm:items-center sm:gap-6 lg:gap-8 xl:gap-12 sm:space-y-0">
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
