import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { PrismaClient } from "@prisma/client";

export class ListGamesController implements Controller {
  constructor(private readonly databaseClient: PrismaClient) {}

  async handle(): Promise<HttpResponse> {
    const games = await this.databaseClient.game.findMany({
      include: {
        ads: true
      }
    });

    return {
      statusCode: 200,
      body: games,
    };
  }
};
