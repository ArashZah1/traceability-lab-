const express = require('express');
const app = express();
const path = require('path')

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '37852bc27b674c45b9d53b77a99a1960',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

app.use(express.json())


app.get('/', function(req, res) {
    rollbar.log('Hello World')

    rollbar.error('User tried to access incorrect path')

    res.sendFile(path.join(__dirname, '/public/index.html')) //dirname current directory working in
})



const port = process.env.PORT || 4545; //process gets the port of heroku

app.listen(port, function() {
    console.log(`Server jammin on ${port}`)
} )