import bodyParser from 'body-parser';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes';

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/store', {
  useMongoClient: true,
});

const postRequestMiddleware = bodyParser.json({ limit: '20mb' });
const app = express();
app.use(helmet());
app.use(postRequestMiddleware);

app.use('/', router);

app.listen(8090);
