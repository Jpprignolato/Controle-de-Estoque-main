// Seleciona o botão e adiciona o evento de clique
document.getElementById("cadastrarFornecedor").addEventListener("click", function () {

    // Pega os valores do formulário
    const cpfCnpj = document.getElementById("cpfCnpj").value.trim()
    const nomeFornecedor = document.getElementById("nomeFornecedor").value.trim()
    const telefone = document.getElementById("telefone").value.trim()

    // Verifica se os campos estão preenchidos
    if (!cpfCnpj || !nomeFornecedor || !telefone) {
        alert("Por favor, preencha todos os campos!")
        return;
    }   

// Recupera os fornecedores salvos no localstorage

let fornecedores = JSON.parse(localStorage.getItem("fornecedores")) || [];

// Adiciona o novo fornecedor à lista
fornecedores.push({ cpfCnpj, nomeFornecedor, telefone });


// Salva a lista atualizada no localStorage
localStorage.setItem("fornecedores", JSON.stringify(fornecedores));

//Limpa o formulário
document.getElementById("formularioFornecedor").reset();

//Redireciona para a página de listagem
window.location.href = "fornecedores.html";

});