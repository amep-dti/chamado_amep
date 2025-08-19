window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    // Lógica de logout
    document.getElementById('logoutButton').addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });

    // Pega os parâmetros da URL
    const params = new URLSearchParams(window.location.search);
    const setor = params.get('setor');
    const tipo = params.get('tipo');

    // Validação
    if (!setor || !tipo) {
        alert('Setor ou tipo não especificado! Retornando ao início.');
        window.location.href = 'index.html';
        return;
    }

    // Atualiza o título da página
    const headerTitle = document.getElementById('headerTitle');
    headerTitle.textContent = tipo === 'chamado' 
        ? `Abrir Chamado para ${setor}` 
        : `Nova Solicitação para ${setor}`;

    // Lógica de envio do formulário
    const form = document.getElementById('novoChamadoForm');
    const mensagemForm = document.getElementById('mensagemForm');
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const titulo = document.getElementById('titulo').value;
        const descricao = document.getElementById('descricao').value;

        try {
            const response = await fetch('http://localhost:3000/chamados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // Envia os dados do formulário + os dados da URL
                body: JSON.stringify({ titulo, descricao, setor, tipo })
            });

            const data = await response.json();

            if (response.ok) {
                mensagemForm.textContent = 'Registro criado com sucesso!';
                mensagemForm.className = 'mensagem-sucesso';
                form.reset(); // Limpa o formulário
                // Opcional: redirecionar para "Meus Chamados" após um tempo
                setTimeout(() => {
                    window.location.href = 'meus_chamados.html';
                }, 2000); // Redireciona após 2 segundos
            } else {
                mensagemForm.textContent = data.erro || 'Erro ao criar registro.';
                mensagemForm.className = 'mensagem-erro';
            }
        } catch (error) {
            console.error('Erro ao criar registro:', error);
            mensagemForm.textContent = 'Erro de conexão com o servidor.';
            mensagemForm.className = 'mensagem-erro';
        }
    });
});