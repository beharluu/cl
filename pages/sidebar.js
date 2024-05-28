import styles from '../styles/sidebar.module.css';



const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.menuTop}>
                <div className={styles.iconLogo}>
                    <img src="logo.svg"/>
                </div>
                <div className={styles.iconAvatar}>
                    <img src="avatar.png"/>
                </div>
                <div className={styles.iconOverview}>
                    <img src="overview.png"/>
                </div>
                <div className={styles.iconPeople}>
                    <img src="people.png"/>
                </div>
                <div className={styles.iconMore}>
                    <img src="more.svg"/>
                </div>

            </div>
            <div className={styles.menuBottom}>
                <div className={styles.menuBottomWrapper}>
                    <div className={styles.iconGear}>
                        <img src="settings.svg" />
                    </div>
                    <div className={styles.iconNotification}>
                        <img src="notify.png" />
                    </div>
                    <div className={styles.iconSearch}>
                        <img src="search.svg" />
                    </div>
                    <div className={styles.iconHelp}>
                    <img src="help.png" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;