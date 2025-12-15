import NavLink from '@/components/nav/NavLink/NavLink';
import { navLinks } from '@/lib/data/navLinks';

const AppFooter = () => {
    return (
        <footer id="app-footer" class="app-footer">
            <div>
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
            </div>
            <a class="app-footer__link" href="mailto:supp.aiprofpath@yandex.ru">
                supp.aiprofpath@yandex.ru
            </a>
        </footer>
    );
};

export default AppFooter;
