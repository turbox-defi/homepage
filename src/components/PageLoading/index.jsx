
import loadingsvg from './loading.svg';
import styles from './style.module.less';

export default () => {

    return (
        <div className={styles.box}>
            <img src={loadingsvg} />
        </div>
    )
}