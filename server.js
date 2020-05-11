const express = require('express');

const server = express();

server.use(express.json());

const produtos = [
    {id: 1, nome_produto: 'Copo Térmico Homem de Ferro', valor: 40.94, destinatario: 'Luis Gustavo Bruneri'},
    {id: 2, nome_produto: 'Controle PS4', valor: 215.90, destinatario: 'Luis Gustavo Bruneri'},

]

server.get('/produto', function(request, response) {
    response.json(produtos);
})

server.post('/produto', function(request, response)
    {
        //const nome_produto = request.body.nome_produto;
        //const valor = request.body.valor;
        //const destinatario = request.body.destinatario;
        const {id, nome_produto, valor, destinatario} = request.body;
        produtos.push({id: id, nome_produto: nome_produto, valor: valor, destinatario: destinatario});
        response.status(204).send();
    }
)

server.put('/produto/:id', function(request, response)
    {
        //const id = request.params.id;
        const {id, nome_produto, valor, destinatario} = request.body;

        for(let i = 0; i < produtos.length; i++)
        {
            if(produtos[i].id == id)
            {
                produtos[i].nome_produto = nome_produto;
                produtos[i].valor = valor;
                produtos[i].destinatario = destinatario;
                break;
            }
        }
        return response.status(204).send();
    })
    


server.delete('/produto/:id', function(request, response)
    {
        const id = request.params.id;
        for(let i = 0; i < produtos.length; i++)
        {
            if(produtos[i].id == id)
            {
                produtos.splice(i, 1);
            }
        }
        return response.status(204).send();
    })
server.listen(process.env.PORT || 3000);