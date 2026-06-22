document.addEventListener("DOMContentLoaded", () => {
    // Só executa se estivermos na página de dashboard
    if (document.getElementById("lista-agendamentos")) {
        carregarDadosDashboard();
    }
});

// GET - Listar Produtos / Transações / Agendamentos
async function carregarDadosDashboard() {
    try {
        const resposta = await fetch('/dashboard');
        if (resposta.status === 401) {
            window.location.href = '/login.html';
            return;
        }
        
        const dados = await resposta.json();
        
        // Atualiza a saudação com o nome e perfil do usuário logado
        document.getElementById("boas-vindas").innerText = `Olá, ${dados.usuario.nome} (${dados.usuario.tipo})!`;

        const container = document.getElementById("lista-agendamentos");
        container.innerHTML = '';

        if (dados.agendamentos.length === 0) {
            container.innerHTML = '<p style="color: #666;">Nenhum agendamento encontrado.</p>';
            return;
        }

        // Renderiza os cards
        dados.agendamentos.forEach(item => {
            container.innerHTML += `
                <div class="agendamento-card">
                    <div class="agendamento-info">
                        <p><strong>${item.servico}</strong></p>
                        <p style="font-size: 13px; color: #aaa;">Data: ${item.data} às ${item.hora}</p>
                        <p style="font-size: 12px; color: #f3b51a;">Ref: ${item.usuario_nome} | Status: ${item.status}</p>
                    </div>
                    <div class="agendamento-acoes">
                        <button onclick="alternarStatus(${item.id}, '${item.status}')" style="background: #3498db; color: white;">🔄 Status</button>
                        <button onclick="deletarAgendamento(${item.id})" class="btn-danger">❌</button>
                    </div>
                </div>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
    }
}

// PUT - Editar Status/Produto
async function alternarStatus(id, statusAtual) {
    const novoStatus = statusAtual === 'pendente' ? 'confirmado' : 'concluido';
    
    const resposta = await fetch(`/dashboard/editar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    });

    if (resposta.ok) {
        carregarDadosDashboard(); // Recarrega a lista
    } else {
        alert("Erro ao atualizar registro.");
    }
}

// DELETE - Excluir Registro
async function deletarAgendamento(id) {
    if (confirm("Tem certeza que deseja remover este agendamento?")) {
        const resposta = await fetch(`/dashboard/deletar/${id}`, {
            method: 'DELETE'
        });

        if (resposta.ok) {
            carregarDadosDashboard();
        } else {
            alert("Erro ao excluir registro.");
        }
    }
}