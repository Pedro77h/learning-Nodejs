const http = require("http")

http
    .createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        
        if (request.url === "/aplicacao") {
            response.end(
                JSON.stringify({
                    message: "rota de aplicacoes"
                })
            )
        
        }
        if (request.url === "/usuario") {
            response.end(
                JSON.stringify({
                    message: "Rota de usuario"
                })
            )
        }

        response.end(
            JSON.stringify({
                message: "Qualquer outra Rota"
            })
        )

    })

    .listen(4030, () => console.log("Servidor online na porta 4030"))