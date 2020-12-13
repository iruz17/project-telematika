const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const models = require('../app/models');
models.mongoose
  .connect(models.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to the MongoDB!');
  })
  .catch((err) => {
    console.log('Cannot connect to the MongoDB!', err);
    process.exit();
  });

app.use((_, res, next) => {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

const routes = require('../app/routes');
routes(app);

const httpPort = 8080;
app.listen(httpPort, () => {
  console.log(`HTTP server is running on port ${httpPort}!`);
});
