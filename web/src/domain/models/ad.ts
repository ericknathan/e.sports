import { z } from "zod";

export const AdSchema = z.object({
  game: z.string({
    required_error: "Nenhum jogo foi selecionado",
  }).min(20, "Nenhum jogo foi selecionado"),
  name: z.string({
    required_error: "É necessário informar seu nome",
  }).min(2, "É necessário informar seu nome"),
  yearsPlaying: z.number({
    required_error: "É necessário informar a quantidade de anos jogados",
  }).min(0, 'A quantidade de anos deve ser no mínimo zero').max(70, 'Cê tá velhão já hein? haha'),
  discord: z.string({
    required_error: "É necessário informar seu discord",
  }).regex(/^.{3,32}#[0-9]{4}$/, 'O formato do discord deve ser "nome#0000"'),
  weekDays: z.array(z.number().min(0).max(6)).min(1, 'É preciso informar pelo menos 1 dia de jogo'),
  hourStart: z.string({
    required_error: "É necessário informar a hora de início",
  }).regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, 'O formato da hora deve ser "HH:MM"'),
  hourEnd: z.string({
    required_error: "É necessário informar a hora de término",
  }).regex(/^([01][0-9]|2[0-3]):([0-5][0-9])$/, 'O formato da hora deve ser "HH:MM"'),
  useVoiceChannel: z.boolean(),
});

export type AdModel = z.infer<typeof AdSchema>;