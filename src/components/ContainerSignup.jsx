import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from './ContainerSignup.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { validarEmail, validarSenha, confirmarSenha } from '../Utils/validators';
import { salvarNoLocalStorage, recuperarDoLocalStorage } from '../Utils/localStorageService';

export default function Signup() {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
    });

    // Função para salvar o usuário no localStorage
    const cadastrarUsuario = (usuario) => {
        const usuarios = recuperarDoLocalStorage('usuarios') || [];
        usuarios.push(usuario);
        salvarNoLocalStorage('usuarios', usuarios);
        console.log('Usuários salvos:', usuarios); // Verifique no console
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            // Validações
            if (!validarEmail(form.email)) throw new Error('E-mail inválido!');
            if (!validarSenha(form.senha)) throw new Error('Senha deve atender aos critérios!');
            if (!confirmarSenha(form.senha, form.confirmarSenha))
                throw new Error('As senhas não conferem!');

            // Cadastrar o usuário
            cadastrarUsuario({
                nome: form.nome,
                email: form.email,
                senha: form.senha,
            });

            alert('Cadastro efetuado com sucesso!');
            setForm({ nome: '', email: '', senha: '', confirmarSenha: '' }); // Limpa o formulário
        } catch (error) {
            alert('Erro ao efetuar cadastro: ' + error.message);
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
        return (
            validarEmail(form.email) &&
            validarSenha(form.senha) &&
            confirmarSenha(form.senha, form.confirmarSenha)
        );
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1>Acesse a plataforma</h1>
                <h2>
                    Faça login ou registre-se para experimentar um corte impecável que
                    realça sua personalidade.
                </h2>

                <Input
                    title="Nome"
                    name="nome"
                    placeholder="Digite seu nome"
                    type="text"
                    value={form.nome}
                    onChange={handleChange}
                />

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

                <Input
                    title="Confirme sua senha"
                    name="confirmarSenha"
                    placeholder="Confirme sua senha"
                    type="password"
                    value={form.confirmarSenha}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    text="Cadastrar"
                    disabled={!validarInput() || loading}
                    />

                <h3>
                    Já tem uma conta? <span onClick={() => navigate('/')}>Faça login</span>
                </h3>
            </form>
        </div>
    );
}
