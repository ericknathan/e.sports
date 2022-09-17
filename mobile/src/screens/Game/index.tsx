import { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image, FlatList, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import logoImage from '../../assets/logo-nlw-esports.png';
import { GameModel } from '../../domain/models/game';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Heading } from '../../components/Heading';
import { DuoCard } from '../../components/DuoCard';
import { AdModel } from '../../domain/models/ad';

export function Game() {
  const [gameAdsList, setGameAdsList] = useState<AdModel[]>([]);
  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameModel;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.15.10:3333/api/v1/games/${game.id}/ads`)
      .then(response => response.json())
      .then(setGameAdsList)
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={handleGoBack}>
          <Entypo
            name="chevron-thin-left"
            color={THEME.COLORS.CAPTION_300}
            size={20}
          />
        </TouchableOpacity>
        <Image
          source={logoImage}
          style={styles.logo}
        />
        <View style={styles.right} />
      </View>

      <Image
        source={{ uri: game.bannerUrl }}
        style={styles.cover}
        resizeMode="cover"
      />

      <Heading
        title={game.title}
        subtitle='Conecte-se e comece a jogar!'
      />

      <FlatList
        data={gameAdsList}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <DuoCard
            key={index}
            data={item}
            onConnect={() => console.log(item.id)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.containerList}
        contentContainerStyle={styles.contentList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyListText} numberOfLines={2}>
            Ainda não há anúncios publicados para este jogo.
          </Text>
        )}
      />
    </SafeAreaView>
  );
}