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
// Sucess Route
app.get('/success', (req, res) => {
  res.render('success');
})

app.post('/charge', (req, res) => {
  const amount = 2500;
  //get form data with Body Parser
  console.log(req.body);
  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount,
    description: 'Stripe Payment Gate',
    currency: 'GBP',
    customer: customer.id
  }))
  .then(charge => res.render('success'));
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});
