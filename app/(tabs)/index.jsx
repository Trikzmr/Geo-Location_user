import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';
import Profile from '../components/home/Profile';
import Clender from '../components/home/Clender';
import StasCardSection from '../components/home/StasCardSection';
import ActivityListSection from '../components/home/ActivityListSection';

export default function Home() {
  const router = useRouter();

  return (
    <View className="pt-10">
      <Profile/>
      <Clender/>
      <StasCardSection/>
      <ActivityListSection/>
    </View>
  );
}
