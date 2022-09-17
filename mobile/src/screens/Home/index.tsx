import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import logoImage from '../../assets/logo-nlw-esports.png';
import { GameModel } from '../../domain/models/game';

import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';

import { styles } from './styles';

export function Home() {
  const [gameList, setGameList] = useState<GameModel[]>([]);
  const navigation = useNavigation();

  function handleOpenGame(game: GameModel) {
    navigation.navigate('game', game);
  }

  useEffect(() => {
    fetch('http://192.168.15.10:3333/api/v1/games')
      .then(response => response.json())
      .then(setGameList);
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={logoImage}
        style={styles.logo}
      />

      <Heading
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />

      <FlatList
        data={gameList}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <GameCard
            key={index}
            data={item}
            onPress={() => handleOpenGame(item)}
          />
        )}
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={styles.contentList}
      />
    </SafeAreaView>
  );
}
