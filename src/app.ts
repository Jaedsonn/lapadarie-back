import express, { json } from 'express'
import { Express, Request, Response } from 'express'
import router from './routes/router';
import cors from 'cors'


const app: Express = express();
const port: number = 4001;
app.use(json())
app.use(cors())
app.use("/", router)

app.listen(port, () => {
    console.log(`Server running in: http://localhost:${port}`)
})