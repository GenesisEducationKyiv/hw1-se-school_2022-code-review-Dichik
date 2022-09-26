import App from "./src/app"
const dotenv = require('dotenv');
dotenv.config()

const app = new App()

app.initRoutes()
app.listen()