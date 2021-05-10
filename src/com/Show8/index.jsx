import styles from './style.module.less';
import imgsvg from './step.svg';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <h2>
                    Roadmap
                </h2>
                <div className={styles.content}>
                    <img src={imgsvg}/>
                </div>
            </div>
        </>
    )
}