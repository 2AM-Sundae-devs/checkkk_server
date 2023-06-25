import express from 'express';

import { Application } from '../../models/Application';
import { createResponseApplication } from '../../utils/application';

const router = express.Router();

const getApplications = async (req: any, res: any) => {
  try {
    // const { userId } = req.cookies.userId;

    // if (!userId) {
    //   return res.status(401).json({ message: 'No user ID cookie found' });
    // }

    const applications = await Application.find();
    // const applications = await Application.findById(userId);

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
  const {
    companyName,
    position,
    situation,
    positionExperience,
    companyAddress,
    apply,
    personalOpinion,
  } = req.body;

  try {
    const newApplication = await new Application({
      companyName,
      position,
      situation,
      positionExperience,
      companyAddress,
      apply,
      personalOpinion,
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
