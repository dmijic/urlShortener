const express = require('express');
const connectDB = require('./config/db');
const handlebars = require('handlebars');
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser');

const app = express();

// Connect to database
connectDB();

app.use(express.json({ extented: false}));

// Handlebars middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

// Index route
app.get('/', (req, res) => {
    res.render('index');
});

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));