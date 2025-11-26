import NavLink from '@/components/nav/NavLink/NavLink';
import { navLinks } from '@/lib/data/navLinks';

const AppFooter = () => {
    return (
        <footer class="app-footer">
            <span class="app-footer__copyright">© 2025</span>
            <nav class="app-footer__nav">
                <ul class="app-footer__nav-list">
                    {navLinks.map((link) => (
                        <NavLink
                            className="app-footer__nav-link"
                            key={link.id}
                            label={link.label}
                            href={link.href}
                        />
                    ))}
                </ul>
            </nav>
            <span class="app-footer__placeholder" aria-hidden="true" />
        </footer>
    );
};

export default AppFooter;
