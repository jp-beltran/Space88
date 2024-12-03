import React, { useEffect, useState } from 'react';
import styles from './UserView.module.css';

export default function UserView() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    useEffect(() => {
        // Recupera os agendamentos do localStorage
        const savedAgendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        setAgendamentos(savedAgendamentos);
    }, []);

    // Filtra os agendamentos por data
    const filterByDate = (agendamentos, date) => {
        if (!date) return agendamentos;
        return agendamentos.filter(agendamento => agendamento.data === date);
    };

    const filteredAgendamentos = filterByDate(agendamentos, filterDate);

    return (
        <div className={styles.view}>
            <header>
                <div className={styles.content}>
                    <h1>Meus Agendamentos</h1>
                    <p>Consulte seus cortes de cabelo agendados por dia.</p>
                </div>
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </header>

            <main>
                <section className={styles.periodSection}>
                    {filteredAgendamentos.length > 0 ? (
                        filteredAgendamentos.map((agendamento, index) => (
                            <div key={index} className={styles.clients}>
                                <h2>Horário: {agendamento.horario}</h2>
                                <p>Serviço: {agendamento.servico}</p>
                                <p>Barbeiro: {agendamento.barbeiro}</p>
                                <p>Cliente: {agendamento.cliente}</p>
                            </div>
                        ))
                    ) : (
                        <p className={styles.noAppointments}>Sem agendamentos hoje.</p>
                    )}
                </section>
            </main>
        </div>
    );
}
