import type { IApplication } from '../../types/application';
import type {
  IPlatformConversionStats,
  IApplicationStats,
} from '../../types/chart';
import express from 'express';
import { Application } from '../../models/Application';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // const { userId } = req.cookies.userId;

    // if (!userId) {
    //   return res.status(401).json({ message: 'No user ID cookie found' });
    // }

    const applications: IApplication[] = await Application.find();
    // const applications: IApplication[] = await Application.findById(userId);

    if (!applications.length) {
      res.status(404).json({
        err: 'N',
        errMessage: '등록된 이력서가 없습니다!',
      });
    }

    const { applicationStats, platformStats } =
      generatePlatformConversionStats(applications);

    res.status(200).json({
      applicationStats,
      platformStats,
    });
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

function generatePlatformConversionStats(applications: IApplication[]): {
  platformStats: IPlatformConversionStats[];
  applicationStats: IApplicationStats[];
} {
  const platformAppliedCount: Record<string, number> = {};
  const platformResponseCount: Record<string, number> = {};
  const statusCounts: Record<string, number> = {};

  applications.forEach((application) => {
    const platform = application.apply.path;
    const situation = application.situation;

    if (platform in platformAppliedCount) {
      platformAppliedCount[platform]++;
    } else {
      platformAppliedCount[platform] = 1;
    }

    if (situation === '서류 통과') {
      if (platform in platformResponseCount) {
        platformResponseCount[platform]++;
      } else {
        platformResponseCount[platform] = 1;
      }
    }

    if (situation in statusCounts) {
      statusCounts[situation]++;
    } else {
      statusCounts[situation] = 1;
    }
  });

  const platformConversionStats: IPlatformConversionStats[] = [];

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

  platformConversionStats.sort(
    (a, b) => parseFloat(b.responseRate) - parseFloat(a.responseRate),
  );

  const applicationStats = Object.keys(statusCounts).map((status) => {
    return {
      countOf: status,
      count: statusCounts[status],
    };
  });

  return { applicationStats, platformStats: platformConversionStats };
}

export default router;
