import { AdModel } from "./ad.model"

export type GameModel = {
  id: string,
  title: string,
  bannerUrl: string,
  ads: AdModel[]
}
