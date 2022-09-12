import { Express, Router } from 'express';
import fastGlob from 'fast-glob';

export default (app: Express): void => {
  const routerV1 = Router();
  app.use('/api/v1', routerV1);
  fastGlob.sync('**/src/main/routes/v1/**.routes.ts').map(async file => (await import(`../../../${file}`)).default(routerV1));
}
