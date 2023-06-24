import express from 'express';
import cors from 'cors';
import { Test } from './models/testSchema';

const app = express();

app.set('PORT', process.env.PORT || 8080);

app.use(express.static('public'));
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);

  const red = new Test({
    color: 'red',
    size: 'Large',
  });

  try {
    red.save();
    console.log(red);
  } catch (error) {
    console.error(error);
  }

  res.send('<h1>Hello World!</h1>');
});

app.listen(app.get('PORT'), () => {
  console.log(`Server is running on PORT:${app.get('PORT')}`);
});
