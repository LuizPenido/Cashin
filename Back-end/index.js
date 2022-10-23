const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

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
