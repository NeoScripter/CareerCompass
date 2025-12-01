import PaywallBtn from '@/components/ui/PaywallBtn/PaywallBtn';
import ProgressBar from '@/components/ui/ProgressBar/ProgressBar';
import { PersonalityChart } from '@/types/testResult';
import { FC } from 'preact/compat';
import css from './ChartList.module.scss';

const ChartList: FC<{
    heading: string;
    charts: (PersonalityChart | null)[];
}> = ({ charts, heading }) => {
    return (
        <section class={css.wrapper}>
            <h2 class={css.heading}>{heading}</h2>

            <ul class={css.grid}>
                {charts.map((chart, idx) => (
                    <ChartItem
                        key={chart?.id ?? `chart-null-${idx}`}
                        chart={chart}
                    />
                ))}
            </ul>
        </section>
    );
};

export default ChartList;

const ChartItem: FC<{ chart: PersonalityChart | null }> = ({ chart }) => {
    return (
        <li class={css.chartItem}>
            <span class={css.chartWrapper}>
                {chart == null && <PaywallBtn />}
                <span class={css.chartTop}>
                    <h4 class={css.title}>{chart?.title}</h4>
                    <span>{`${chart?.percent}%`}</span>
                </span>
                <ProgressBar progress={chart?.percent ?? 40} />
            </span>
        </li>
    );
};
