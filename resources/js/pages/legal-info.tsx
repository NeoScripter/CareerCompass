import AppLayout from '@/layouts/app-layout';
import { FC } from 'react-dom/src';

type LegalInfoProps = {
    title: string;
    html: string;
};

const LegalInfo: FC<LegalInfoProps> = ({ title, html }) => {
    return (
        <AppLayout className="pt-35 sm:pt-42 lg:pt-50">
            <h1 class="mb-5 text-5xl font-bold lg:mb-10 text-center text-balance lg:text-6xl xl:mb-14 xl:text-7xl">
                {title}
            </h1>
            <div
                className="sm:prose-md prose prose-sm lg:prose-lg 2xl:prose-xl my-3 max-w-320 mx-auto block text-foreground lg:mt-5"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </AppLayout>
    );
};

export default LegalInfo;
