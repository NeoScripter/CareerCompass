import { cn } from '@/lib/utils/cn';
import { PersonalityItem } from '@/types/testResult';
import { FC } from 'preact/compat';
import css from './ResultIntro.module.scss';

const ResultIntro: FC<{ summary: string; items: PersonalityItem[] | null }> = ({
    summary,
    items,
}) => {
    return (
        <section id="intro" class={cn(css.wrapper, 'full-bleed')}>
            <h2>Подробное описание характера</h2>
            <p class={css.description}>
                На основе ваших ответов можно выделить следующие черты:
            </p>

            {items != null && (
                <ul class={cn(css.items, 'full-bleed')}>
                    {items.map((item) => (
                        <ResultIntroItem key={item.id} item={item} />
                    ))}
                </ul>
            )}

            <div class={css.summary}>{summary}</div>
        </section>
    );
};

export default ResultIntro;

const ResultIntroItem: FC<{ item: PersonalityItem }> = ({ item }) => {
    return (
        <li class={css.item}>
            <h3 class={css.itemTitle}>{item.title}</h3>
            <span class={css.itemDescription}>{item.description}</span>
        </li>
    );
};
