const express = require('express');

const app = express();

app.get('/', (req,res) => res.send('app is listening right now'))

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('listening'))