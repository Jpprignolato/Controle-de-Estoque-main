// Recupera os produtos do localStorage
let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

// Seleciona a tabela onde os produtos serão exibidos
const tabelaProdutos = document.getElementById("tabelaProdutos");

// Função para renderizar produtos na tabela
function renderizarProdutos(produtosParaExibir) {
    tabelaProdutos.innerHTML = ""; //Limpa a tabela antes de renderizar novamente

    produtosParaExibir.forEach((produtos, index) => {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
        <td>${produtos.codigoProduto}</td>
        <td>${produtos.categoria}</td>
        <td>${produtos.nomeProduto}</td>
        <td>${formatarMoeda(produtos.preco)}</td>
        <td>${produtos.quantidade}</td>
        <td>${produtos.dataEntrada}</td>
        <td><button class="botao-remover" onclick="removerProduto(${index})">Remover</button></td>
        `;
        tabelaProdutos.appendChild(novaLinha)
    });

}

//Função para formatar o preço como moeda brasileira
function formatarMoeda(valor) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor);
}
// Função para remover produto
function removerProduto(index) {
    // Remove o produto do array
    produtos.splice(index, 1);

    // Atualiza o localStorage com a nova lista
    localStorage.setItem("produtos", JSON.stringify(produtos));

    // Re-renderiza a tabela com a lista atualizada
    renderizarProdutos(produtos);
}

// Função para pesquisar produto apenas pelo nome

function pesquisarProduto() {
    const searchTerm = document.getElementById("searchInput").value.trim().toLowerCase();

    // Verifica se o campo de pesquisa está vazio
    if (searchTerm === "") {
        renderizarProdutos(produtos);
        return;
    }

    // Filtra os produtos pelo nome
    const produtosFiltrados = produtos.filter(produto =>
        produto.nomeProduto.toLowerCase().includes(searchTerm)
    );

    // Verifica se encontrou produtos
    if (produtosFiltrados.length > 0) {
        renderizarProdutos(produtosFiltrados);
    } else {
        tabelaProdutos.innerHTML = `<tr><td colspan="6">Produto não encontrado</td></tr>`;
    }
}

// Executa a função ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    renderizarProdutos(produtos);

});


// Inicializa a página renderizando todos os produtos
renderizarProdutos(produtos);