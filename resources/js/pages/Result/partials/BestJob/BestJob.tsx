import { Job } from '@/types/testResult';
import { FC } from 'preact/compat';
import JobItem from '../JobItem/JobItem';
import css from './BestJob.module.scss';

const BestJob: FC<{ job: Job | null }> = ({ job }) => {
    return (
        <section class={css.wrapper}>
            <h2>Лучший вариант по профессии и рекомендации</h2>

            <ul class={css.item}>
                <JobItem showBtn={true} job={job} />
            </ul>
        </section>
    );
};

export default BestJob;
