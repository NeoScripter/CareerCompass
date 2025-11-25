import { cn } from '@/lib/utils/cn';
import { useState } from 'preact/hooks';

type HeroBackgroundProps = {
    desktopImg: string;
    tabletImg: string;
    mobileImg: string;
    tinyDesktopImg?: string;
    tinyTabletImg?: string;
    tinyMobileImg?: string;
    className?: string;
};

export default function BgImage({
    desktopImg,
    tabletImg,
    mobileImg,
    tinyDesktopImg,
    tinyTabletImg,
    tinyMobileImg,
    className,
}: HeroBackgroundProps) {
    const [isLoading, setIsLoading] = useState(true);

    const tinyDesktop = tinyDesktopImg || desktopImg;
    const tinyTablet = tinyTabletImg || tabletImg;
    const tinyMobile = tinyMobileImg || mobileImg;

    return (
        <div aria-hidden="true" className={cn('BgImage', className)}>
            <picture className={cn('main-picture', isLoading && 'hidden')}>
                <source srcSet={desktopImg} media="(min-width: 900px)" />
                <source srcSet={tabletImg} media="(min-width: 500px)" />
                <img
                    onLoad={() => setIsLoading(false)}
                    src={mobileImg}
                    alt=""
                    className="image"
                />
            </picture>

            <div
                className={cn('loading-overlay', !isLoading && 'hidden')}
                role="status"
                aria-label="Фото загружается"
            >
                <div
                    className={cn('loading-bg', isLoading && 'visible')}
                    aria-hidden="true"
                ></div>

                <picture className="loading-picture" aria-hidden="true">
                    <source srcSet={tinyDesktop} media="(min-width: 900px)" />
                    <source srcSet={tinyTablet} media="(min-width: 500px)" />
                    <img
                        onLoad={() => setIsLoading(false)}
                        src={tinyMobile}
                        alt=""
                        className="image"
                    />
                </picture>
            </div>
        </div>
    );
}
