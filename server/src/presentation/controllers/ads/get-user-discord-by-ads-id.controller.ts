import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { PrismaClient } from "@prisma/client";
import { AdModel } from '../../../domain/models';

type HttpRequestType = HttpRequest<{ adId: AdModel['id'] }>;
type HttpResponseType = HttpResponse<{ discord: AdModel['discord'] }>;

export class GetUserDiscordByAdsId implements Controller {
  constructor(private readonly databaseClient: PrismaClient) {}

  async handle(httpRequest: HttpRequestType): Promise<HttpResponseType> {
    const { adId } = httpRequest.params;

    const ad = await this.databaseClient.ad.findUniqueOrThrow({
      where: { id: adId },
      select: { discord: true }
    });
    
      return {
      statusCode: 200,
      body: ad,
    };
  }
};
