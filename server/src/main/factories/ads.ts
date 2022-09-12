import { AdsController } from '../../presentation/controllers';
import { Controller } from '../../presentation/protocols';

export const makeAdsController = (): Controller => {
  return new AdsController();
}
