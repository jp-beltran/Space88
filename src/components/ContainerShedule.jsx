import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; // Firestore
import { db, auth } from "../../firebase"; // Configuração do Firebase
import styles from './ContainerShedule.module.css';
import Input from '../components/Input';
import Select from '../components/Select';

export default function ContainerShedule() {
    const [data, setData] = useState('');
    const [servico, setServico] = useState('');
    const [horario, setHorario] = useState('');
    const [barbeiro, setBarbeiro] = useState('');
    const [cliente, setCliente] = useState('');
    const [error, setError] = useState('');

    const servicos = ['Corte', 'Barba', 'Corte + Barba'];
    const barbeiros = ['Dave', 'Guava', 'Rafa', 'Gustavo'];

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validação de campos
        if (!data || !servico || !horario || !barbeiro || !cliente) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const userEmail = auth.currentUser?.email;

        if (!userEmail) {
            setError('É necessário estar autenticado para agendar.');
            return;
        }

        const novoAgendamento = {
            data,
            servico,
            horario,
            barbeiro,
            cliente,
            email: userEmail, // Associar o agendamento ao usuário autenticado
            createdAt: new Date().toISOString(),
        };

        try {
            // Salvar o agendamento no Firestore
            await addDoc(collection(db, "agendamentos"), novoAgendamento);

            alert("Agendamento salvo com sucesso!");

            // Limpar os campos do formulário
            setData('');
            setServico('');
            setHorario('');
            setBarbeiro('');
            setCliente('');
            setError('');
        } catch (error) {
            console.error("Erro ao salvar o agendamento: ", error);
            setError("Erro ao salvar o agendamento. Tente novamente.");
        }
    };

    return (
        <div className={styles.shedule}>
            <form onSubmit={handleSubmit}>
                <h1>Agende um atendimento</h1>
                <p>Preencha os dados para criar um novo agendamento.</p>

                <div className={styles.wrapper}>
                    <label htmlFor="data">Data</label>
                    <Input
                        type="date"
                        id="data"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                    />
                </div>

                <Select
                    label="Serviço"
                    name="servico"
                    options={servicos}
                    value={servico}
                    onChange={(e) => setServico(e.target.value)}
                />

                <div className={styles.wrapper}>
                    <label htmlFor="horario">Horário</label>
                    <Input
                        type="time"
                        id="horario"
                        value={horario}
                        onChange={(e) => setHorario(e.target.value)}
                    />
                </div>

                <Select
                    label="Barbeiro"
                    name="barbeiro"
                    options={barbeiros}
                    value={barbeiro}
                    onChange={(e) => setBarbeiro(e.target.value)}
                />

                <div className={styles.wrapper}>
                    <label htmlFor="cliente">Nome do Cliente</label>
                    <Input
                        type="text"
                        id="cliente"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        placeholder="Digite o nome do cliente"
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit">Agendar</button>
            </form>
        </div>
    );
}
