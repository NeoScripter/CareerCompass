import PaywallBtn from '@/components/ui/PaywallBtn/PaywallBtn';
import { Summary as SummaryType } from '@/types/testResult';
import { FC } from 'preact/compat';
import css from './Summary.module.scss';

const Summary: FC<{ summary: SummaryType | null }> = ({ summary }) => {
    return (
        <section class={css.wrapper}>
            <h2 class={css.heading}>
                Интеллектуальный уровень и общее заключение
            </h2>

            <div class={css.descriptionWrapper}>
                {summary == null && <PaywallBtn />}
                <p class={css.description}>
                    {summary?.description ??
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem excepturi, sit ea culpa nobis veniam ducimus maxime eius repellendus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem excepturi, sit ea culpa nobis veniam ducimus maxime eius repellendus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum rem excepturi, sit ea culpa nobis veniam ducimus maxime eius repellendus!'}
                </p>
            </div>
        </section>
    );
};

export default Summary;
