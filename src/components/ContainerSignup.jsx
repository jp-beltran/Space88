import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContainerSignup.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { validarEmail, validarSenha, confirmarSenha } from '../Utils/validators';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        role: 'user', // Valor padrão
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            // Validações
            if (!validarEmail(form.email)) throw new Error('E-mail inválido!');
            if (!validarSenha(form.senha)) throw new Error('A senha deve conter pelo menos 6 caracteres!');
            if (!confirmarSenha(form.senha, form.confirmarSenha))
                throw new Error('As senhas não conferem!');

            // Criar usuário no Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.senha);
            const user = userCredential.user;

            // Atualizar o perfil com o nome
            await updateProfile(user, { displayName: form.nome });

            // Salvar no Firestore
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, {
                uid: user.uid,
                nome: form.nome,
                email: form.email,
                role: form.role || 'user',
            });

            alert('Cadastro efetuado com sucesso!');
            setForm({ nome: '', email: '', senha: '', confirmarSenha: '', role: 'user' });
            navigate('/'); // Redireciona para login
        } catch (error) {
            console.error("Erro ao cadastrar:", error.message);
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

    const handleRoleChange = (event) => {
        // Se a checkbox estiver marcada, role = 'barber', senão 'user'
        setForm({
            ...form,
            role: event.target.checked ? 'barber' : 'user'
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

                <div className={styles.wrapper}>
                    <label htmlFor="roleCheckbox">Conta de Barbeiro</label>
                    <Input
                        name="roleCheckbox"
                        type="checkbox"
                        checked={form.role === 'barber'}
                        onChange={handleRoleChange}
                    />
                </div>

                <Button
                    type="submit"
                    text={loading ? "Cadastrando..." : "Cadastrar"}
                    disabled={!validarInput() || loading}
                />

                <h3>
                    Já tem uma conta? <span onClick={() => navigate('/')}>Faça login</span>
                </h3>
            </form>
        </div>
    );
}
