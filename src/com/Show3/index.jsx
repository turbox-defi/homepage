import styles from './style.module.scss';
import img1 from '../img/show3.png';

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
                        Automatic Risk <br/>
Appetite Assessment
                        </h2>
                        <p>
                        If investor can provide the transaction history of his account, we are able to collect all investment returns in the past and generate a more objective profiling and categorization of the investor, which will allow customized and suitable investment recommendations to be generated.
                        </p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}