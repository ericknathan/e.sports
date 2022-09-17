import { Controller, HttpResponse } from '../../protocols';
import { PrismaClient } from "@prisma/client";

export class ListGamesController implements Controller {
  constructor(private readonly databaseClient: PrismaClient) {}

  async handle(): Promise<HttpResponse> {
    const games = await this.databaseClient.game.findMany({
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    });

    const formattedGames = games.map(game => ({
      ...game,
      ads: game._count.ads,
      _count: undefined
    }));

    return {
      statusCode: 200,
      body: formattedGames,
    };
  }
};
