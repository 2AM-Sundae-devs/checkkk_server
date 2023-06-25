import express from 'express';

import { Application } from '../../models/Application';

const router = express.Router();

const createResponseApplication = ({
  id,
  situation,
  companyAddress,
  positionExperience,
  companyName,
  apply,
  personalOpinion,
  position,
}: any) => ({
  index: id,
  companyName,
  position,
  situation,
  positionExperience,
  companyAddress,
  apply,
  personalOpinion,
});

router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();

    if (!applications.length) {
      res.status(404).json({
        err: 'N',
        errMessage: '등록된 이력서가 없습니다!',
      });
    }

    res.status(200).json({
      err: 'N',
      applications: applications.map(createResponseApplication),
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

router.post('/', (req, res) => {
  console.log(req);

  try {
    const newApplication = new Application({
      companyName: 'Teo',
      position: 'FE',
      situation: '면접',
      positionExperience: 3,
      companyAddress: '서울시 어쩌고',
      apply: {
        path: '원티드',
        day: '2023.06.23 ~ 2023.06.24',
        link: 'https://wanted.com/Teo',
      },
    });

    newApplication.save();
    res.status(201).json({
      err: 'N',
      message: 'new application successfully saved!',
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      err: 'Y',
    });
  }
});

router.get('/:applicationId', async (req, res) => {
  const applicationId = req.params.applicationId;
  console.log(applicationId);

  const application = await Application.findById(applicationId);

  if (!application) {
    res.status(404).json({
      err: 'Y',
      errMessage: '찾는 이력서가 없습니다.',
    });
  }

  res.status(200).json({
    err: 'N',
    application: createResponseApplication(application),
  });
});

export default router;
