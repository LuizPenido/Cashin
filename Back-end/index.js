const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host     : 'localhost',
  port     : 3306,
  user     : 'root',
  password : 'senhaprojeto123',
  database : 'cashin'
});

connection.connect((err) => {
  if(err) return console.log(err);
  console.log('Banco de dados conectado com sucesso! 🏦🎲');
})

const bodyParser = require('body-parser')
app.use(bodyParser.json())

var cors = require('cors')
app.use(cors())

//Rotas de login
app.post('/login', (req, res) => {
    const query = `SELECT * FROM usuarios WHERE nome="${req.body['username']}" AND senha="${req.body['password']}"`;
    connection.query(query, (error, results, fields) => {
        if(error){
            res.json(error);
        } else {
            if(results.length == 0){
                res.status(403).json({
                    erro: "Usuário ou senha inválidos"
                });
            }else{
                const userData = {
                    id: results[0].id,
                    nome: results[0].nome,
                    nivelDeAcesso: results[0].nivelDeAcesso
                }
                jwt.sign({userData}, 'chaveSecreta', 
                (err, token) => {
                    res.json({
                        token,
                    });
                })
            }
        }
    });
})

//Rotas de produtos
app.get('/produtos', validarToken, (req, res) => {
    const query = 'SELECT * FROM produtos';
    connection.query(query, (error, results, fields) => {
        if(error) res.json(error);
        else {
            res.json(results)
        }
    });
})

app.get('/produtos/:id', validarToken, (req, res) => {
    const query = `SELECT * FROM produtos WHERE id=${req.params.id}`

    connection.query(query, (error, results, fields) => {
        if(error) res.json(error);
        else res.json(results[0]);
    });
})

app.delete('/produtos/:id', validarToken, validarAdmin, (req, res) => {
    let produto;

    id = req.params.id;

    const queryBusca = `SELECT * FROM produtos WHERE id=${id}`;
    const queryDelecao = `DELETE FROM produtos WHERE id=${id}`;

    connection.query(queryBusca, (error, results, fileds) => {
        if(error) res.json(error);
        produto = results[0];
        connection.query(queryDelecao, (error, results, fields) => {
            if(error) res.json(error);
    
            res.status(produto==undefined ? 400:200).json({
                message: produto==undefined ? "Produto inexistente":"Produto deletado com sucesso",
                produto: produto
            });
        });
    });
})

app.post('/produtos', validarToken, validarAdmin, (req, res) => {
    
    const produto = {
        nome: req.body['name'],
        preco: req.body['price'],
        quantidade: req.body['quantity']
    }

    const query = `INSERT INTO produtos (nome, preco, quantidade) VALUES ("${produto.nome}", "${produto.preco}", "${produto.quantidade}")`
    connection.query(query, (error, results, fields) => {
        if(error) res.json(error)
        else{
            const queryBusca = `SELECT * FROM produtos WHERE id=${results.insertId}`
            connection.query(queryBusca, (error, results, fields) => {
                if(error) res.json(error)
                else
                    res.json(results[0])
            });
        }
    });

} )

app.put('/produtos', validarToken, (req, res) => {
    const queryBuscar = 'SELECT * FROM produtos';
    connection.query(queryBuscar, (error, results, fields) => {
        if(error) res.json(error);
        else {
            compraValida = true
            valorTotal = 0
            produtos = []
            req.body.forEach(produtoCompra => {
                const produtoBancoDeDados = results.find((produto) => produto.id == produtoCompra.id)
                valorTotal += produtoCompra.quantidade * produtoBancoDeDados.preco
                if(produtoBancoDeDados.quantidade < produtoCompra.quantidade) {
                    compraValida = false;
                }else{
                    produtos.push({
                        id: produtoBancoDeDados.id,
                        quantidade: produtoBancoDeDados.quantidade - produtoCompra.quantidade
                    })
                }
            });

            if(compraValida){
                produtos.forEach(produto => {
                    const queryEdicao = `UPDATE produtos SET quantidade=${produto.quantidade} WHERE id=${produto.id}`
                    connection.query(queryEdicao, (error, results, fields) => {});
                });
                res.json({
                    valorTotal: valorTotal
                });
            }else{
                res.json({
                    valorTotal: -1
                })
            }
        }
    }) 
})

//Rotas de cadastro de usuários
app.post('/cadastro-usuario', validarToken, validarAdmin, (req, res) => {
    const usuario = {
        nivelDeAcesso: req.body['nivelDeAcesso'],
        nome: req.body['nome'],
        senha: req.body['senha']
    }

    const query = `INSERT INTO usuarios (nivelDeAcesso, nome, senha) VALUES ("${usuario.nivelDeAcesso}", "${usuario.nome}", "${usuario.senha}")`
    connection.query(query, (error, results, fields) => {
        if(error) res.json(error)
        const queryBusca = `SELECT * FROM usuarios WHERE id=${results.insertId}`
        connection.query(queryBusca, (error, results, fields) => {
            if(error) res.json(error)
            else
                res.json(results[0])
        });
    });
})

//Rotas para validar nível de acesso
app.get('/nivel-de-acesso-usuario', validarToken, (req, res) => {
    jwt.verify(req.token, 'chaveSecreta', (err, data) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                nivelPermissao: data.userData.nivelDeAcesso
            })
        }
    })
})


//Inicializando o servidor...
app.listen(3000, () => {
    console.log('Servidor online na porta 3000! 🚀')
})

//-----------------------MIDDLEWARES-----------------------
function validarToken(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (bearerHeader !== undefined) {
        const bearer = bearerHeader.split(' ')
    
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(403)
        return;
    }
}

function validarAdmin(req, res, next) {
    jwt.verify(req.token, 'chaveSecreta', (err, data) => {
        if (err) {
            res.sendStatus(403)
            return;
        } else {
            if(data.userData.nivelDeAcesso == 'admin') {
                next();
            }else{
                res.sendStatus(403);
                return;
            }
        }
    })
}
