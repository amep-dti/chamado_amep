// Adiciona um "escutador" para o evento de 'submit' do formulário
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    // Impede o comportamento padrão do formulário, que é recarregar a página
    event.preventDefault();

    // Pega o elemento que exibirá as mensagens de erro
    const mensagemErro = document.getElementById('mensagemErro');
    mensagemErro.textContent = ''; // Limpa mensagens de erro antigas

    // Pega os valores dos campos de email e senha
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        // Faz a requisição para a API usando fetch
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST', // Método da requisição
            headers: {
                'Content-Type': 'application/json' // Informa que estamos enviando dados em formato JSON
            },
            body: JSON.stringify({ email, senha }) // Converte o objeto JavaScript em uma string JSON
        });

        // Converte a resposta da API de JSON para um objeto JavaScript
        const data = await response.json();

        // Verifica se a resposta da API foi bem-sucedida
        if (response.ok) {
            // Se a resposta contém um token, o login foi um sucesso
            if (data.token) {
                // Salva o token no localStorage do navegador para uso futuro
                localStorage.setItem('authToken', data.token);
                
                // Redireciona o usuário para a NOVA PÁGINA INICIAL
                window.location.href = 'index.html'; 
            }
        } else {
            // Se a resposta não foi OK, exibe a mensagem de erro retornada pela API
            mensagemErro.textContent = data.erro || 'Erro ao fazer login.';
        }
    } catch (error) {
        // Se houver um erro na comunicação com a API (ex: servidor offline)
        console.error('Erro na requisição:', error);
        mensagemErro.textContent = 'Não foi possível conectar ao servidor. Tente novamente mais tarde.';
    }
});