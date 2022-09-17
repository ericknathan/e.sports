import { MagnifyingGlassPlus } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';

export function CreateAdBanner() {
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
      <div className="bg-[#2A2634] px-8 py-6 rounded-lg flex justify-between items-center flex-col sm:flex-row gap-4">
        <div>
          <strong className="text-2xl text-white font-black block text-center sm:text-start">Não encontrou seu duo?</strong>
          <span className="text-zinc-400 block text-center sm:text-start">Publique um anúncio para encontrar novos players!</span>
        </div>
        <Dialog.Trigger className="min-w-full sm:min-w-[195px] py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded transition-colors flex items-center justify-center gap-3">
          <MagnifyingGlassPlus size={24} />
          Publicar anúncio
        </Dialog.Trigger>
      </div>
    </div>
  )
}