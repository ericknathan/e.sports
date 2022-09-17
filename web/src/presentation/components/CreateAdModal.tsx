import { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios, { AxiosError } from 'axios';
import { useTransition, animated, config } from 'react-spring';

import { CircleNotch, GameController } from 'phosphor-react';
import { GameModel, AdModel, AdSchema } from '@/domain/models';
import { Checkbox, Input, Label, Select, ToggleGroup } from '@/presentation/components';
import { ZodError } from 'zod';

interface CreateAdModalProps {
  games: GameModel[];
  children: React.ReactNode;
}

export function CreateAdModal({ games, children: trigger }: CreateAdModalProps) {
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const [createAdModalIsOpen, setCreateAdModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const transitions = useTransition(createAdModalIsOpen, {
    from: { opacity: 0, marginTop: -50 },
    enter: { opacity: 1, marginTop: 0 },
    leave: { opacity: 0, marginTop: 50 },
    config: config.stiff,
  });

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries()) as any;

    try {
      setIsLoading(true);
      const formattedData = {
        name: data.name,
        discord: data.discord,
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        weekDays: selectedWeekDays.map(Number),
        useVoiceChannel: data.useVoiceChannel === "on" ? true : false,
        yearsPlaying: !!data.yearsPlaying ? Number(data.yearsPlaying) : undefined
      };

      AdSchema.parse({
        ...formattedData,
        game: data.game
      });

      await axios.post(`http://localhost:3333/api/v1/games/${data.game}/ads`, formattedData as AdModel);
      alert('Anúncio criado com sucesso!');
    } catch (error) {
      console.log(error, typeof Error)
      if(error instanceof ZodError) {
        alert(error.errors[0].message);
      } else if(error instanceof AxiosError) {
        alert('Não foi possível se comunicar com o servidor corretamente. Tente novamente mais tarde.');
      } else {
        alert('Erro inesperado ao criar anúncio');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <Dialog.Root open={createAdModalIsOpen} onOpenChange={setCreateAdModalIsOpen}>
        {trigger}
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

                  <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                    <Label htmlFor="game" label="Qual o game?">
                      <Select
                        name="game"
                        label="Selecione o game que deseja jogar"
                        items={games.map(({ id, title }) => ({ id, label: title }))}
                      />
                    </Label>
                    <Label htmlFor="name" label="Seu nome (ou nickname)">
                      <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                    </Label>
                    <div className="grid grid-cols-2 gap-6">
                      <Label htmlFor="yearsPlaying" label="Joga há quantos anos?">
                        <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" min="0" max="70" />
                      </Label>
                      <Label htmlFor="discord" label="Qual seu discord?">
                        <Input name="discord" id="discord" placeholder="Usuário#0000" />
                      </Label>
                    </div>
                    <div className="flex gap-6">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="weekDays" label="Quando costuma jogar?">
                          <ToggleGroup
                            className="grid grid-cols-4 gap-2"
                            itemStyle="w-10 h-10 rounded bg-zinc-900"
                            activeItemStyle='!bg-violet-500 font-bold'
                            items={[
                              { title: 'Domingo', label: 'D' },
                              { title: 'Segunda', label: 'S' },
                              { title: 'Terça', label: 'T' },
                              { title: 'Quarta', label: 'Q' },
                              { title: 'Quinta', label: 'Q' },
                              { title: 'Sexta', label: 'S' },
                              { title: 'Sábado', label: 'S' },
                            ]}
                            selectedValues={selectedWeekDays}
                            setSelectedValues={setSelectedWeekDays}
                          />
                        </Label>
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <Label htmlFor="hourStart" label="Qual horário do dia?">
                          <div className="grid grid-cols-2 gap-1">
                            <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                            <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                          </div>
                        </Label>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <Checkbox id="useVoiceChannel" />
                      <label htmlFor="useVoiceChannel">Costumo me comunicar via canal de voz</label>
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
                        className="disabled:bg-violet-400 disabled:hover:bg-violet-400 disabled:cursor-not-allowed bg-violet-500 hover:bg-violet-600 transition-colors px-5 h-12 rounded-md font-semibold flex items-center gap-3"
                        disabled={isLoading}
                      >
                        {
                          isLoading ?
                            <>
                              <CircleNotch className="animate-spin h-6 w-6" />
                              Enviando...
                            </>
                          :
                          <>
                            <GameController className="w-6 h-6" />
                            Encontrar duo
                          </>
                        }
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