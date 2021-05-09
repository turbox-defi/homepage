import styles from './style.module.less';
import img1 from '../img/show4.png';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div>
                        <h2>
                        Identify <br/>
Investment Experts
                        </h2>
                        <p>
                        TurboX can identify high performance experts with similar risk appetite using big-data mining. 
                        </p>
                        <p>
                        It can also monitor the experts’ investment in real time and generate similar investment plan as best recommendation for users.
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