import AppLayout from '@/layouts/AppLayout/AppLayout';
import { FC } from 'react-dom/src';


type LegalInfoProps = {
    title: string;
    html: string;
};

const LegalInfo: FC<LegalInfoProps> = ({ title, html }) => {
    return (
        <AppLayout className="legal-info">
            <h1 class="legal-info__title">
                {title}
            </h1>
            <div
                className="legal-info__content"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </AppLayout>
    );
};

export default LegalInfo;
