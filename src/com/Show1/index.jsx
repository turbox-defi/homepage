import styles from './style.module.less';
import img1 from '../img/show1.png';

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
                        Machine Learning and Big Data Modelling
                        </h2>
                        <p>
                        With the complete historical data and large data sample, and our deep knowledge and experience in machine learning (logistic regression, decision tree, deep learning, etc), we are able to to develop predictive models to evaluate the Defi projects.
                        </p>
                        <p>
                        Based on these models, TurboX creates an automated scoring system, to assess a project from multiple dimension
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}