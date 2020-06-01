import express, { Request, Response } from 'express';
import exphbs from 'express-handlebars';
import { urlencoded } from 'body-parser';

// @ts-ignore
import * as models from '../db/models';

// Initialize express
const app = express();

// Middlewares
app.use(urlencoded({ extended: true }));

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (_, res: Response) => {
    models.Event.findAll({ order: [['createdAt', 'DESC']] }).then((events: any) => {
        res.render('events-index', { events: events });
    });
});

app.get('/events/new', (_, res: Response) => {
    res.render('events-new', {});
});

app.get('/events/:id', (req: Request, res: Response) => {
    models.Event.findByPk(req.params.id)
        .then((event: any) => {
            res.render('events-show', { event: event });
        })
        .catch((err: any) => {
            console.log(err.message);
        });
});

app.post('/events', (req: Request, res: Response) => {
    models.Event.create(req.body)
        .then((event: any) => {
            // Redirect to events/:id
            res.redirect(`/events/${event.id}`);
        })
        .catch((err: any) => {
            console.log(err);
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
