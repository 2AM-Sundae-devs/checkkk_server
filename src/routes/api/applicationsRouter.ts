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

const getApplications = async (req: any, res: any) => {
  try {
    // 사용자와 연동해서 불러와야 함
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
};

const createApplication = async (req: any, res: any) => {
  console.log(req);

  try {
    const newApplication = await new Application({
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
};

const getApplication = async (req: any, res: any) => {
  const applicationId = req.params.applicationId;
  // console.log(applicationId);

  try {
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
  } catch (error) {
    console.error(error);
    res.status(400).json({
      err: 'Y',
    });
  }
};

const patchApplication = async (req: any, res: any) => {
  const { applicationId } = req.params;
  const applicationPatch = req.body;

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        err: 'Y',
        errMessage: '찾는 이력서가 없습니다.',
      });
    }

    await Application.findOneAndUpdate(
      { _id: applicationId },
      applicationPatch,
    );

    // res.sendStatus(200);
    res.status(200).json({
      err: 'N',
      message: '수정 성공!',
    });
  } catch (err) {
    console.log('임시 router.patch', err);
  }
};

const deleteApplication = async (req: any, res: any) => {
  const { applicationId } = req.params;

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        err: 'Y',
        errMessage: '찾는 이력서가 없습니다.',
      });
    }

    await Application.deleteOne({ _id: applicationId });

    // res.sendStatus(204);
    res.status(204).json({
      err: 'N',
      message: '삭제 완료!',
    });
  } catch (err) {
    console.log('임시 router.patch', err);
  }
};

router.route('/').get(getApplications).post(createApplication);
router
  .route('/:applicationId')
  .get(getApplication)
  .patch(patchApplication)
  .delete(deleteApplication);

export default router;
