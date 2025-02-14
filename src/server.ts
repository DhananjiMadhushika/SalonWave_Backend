import { PrismaClient } from '@prisma/client';
import express, {Express} from 'express';
import { errorMiddleware } from './middlewares/errors';
import rootRouter from './routes';
import { PORT } from './secrets';

const app:Express = express();
app.use(express.json());

app.use('/api', rootRouter);

export const prismaCilent = new PrismaClient({
    log:['query']
})

app.use(errorMiddleware)

app.listen(PORT, ()=>{
    console.log("App work")
})