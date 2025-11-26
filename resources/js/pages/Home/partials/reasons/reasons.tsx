import LazyImage from '@/components/ui/LazyImage/LazyImage';
import { reasons, ReasonType } from '@/lib/data/reasons';
import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'react-dom/src';

const Reasons = () => {
    return (
        <ul class="my-13 grid place-content-center gap-5 sm:my-15 sm:grid-cols-2 w-fit mx-auto lg:my-20 lg:gap-8 xl:my-25 xl:grid-cols-4">
            {reasons.map((reason, idx) => (
                <ReasonItem
                    key={reason.id}
                    reason={reason}
                    className={idx % 2 === 0 ? 'ml-auto' : 'mr-auto'}
                />
            ))}
        </ul>
    );
};

export default Reasons;

const ReasonItem: FC<NodeProps<{ reason: ReasonType }>> = ({
    reason,
    className,
}) => {
    return (
        <li
            class={cn(
                'relative isolate flex aspect-square neon-card max-w-80 items-end xl:mx-0 justify-center overflow-clip rounded-[2rem] p-5 sm:p-6 transition-[scale,outline] hover:scale-105 duration-300 ease-in-out text-white lg:p-7',
                className,
            )}
        >
            <LazyImage
                parentClass="absolute inset-0 -z-5"
                img={reason.img}
                tinyImg={reason.tinyImg}
                alt={reason.alt}
            />

            <span
                aria-hidden="true"
                class="absolute inset-0 -z-5 block bg-linear-to-t from-black/40 to-transparent"
            />
            <p>{reason.description}</p>
        </li>
    );
};
