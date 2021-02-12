const express = require('express');
const path = require('path');
const routes = require('./routes')
const app = express();
const port = process.env.PORT || 4411;
const router = express.Router();
const bodyParser = require('body-parser')
const cors = require('cors');

app.set('view engine', 'html');

app.use(cors());
app.use([bodyParser.json(), bodyParser.urlencoded({extended: true})]);
app.use(express.static(path.join(__dirname, '../app')));
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});
app.use('/api', routes);

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'app', 'index.html'));
});

app.listen(port, (err) => {
  err
    ? console.log('Cannot connect ... ', err)
    : console.log(`Connected ! Server is on port ${port}`);
});