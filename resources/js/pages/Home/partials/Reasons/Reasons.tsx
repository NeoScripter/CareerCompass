import LazyImage from '@/components/ui/LazyImage/LazyImage';
import { reasons, ReasonType } from '@/lib/data/reasons';
import { cn } from '@/lib/utils/cn';
import { NodeProps } from '@/types/nodeProps';
import { FC } from 'react-dom/src';

const Reasons = () => {
    return (
        <ul class="reasons">
            {reasons.map((reason, idx) => (
                <ReasonItem
                    key={reason.id}
                    reason={reason}
                    className={
                        idx % 2 === 0
                            ? 'reasons__item--left'
                            : 'reasons__item--right'
                    }
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
        <li class={cn('reasons__item', className)}>
            <LazyImage
                parentClass="reasons__image"
                img={reason.img}
                tinyImg={reason.tinyImg}
                alt={reason.alt}
            />
            <span aria-hidden="true" class="reasons__overlay" />
            <p class="reasons__description">{reason.description}</p>
        </li>
    );
};
