window.addEventListener('DOMContentLoaded', () => {
    console.log('Página carregada, index.js está rodando.');

    // Verifica se o usuário está logado, senão, volta para o login
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

    // Adiciona o evento de clique para cada card
    const cards = document.querySelectorAll('.launcher-card');
    console.log(`Encontrados ${cards.length} cards para adicionar o evento de clique.`);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            console.log('Card clicado!'); // <-- Verificamos se o clique é detectado

            const setor = card.dataset.setor;
            const tipo = card.dataset.tipo;
            
            console.log(`Dados do card: Setor=${setor}, Tipo=${tipo}`); // <-- Verificamos se os dados foram lidos

            if (setor && tipo) {
                const url = `criar_chamado.html?setor=${setor}&tipo=${tipo}`;
                console.log(`Redirecionando para: ${url}`); // <-- Verificamos a URL final
                window.location.href = url;
            } else {
                console.error('Erro: Atributos data-setor ou data-tipo não encontrados no card.');
            }
        });
    });
});