import express, { Response } from 'express';
import exphbs from 'express-handlebars';

// Initialize express
const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (_, res: Response) => {
    res.render('home', { msg: 'Handlebars are Cool!' });
});

// Choose a port to listen on
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App listening on port 3000!');
});
