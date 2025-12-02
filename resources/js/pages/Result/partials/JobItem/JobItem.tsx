import PaywallBtn from '@/components/ui/PaywallBtn/PaywallBtn';
import ProgressIndicator from '@/components/ui/ProgressIndicator/ProgressIndicator';
import { cn } from '@/lib/utils/cn';
import { Job } from '@/types/testResult';
import { FC, useId } from 'preact/compat';
import css from './JobItem.module.scss';

const JobItem: FC<{
    job: Job | null;
    className?: string;
    showBtn?: boolean;
}> = ({ job, className, showBtn = false }) => {
    const percent = job?.percent ?? 50;

    return (
        <li class={cn(css.jobListItem, className)}>
            {job == null && (
                <PaywallBtn show={showBtn} />
            )}

            <article
                aria-hidden={job == null}
                aria-labelledby={`job-title-${job?.id || 'example'}`}
            >
                <ProgressIndicator percent={percent} />

                <h3
                    id={`job-title-${job?.id || 'example'}`}
                    class={css.jobTitle}
                >
                    {job?.title ?? 'Пример профессии'}
                </h3>

                <p class={css.jobDescription}>
                    {job?.description ?? 'Пример описания профессии'}
                </p>

                <CardSection
                    label="Средняя зарплата по России (руб.)"
                    value={job?.avrSalary}
                />

                <hr class={css.divider} aria-hidden="true" />

                <CardSection
                    label="Востребованность 2025"
                    value={job?.demand}
                />
            </article>
        </li>
    );
};

export default JobItem;

const CardSection: FC<{
    label: string;
    value: string | number | undefined;
}> = ({ label, value }) => {
    const id = useId(),
        fallback = 'Нет данных';

    return (
        <section class={css.cardSection} aria-labelledby={id}>
            <h4 id={id} class={css.cardTitle}>
                {label ?? fallback}
            </h4>
            <data class={css.cardValue} value={value ?? fallback}>
                {value ?? fallback}
            </data>
        </section>
    );
};
