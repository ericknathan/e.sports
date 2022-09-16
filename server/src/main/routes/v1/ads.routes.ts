import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route.adapter';
import { makeCreateAdsController, makeGetUserDiscordByAdsId } from '../../factories/ads';

export default (router: Router): void => {
  router.post('/games/:gameId/ads', adaptRoute(makeCreateAdsController()));
  router.get('/ads/:adId/discord', adaptRoute(makeGetUserDiscordByAdsId()));
}
