import { useState } from 'preact/hooks';

type LazyImageProps = {
    parentClass?: string;
    imgClass?: string;
    img: string;
    alt: string;
    tinyImg: string;
};

export default function LazyImage({
    parentClass = '',
    imgClass = '',
    img,
    alt,
    tinyImg,
}: LazyImageProps) {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <figure
            role="img"
            class={`lazy-image ${parentClass}`.trim()}
            aria-label={alt}
        >
            <img
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                    console.error('Image failed to load:', img, e);
                    setIsLoading(false);
                }}
                src={img}
                alt={alt}
                loading="lazy"
                class={`main-img ${isLoading ? 'loading' : ''} ${imgClass}`.trim()}
                aria-hidden={isLoading}
            />
            {isLoading && (
                <div role="status" aria-label="Фото загружается" class="loader">
                    <div aria-hidden="true" class="pulse"></div>
                    <img
                        aria-hidden={!isLoading}
                        src={tinyImg}
                        alt={alt}
                        class="placeholder"
                    />
                </div>
            )}
        </figure>
    );
}
