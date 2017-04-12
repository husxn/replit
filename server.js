let express = require('express')
let app = express()
let path = require('path')


app.use('/src', express.static(path.join(__dirname, '/src')))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.listen(1337, () => {
  console.log('listening on port 1337')
})