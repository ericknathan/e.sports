import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { PrismaClient } from "@prisma/client";
import { convertMinutesToHourString } from '../../../utils/convert-minutes-to-hour-string';

export class GetGameAdsController implements Controller {
  constructor(private readonly databaseClient: PrismaClient) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { gameId } = httpRequest.params;

    const ads = await this.databaseClient.ad.findMany({
      where: { gameId },
      select: {
        id: true,
        name: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const formattedAds = ads.map(ad => ({
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }));

    return {
      statusCode: 200,
      body: formattedAds,
    };
  }
};
