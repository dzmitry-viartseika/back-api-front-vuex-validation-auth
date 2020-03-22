const joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());
var cors = require('cors');
var router = express.Router()
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/wertey', function (req, res) {
    res.send('wertey')
})

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
];


const databaseUsers = [
    {
        id: 1,
        email: 'test@gmail.com',
        password: '123'
    }
];

app.post('/api/auth/login', (req, res) => {
    // const { error } = validateForm(req.body);
    console.log(req.body)
    //
    // if (error) {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    // if (error) {
    //     res.status(400).send(error.details[0].message);
    //     return;
    // }
    const user = {
        id: databaseUsers.length + 1,
        email: req.body.email,
        password: req.body.password,
    };
    databaseUsers.push(user);
    res.send(user);
});

app.post('/users/login', (req, res) => {
    console.log(databaseUsers)
    const user = databaseUsers.find((user) => {
        if(user.email === req.body.email && user.password === req.body.password) {
            console.log('same')
            res.redirect('/wertey');
            return user;
        } else {
            console.log('different')
            return res.status(400).send('Can not find user')
        }
    });

    if(user === null) {
        return res.status(400).send('Can not find user')
    }
    return user
})

app.get('/api/database', (req, res) => {
    res.send(databaseUsers);
});


// app.get('/', (req,res) => {
//     // request and response
//     res.send('Hello Dmitry');
// });

// app.get('/api/courses', (req, res) => {
//     res.send(courses);
// });



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

// app.delete('/api/courses/:id', (req,res) => {
//     const course =  courses.find((c) => {
//         return c.id === parseInt(req.params.id)
//     });
//     if (!course) res.status(404).send('the course with the given ID was not find');
//
//     const index = courses.indexOf(course);
//     courses.splice(index, 1);
//     res.send(course)
// });
//
// app.put('/api/courses/:id', (req,res) => {
//     const course =  courses.find((c) => {
//         return c.id === parseInt(req.params.id)
//     })
//     if (!course) res.status(404).send('the course with the given ID was not find');
//
//     const { error } = validateCourse(req.body);
//
//     if (error) {
//         res.status(400).send(error.details[0].message);
//         return;
//     }
//
//     course.name = req.body.name;
//     res.send(course);
// })

function validateCourse(course) {
    const schema = {
        name: joi.string().min(3).required(),
    };
    return  joi.validate(course, schema);
}

// function validateForm(user) {
//     const schema = {
//         email: joi.string().min(2).required(),
//         password: joi.string().min(6).required(),
//     };
//     return  joi.validate(user, schema);
// }