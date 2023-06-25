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

    const applyPath = new Set(
      applications.map((application) => application.apply?.path),
    );

    console.log(
      Array.from(applyPath).map((path) =>
        applications.filter((application) => application.apply?.path === path),
      ),
    );

    const APPLY_COMPLETE = '지원 완료';
    const PASS_DOCS = '서류 통과';
    const PASS_FINIAL = '최종 합격';
    const NO_PASS = '불합격';

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
      conversions: {
        지원수: applications.filter(
          (application) => application.apply?.path === '원티드',
        ).length,
        전환수: applications.filter(
          (application) =>
            application.apply?.path === '원티드' &&
            application.situation !== '불합격' &&
            application.situation !== '지원 완료',
        ).length,
      },
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

export default router;
