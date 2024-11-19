// Seleciona o botão e adiciona o evento de clique
document.getElementById("formularioProduto").addEventListener("submit", function() {

    // Pega os valores do formulário
    const codigoProduto = document.getElementById("codigoP").value.trim();
    const categoria = document.getElementById("categoriaProduto").value.trim();
    const nomeProduto = document.getElementById("nomeProduto").value.trim();
    let preco = document.getElementById("precoProduto").value.trim();
    const quantidade = document.getElementById("quantidade").value.trim();
    const dataEntrada = document.getElementById("dataEntrada").value.trim();


    // Verifica se os campos estão preenchidos
    if(!codigoProduto || !categoria || !nomeProduto ) {
        alert("Por favor, preencha todos os campos!")
        return;
    }

    if (isNaN(preco) || isNaN(quantidade)) {
        alert("Preço e quantidade devem ser números!");
        return;
    }

    if (isNaN(Date.parse(dataEntrada))) {
        alert("Data de entrada inválida!");
        return;
    }


    // Trata o valor do preço para aceitar vírgula como separador decimal
    preco = preco.replace(',','.'); // Substitui a vírgula por ponto
    preco = parseFloat(preco); // Converter para número

    // Verifica se o preço é um número válido após a conversão
    if(isNaN(preco) || preco <= 0) {
        alert("Por favor, insira um preço válido!")
        return;
    }

    // Recupera os fornecedores salvos no localStorage

    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

    // Adiciona o novo produto à lista
    produtos.push({codigoProduto, categoria, nomeProduto, preco, quantidade, dataEntrada })

    // Salva a lista atualizada no localSotorage
    localStorage.setItem("produtos", JSON.stringify(produtos));


    // Limpa o formulário
    document.getElementById("formularioProduto").reset();

    // Feedback antes de redirecionar
    alert("Produto cadastrado com sucesso!")

    //Redireciona para a página de listagem
    window.location.href = "produtos.html"
});