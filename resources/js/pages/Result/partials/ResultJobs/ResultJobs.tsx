import { Job } from '@/types/testResult';
import { FC } from 'preact/compat';
import JobItem from '../JobItem/JobItem';
import css from './ResultJobs.module.scss';

const ResultJobs: FC<{ jobs: (Job | null)[] }> = ({ jobs }) => {
    const firstNull = jobs.findIndex((j) => j == null);
    return (
        <section class={css.wrapper}>
            <h2>Рекомендации по профессиям</h2>

            <ul class={css.grid}>
                {jobs.map((job, idx) => (
                    <JobItem
                        key={job?.id ?? idx}
                        job={job}
                        showBtn={firstNull === idx}
                    />
                ))}
            </ul>
        </section>
    );
};

export default ResultJobs;
