type GameBannerProps = {
  bannerUrl: string;
  title: string;
  ads: number;
}

export function GameBanner({ bannerUrl, title, ads }: GameBannerProps) {
  return (
    <a href="" className="relative rounded-lg overflow-hidden hover:origin-center hover:rotate-1 hover:scale-105 transition-transform">
      <img src={bannerUrl} alt={`Imagem do jogo ${title}`} className="w-full"/>

      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">{title}</strong>
        <span className="text-zinc-300 text-sm block">{ads} anúncio{ads > 1 && 's'}</span>
      </div>
    </a>
  )
}