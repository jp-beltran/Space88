import styles from "./Input.module.css";

const Input = ({ title, name, placeholder, type, onChange, checked }) => {
  return (
    <div>
      {title && <label htmlFor={name}>{title}</label>}
      {type === "checkbox" ? (
        <input
          id={name}
          name={name}
          type="checkbox"
          onChange={onChange}
          checked={checked}
          className={styles.input}
        />
      ) : (
        <input
          id={name}
          name={name}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          className={styles.input}
        />
      )}
    </div>
  );
};

export default Input;
