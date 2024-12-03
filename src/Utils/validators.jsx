// Validação mais robusta para email
const validarEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex padrão para validar email
    return regex.test(email?.toString());
};

// Validação mais completa para senha
const validarSenha = (password) => {

    const regex = /^(?=.*\d).{6,}$/;
    return regex.test(password);
};

// Validação para confirmação de senha
const confirmarSenha = (senha, confirmarSenha) => {
    return senha === confirmarSenha;
};

// Função para verificar choque de horários
const validarChoqueDeHorarios = (horariosExistentes, novoHorario) => {
    const novoInicio = new Date(novoHorario.inicio).getTime();
    const novoFim = new Date(novoHorario.fim).getTime();

    return !horariosExistentes.some(horario => {
        const inicioExistente = new Date(horario.inicio).getTime();
        const fimExistente = new Date(horario.fim).getTime();

        // Verifica se há sobreposição de horários
        return (novoInicio < fimExistente && novoFim > inicioExistente);
    });
};

export {
    validarEmail,
    validarSenha,
    confirmarSenha,
    validarChoqueDeHorarios,
};
