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
};

export default function BgLoader({
    desktop,
    tablet,
    mobile,
    desktopSm,
    tabletSm,
    mobileSm,
    className,
    pos = 'object-bottom-right',
    fit = 'object-cover',
    size = 'size-full',
}: BgLoaderProps) {
    const [isLoading, setIsLoading] = useState(true);

    const tinyDesktop = desktopSm || desktop,
        tinyTablet = tabletSm || tablet,
        tinyMobile = mobileSm || mobile;

    return (
        <div
            aria-hidden="true"
            className={cn(
                'pointer-events-none absolute inset-0 -z-5 overflow-clip select-none',
                className,
            )}
        >
            {/* Main high-quality images */}
            <picture
                className={cn(
                    'block transition-opacity duration-500 ease-in-out',
                    isLoading && 'opacity-0',
                    fit,
                    pos,
                    size,
                )}
            >
                <source srcSet={desktop} media="(min-width: 1200px)" />
                <source srcSet={tablet} media="(min-width: 768px)" />
                <img
                    onLoad={() => setIsLoading(false)}
                    src={mobile}
                    alt=""
                    className={cn('block', size, fit, pos)}
                />
            </picture>

            {/* Loading state with tiny/low-quality images */}
            <div
                role="status"
                aria-label="Фото загружается"
                className={cn(
                    'absolute inset-0 -z-5 flex h-full max-h-screen w-full items-center justify-center',
                    !isLoading && 'opacity-0',
                )}
            >
                <div
                    aria-hidden="true"
                    className={cn(
                        isLoading &&
                            'absolute inset-0 size-full animate-pulse bg-gray-200/50',
                    )}
                ></div>

                <picture
                    aria-hidden="true"
                    className={cn(
                        'block transition-opacity duration-500 ease-in-out',
                        fit,
                        pos,
                        size,
                    )}
                >
                    <source srcSet={tinyDesktop} media="(min-width: 1200px)" />
                    <source srcSet={tinyTablet} media="(min-width: 768px)" />
                    <img
                        onLoad={() => setIsLoading(false)}
                        src={tinyMobile}
                        alt=""
                        className={cn('block', size, fit, pos)}
                    />
                </picture>
            </div>
        </div>
    );
}
