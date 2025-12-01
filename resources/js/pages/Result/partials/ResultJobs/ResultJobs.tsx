import { Button } from '@/components/ui/Button/Button';
import ProgressIndicator from '@/components/ui/ProgressIndicator/ProgressIndicator';
import { cn } from '@/lib/utils/cn';
import scrollToSection from '@/lib/utils/scrollToSection';
import { Job } from '@/types/testResult';
import { FC, useId } from 'preact/compat';
import css from './ResultJobs.module.scss';

const ResultJobs: FC<{ jobs: (Job | null)[] }> = ({ jobs }) => {
    return (
        <section class={css.wrapper}>
            <h2>Рекомендации по профессиям</h2>

            <ul class={css.grid}>
                {jobs.map((job, idx) => (
                    <JobItem key={job?.id ?? idx} job={job} />
                ))}
            </ul>
        </section>
    );
};

export default ResultJobs;

const JobItem: FC<{ job: Job | null }> = ({ job }) => {
    const percent = job?.percent ?? 50;

    return (
        <li class={css.jobListItem}>
            {job == null && (
                <Button
                    onClick={() => scrollToSection('#result-cards')}
                    className={cn(css.scrollBtn, 'button primary')}
                >
                    Открыть полный доступ
                </Button>
            )}

            <article
                class={cn(job == null && css.jobItemBlurred)}
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
