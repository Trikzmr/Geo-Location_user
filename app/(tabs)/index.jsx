import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import Profile from '../Components/home/Profile';
import Clender from '../Components/home/Clender';
import StasCardSection from '../Components/home/StasCardSection';
import ActivityListSection from '../Components/home/ActivityListSection';
import LocationScreen from '../stack/LocationScreen';

export default function Home() {
  const router = useRouter();

  return (
    <ScrollView className="pt-10 pb-12">
      <View className="flex-1">
        <Profile />
        <Clender />
        <StasCardSection />
        <ActivityListSection />
        <LocationScreen />
      </View>
    </ScrollView>
  );
}
