const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

const dbUrl = 'mongodb+srv://admin:wtgkTqCte1mYSjmj@cluster0.vmmbj1m.mongodb.net'
const dbName = 'ocean-jornada-backend'

const client = new MongoClient(dbUrl)

async function main() {
  console.log('conectando ao banco de dados...')
  await client.connect()
  console.log('banco de dados conectado com sucesso!')

  app.get('/', function (req, res) {
    res.send('Hello World')
  })

  app.get('/oi', function (req, res) {
    res.send('ola mundo!')
  })

  //lista de personagens
  const lista = ["rick sanches", "morty smith", "summer smith"]

  const db = client.db(dbName)
  const collection = db.collection('item')

  // read all- [get] /item
  app.get('/item', async function (req, res) {
    //obter todos os documentos da collection
    const documentos = await collection.find().toArray()

    //pegamos os documentos e enviamos como resposta HTTP
    res.send(documentos)
  })

  // sinalizar para o express que vamos usar json no boby
  app.use(express.json())

  //create - [post] /item
  app.post('/item', function (req, res) {
    // obtemos o nome enviado no request boby
    const item = req.body.nome

    // inserimos o item final na lista
    lista.push(item)

    //enviamos uma menssagem de sucess0!
    res.send('item criado com sucesso!')

  })

  //read by id - [get] /item/:id
  app.get('/item/:id', function (req, res) {
    // acessamos o parametro de rota ID
    const id = req.params.id
    //acessamos o item na lista pelo indice corrigido (id - 1)
    const item = lista[id - 1]
    //enviamos o item obtido como resposta
    res.send(item)
  })

  //update - [put]/item/:id
  app.put('/item/:id', function (req, res) {
    //acessamos o id do parametro de rota
    const id = req.params.id
    //acessamos o body da requisicao com os dados
    //a serem atualizados
    const novoItem = req.body.nome
    //atualizamos esse novoItem
    lista[id - 1] = novoItem
    //enviamos uma messagem 
    res.send('item atualizado com sucesso: ' + id)
  })


  app.listen(3000)
}


main()