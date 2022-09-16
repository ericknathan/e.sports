import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route.adapter';
import { makeListGamesController, makeGetGameAds } from '../../factories/game';

export default (router: Router): void => {
  router.get('/games', adaptRoute(makeListGamesController()));
  router.get('/games/:gameId/ads', adaptRoute(makeGetGameAds()));
}
