// Recupera os fornecedores do localStorage
let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

// Seleciona a tabela onde os fornecedores serão exibidos
const tabelaFornecedores = document.getElementById("tabelaFornecedores");

// Função para renderizar fornecedores na tabela
function renderizarFornecedores(fornecedoresParaExibir) {
    tabelaFornecedores.innerHTML = ""; // Limpa a tabela antes de renderizar novamente

    fornecedoresParaExibir.forEach((fornecedor, index) => {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${fornecedor.cpfCnpj}</td>
            <td>${fornecedor.nomeFornecedor}</td>
            <td>${fornecedor.telefone}</td>
            <td><button class="botao-remover" onclick="removerFornecedor(${index})">Remover</button></td>
        `;
        tabelaFornecedores.appendChild(novaLinha);
    });
}

// Função para remover fornecedor
function removerFornecedor(index) {
    // Remove o fornecedor do array
    fornecedores.splice(index, 1);

    // Atualiza o localStorage com a nova lista
    localStorage.setItem("fornecedores", JSON.stringify(fornecedores));

    // Re-renderiza a tabela com a lista atualizada
    renderizarFornecedores(fornecedores);
}

// Função para pesquisar fornecedor apenas pelo nome
function pesquisarFornecedor() {
    const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();

    // Se o campo de pesquisa estiver vazio, renderiza todos os fornecedores
    if (searchTerm === "") {
        renderizarFornecedores(fornecedores);
        return;
    }

    // Filtra os fornecedores pelo nome (não inclui CPF/CNPJ)
    const fornecedoresFiltrados = fornecedores.filter(fornecedor => {
        return fornecedor.nomeFornecedor.toLowerCase().includes(searchTerm);
    });

    // Se encontrar fornecedores, renderiza a tabela com os fornecedores filtrados
    if (fornecedoresFiltrados.length > 0) {
        renderizarFornecedores(fornecedoresFiltrados);
    } else {
        // Se não encontrar, exibe a mensagem de "Fornecedor não encontrado"
        tabelaFornecedores.innerHTML = `<tr><td colspan="4">Fornecedor não encontrado</td></tr>`;
    }
}

// Inicializa a página renderizando todos os fornecedores
renderizarFornecedores(fornecedores);
