import styles from './Signup.module.css';
import Container from '../components/ContainerSignup';
import bg from '../assets/backgroundDefault.png'


export default function Signup() {
    
  return (
    <div className={styles.view}>
        <Container className={styles.container} />

        <img src={bg} alt="" />
    </div>


  )
}