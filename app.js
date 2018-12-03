const express = require('express');
const stripe = require('stripe')('sk_test_Y0JINNYwdOaER8oel35Y4SjV');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

//Initialise application
const app = express();

//Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Set static folder
app.use(express.static(`${__dirname}/public`));

//Index Route
app.get('/', (req, res) => {
  res.render('index');
})

//Secondary Test Route
app.get('/testroute', (req, res) => {
  res.render('testroute');
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
