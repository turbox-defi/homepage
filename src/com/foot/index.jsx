import styles from './style.module.scss';
import svg1 from './telegram-plane.svg';
import svg2 from './medium.svg';
import svg3 from './GitHub.svg';
import svg4 from './Gitbook.svg';
import svg5 from './Twitter.svg';

const goBlack = (url) => {
  window.open(url)
}

export default () => {
  return (
    <>
      <div className={styles.box}>
        <div className={styles.content}>
          <span>© 2020 ALL RIGHTS RESERVED</span>
          <div className={styles.right}>
            <span>
              Mail:<a href="mailto:support@turbox.io" target="_blank">support@turbox.io</a>
            </span>
            <div className={styles.iconlist}>
              <img src={svg1} onClick={goBlack.bind(this,'https://t.me/turboXnetwork')} alt='icon'/>
              <img src={svg2}  alt='icon'/>
              <img src={svg3}  alt='icon'/>
              <img src={svg4}  alt='icon'/>
              <img src={svg5}  alt='icon'/>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}