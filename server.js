const express = require('express');

const Pool = require('pg').Pool;

const pool = new Pool ({
    user:'hpyppuxhoojuzk',
    password:'7e1620c91a2857934dc89e83ce634074cbb895bf876493e1c2bb3e21cc7cae75',
    host:'ec2-3-222-150-253.compute-1.amazonaws.com',
    database:'d2oeeq76dd6var',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

const server = express();

server.use(express.json());

//const produtos = [
//    {id: 1, nome_produto: 'Copo Térmico Homem de Ferro', valor: 40.94, destinatario: 'Luis Gustavo Bruneri'},
//    {id: 2, nome_produto: 'Controle PS4', valor: 215.90, destinatario: 'Luis Gustavo Bruneri'},
//
//]

//server.get('/produto', function(request, response) {
//    response.json(produtos);
//})

//server.post('/produto', function(request, response)
//    {
//        //const nome_produto = request.body.nome_produto;
//        //const valor = request.body.valor;
//        //const destinatario = request.body.destinatario;
//        const {id, nome_produto, valor, destinatario} = request.body;
//        produtos.push({id: id, nome_produto: nome_produto, valor: valor, destinatario: destinatario});
//        response.status(204).send();
//    }
//)

//server.put('/produto/:id', function(request, response)
//   {
//        //const id = request.params.id;
//        const {id, nome_produto, valor, destinatario} = request.body;
//
//        for(let i = 0; i < produtos.length; i++)
//        {
//            if(produtos[i].id == id)
//            {
//                produtos[i].nome_produto = nome_produto;
//                produtos[i].valor = valor;
//                produtos[i].destinatario = destinatario;
//                break;
//            }
//        }
//        return response.status(204).send();
//    })
    


//server.delete('/produto/:id', function(request, response)
//    {
//        const id = request.params.id;
//        for(let i = 0; i < produtos.length; i++)
//       {
//            if(produtos[i].id == id)
//            {
//                produtos.splice(i, 1);
//            }
//        }
//        return response.status(204).send();
//    })

server.get('/presente', async function(request, response) {
    const result = await pool.query('SELECT * FROM presente');
    return response.json(result.rows);
})

server.get('/presente/:id', async function(request, response){
    const id = request.params.id;
    const sql = `SELECT * FROM presente WHERE id = $1`;
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})

server.get('/presente/search', async function(request, response){
    const nome_produto = request.query.nome_produto;
    const sql = `SELECT * FROM presente WHERE nome_produto ILIKE $1`;
    const result = await pool.query(sql, ["%" + nome_produto + "%"]);
    return response.json(result.rows);
})

server.post('/presente', async function(request, response) {
    const {nome_produto, valor, destinatario} = request.body;
    const sql = `INSERT INTO presente (nome_produto, valor, destinatario) VALUES ($1, $2, $3)`;
    await pool.query(sql, [nome_produto, valor, destinatario]);
    return response.status(204).send();
})

server.delete('/presente/:id', async function(request, response){
    const id = request.params.id;
    const sql = `DELETE FROM presente WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.put('/presente/:id', async function(request, response){
    const id = request.params.id;
    const {nome_produto, valor, destinatario} = request.body;
    const sql = 'UPDATE presente SET nome_produto = $1, valor = $2, destinatario = $3 WHERE id = $4';
    await pool.query(sql, [nome_produto, valor, destinatario, id]);
    return response.status(204).send();
})


server.listen(process.env.PORT || 3000);