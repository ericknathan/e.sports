import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from '../../../utils';
import { AdModel } from '../../../domain/models';

export class CreateAdsController implements Controller {
  constructor(private readonly databaseClient: PrismaClient) {}

  async handle(httpRequest: HttpRequest<AdModel>): Promise<HttpResponse> {
    const { gameId } = httpRequest.params;
    const { name, yearsPlaying, discord, weekDays, hourStart, hourEnd, useVoiceChannel } = httpRequest.body!;

    const ad = await this.databaseClient.ad.create({
      data: {
        gameId,
        name,
        yearsPlaying,
        discord,
        weekDays: weekDays.join(','),
        hourStart: convertHourStringToMinutes(hourStart),
        hourEnd: convertHourStringToMinutes(hourEnd),
        useVoiceChannel
      }
    });

    return {
      statusCode: 200,
      body: ad,
    };
  }
};
