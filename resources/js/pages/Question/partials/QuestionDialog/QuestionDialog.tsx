import { Button } from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils/cn';
import { User } from '@/types/model';
import { NodeProps } from '@/types/nodeProps';
import { router, usePage } from '@inertiajs/react';
import { FC } from 'preact/compat';

const QuestionDialog: FC<
    NodeProps<{ onClick: () => void; progress: number }>
> = ({ className, onClick, progress }) => {
    const { auth } = usePage<{
        auth: { user: User | null };
    }>().props;

    const handleExitClick = () => {
        router.visit(route('home'), {
            method: 'get',
            preserveScroll: true,
        });
    };

    return (
        <div class={cn('question-dialog', className)}>
            <h2 class="question-dialog__heading">
                {`${auth?.user?.name}, Вы прошли уже 1 %. Осталось совсем немного! Завершите
                тест и узнаете о себе все!`}
            </h2>
            <div class="question-dialog__nav">
                <Button
                    onClick={onClick}
                    className="button primary question-dialog__button"
                >
                    Хорошо
                </Button>

                <Button
                    onClick={handleExitClick}
                    className="button secondary question-dialog__button"
                >
                    Не хочу
                </Button>
            </div>
        </div>
    );
};

export default QuestionDialog;
