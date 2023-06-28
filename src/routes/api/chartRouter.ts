import type { IApplication } from '../../types/application';
import type {
  IPlatformConversionStats,
  IApplicationStats,
} from '../../types/chart';
import express from 'express';
import { Application } from '../../models/Application';
import { setResponse } from '../../@types/response';

const router = express.Router();

router.get('/', async (req, res) => {
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

    const applications: IApplication[] = await Application.find({ userId });

    // const endDate = new Date();
    // endDate.setHours(23, 59, 59, 999);

    // const startDate = new Date();
    // startDate.setDate(startDate.getDate() - 7);
    // startDate.setHours(0, 0, 0, 0);
    // const applicationsByRecentWeek = await Application.find({
    //   'apply.day': {
    //     $gte: startDate,
    //     $lte: endDate,
    //   },
    //   userId,
    // });

    const { applicationStats, platformStats } =
      getConversionStatsByPlatform(applications);
    // const dateStats = getConversionStatsByDate(applicationsByRecentWeek);

    res.status(200).json({
      applicationStats,
      platformStats,
      // dateStats,
    });
  } catch (error) {
    console.error(error, 'at charRouter');
    res.status(500).json(error?.toString());
  }
});

function getConversionStatsByPlatform(applications: IApplication[]): {
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

function getConversionStatsByDate(applicationsByRecentWeek: any) {
  const dailyAppliedCount: Record<string, number> = {};
  const dailyResponseCount: Record<string, number> = {};

  applicationsByRecentWeek.forEach((application: any) => {
    const day = application.apply.day.toISOString().split('T')[0];
    const situation = application.situation;

    if (day in dailyAppliedCount) {
      dailyAppliedCount[day]++;
    } else {
      dailyAppliedCount[day] = 1;
    }

    if (situation === '서류 통과') {
      if (day in dailyResponseCount) {
        dailyResponseCount[day]++;
      } else {
        dailyResponseCount[day] = 1;
      }
    }
  });

  const dateConversionStats = [];

  for (const day in dailyAppliedCount) {
    const appliedCount = dailyAppliedCount[day] || 0;
    const responseCount = dailyResponseCount[day] || 0;
    const responseRate =
      appliedCount > 0 ? (responseCount / appliedCount) * 100 : 0;

    dateConversionStats.push({
      date: day,
      responseCount,
      responseRate: responseRate.toFixed(2),
    });
  }

  dateConversionStats.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return dateConversionStats;
}

export default router;
