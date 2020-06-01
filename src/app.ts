import express, { Request, Response } from 'express';
import exphbs from 'express-handlebars';
import { urlencoded } from 'body-parser';

const models = require('../db/models');

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

app.post('/events', (req: Request, res: Response) => {
    models.Event.create(req.body)
        .then(() => {
            res.redirect('/');
        })
        .catch((err: any) => {
            console.log(err);
        });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
