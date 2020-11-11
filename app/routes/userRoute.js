const express = require('express')
const app = express()
const router = express.Router()
const jwt = require('jsonwebtoken')

const userController = require('../controllers/userController')
app.set('secret', 'ini rahasia')

router.get('/all-user', userController.findAll)
router.post('/auth', userController.auth)

router.use((req, res, next)=>{
  const token = req.body.token || req.query.token || req.headers['authorization'] || req.session
  if(token){
    jwt.verify(token, app.get('secret'), (err, decoded)=>{
      if(err)
        res.json({
          error: true,
          message: 'token salah'
        })
      else{
        req.decoded= decoded
        next()
      }
    })
  }
  else{
    res.send({
      error: true,
      message: 'token tidak ada'
    })
  }
})

router.post('/add-user', userController.create)

router.get('/who-login', (req, res)=>{
  res.json(req.decoded._doc)
})
router.get('/user/:id', userController.findById)

module.exports = router
