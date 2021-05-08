import styles from './style.module.scss';
import img1 from '../img/icon1.png';
import img2 from '../img/icon2.png';
import img3 from '../img/icon3.png';
import img4 from '../img/icon4.png';

export default () => {

    return (
        <>
            <div className={styles.box}>
                <h2 id={"WhatWeDo"}>
                    What We Do
                </h2>
                <span  className={styles.line}/>
                <div className={styles.content}>
                    <p className={styles.msg}>
                    TurboX aims to provide users a one-stop investment platform, powered by the big data analytics and machine learning under decentralized architecture. With most of the DeFi user pain points addressed, user experience will be much improved.
                    </p>
                    <div className={styles.list}>
                        <div>
                            <img src={img1} alt="img" />
                            <h3>
                            Project Analyzer
                            </h3>
                            <p>
                            provides real time and automated eval uation of a project and multiple index and scores to assist users for investment
                            </p>
                        </div>
                        <div>
                            <img src={img2} alt="img" />
                            <h3>
                            Portfolio Builder
                            </h3>
                            <p>
                            forms personalized investment suggestions with matching of investors' risk appetite and the nature of the projects
                            </p>
                        </div>
                        <div>
                            <img src={img3} alt="img" />
                            <h3>
                            Swap Aggregator
                            </h3>
                            <p>
                            provides the best price and user experience for trading of crypto currencies in DeFi space
                            </p>
                        </div>
                        <div>
                            <img src={img4} alt="img" />
                            <h3>
                            Project Analyzer
                            </h3>
                            <p>
                            an integrated viewer to display in real time the precise yield of the Defi projects user has invested
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}