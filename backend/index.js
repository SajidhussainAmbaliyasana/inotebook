const express = require('express')
const app = express();
const port = 5000;
const cors = require('cors')
require('./db');

app.use(express.json());
 
app.use(cors());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port,()=>{
    console.log(`The server is Running on http://localhost:${port}`);
})