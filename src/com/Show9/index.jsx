import styles from './style.module.scss';
import logoimg from '../img/logo.png';
import logolist from '../img/logolist.png';
import certikLogo from '../img/certik_logo.png';

const _click = () =>  {
    window.open('https://bscscan.com/address/0x3960e4fa3c0d79dcc6e33b4fc9f1c1c88ab7b849')
}

export default () => {

    return (
        <>
            <div className={styles.box}>
                <div className={styles.content}>
                    <div className={styles.intbox}>
                        <div className={styles.logo}>
                            <img src={logoimg} alt="logo"/>
                        </div>
                        <div>
                            <div className={styles.inputbox}>
                                <div>
                                    <input type="text" placeholder="enter your emall"/>
                                </div>
                                <div>
                                Subscribe
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.logolist}>
                        <img src={logolist} alt="" />
                    </div>
                    <div className={styles.foot}>
                        <span>
                        Contract:<a onClick={_click} className={styles.href}>0x3960e4fa3c0d79dcc6e33b4fc9f1c1c88ab7b849</a>
                        </span>
                        <img src={certikLogo} alt="logo"/>
                        <span>
                        In progress
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}