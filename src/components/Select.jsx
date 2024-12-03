import React from 'react';
import styles from './Select.module.css';

const Select = ({ label, name, options, onChange, value }) => {
    return (
        <div className={styles.formGroup}>
            <label htmlFor={name}>{label}</label>
            <select id={name} name={name} onChange={onChange} value={value}>
                <option value="">Selecione</option>
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;