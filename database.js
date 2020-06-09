// yarn add pg

const Pool = require('pg').Pool;

const pool = new Pool ({
    user:'hpyppuxhoojuzk',
    password:'7e1620c91a2857934dc89e83ce634074cbb895bf876493e1c2bb3e21cc7cae75',
    host:'ec2-3-222-150-253.compute-1.amazonaws.com',
    database:'d2oeeq76dd6var',
    port: 5432,
    ssl: {rejectUnauthorized: false}
});

//const sql = `
//    CREATE TABLE IF NOT EXISTS presente
//    (
//        ID serial primary key,
//        nome_produto varchar (200) not null,
//        valor float not null,
//        destinatario varchar (100) not null
//    )
//`;

//pool.query(sql, function(error, result){
//    if (error)
//        throw error
//    console.log('Tabela criada com sucesso!');
//})


//INSERT
const sql_insert = `
        INSERT INTO presente (nome_produto, valor, destinatario) 
            VALUES 
                ('Quadro homem de ferro', 90, 'Henrique Dezani')
`;

pool.query(sql_insert, function(error, result){
    if (error)
        throw error;
    
    console.log(result.rowCount);  
})


//SELECT
//const sql_select = `SELECT * FROM presente`;

//pool.query(sql_select, function(error, result){
//    if (error)
//        throw error;
//   
//    console.log(result.rows);  
//})