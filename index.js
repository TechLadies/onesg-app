const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const morgan = require('morgan');

const homeRouter = require('./routers');
const userRouter = require('./routers/users');

const app = express();

const port = 3000;

app.use(
  cors({
    origin: 'http://localhost:3000', // should limit to onesg-web
  })
);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
morgan(app);

app.use('/', homeRouter);
app.use('/api/users', userRouter); // home page
app.use('/api/healthcheck', userRouter); // some other page, need to change 'router' to something else

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
