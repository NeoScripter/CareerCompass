import DesktopTiny from '@/assets/images/test/results/test-result-bg-dk-tiny.webp';
import Desktop from '@/assets/images/test/results/test-result-bg-dk.webp';
import MobileTiny from '@/assets/images/test/results/test-result-bg-mb-tiny.webp';
import Mobile from '@/assets/images/test/results/test-result-bg-mb.webp';
import TabletTiny from '@/assets/images/test/results/test-result-bg-tablet-tiny.webp';
import Tablet from '@/assets/images/test/results/test-result-bg-tablet.webp';
import BgLoader from '@/components/ui/BgLoader/BgLoader';
import { Link } from '@inertiajs/react';
import { ChevronDown, CornerUpLeft } from 'lucide-preact';
import css from './ResultHero.module.scss';
import scrollToSection from '@/lib/utils/scrollToSection';

const ResultHero = () => {
    return (
        <section class={css.wrapper}>
            <header class={css.header}>
                <Link href={route('home')} class={css.btn}>
                    <CornerUpLeft class={css.icon} />
                    <span>на главную</span>
                </Link>
            </header>
            <BgLoader
                mobile={Mobile}
                mobileSm={MobileTiny}
                tablet={Tablet}
                tabletSm={TabletTiny}
                desktop={Desktop}
                desktopSm={DesktopTiny}
                mbMinWidth={570}
                className={css.bgImage}
                fit={css.bgImageFit}
                pos={css.bgImagePos}
            />
            <h1 class={css.heading}>Результаты теста</h1>

            <button type="button" onClick={() => scrollToSection('#intro')} class={css.arrowWrapper}>
                <ChevronDown class={css.arrow} />
            </button>
        </section>
    );
};

export default ResultHero;
