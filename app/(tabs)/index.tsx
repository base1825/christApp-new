import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* App Name */}
      <Text style={styles.title}>Welcome to Christ App</Text>

      {/* Continue Button */}
      <Pressable style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Let's go</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'darkgreen' 
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 40, 
    textAlign: 'center' 
  },
  button: { 
    backgroundColor: '#fff', 
    paddingVertical: 15, 
    paddingHorizontal: 40, 
    borderRadius: 10 
  },
  buttonText: { 
    color: 'darkgreen', 
    fontWeight: 'bold', 
    fontSize: 18 
  },
});
