import React, { useState } from 'react';
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

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!data || !servico || !horario || !barbeiro || !cliente) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        const novoAgendamento = { data, servico, horario, barbeiro, cliente };

        // Imprimir os dados no console para testes
        console.log('Novo Agendamento:', novoAgendamento);

        // Resgatar agendamentos existentes e salvar o novo
        const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
        agendamentos.push(novoAgendamento);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

        // Resetar campos
        setData('');
        setServico('');
        setHorario('');
        setBarbeiro('');
        setCliente('');
        setError('');

        alert('Agendamento salvo com sucesso!');
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

                <div className={styles.wrapper}>
                    <Select
                        label="Barbeiros"
                        name="barbeiro"
                        options={barbeiros}
                        value={barbeiro}
                        onChange={(e) => setBarbeiro(e.target.value)}
                    />
                </div>

                <div className={styles.wrapper}>
                    <label htmlFor="cliente">Cliente</label>
                    <Input
                        type="text"
                        id="cliente"
                        value={cliente}
                        onChange={(e) => setCliente(e.target.value)}
                        placeholder="Nome do Cliente"
                    />
                </div>

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit">Agendar</button>
            </form>
        </div>
    );
}