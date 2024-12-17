import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ContainerLogin.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import { validarEmail } from '../Utils/validators';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function Login() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        email: '',
        senha: '',
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);

            const { email, senha } = form;

            // Validação de e-mail
            if (!validarEmail(email)) throw new Error('E-mail inválido!');

            // Login no Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);
            const user = userCredential.user;

            // Buscar o tipo de conta (role) no Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
                const userData = userDoc.data();
                const role = userData.role;

                console.log(`Usuário logado: ${user.displayName || "Usuário"}`, userData);

                // Redirecionamento com base no role
                if (role === "barber") {
                    navigate('/barber'); // Rota para barbeiros
                } else if (role === "user") {
                    navigate('/shedule'); // Rota para usuários
                } else {
                    alert('Tipo de conta desconhecido. Entre em contato com o suporte.');
                }
            } else {
                console.error('Nenhum documento encontrado para o usuário.');
                throw new Error('Dados do usuário não encontrados no sistema.');
            }
        } catch (error) {
            console.error("Erro no login:", error.message);

            // Tratamento de erros específicos
            if (error.code === 'auth/user-not-found') {
                alert('Usuário não encontrado. Verifique o e-mail e tente novamente.');
            } else if (error.code === 'auth/wrong-password') {
                alert('Senha incorreta. Tente novamente.');
            } else {
                alert(`Erro ao efetuar login: ${error.message}`);
            }
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

    const validarInput = () => form.email && form.senha;

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
