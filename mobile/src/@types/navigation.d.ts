import { GameModel } from '../domain/models/game';

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game:  GameModel;
    }
  }
}