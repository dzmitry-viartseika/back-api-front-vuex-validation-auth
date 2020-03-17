const express = require('express');
const app = express();

const courses = [
    {
        id: 1,
        name: 'course1'
    },
    {
        id: 2,
        name: 'course2'
    },    {
        id: 3,
        name: 'course3'
    },

]

app.get('/', (req,res) => {
    // request and response
    res.send('Hello Dmitry');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course =  courses.find((c) => {
      return c.id === parseInt(req.params.id)
    })
    if (!course) res.status(404).send('the course with the given ID was not find');
    res.send(course);
    // res.send(req.params.id);
    // two properties
    // '/api/courses/:id/:year
    // res.send(req.params)
    // '/api/courses/:id/:year?sortBy=name
    //res.send(req.query)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});