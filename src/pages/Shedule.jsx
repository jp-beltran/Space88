import styles from "./Shedule.module.css";
import ContainerShedule from "../components/ContainerShedule";
import UserView from '../pages/UserView';

export default function Shedule() {
    return (
        <div className={styles.view}>
            <div className={styles.container}>
                <ContainerShedule/>
            </div>
            
            <div className={styles.userview}>
                <UserView/>
            </div>

        </div>
    );
}