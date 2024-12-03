import React, { useEffect, useState } from 'react';
import styles from './ContainerBarberView.module.css';

export default function BarberSchedule() {
    const barberName = "João";
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        const storedAgendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        setAgendamentos(storedAgendamentos);
    }, []);

    const manha = agendamentos.filter(item => item.horario >= "09:00" && item.horario < "12:00");
    const tarde = agendamentos.filter(item => item.horario >= "12:00" && item.horario < "18:00");
    const noite = agendamentos.filter(item => item.horario >= "18:00");

    return (
        <div className={styles.container}>
            <header>
                <h1>Agenda de {barberName}</h1>
                <p>Visualize os agendamentos organizados por período.</p>
            </header>
            <div className={styles.heduleContainer}>


                <div className={styles.period}>
                    {manha.length > 0 ? (
                        manha.map((item, index) => (
                            <div key={index} className={styles.appointmentCard}>
                                <p><strong>Cliente:</strong> {item.cliente}</p>
                                <p><strong>Horário:</strong> {item.horario}</p>
                                <p><strong>Serviço:</strong> {item.servico}</p>
                                <p><strong>Barbeiro:</strong> {item.barbeiro}</p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum agendamento.</p>
                    )}
                </div>

                <div className={styles.period}>
    
                    {tarde.length > 0 ? (
                        tarde.map((item, index) => (
                            <div key={index} className={styles.appointmentCard}>
                                <p><strong>Cliente:</strong> {item.cliente}</p>
                                <p><strong>Horário:</strong> {item.horario}</p>
                                <p><strong>Serviço:</strong> {item.servico}</p>
                                <p><strong>Barbeiro:</strong> {item.barbeiro}</p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum agendamento.</p>
                    )}
                </div>

                <div className={styles.period}>
                    {noite.length > 0 ? (
                        noite.map((item, index) => (
                            <div key={index} className={styles.appointmentCard}>
                                <p><strong>Cliente:</strong> {item.cliente}</p>
                                <p><strong>Horário:</strong> {item.horario}</p>
                                <p><strong>Serviço:</strong> {item.servico}</p>
                                <p><strong>Barbeiro:</strong> {item.barbeiro}</p>
                            </div>
                        ))
                    ) : (
                        <p>Nenhum agendamento.</p>
                    )}
                </div>
            </div>
        </div>
    );
}