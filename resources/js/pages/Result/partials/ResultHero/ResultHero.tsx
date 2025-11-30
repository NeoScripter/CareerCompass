import DesktopTiny from '@/assets/images/test/results/test-result-bg-dk-tiny.webp';
import Desktop from '@/assets/images/test/results/test-result-bg-dk.webp';
import MobileTiny from '@/assets/images/test/results/test-result-bg-mb-tiny.webp';
import Mobile from '@/assets/images/test/results/test-result-bg-mb.webp';
import TabletTiny from '@/assets/images/test/results/test-result-bg-tablet-tiny.webp';
import Tablet from '@/assets/images/test/results/test-result-bg-tablet.webp';
import BgLoader from '@/components/ui/BgLoader/BgLoader';
import { Link } from '@inertiajs/react';
import { ChevronDown, CornerUpLeft } from 'lucide-preact';

const ResultHero = () => {
    return (
        <section class="result-hero">
            <header class="result-hero__header">
                <Link href={route('home')} class="result-hero__btn">
                    <CornerUpLeft class="result-hero__icon" />
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
                className="result-hero__bg-image"
                fit="result-hero__bg-image--fit"
                pos="result-hero__bg-image--pos"
            />
            <h1 class="result-hero__heading">Результаты теста</h1>

            <span class="result-hero__arrow-wrapper">
                <ChevronDown class="result-hero__arrow" />
            </span>
        </section>
    );
};

export default ResultHero;
