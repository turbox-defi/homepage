import styles from './style.module.scss';

import logoimg from '../img/logo.png';

const _click = (url) => {
    window.location.href = url;
}

export default () => {


    return (
        <>
            <div className={styles.box}>
                <img src={logoimg} alt="logo" />
                <div className={styles.navs}>
                    <span style={{ color: '#3CFFFC' }}>
                        Home
                    </span>
                    <span onClick={_click.bind(this,'https://www.baidu.com')}>
                        Exchange
                    </span>
                    <span onClick={_click.bind(this,'https://www.baidu.com')}>
                        FAQ
                    </span>
                    <span onClick={_click.bind(this,'https://www.baidu.com')}>
                        Blog
                    </span>
                </div>
            </div>
        </>
    )
}