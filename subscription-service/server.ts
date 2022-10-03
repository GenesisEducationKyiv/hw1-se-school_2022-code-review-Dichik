import "reflect-metadata";
import { container } from 'tsyringe';
import { App } from './src/app';
const dotenv = require('dotenv');
dotenv.config();

const app = container.resolve(App);

app.initRoutes()
app.listen()
