import styles from './style.module.scss';
import img1 from '../img/show2.png';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div>
                        <h2>
                        Graphic Mining
                        </h2>
                        <p>
                        Based on the transactions among different accounts, we will be able to form a comprehensive interaction map.
                        </p>
                        <p>
                        With the anonymous nature of Defi , it is difficult to form a consistent view of the accounts. 
                        </p>
                        <p>
                        Bigdata based graphic mining technique will be able to handle such complexity with the effective tracking and reflection of the multi-layer connectivity.
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