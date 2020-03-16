const express = require('express');
const app = express();

app.get('/', (req,res) => {
    // request and response
    res.send('Hello wertey');
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});