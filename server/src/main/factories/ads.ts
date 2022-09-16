import { CreateAdsController, GetUserDiscordByAdsId } from '../../presentation/controllers/ads';
import { Controller } from '../../presentation/protocols';
import { client } from "../../infra/database/prisma/client";

export const makeCreateAdsController = (): Controller => {
  return new CreateAdsController(client);
}

export const makeGetUserDiscordByAdsId = (): Controller => {
  return new GetUserDiscordByAdsId(client);
}
