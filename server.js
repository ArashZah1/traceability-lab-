const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());



const port = process.env.port || 4000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})