import styles from './style.module.scss';
import img1 from '../img/show7.png';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div>
                        <h2>
                            Assets Viewer
                        </h2>
                        <p>
                        TurboX is also planning to develop an integrated viewer to display the precise yield of the Defi projects user has invested.
                        </p>
                        <p>
                        Based on TurboX swap aggregator, TurboX will further integrate the included protocols, to allow user have real time comprehensive view of the asset allocation and yield.
                        </p>
                    </div>
                    <div>
                        <img src={img1} alt="" />
                    </div>
                </div>
            </div>
        </>
    )
}