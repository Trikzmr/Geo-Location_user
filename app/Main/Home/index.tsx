import { Text, View, StyleSheet } from 'react-native';
 import { Link } from 'expo-router'; 
 import Featured from '../../Components/Featured'

export default function Index() {
  return (
    <View style={styles.container}>
      <Featured/>
      <Text style={styles.text}>Home screen</Text>
      <Link href="/Main/Home/product" style={styles.button}>
        Go to About screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
