import styles from './style.module.less';

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
                    <span onClick={_click.bind(this,'http://analysis.turbox.io')}>
                        Analysis
                    </span>
                    <span onClick={_click.bind(this,'https://exchange.turbox.io')}>
                        Exchange
                    </span>
                    <span onClick={_click.bind(this,'http://docs.turbox.io')}>
                        FAQ
                    </span>
                    {/* <span onClick={_click.bind(this,'http://www.baidu.com')}>
                        Blog
                    </span> */}
                </div>
            </div>
        </>
    )
}