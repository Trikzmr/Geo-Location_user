import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot, SplashScreen, Redirect } from 'expo-router';
import "../global.css"

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    const init = async () => {
      await SplashScreen.preventAutoHideAsync();
      const alreadyLaunched = await AsyncStorage.getItem('alreadyLaunched');
      if (!alreadyLaunched) {
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
      setTimeout(() => {
        setLoading(false);
        SplashScreen.hideAsync();
      }, 1500);
    };
    init();
  }, []);

  if (loading) return null;

  if (isFirstLaunch) return <Redirect href="/intro" />;
  return <Slot />;
}
