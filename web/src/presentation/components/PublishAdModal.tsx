import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTransition, animated, config } from 'react-spring';
import { GameController } from 'phosphor-react';
import { CreateAdBanner, Input, Label } from '../components';

export function PublishAdModal() {
  const [createAdModalIsOpen, setCreateAdModalIsOpen] = useState(false);
  const transitions = useTransition(createAdModalIsOpen, {
    from: { opacity: 0, marginTop: -50 },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: 0, marginTop: 50 },
    config: config.stiff,
  });

  return (
    <Dialog.Root open={createAdModalIsOpen} onOpenChange={setCreateAdModalIsOpen}>
      <CreateAdBanner />
      <Dialog.Portal>
        {transitions((styles, item) =>
          item ? (
            <>
              <Dialog.Overlay forceMount asChild className="bg-black/60 inset-0 fixed">
                <animated.div
                  style={{
                    opacity: styles.opacity,
                  }}
                />
              </Dialog.Overlay>
              <Dialog.Content forceMount asChild className="fixed bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] max-w-[90vw] shadow-lg shadow-black/25 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <animated.div style={styles}>
                  <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

                  <form className="mt-8 flex flex-col gap-4">
                    <Label htmlFor="game" label="Qual o game?">
                      <Input id="game" placeholder="Selecione o game que deseja jogar" />
                    </Label>
                    <Label htmlFor="name" label="Seu nome (ou nickname)">
                      <Input id="name" placeholder="Como te chamam dentro do game?" />
                    </Label>
                    <div className="grid grid-cols-2 gap-6">
                      <Label htmlFor="yearsPlaying" label="Joga há quantos anos?">
                        <Input id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                      </Label>
                      <Label htmlFor="discord" label="Qual seu discord?">
                        <Input id="discord" placeholder="Usuário#0000" />
                      </Label>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="weekDays" label="Quando costuma jogar?">
                          <div className="grid grid-cols-4 gap-2">
                            <button className="w-10 h-10 rounded bg-zinc-900" title="Domingo">D</button>
                            <button className="w-10 h-10 rounded bg-zinc-900" title="Segunda">S</button>
                            <button className="w-10 h-10 rounded bg-zinc-900" title="Terça">T</button>
                            <button className="w-10 h-10 rounded bg-zinc-900" title="Quarta">Q</button>
                            <button className="w-10 h-10 rounded bg-zinc-900" title="Quinta">Q</button>
                            <button className="w-10 h-10 rounded bg-zinc-900" title="Sexta">S</button>
                            <button className="w-10 h-10 rounded bg-zinc-900" title="Sábado">S</button>
                          </div>
                        </Label>
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="hourStart" label="Qual horário do dia?">
                          <div className="grid grid-cols-2 gap-1">
                            <Input id="hourStart" type="time" placeholder="De" />
                            <Input id="hourEnd" type="time" placeholder="Até" />
                          </div>
                        </Label>
                      </div>
                    </div>

                    <div className="mt-2 flex gap-2 text-sm">
                      <Input type="checkbox" />
                      Costumo me conectar ao chat de voz
                    </div>

                    <footer className="mt-4 flex justify-end gap-4">
                      <Dialog.Close
                        type="button"
                        className="bg-zinc-500 hover:bg-zinc-600 transition-colors px-5 h-12 rounded-md font-semibold"
                      >
                        Cancelar
                      </Dialog.Close>
                      <button
                        type="submit"
                        className="bg-violet-500 hover:bg-violet-600 transition-colors px-5 h-12 rounded-md font-semibold flex items-center gap-3"
                      >
                        <GameController className="w-6 h-6" />
                        Encontrar duo
                      </button>
                    </footer>
                  </form>
                </animated.div>
              </Dialog.Content>
            </>
          ) : null
        )}
      </Dialog.Portal>
    </Dialog.Root>
  )
}