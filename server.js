const express = require('express');
const app = express();
const path = require('path');

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '631c284bd8ab471d83a28722061657a3',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(express.json());

app.get('/', function(req, res) {
    rollbar.log('Hello There')

    rollbar.error('User tried to acess incorrect path')

    res.sendFile(path.join(__dirname, '/public/index.html'))
})

const port = process.env.PORT || 4000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})