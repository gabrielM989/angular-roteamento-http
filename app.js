const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, 'dist', 'aula34-sem-roteamento')))

app.get('/', (request, response) => { /* o primeiro é a requisição e o segundo é a resposta do servidor */
    return response.sendFile(path.join(__dirname, 'dist', 'aula34-sem-roteamento', 'index.html'))
})

app.listen(5000) /* a porta que ele irá rodar */