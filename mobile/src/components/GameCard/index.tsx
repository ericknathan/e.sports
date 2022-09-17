import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {
  TouchableOpacity,
  TouchableOpacityProps,
  ImageBackground,
} from 'react-native';

import { GameModel } from '../../domain/models/game';

import { THEME } from '../../theme';
import { styles } from './styles';

interface GameCardComponentProps extends TouchableOpacityProps {
  data: GameModel;
}

export function GameCard({ data, ...props }: GameCardComponentProps) {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <ImageBackground
        style={styles.cover}
        source={{ uri: data.bannerUrl }}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.name}>
            {data.title}
          </Text>

          <Text style={styles.ads}>
            {data.ads} anúncio{data.ads > 1 && 's'}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}