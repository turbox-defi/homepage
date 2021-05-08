import styles from './style.module.scss';
import logoimg from '../img/logo.png';
import logolist from '../img/logolist.png';
import certikLogo from '../img/certik_logo.png';

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
                        Contract:0xe098b2ce062c81dc9d6d7504801b86f672cc8ddc
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