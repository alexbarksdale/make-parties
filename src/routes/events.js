const express = require('express');

const models = require('../../db/models');

const router = express.Router();

// GET - Routes
router.get('/', (_, res) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then((events) => {
        res.render('events-index', { events: events });
    });
});

router.get('/events/new', (_, res) => {
    res.render('events-new', {});
});

router.get('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id, { include: [{ model: models.Rsvp }] })
        .then((event) => {
            res.render('events-show', { event: event });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

router.get('/events/:id/edit', (req, res) => {
    models.Event.findByPk(req.params.id)
        .then((event) => {
            res.render('events-edit', { event: event });
        })
        .catch((err) => {
            console.log(err.message);
        });
});

router.get('/events/:eventId/rsvps/new', (req, res) => {
    models.Event.findByPk(req.params.eventId).then((event) => {
        res.render('rsvps-new', { event: event });
    });
});

// POST - Routes
router.post('/events', (req, res) => {
    models.Event.create(req.body)
        .then((event) => {
            // Redirect to events/:id
            res.redirect(`/events/${event.id}`);
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post('/events/:eventId/rsvps', (req, res) => {
    req.body.EventId = req.params.eventId;
    models.Rsvp.create(req.body)
        .then((rsvp) => {
            res.redirect(`/events/${req.params.eventId}`);
        })
        .catch((err) => {
            console.log(err);
        });
});

// PUT - Routes
router.put('/events/:id', (req, res) => {
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

// DELETE - Routes
router.delete('/events/:id', (req, res) => {
    models.Event.findByPk(req.params.id)
        .then((event) => {
            event.destroy();
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
});

router.delete('/events/:eventId/rsvps/:id', (req, res) => {
    models.Rsvp.findByPk(req.params.id)
        .then((rsvp) => {
            rsvp.destroy();
            res.redirect(`/events/${req.params.eventId}`);
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
