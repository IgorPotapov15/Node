const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

let corsOptions = {
  origin: 'http://localhost:8081'
}

const PORT = process.env.PORT || 8080;

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const db = require('./models')
const Role = db.role

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db')
  initial()
})

function initial() {
  Role.create({
    id: 1,
    name: 'user'
  })
 
  Role.create({
    id: 2,
    name: 'moderator'
  })
 
  Role.create({
    id: 3,
    name: 'admin'
  })
}

app.get('/', function(req, res) {
  res.json({ message: "Server is up"})
})

require('./routes/auth.routes')(app)
require('./routes/user.routes')(app)

app.listen(PORT, () => {
  console.log(`${PORT}`)
})