import styles from './style.module.scss';
import img1 from '../img/show6.png';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div>
                        <img src={img1} alt="" />
                    </div>
                    <div>
                        <h2>
                        Best trade path <br/>
algorithm
                        </h2>
                        <p>
                        Based on modified Dijkstra algorithm can be used to solve the optimal path, the best trading price between tokens will be the max. output value of all paths.
                        </p>
                        <div className={styles.btn}>
                        Go to Exchange
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}