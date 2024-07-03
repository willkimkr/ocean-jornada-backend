const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.get('/oi', function (req, res) {
  res.send('ola mundo!')
})

//lista de personagens
const lista = ["rick sanches", "morty smith", "summer smith"]

// read all- [get] /item
app.get('/item', function (req, res) {
  res.send(lista)
})


// sinalizar para o express que vamos usar json no boby
app.use(express.json())

//create - [post] /item
app.post('/item', function (req, res){
  // obtemos o nome enviado no request boby
  const item = req.body.nome
 
  // inserimos o item final na lista
  lista.push(item)

  //enviamos uma menssagem de sucess0!
  res.send('item criado com sucesso!')

})

//

app.listen(3000)
