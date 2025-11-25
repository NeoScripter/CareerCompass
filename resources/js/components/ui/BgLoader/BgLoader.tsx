import { cn } from '@/lib/utils/cn';
import { useState } from 'preact/hooks';

type BgLoaderProps = {
    desktop: string;
    tablet: string;
    mobile: string;
    desktopSm?: string;
    tabletSm?: string;
    mobileSm?: string;
    className?: string;
    pos?: string;
    fit?: string;
    size?: string;
    alt?: string;
    mbMinWidth?: number;
    tabletMinWidth?: number;
};

export default function BgLoader({
    desktop,
    tablet,
    mobile,
    desktopSm,
    tabletSm,
    mobileSm,
    className,
    pos = 'image-position--bottom-right',
    fit = 'image-fit--cover',
    size = 'image-size--full',
    alt = '',
    mbMinWidth = 768,
    tabletMinWidth = 1200,
}: BgLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    const tinyDesktop = desktopSm || desktop,
        tinyTablet = tabletSm || tablet,
        tinyMobile = mobileSm || mobile;

    return (
        <div
            {...(alt === '' && { 'aria-hidden': 'true' })}
            className={cn('bg-loader', className)}
        >
            {/* Main high-quality images */}
            <picture
                className={cn(
                    'bg-loader__picture',
                    isLoading && 'bg-loader__picture--loading',
                    fit,
                    pos,
                    size,
                )}
            >
                <source
                    srcSet={desktop}
                    media={`(min-width: ${tabletMinWidth}px)`}
                />
                <source
                    srcSet={tablet}
                    media={`(min-width: ${mbMinWidth}px)`}
                />
                <img
                    onLoad={() => setIsLoading(false)}
                    src={mobile}
                    alt={alt}
                    className={cn('bg-loader__image', size, fit, pos)}
                />
            </picture>

            {/* Loading state with tiny/low-quality images */}
            <div
                role="status"
                aria-label="Фото загружается"
                className={cn(
                    'bg-loader__loading-overlay',
                    !isLoading && 'bg-loader__loading-overlay--hidden',
                )}
            >
                <div
                    {...(alt === '' && { 'aria-hidden': 'true' })}
                    className={cn(isLoading && 'bg-loader__skeleton')}
                ></div>

                <picture
                    aria-hidden="true"
                    className={cn('bg-loader__picture', fit, pos, size)}
                >
                    <source
                        srcSet={tinyDesktop}
                        media={`(min-width: ${tabletMinWidth}px)`}
                    />
                    <source
                        srcSet={tinyTablet}
                        media={`(min-width: ${mbMinWidth}px)`}
                    />

                    <img
                        onLoad={() => setIsLoading(false)}
                        src={tinyMobile}
                        alt={alt}
                        className={cn('bg-loader__image', size, fit, pos)}
                    />
                </picture>
            </div>
        </div>
    );
}
