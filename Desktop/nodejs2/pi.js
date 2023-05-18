const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const adminRouter = require('./routers/admin')
const shopRouter = require('./routers/user')

const app = express()


const { menuItems, products, contacts, appNames, productTypes } = require('./data')

const sessionOptions = {
  secret: 'keyboard cat',
  resave: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}

app.use(session(sessionOptions))

console.log('Express server ishga tushmoqda...')

app.set('view engine', 'ejs')
app.set('views', 'views')

const htmlString = '<!DOCTYPE html><html><body><h1>Salom</h1></body></html>'

app.use(express.static('publick'))
app.use(bodyParser.urlencoded({ extended: false }))

let isAdmin = false

// middleware controller
app.get('/*', (req, res, next) => {
  if (req.path.match(/^\/admin\//)) {
    console.log('Admin sahifasi')
    isAdmin = true
  } else {
    console.log('Mehmon sahifasi')
    isAdmin = false
  }
  next()
})

app.use("/admin", adminRouter.router)
app.use(shopRouter)

app.listen(3000)
