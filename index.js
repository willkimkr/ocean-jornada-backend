const express = require('express')
const app = express()

app.get('/oi', function (req, res) {
  res.send('ola mundo')
})

app.listen(3000)
