import styles from '../styles/sidebar.module.css';


const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.menuTop}>
                <div className={styles.iconHome}></div>
                <div className={styles.iconMore}></div>
                <div className={styles.iconAvatar}>
                    <img src="avatar.png"/>
                </div>
                <div className={styles.iconOverview}></div>
            </div>
            <div className={styles.menuBottom}>
                <div className={styles.menuBottomWrapper}>
                    <div className={styles.iconGear}></div>
                    <div className={styles.iconNotification}></div>
                    <div className={styles.iconSearch}></div>
                    <div className={styles.iconHelp}></div>
                    <div className={styles.iconExpand}></div>

                </div>
            </div>
        </div>
    );
};

export default Sidebar;