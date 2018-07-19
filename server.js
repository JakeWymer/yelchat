const app = require('express')();
const http = require('http').Server(app);
const mongoose = require('mongoose');
require('dotenv').config();
require('./models/Message');
mongoose.connect(process.env.MONGO_URI);

const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

require('./routes/messageRoutes')(app, http);
require('./routes/yelpRoutes')(app);

const server = http.listen(port);
