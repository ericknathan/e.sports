import { Router } from 'express';
import { adaptRoute } from '../../adapters/express-route.adapter';
import { makeAdsController } from '../../factories/ads';

export default (router: Router): void => {
  router.get('/ads', adaptRoute(makeAdsController()));
}
