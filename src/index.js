import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cors from 'cors';
import './helpers/EmiterHandler';

const app = express();
dotenv.config();

const { API_PORT } = process.env;
const apiPort = API_PORT || 3000;

const routes = require('./controllers');

app.use(methodOverride());
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
app.use('/api', routes);
app.get('/', (req, res) => {
  return res.json({ success: true });
})
console.log('Starting Express Server...');

app.listen(apiPort, () => {
  console.log(`Server running at http://127.0.0.1:${apiPort}/`);
});