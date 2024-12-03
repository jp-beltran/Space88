import React from 'react';
import styles from './Period.module.css';

function Period({
    ico,
    period,
    initialTime,
    time,
    name,
}) {
    // Calcular finalTime como uma hora após initialTime
    const finalTime = new Date(new Date(`1970-01-01T${initialTime}:00`).getTime() + 60 * 60 * 1000)
        .toTimeString()
        .substring(0, 5);

    return (
        <div className={styles.period}>
            <header>
                <div className={styles.periodIconWrapper}>
                    {React.cloneElement(ico, { size: 20, color: 'var(--yellow-300)' })}
                    <h2>{period}</h2>
                </div>
                <h2>{initialTime} - {finalTime}</h2>
            </header>
            <main>
                {typeof name === 'string' ? (
                    <div className={styles.noAppointments}>
                        <p>{name}</p>
                    </div>
                ) : (
                    name
                )}
            </main>
        </div>
    );
}

export default Period;