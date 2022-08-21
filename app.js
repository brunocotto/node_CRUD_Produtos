const { response } = require("express")
const express = require("express")
//randomUUID auxilia na criação de ID's de forma automática
const { randomUUID } = require("crypto")

const app = express()

//utilizado para a extensão REST Request funcionar corretamente "content-type: application/json"
app.use(express.json())

//Lista criada para ser o banco de dados fake, armazena os dados 
const produtos = []

/**
 * POST => Inserir um dado
 * GET => Buscar um ou mais dados
 * PUT => Alterar um dado
 * DELETE => Remover um dado
 */

/**
 * Body => Sempre que eu quiser enviar dados para a aplicação
 * Params => /produtos/algumacoisa
 * Query => /produtos?id=456654545655&
 */

app.post("/produtos", (request, response) => {
    // Nome e preço
    const { name, price } = request.body;
    
    const produto = {
        name,
        price,
        id: randomUUID(),
    };
    
    produtos.push(produto);

    return response.json(produto);
})

//inserindo um produto #GET
app.get("/produtos", (request, response) => {
    return response.json(produtos);
});

//buscando o produto utilizando o parâmetro ID #GET
app.get("/produtos/:id", (request, response) => {
    const { id } = request.params;
    /**
     * O método find() retorna o valor do primeiro elemento 
     * do array que satisfizer a função de teste provida. 
     * Caso contrário, undefined é retornado.
     */
    //ou seja, ele só irá retornar o valor quando o "produto.id === id"
    const produto = produtos.find(produto => produto.id === id);
    return response.json(produto)
})

//altera o nome e preço de um produto utilizando seu ID #PUT
app.put("/produtos/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;
    /**
     *  o método findIndex() retorna o índice 
     * no array do primeiro elemento que satisfizer a função de teste provida. 
     * Caso contrário, retorna -1, indicando que nenhum elemento passou no teste.
     */
    //ou seja, o find retornava o objeto inteiro o findIndex retorna apenas o index.
    const produtoIndex = produtos.findIndex(produto => produto.id === id);
    produtos[produtoIndex] = {
        //Rest operator, pega todas as informações, menos name e preço...
        ...produtos[produtoIndex],
        name,
        price,
    }

    return response.json({ message: "Produto alterado com sucesso."});
})

//remove um produto utilizando seu ID #DELETE
app.delete("/produtos/:id", (request, response) => {
    const { id } = request.params;

    const produtoIndex = produtos.findIndex(produto => produto.id === id);

    /**
     * O método splice() altera o conteúdo de uma lista, 
     * podendo adicionar novos elementos enquanto remove elementos antigos,
     * ou, apenas removê-los, utilizando o valor 1 no param deleteCount.
     * array.splice(indice[, deleteCount[, elemento1[, ...[, elementoN]]])
     */
    produtos.splice(produtoIndex, 1);

    return response.json({ message: "Produto removido com sucesso."});
})

app.listen(4002, () => console.log("Servidor está rodando na porta 4002"))