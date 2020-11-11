const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'riset-jwt'
})

conn.connect(err=>{
  if(err) throw(err)
  console.log('DB aman')
})

module.exports = conn