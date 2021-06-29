const express = require('express');
const app = express();
const path = require('path');
const { allowedNodeEnvironmentFlags } = require('process');

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: '631c284bd8ab471d83a28722061657a3',
  captureUncaught: true,
  captureUnhandledRejections: true
});

app.use(express.json());

let vacationSpots = [] //added spots here

app.get('/', function(req, res) {
    rollbar.log('Hello There')

    rollbar.error('User tried to acess incorrect path')

    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.post('/api/vacationspots', function(req, res) {
  let {name} = req.body
  name = name.trim()
  const index = vacationSpots.findIndex(function(vName) { //finds if spot exists
    return vName === name
  })
  console.log(index)

  try {
    if (index === -1 && name !== '') {
      vacationSpots.push(name)
      rollbar.log('Vacation spot added successfully', {author:'riley', type:'manual'})
      res.status(200).send(vacationSpots)
    } else if (name === '') {
      rollbar.error('no name given')
      res.status(400).send('must provide location')
    } else {
      rollbar.error('location exists')
      res.status(400).send('location already exists')
    }
  } catch(err) {
    rollbar.error(err)
  }
})

const port = process.env.PORT || 5000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
