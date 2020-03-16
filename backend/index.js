const express = require('express');
const app = express();

app.get('/', (req,res) => {
    // request and response
    res.send('Hello wertey');
});

app.get('/api/courses', (req, res) => {
    res.send([1,2,3,4,5]);
});

app.listen(3001, () => {
    console.log('listening on port 3001');
});