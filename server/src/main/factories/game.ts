import { GetGameAdsController, ListGamesController } from '../../presentation/controllers/game';
import { Controller } from '../../presentation/protocols';
import { client } from "../../infra/database/prisma/client";

export const makeGetGameAds = (): Controller => {
  return new GetGameAdsController(client);
}

export const makeListGamesController = (): Controller => {
  return new ListGamesController(client);
}

