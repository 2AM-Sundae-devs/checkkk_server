import express from 'express';
import { Application } from '../../models/Application';
import { createResponseApplication } from '../../utils/application';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const applications: Application[] = await Application.find();
    console.log('applications', applications);

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

    const platformConversionStats: any[] =
      generatePlatformConversionStats(applications);

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
      platformConversionStats,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

interface Application {
  index: string;
  companyName: string;
  position: string;
  situation: string;
  positionExperience: number;
  companyAddress: string;
  apply: {
    path: string;
    day: string;
    link: string;
  };
  personalOpinion: any[];
}

interface PlatformConversionStats {
  id: number;
  platform: string;
  appliedCount: number;
  responseCount: number;
  responseRate: string;
}

function generatePlatformConversionStats(applications: Application[]): any[] {
  const platformAppliedCount: Record<string, number> = {};
  const platformResponseCount: Record<string, number> = {};

  applications.forEach((application) => {
    const platform = application.apply.path;
    if (platform in platformAppliedCount) {
      platformAppliedCount[platform]++;
    } else {
      platformAppliedCount[platform] = 1;
    }

    if (application.situation === '서류 통과') {
      if (platform in platformResponseCount) {
        platformResponseCount[platform]++;
      } else {
        platformResponseCount[platform] = 1;
      }
    }
  });

  const platformConversionStats: PlatformConversionStats[] = [];

  for (const platform in platformAppliedCount) {
    const appliedCount = platformAppliedCount[platform] || 0;
    const responseCount = platformResponseCount[platform] || 0;
    const responseRate =
      appliedCount > 0 ? (responseCount / appliedCount) * 100 : 0;

    platformConversionStats.push({
      id: platformConversionStats.length + 1,
      platform,
      appliedCount,
      responseCount,
      responseRate: responseRate.toFixed(2),
    });
  }

  return platformConversionStats;
}

export default router;
