const express = require('express')
const app = express()
const bodyParser = require('body-parser') 
const cors = require('cors')
const session = require('express-session')
const MySqlStore = require('express-mysql-session')(session)
const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())

const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'riset-jwt',
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data'
    }
  }
}

const sessionStore = new MySqlStore(options)
app.use(session({
  secret: 'some secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: true,
  cookie:{
    maxAge: 100 * 60 * 60 * 24
  }
}))

app.get('/', (req, res)=>{
  if(req.session.user){
    res.redirect('/api/all-user')
  }
  else{
    res.send('<h1>Hello world</h1>')
  }
})


const userRoute = require('./app/routes/userRoute')
app.use('/api', userRoute)

app.listen(PORT, ()=>{
  console.log('server is running') 
})

