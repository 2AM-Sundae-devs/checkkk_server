import express from 'express';
import cors from 'cors';

import { homeRouter } from './routes';
import { detailRouter } from './routes/DetailRouter';
import { chartRouter } from './routes/chartRouter';
import loginRouter from './routes/LoginRouter';

const app = express();

app.set('PORT', process.env.PORT || 8080);

app.use(express.static('public'));
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', homeRouter);
app.use('/charts', chartRouter);
app.use('/details', detailRouter);
app.use('/login', loginRouter);

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on PORT:${app.get('PORT')}`);
});
