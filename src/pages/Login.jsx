
import styles from './Login.module.css';
import Container from '../components/ContainerLogin';
import bg from '../assets/backgroundDefault.png'

export default function Login() {
    
  return (
    <div className={styles.view}>
        <Container />
            
        <img src={bg} alt="" />
    </div>


  )
}