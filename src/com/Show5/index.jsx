import styles from './style.module.scss';
import uosvg from './up.svg';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <h2>
                    DeFi Swap Aggregator
                </h2>
                <p>
                TurboX Swap Aggregator for Defi ecosystem that provides the best price and user experience for trading of crypto currencies.
                </p>
                <div className={styles.content}>
                    <div>
                        <span>
                            30+
                        </span>
                        <span>
                            DEXes connected
                        </span>
                    </div>
                    <div>
                        <span>
                            100K+
                        </span>
                        <span>
                            Token pair supported
                        </span>
                    </div>
                    <div>
                        <span style={{ color: '#0260FF' }} >
                            5%
                            <img src={uosvg} alt="up"/>
                        </span>
                        <span>
                            Better algorithm
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}