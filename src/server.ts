import express, { json } from 'express';
import cors from 'cors';

import * as routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/repositories', routes.index);
app.post('/repositories', routes.create);
app.put('/repositories/:id', routes.update);
app.delete('/repositories/:id', routes.destroy);
app.post('/repositories/:id/like', routes.likeRepository);

app.listen(3333);