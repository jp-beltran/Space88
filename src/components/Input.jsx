import styles from "./Input.module.css";
const Input = ({ title, name, placeholder, type, onChange }) => {
  return (
      <div>
          {title && <label htmlFor={name}>{title}</label>}  
          <input
              id={name}
              name={name}
              placeholder={placeholder}
              type={type}
              onChange={onChange}
              className={styles.input}
          />
      </div>
  );
};

export default Input;
