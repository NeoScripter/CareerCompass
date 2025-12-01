import PaywallBtn from '@/components/ui/PaywallBtn/PaywallBtn';
import { range } from '@/lib/utils/range';
import { Advice } from '@/types/testResult';
import { CircleCheckBig } from 'lucide-preact';
import { FC } from 'preact/compat';
import css from './ResultList.module.scss';

const ResultList: FC<{ title: string; items: Advice[] | null }> = ({
    title,
    items,
}) => {
    const fallback = range(1, 6).map((item) => (
        <Item
            key={item}
            item="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam at delectus sapiente sit assumenda perspiciatis odio totam dolor tenetur ea?"
        />
    ));

    return (
        <section class={css.wrapper}>
            <h2 class={css.heading}>{title}</h2>

            <div class={css.listWrapper}>
                {items == null && <PaywallBtn />}
                <ul class={css.list}>
                    {items
                        ? items.map((item) => (
                              <Item key={item.id} item={item.description} />
                          ))
                        : fallback}
                </ul>
            </div>
        </section>
    );
};

export default ResultList;

const Item: FC<{ item: string }> = ({ item }) => {
    return (
        <li class={css.item}>
            <CircleCheckBig />
            {item}
        </li>
    );
};
