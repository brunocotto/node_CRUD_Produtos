const http = require("http");

http.createServer((request, response) => {
    //status 200 significa que a conexão obteve sucesso
    response.writeHead(200, { 'Content-Type': 'application/json' });

    if (request.url === '/produto') {
        response.end(
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

