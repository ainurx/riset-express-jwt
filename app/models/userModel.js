const conn = require('../../config/database')

const User = function(user){
  this.username = user.username
  this.password = user.password
}

const table = 'user'

User.findAll = (result)=>{
  conn.query(`SELECT * from ${table}`, (err, res)=>{
    if(err) result(null, err)
    result(null, res)
  })
}

User.findById = (id, result)=>{
  conn.query(`SELECT * FROM ${table} WHERE id= ${id}`, (err, res)=>{
    if(err) result(null, err)
    result(null, res)
  })
}

User.create = (newUser, result)=>{
  conn.query(`INSERT INTO ${table} SET ?`, newUser, (err, res)=>{
    if(err) result(null, err)
    result(null, res)
  })
}

User.update = (id, newData, result)=>{
  conn.query(`UPDATE ${table} SET username= ?, password= ? WHERE id = ?`, [newData.username,
  newData.password, id], (err, res)=>{
    if(err) result(null, err)
    result(null, res)
  })
}

User.delete = (id, result)=>{
  conn.query(`DELETE ${table} WHERE id = ${id}`, (err, res)=>{
    if(err) result(null, err)
    result(null, res)
  })
}

User.login = (data, result)=>{
  conn.query(`SELECT * FROM ${table} WHERE EXISTS (SELECT * FROM ${table})`, (err, res)=>{
    if(err) result(null, err)
    result(null, res)
  })
}


module.exports = User