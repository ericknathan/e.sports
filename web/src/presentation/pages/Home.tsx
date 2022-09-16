import { useEffect, useState } from 'react';

import logoImage from '@/presentation/assets/images/logo-nlw-esports.svg';
import { GameBanner, PublishAdModal } from '../components';

type Game = {
  id: string;
  title: string;
  bannerUrl: string;
  ads: any[];
}

export function Home() {
  const [gameList, setGameList] = useState<Game[]>([]);


  useEffect(() => {
    fetch('http://localhost:3333/api/v1/games')
      .then((response) => response.json())
      .then(setGameList);
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImage} alt="Logo da NLW eSports" />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">
        {gameList.map(game => (
          <GameBanner
            key={game.id}
            bannerUrl={game.bannerUrl}
            ads={game.ads.length}
            title={game.title}
          />
        ))}
      </div>

      <PublishAdModal />
    </div>
  )
}