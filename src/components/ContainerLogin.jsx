import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './ContainerLogin.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { validarEmail } from '../Utils/validators';

export default function Login() {
    const navigate = useNavigate(); // Inicializar o hook para navegação

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        senha: '',
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            const { email, senha } = form;

            // Validações básicas
            if (!validarEmail(email)) throw new Error('E-mail inválido!');

            // Recuperar usuários existentes
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar credenciais
            const usuario = usuarios.find(
                (usuario) => 
                    usuario.email === email && 
                    usuario.senha === senha
            );

            if (!usuario) throw new Error('Credenciais inválidas!');

            alert(`Bem-vindo, ${usuario.nome}!`);

            // Redirecionar para a página "Shedule"
            navigate('/shedule');
        } catch (error) {
            alert('Erro ao efetuar login: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const validarInput = () => {
        return form.email && form.senha;
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Bem-vindo de volta!</h1>
                <h2>Faça login para acessar sua conta.</h2>

                <Input
                    title="E-mail"
                    name="email"
                    placeholder="Digite seu email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                />

                <Input
                    title="Senha"
                    name="senha"
                    placeholder="Digite sua senha"
                    type="password"
                    value={form.senha}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    text={loading ? 'Carregando...' : 'Entrar'}
                    disabled={loading || !validarInput()}
                />

                <h3>
                    Não tem uma conta? <span onClick={() => navigate('/signup')}>Cadastre-se</span>
                </h3>
            </form>
        </div>
    );
}
