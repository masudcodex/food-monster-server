const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 5000;
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
    res.send('Food Monster Server is Running');
})

app.listen(PORT, (req, res)=>{
    console.log('Food Monster is running at port', PORT);
})