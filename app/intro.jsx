import { View, Text, Button } from 'react-native';
import { useRouter } from 'expo-router';

export default function Intro() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24 }}>👋 Welcome to the App!</Text>
      <Button title="Get Started" onPress={() => router.replace('/(tabs)')} />
    </View>
  );
}
