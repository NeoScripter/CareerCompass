import { Button } from '@/components/ui/Button/Button';
import { FC } from 'preact/compat';
import css from './FinishTestModal.module.scss';

const FinishTestModal: FC<{ onClose: () => void; onFinish: () => void }> = ({
    onClose,
    onFinish,
}) => {
    return (
        <div class={css.wrapper}>
            <h2>Закончить тест?</h2>
            <div class={css.btnWrapper}>
                <Button
                    className="button primary"
                    as="button"
                    onClick={onFinish}
                >
                    Да
                </Button>
                <Button
                    className="button secondary"
                    as="button"
                    onClick={onClose}
                >
                    Нет
                </Button>
            </div>
        </div>
    );
};

export default FinishTestModal;
