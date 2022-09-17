import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

import { Background } from './src/components/Background';
import { Loader } from './src/components/Loader';
import { Home } from './src/screens/Home';
import { Routes } from './src/routes';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  
  // if (!fontsLoaded) return null;

  return (
    <Background>
      <StatusBar
        style='light'
        translucent
      />
      { fontsLoaded ? <Routes /> : <Loader />}
    </Background>
  );
}
