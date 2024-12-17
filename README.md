![image](https://github.com/user-attachments/assets/d9b4b4b6-ec24-49bf-b18b-5a55ba366028)# Space88

**Space88** é um sistema de agendamento online para uma barbearia. A aplicação permite que usuários criem contas, façam login e agendem serviços. Barbeiros também podem acessar o sistema para visualizar seus atendimentos. O projeto utiliza **React**, **Firebase (Authentication, Firestore)** e **Firebase Hosting** para armazenamento e autenticação, além de **Vercel** para hospedagem do frontend.
![image](https://github.com/user-attachments/assets/fe461af4-4925-4367-a138-308ccd61f46c)
![image](https://github.com/user-attachments/assets/54ef4a02-fb17-4cb2-afff-e3f0d4196141)




### URL do Repositório
[https://github.com/jp-beltran/Space88](https://github.com/jp-beltran/Space88)

## Funcionalidades
- **Cadastro de Usuário**: Crie uma conta inserindo nome, e-mail, senha e selecione se é barbeiro ou usuário (através de um checkbox).
- **Login de Usuário**: Efetue login com e-mail e senha.
- **Agendamentos**:
  - **Usuário** pode agendar um horário, informando data, horário, barbeiro, serviço e nome do cliente.
  - O agendamento é salvo no Firestore associado ao e-mail do usuário.
- **Visualização de Agendamentos**:
  - **Usuário**: Visualiza apenas seus próprios agendamentos filtrados por data.
  - **Barbeiro**: Visualiza agendamentos atribuídos ao seu email.

## Tecnologias Utilizadas
- **Frontend**:
  - [React](https://reactjs.org/)
  - [Vite](https://vitejs.dev/)
- **Autenticação & Banco de Dados**:
  - [Firebase Authentication](https://firebase.google.com/docs/auth)
  - [Firestore](https://firebase.google.com/docs/firestore)
- **Hospedagem**:
  - [Firebase Hosting](https://firebase.google.com/docs/hosting)
  - [Vercel](https://vercel.com/)

## Pré-requisitos
- Node.js LTS instalado.
- Conta no Firebase configurada.
- Projeto no Firebase com Authentication e Firestore habilitados.
- Conta no Vercel configurada (opcional, se for hospedar lá).

## Instalação e Execução Local
1. Clone o repositório:
