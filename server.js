const http = require('http'); 
const express = require('express');
const port = process.env.PORT;

const app = express();

app.listen(port, () => {
    console.log("listening to port", port);
})

