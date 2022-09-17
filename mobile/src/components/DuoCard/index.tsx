import { Text, TouchableOpacity, View } from 'react-native';
// import { GameController } from 'phosphor-react-native';
import { AdModel } from '../../domain/models/ad';

import { DuoInfo } from '../DuoInfo';

import { styles } from './styles';
import { THEME } from '../../theme';

interface DuoCardProps {
  data: AdModel;
  onConnect: () => void;
}

export function DuoCard({ data, onConnect }: DuoCardProps) {
  return (
    <View style={styles.container}>
      <DuoInfo
        label="Nome"
        value={data.name}
      />
      <DuoInfo
        label="Tempo de jogo"
        value={`${data.yearsPlaying} ano${data.yearsPlaying > 1 && 's'}`}
      />
      <DuoInfo
        label="Disponibilidade"
        value={`${data.weekDays.length} dia${data.weekDays.length > 1 && 's'} • ${data.hourStart} - ${data.hourEnd}`}
      />
      <DuoInfo
        label="Chamada de áudio?"
        value={data.useVoiceChannel ? 'Sim' : 'Não'}
        colorValue={data.useVoiceChannel ? THEME.COLORS.SUCCESS : THEME.COLORS.ALERT}
      />
      <TouchableOpacity style={styles.button} onPress={onConnect}>
        {/* <GameController
          color={THEME.COLORS.TEXT}
          size={20}
        /> */}
        <Text style={styles.buttonTitle}>
          Conectar
        </Text>
      </TouchableOpacity>
    </View>
  );
}