import React, { useEffect, useState } from 'react';
import styles from './BarberView.module.css';
import Period from '../components/Period';
import { MdOutlineWbSunny } from "react-icons/md";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";

export default function BarberView() {
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => {
        // Recupere os agendamentos do localStorage
        const savedAgendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        setAgendamentos(savedAgendamentos);
    }, []);

    const sunIco = <MdOutlineWbSunny color='var(--yellow-300)' />;
    const eveningIco = <IoPartlySunnyOutline color='var(--yellow-300)' />;
    const moonIco = <FaRegMoon color='var(--yellow-300)' />;

    const filterAgendamentos = (startTime, endTime) => {
        return agendamentos.filter(agendamento => {
            const horario = new Date(`1970-01-01T${agendamento.horario}:00`).getHours();
            return horario >= startTime && horario < endTime;
        });
    };

    const morningAgendamentos = filterAgendamentos(8, 12);
    const afternoonAgendamentos = filterAgendamentos(12, 18);
    const eveningAgendamentos = filterAgendamentos(18, 22);

    return (
        <div className={styles.view}>
            <header>
                <div className="content">
                    <h1>Sua agenda</h1>
                    <p>Consulte os seus cortes de cabelo agendados por dia</p>
                </div>
                <input type="date" />
            </header>

            <main>
                <section className={styles.periodSection}>
                    <Period
                        ico={sunIco}
                        period="Manhã"
                        initialTime="08:00"
                        time="08:00"
                        name={morningAgendamentos.length > 0 ? morningAgendamentos.map((agendamento, index) => (
                            <div key={index} className={styles.clients}>
                                <h2>{agendamento.horario}: </h2> <pre>  </pre>
                                <p>{agendamento.cliente}</p>
                            </div>
                        )) : "Sem Agendamentos Hoje"}
                    />
                </section>

                <section className={styles.periodSection}>
                    <Period
                        ico={eveningIco}
                        period="Tarde"
                        initialTime="12:00"
                        time="12:00"
                        name={afternoonAgendamentos.length > 0 ? afternoonAgendamentos.map((agendamento, index) => (
                            <div key={index} className={styles.clients}>
                                <h2>{agendamento.horario}: </h2> <pre>  </pre>
                                <p>{agendamento.cliente}</p>
                            </div>
                        )) : "Sem Agendamentos Hoje"}
                    />
                </section>

                <section className={styles.periodSection}>
                    <Period
                        ico={moonIco}
                        period="Noite"
                        initialTime="18:00"
                        time="18:00"
                        name={eveningAgendamentos.length > 0 ? eveningAgendamentos.map((agendamento, index) => (
                            <div key={index} className={styles.clients}>
                                <h2>{agendamento.horario}: </h2> <pre>  </pre>
                                <p>{agendamento.cliente}</p>
                            </div>
                        )) : "Sem Agendamentos Hoje"}
                    />
                </section>
            </main>
        </div>
    );
}