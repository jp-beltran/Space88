// Função para cadastrar um usuário no localStorage
export const cadastrarUsuario = (usuario) => {
    const usuarios = recuperarDoLocalStorage('usuarios') || [];
    usuarios.push(usuario);
    salvarNoLocalStorage('usuarios', usuarios);
    console.log('Usuário salvo:', usuarios); // Adicionado para debug
};

// Função para salvar dados no localStorage
export const salvarNoLocalStorage = (chave, valor) => {
    localStorage.setItem(chave, JSON.stringify(valor));
};

// Função para recuperar dados do localStorage
export const recuperarDoLocalStorage = (chave) => {
    const valor = localStorage.getItem(chave);
    return valor ? JSON.parse(valor) : null;
};