const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const models = require('../db/models');

// Initialize express
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (_, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then((events) => {
        res.render('events-index', { events: events });
    });
});

app.get('/events/new', (_, res) => {
    res.render('events-new', {});
});

app.get('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id)
        .then((event) => {
            res.render('events-show', { event: event });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

app.get('/events/:id/edit', (req, res) => {
    models.Event.findByPk(req.params.id)
        .then((event) => {
            res.render('events-edit', { event: event });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

app.post('/events', (req, res) => {
    models.Event.create(req.body)
        .then((event) => {
            // Redirect to events/:id
            res.redirect(`/events/${event.id}`);
        })
        .catch((err) => {
            console.log(err);
        });
});

app.put('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id)
        .then((event) => {
            event
                .update(req.body)
                .then(() => {
                    res.redirect(`/events/${req.params.id}`);
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
