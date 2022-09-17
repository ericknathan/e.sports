import { View, ActivityIndicator } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={THEME.COLORS.PRIMARY}
        size={32}
      />
    </View>
  );
}