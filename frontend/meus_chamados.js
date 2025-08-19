window.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const welcomeMessage = document.getElementById('welcomeMessage');
    const logoutButton = document.getElementById('logoutButton');
    const chamadosContainer = document.getElementById('chamadosContainer');

    function parseJwt(token) {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) { return null; }
    }

    const usuario = parseJwt(token);
    if (!usuario) {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
        return;
    }

    async function fetchChamados() {
        try {
            const response = await fetch('http://localhost:3000/chamados', {
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                localStorage.removeItem('authToken');
                window.location.href = 'login.html';
                return;
            }

            const chamados = await response.json();
            chamadosContainer.innerHTML = '';

            if (chamados.length === 0) {
                chamadosContainer.innerHTML = '<p>Nenhum chamado encontrado.</p>';
            } else {
                chamados.forEach(chamado => {
                    const chamadoDiv = document.createElement('div');
                    chamadoDiv.className = 'chamado-card';
                    
                    let actionsHtml = '';
                    if (usuario.tipo_usuario === 'tecnico') {
                        // Lógica dos botões para o técnico... (implementaremos no futuro)
                    }
                    
                    chamadoDiv.innerHTML = `
                        <p class="card-tipo-${chamado.tipo}">${chamado.tipo}</p>
                        <h3>${chamado.titulo}</h3>
                        <p><strong>Status:</strong> <span class="status-${chamado.status}">${chamado.status}</span></p>
                        <p>${chamado.descricao}</p>
                        ${usuario.tipo_usuario === 'tecnico' ? `<p><strong>Criado por:</strong> ${chamado.nome_criador}</p>` : ''}
                        ${actionsHtml}
                    `;
                    chamadosContainer.appendChild(chamadoDiv);
                });
            }
        } catch (error) {
            console.error('Erro ao buscar chamados:', error);
        }
    }

    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.href = 'login.html';
    });
    
    welcomeMessage.textContent = `Bem-vindo(a), ${usuario.nome}!`;
    fetchChamados();
});