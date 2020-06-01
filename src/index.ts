import express, { Response } from 'express';
import exphbs from 'express-handlebars';

// Initialize express
const app = express();

// View engine setup
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const events = [
    {
        title: 'I am your first event',
        desc: 'A great event that is super fun to look at and good',
        imgUrl:
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn',
    },
    {
        title: 'I am your second event',
        desc: 'A great event that is super fun to look at and good',
        imgUrl:
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn',
    },
    {
        title: 'I am your third event',
        desc: 'A great event that is super fun to look at and good',
        imgUrl:
            'https://img.purch.com/w/660/aHR0cDovL3d3dy5saXZlc2NpZW5jZS5jb20vaW1hZ2VzL2kvMDAwLzA4OC85MTEvb3JpZ2luYWwvZ29sZGVuLXJldHJpZXZlci1wdXBweS5qcGVn',
    },
];

app.get('/', (_, res: Response) => {
    res.render('events-index', { events: events });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App listening on port: ${PORT}`);
});
