import express, { Request, Response } from 'express';

import { Application } from '../../models/Application';
import { createResponseApplication } from '../../utils/application';
import { setResponse } from '../../@types/response';

const router = express.Router();

const getApplications = async (req: Request, res: Response) => {
  try {
    const userId = req.cookies?.userId || req.headers?.authorization;

    if (!userId) {
      return res
        .status(401)
        .json(
          setResponse(
            'Y',
            '로그인이 필요한 서비스입니다. 로그인 후 이용해주세요 :)',
          ),
        );
    }

    const applicationsByUser = await Application.find({
      userId,
    });

    res.status(200).json({
      err: 'N',
      applications: applicationsByUser?.map(createResponseApplication) || [],
    });
  } catch (error) {
    console.error(error, 'at getApplications');
    res
      .status(500)
      .json(setResponse('Y', '서버 예외처리 에러입니다. 서버에 문의해주세요!'));
  }
};

const createApplication = async (req: Request, res: Response) => {
  const {
    companyName,
    position,
    situation,
    positionExperience,
    companyAddress,
    apply,
    personalOpinion,
  } = req.body;

  const userId = req.cookies?.userId || req.headers?.authorization;

  if (!userId) {
    return res
      .status(401)
      .json(
        setResponse(
          'Y',
          '로그인이 필요한 서비스입니다. 로그인 후 이용해주세요 :)',
        ),
      );
  }

  try {
    const newApplication = new Application({
      userId,
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
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      err: 'Y',
      errorMessage: error?.toString(),
    });
  }
};

const getApplication = async (req: Request, res: Response) => {
  const userId = req.cookies?.userId || req.headers?.authorization;
  if (!userId)
    return res
      .status(401)
      .json(
        setResponse(
          'Y',
          '로그인이 필요한 서비스입니다. 로그인 후 이용해주세요 :)',
        ),
      );

  const applicationId = req.params?.applicationId;

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        err: 'Y',
        errMessage: '등록되지 않은 이력서입니다.',
      });
    }

    res.status(200).json({
      err: 'N',
      application: createResponseApplication(application),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      err: 'Y',
      errorMessage: error?.toString(),
    });
  }
};

const patchApplication = async (req: Request, res: Response) => {
  const applicationId = req.params?.applicationId;
  const applicationPatch = req.body;
  const userId = req.cookies?.userId || req.headers?.authorization;

  if (!userId)
    return res
      .status(401)
      .json(
        setResponse(
          'Y',
          '로그인이 필요한 서비스입니다. 로그인 후 이용해주세요 :)',
        ),
      );

  try {
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({
        err: 'Y',
        errMessage: '찾는 이력서가 없습니다.',
      });
    }

    const updatedApplication = await Application.findOneAndUpdate(
      { _id: applicationId },
      applicationPatch,
      { new: true },
    );

    res.status(200).json({
      err: 'N',
      message: createResponseApplication(updatedApplication),
    });
  } catch (err) {
    console.error(err, 'at patchApplication');
    res.status(500).json(setResponse('Y', err?.toString()));
  }
};

const deleteApplication = async (req: Request, res: Response) => {
  const applicationId = req.params?.applicationId;
  const userId = req.cookies?.userId || req.headers?.authorization;

  if (!userId)
    return res
      .status(401)
      .json(
        setResponse(
          'Y',
          '로그인이 필요한 서비스입니다. 로그인 후 이용해주세요 :)',
        ),
      );

  try {
    const application = await Application.findByIdAndRemove(applicationId);

    if (!application) {
      return res.status(404).json({
        err: 'Y',
        errMessage: '찾는 이력서가 없습니다.',
      });
    }

    res.status(204).end();
  } catch (err) {
    console.error(err, 'at deleteApplication');
    res.status(500).json(setResponse('Y', err?.toString()));
  }
};

router.route('/').get(getApplications).post(createApplication);
router
  .route('/:applicationId')
  .get(getApplication)
  .patch(patchApplication)
  .delete(deleteApplication);

export default router;
