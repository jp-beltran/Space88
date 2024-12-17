import React, { useEffect, useState } from 'react';
import styles from './UserView.module.css';
import { auth, db } from '../../firebase'; // Firebase Auth e Firestore
import { collection, query, where, getDocs } from 'firebase/firestore'; // Firestore

export default function UserView() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filterDate, setFilterDate] = useState('');
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        // Obter o e-mail do usuário logado
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                console.error("Usuário não autenticado.");
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                if (!userEmail) return; // Não busca se não tiver usuário

                const agendamentosRef = collection(db, 'agendamentos');
                const q = query(agendamentosRef, where('email', '==', userEmail));

                const querySnapshot = await getDocs(q);
                const agendamentosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAgendamentos(agendamentosData);

            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error.message);
            }
        };

        fetchAgendamentos();
    }, [userEmail]);

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
