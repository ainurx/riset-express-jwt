const express = require('express')
const app = express()
const session = require('express-session')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

app.set('secret', 'ini rahasia')

exports.findAll = (req, res)=>{
  User.findAll((err, user)=>{
    if(err) res.send(err)
    res.send(user)
  })
}

exports.findById = (req, res)=>{
  User.findById(req.params.id, (err, user)=>{
    if(err) res.send(err)
    res.send(user)
  })
}

exports.create = (req, res)=>{
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.send('data harus di isi')
  }
  else{
    const newUser = req.body
    User.create(newUser, (err, user)=>{
      if(err) res.send(err)
      res.send(user.username)
    })
  }
}

exports.auth = (req, res)=>{
  if(req.body.constructor === Object && Object.keys(req.body).length === 0){
    res.json({
      error: false,
      message: 'isi data'
    })
  }
  else{
    const data = req.body
    User.login(data, (err, user)=>{
      if(err){
        res.send(err)
      }
      else if(user[0].username == data.username){
        if(user[0].password == data.password){
          const token = jwt.sign({user}, app.get('secret'), {
            expiresIn: "24h"
          })
          const obj = {
            username: data.username,
            password: data.password,
            token: token
          }
          req.session['user'] = obj
          res.json({
            message: req.session.user.token
          })
        }
        else{
          res.send('Oops...password salah')
        }
      }
      else if(user[0].password != data.password){
        res.send('Oops...email salah')
      }
      else{
        res.send('did u stranger ?')
      }
    })
  }
}

