import { ScaleLoader } from 'react-spinners';
import css from './PageLoader.module.scss';

export default function PageLoader() {
    return (
        <div className={css.loader}>
            <ScaleLoader color="#fff" />
        </div>
    );
}
