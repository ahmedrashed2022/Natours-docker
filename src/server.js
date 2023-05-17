const mongoose = require('mongoose');
const dotenv = require('dotenv');
const redis = require('redis');
const app = require('./app');

dotenv.config({ path: './config.env' });

//connect to redis
const REDIS_PORT = 6379;
const REDIS_HOST = 'redis';

const redisClient = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`
});
redisClient.on('error', err => console.log('redis client error:', err));
redisClient.on('connect', () => console.log('Connected to redis'));
redisClient.connect();
//connect db

const DB_USER = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = 27017;
const DB_HOST = 'mongo';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

mongoose.connect(URI).then(() => console.log('connect to db'));

app.get('/', (req, res) => res.send('<h1>hello world from dev asdas<h1>'));
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
