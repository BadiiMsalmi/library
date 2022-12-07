const express = require('express')
const app = express()
const path = require('path')
const RouterHome = require('./routers/homeRoute')
const RouterBook = require('./routers/bookRoute')
const RouterAuth = require('./routers/authRoute')
const RouterMybooks = require('./routers/myBooksRoute')
const RouterAddBook = require('./routers/addBookRoute')
const RouterContact = require('./routers/contactRoute')
const RouterAbout = require('./routers/aboutRoute')
const session = require('express-session')
const mongodbstore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')
const { render } = require('ejs')


app.use(express.static(path.join(__dirname, 'assets')))
app.set('view engine', 'ejs')
app.set('views', 'views')

var Store = new mongodbstore({
    uri: "mongodb://localhost:27017/library",
    collection: "mySessions"
})

app.use(flash())

app.use(session({
    secret: "this is a secret",
    cookie: {
        maxAge: 864000000
    },
    store: Store,
    resave: true,
    saveUninitialized: true
}))

app.use('/', RouterHome)
app.use('/books', RouterBook)
app.use('/', RouterAuth)
app.use('/mybooks', RouterMybooks)
app.use('/addbook', RouterAddBook)
app.use('/contact', RouterContact)
app.use('/about', RouterAbout)


app.get('/dashboard',(req,res,next)=>{
    res.render('dashboard')
})

app.get('/usersao',(req,res,next)=>{
    res.render('usersAO')
})

app.listen(3000, () => console.log('server running on port 3000'))