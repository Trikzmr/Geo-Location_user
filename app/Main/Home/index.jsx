import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 
 import Featured from '../../Components/Featured';
 import Clender from './component/Clender';
 import StasCardSection from './component/StasCardSection'
 import ActivityListSection from './component/ActivityListSection'

export default function Index() {
  return (
    <View >
      <Featured/>
      <Text >Home screen</Text>
      <Link href="/Main/Home/product" >
        Go to About screen
      </Link>
      <Clender/>
      <StasCardSection/>
      <ActivityListSection/>
    </View>
  );
}


