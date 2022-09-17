import { useEffect, useState } from 'react';
import axios from 'axios';
import { GameModel } from '@/domain/models/game';

import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import logoImage from '@/presentation/assets/images/logo-nlw-esports.svg';
import { GameBanner, CreateAdBanner, CreateAdModal } from '../components';
import { CaretLeft, CaretRight } from 'phosphor-react';

export function Home() {
  const [gameList, setGameList] = useState<GameModel[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 24,
    },
    breakpoints: {
      "(min-width: 500px)": {
        slides: { perView: 2, spacing: 24 },
      },
      "(min-width: 700px)": {
        slides: { perView: 3, spacing: 24 },
      },
      "(min-width: 1050px)": {
        slides: { perView: 4, spacing: 24 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 5, spacing: 24 },
      },
      "(min-width: 1300px)": {
        slides: { perView: 6, spacing: 24 },
      },
    },
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  });

  useEffect(() => {
    axios.get('http://localhost:3333/api/v1/games')
      .then(({ data }) => setGameList(data))
  }, []);

  return (
    <div className="max-w-[1344px] w-[90vw] m-auto flex flex-col items-center justify-between h-screen py-16 gap-4">
      <img src={logoImage} alt="Logo da NLW eSports" className="h-[10vh] sm:h-[20vh]" />

      <h1 className="text-3xl sm:text-4xl text-white font-black text-center">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>

      <div className="flex gap-6 max-w-[1344px] w-[90vw]">
        <button
          disabled={currentSlide === 0}
          className="text-zinc-400"
        >
          <CaretLeft
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.prev()
            }
            size={42}
          />
        </button>
        
        {gameList.length === 0 ? 
          <p>Carregando...</p>
        : <div ref={sliderRef} className="keen-slider">
          {gameList.map(game => (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              ads={game.ads}
              title={game.title}
            />
          ))}
        </div>}
        
        <button
          disabled={instanceRef.current !== null && instanceRef.current.track.details !== null ? currentSlide === instanceRef.current.track.details.slides.length - 1 : true}
          className="text-zinc-400"
        >
          <CaretRight
            onClick={(e: any) =>
              e.stopPropagation() || instanceRef.current?.next()
            }
            size={42}
          />
        </button>
      </div>

      <CreateAdModal games={gameList}>
        <CreateAdBanner />
      </CreateAdModal>
    </div>
  )
}