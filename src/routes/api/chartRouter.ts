import express from 'express';
import { Application } from '../../models/Application';
import { createResponseApplication } from '../../utils/application';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const applications = await Application.find();

    if (!applications.length) {
      res.status(404).json({
        err: 'N',
        errMessage: '등록된 이력서가 없습니다!',
      });
    }

    console.log(applications.map(createResponseApplication));

    const APPLY_COMPLETE = '지원 완료';
    const PASS_DOCS = '서류 통과';
    const PASS_FINIAL = '최종 합격';
    const NO_PASS = '불합격';

    console.log(applications.filter((a) => a.situation === APPLY_COMPLETE));

    res.status(200).json({
      counts: [
        {
          countOf: APPLY_COMPLETE,
          count: applications.filter(
            ({ situation }) => situation === APPLY_COMPLETE,
          ).length,
        },
        {
          countOf: PASS_DOCS,
          count: applications.filter(({ situation }) => situation === PASS_DOCS)
            .length,
        },
        {
          countOf: PASS_FINIAL,
          count: applications.filter(
            ({ situation }) => situation === PASS_FINIAL,
          ).length,
        },
        {
          countOf: NO_PASS,
          count: applications.filter(({ situation }) => situation === NO_PASS)
            .length,
        },
      ],
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default router;
