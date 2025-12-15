import { ScaleLoader } from 'react-spinners';
import css from './PageLoader.module.scss';

export default function PageLoader() {
    return (
        <div className={css.loader}>
            <div class={css.wrapper}>
                <div class={css.info}>
                    Не закрывайте эту страницу! ИИ-алгоритм анализирует ваши
                    ответы. Это может занять до 5 минут
                </div>
                <ScaleLoader color="#fff" />
            </div>
        </div>
    );
}
