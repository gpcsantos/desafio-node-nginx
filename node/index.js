const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql2');

const insertName = async (nome) => {
    const connection = mysql.createConnection(config)
    const sql = `INSERT INTO people(name) values('${nome}')`
    connection.query(sql)
    connection.end()
}

const searchNames = async (res) => {
    let page = '<h1>Full Cycle Rocks!</h1>\n<ul>'
    const connection = mysql.createConnection(config)
    const sql = `SELECT * FROM people`
    connection.query(
        sql,
        (error, results, fields) => {
            if (error) {
                console.log(error);
                mysql.end();
                res.send(`<h1>${error}</h1>`);
            }
            if (results.length > 0) {
                console.log(results);
                results.forEach(element => {
                    page += `\n<li>nameid [${element['id']}]: ${element['name']}</li>`
                });
                page += `\n</ul>`
                res.send(page)
            } else {
                res.send(page)
            }
        }
    )
    connection.end()
}

app.use(async(req, res, next)=>{
    await insertName('Glauco P C Santos');
    next();
})

app.get('/', async (req, res) => {
    await searchNames(res);
})

app.listen(port, ()=>{
    console.log('Rodando na porta, ' + port);
})