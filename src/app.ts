import express from 'express';
import cors from 'cors';
import { Application } from './models/Application';

import chartRouter from './routes/chartRouter';
import indexRouter from './routes';
import detailRouter from './routes/DetailRouter';

const app = express();

app.set('PORT', process.env.PORT || 8080);

app.use(express.static('public'));
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('charts', chartRouter);
app.use('/details', detailRouter);

// app.get('/', (req, res) => {
// const appli = new Application({
//   position: 'Front End Developer',
//   companyName: '원티드',
//   situation: 'Before',
//   positionExperience: 0,
//   companyAddress: '광화문',
//   apply: {},
// });

// res.send('<h1>Hello World!</h1>');
// });

app.use((req, res, next) => {
  console.log(req);

  res.status(404).send('Not Found');
});

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on PORT:${app.get('PORT')}`);
});
