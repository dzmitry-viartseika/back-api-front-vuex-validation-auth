const joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

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
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.delete('/api/courses/:id', (req,res) => {
    const course =  courses.find((c) => {
        return c.id === parseInt(req.params.id)
    });
    if (!course) res.status(404).send('the course with the given ID was not find');

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
});

app.put('/api/courses/:id', (req,res) => {
    const course =  courses.find((c) => {
        return c.id === parseInt(req.params.id)
    })
    if (!course) res.status(404).send('the course with the given ID was not find');

    const { error } = validateCourse(req.body);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course) {
    const schema = {
        name: joi.string().min(3).required(),
    };
    return  joi.validate(course, schema);
}