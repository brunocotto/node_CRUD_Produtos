const http = require("http");

//Dados são trocados entre servidor e cliente por meio de mensagens HTTP. Há dois tipos de mensagens: 
//requisições (requests) enviadas pelo cliente para disparar uma ação no servidor, e 
//respostas (responses), a réplica do servidor.
http.createServer((request, response) => {
    //status 200 significa que a conexão obteve sucesso
    response.writeHead(200, { 'Content-Type': 'application/json' });

    if (request.url === '/produto') {
        response.end(
            //O método JSON.stringify() converte valores em javascript para uma String JSON. 
            //Esses valores podem ser substituidos especificando a função replacer, ou incluindo 
            //somente as propriedades específicas, quando o array do replacer for especificado.
            JSON.stringify({
                message: "Rota de produtos.."
            })
        );
    }

    if (request.url === '/usuarios') {
        response.end(
            JSON.stringify({
                message: "Rota de usuários.."
            })
        );
    }
    //aviso de qualquer outra rota que não esteja configurada
    response.end(
        JSON.stringify({
            message: "qualquer outra rota que não esteja configurada",
        })
    );
})
.listen(4001, () => console.log("servidor está rodando na porta 4001"))

