let express = require('express')
let app = express()
let path = require('path')


app.use('/public', express.static(path.join(__dirname, '/public')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(1337, () => {
  console.log('mans out here listening')
})