const express = require('express');1
const bodyParser = require('body-parser');1
const ejs = require('ejs');1
const path = require('path');
const { templates } = require('./database/connection');
const base64Img = require('base64-img');
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cookie = require('cookie-parser');
const cors = require('cors');
const mildMiddleware = require('./database/mild-middleware');

env.config();

const app = express();

app.set('view engine', ejs);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookie('aaaaa'));
app.use(cors({
    origin: '*'
}));
app.use(session({
    secret: 'aaaa',
    saveUninitialized: false,
    resave: true
}))

app.get('/', (req, res) => {
    if (req.session.token) {
        let checkToken = jwt.verify(req.session.token, 'abcdefghijklmnopqrstuvwxyz');
        if (checkToken.user._id) {
            let { user } = checkToken;
            // res.render('homepage.ejs', { user })
            // res.render('h.ejs', { user })
            res.render('h.ejs', { user })
            // res.render('he.ejs', { user })
        } else {
            res.render('h.ejs')
            // res.render('e.ejs')
            // res.render('he.ejs')
        }
    } else {
        res.render('h.ejs')
        // res.render('e.ejs')
        // res.render('he.ejs');
    }
})
app.get('/templates', (req, res) => {
    templates.find({}).select('name tags _id location category')
        .then(data => {
            let randomNumber = Math.trunc(Math.random() * (data.length - 4)) + 1;
            res.render('temp.ejs', { data, randomNumber })
        })
        .catch(err => res.send(err))
})

app.get('/createTemplates', (req, res) => {
    res.render('test.ejs');
})

app.get('/edit/:id', mildMiddleware, (req, res) => {
    if (res.body) {
        templates.findById(req.params.id)
            // .then(data => res.render('testedit.ejs', { canvas: data.svgCode, user: res.body }))
            .then(data => res.render('testedit.ejs', { canvas: data.jsonCode, user: res.body }))
            .catch(err => res.send(err))
    } else {
        templates.findById(req.params.id)
            // .then(data => res.render('testedit.ejs', { canvas: data.svgCode }))
            .then(data => res.render('testedit.ejs', { canvas: data.jsonCode }))
            .catch(err => res.send(err))
    }
})
app.get('/scratch', mildMiddleware, (req, res) => {
    if (res.body) {
        res.render('scratch.ejs', { user: res.body })
    } else {
        res.render('scratch.ejs')
    }
})
app.get('/templates/:tagName', mildMiddleware, async (req, res) => {
    let searchParam = req.params.tagName;
    try {
        let allList = await templates.find({});
        let filteredList = allList.filter(ratio => {
            return ratio.tags.includes(searchParam);
        })
        if (res.body) {
            res.render('search.ejs', { filteredList, searchParam, user: res.body });
        } else {
            res.render('search.ejs', { filteredList, searchParam })
        }
    } catch (err) {
        res.send(err)
    }
})

app.post('/saveTemplates', (req, res) => {
    const url = './public/templates/thumbnails/' + Date.now();
    base64Img.img(req.body.message, '', url, function (err, filepath) { });
    try {
        let template = new templates();
        template.name = req.body.templateName;
        // template.svgCode = req.body.svgFile;
        template.jsonCode = req.body.svgFile;
        template.description = req.body.description;
        template.location = url + '.png';
        template.tags = req.body.tags;
        template.category = req.body.category;
        template.save();

        // users.populate({

        // })
        res.send('Template Saved');
    } catch (err) {
        res.send(err);
    }
})


const port = process.env.PORT || 9000;
app.listen(port, () => console.log('server listening on port', port));