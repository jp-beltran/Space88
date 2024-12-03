import styles from './Button.module.css';


export default function Button(
{
  type,
  text,
  onClick,
  disabled,
}
) 

{

  return (
    <div>
          <button 
      type={type}
      text={text}
      onClick={onClick}
      disabled={disabled}
      className={styles.button}
    >
        {text}
    </button>

    </div>
  )
}