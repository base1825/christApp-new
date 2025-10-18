import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

// Example menu
const initialMenu = [
  { id: '1', name: 'Salad', course: 'Starter', price: 8 },
  { id: '2', name: 'Steak', course: 'Main', price: 15 },
  { id: '3', name: 'Ice Cream', course: 'Dessert', price: 7 },
  { id: '4', name: 'Soup', course: 'Starter', price: 6 },
  { id: '5', name: 'Pasta', course: 'Main', price: 12 },
];

export default function HomeScreen() {
  const router = useRouter();
  const [menu] = useState(initialMenu);

  const totalDishes = menu.length;

  const getAveragePrice = (course: string) => {
    const items = menu.filter((dish) => dish.course === course);
    if (items.length === 0) return 0;
    const total = items.reduce((sum, dish) => sum + dish.price, 0);
    return (total / items.length).toFixed(2);
  };

  const handleAddMenu = () => {
    Alert.alert(
      'Chef Access',
      'Are you the chef?',
      [
        { text: 'No', onPress: () => router.push('/filter') },
        { text: 'Yes', onPress: () => router.push('/addmenu') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Christoffel’s Menu</Text>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Total Dishes: {totalDishes}</Text>
        <Text style={styles.statText}>Starter Avg: ${getAveragePrice('Starter')}</Text>
        <Text style={styles.statText}>Main Avg: ${getAveragePrice('Main')}</Text>
        <Text style={styles.statText}>Dessert Avg: ${getAveragePrice('Dessert')}</Text>
      </View>

      {/* Buttons */}
      <Pressable style={styles.button} onPress={handleAddMenu}>
        <Text style={styles.buttonText}>Add Menu</Text>
      </Pressable>

      <Pressable style={[styles.button, { backgroundColor: '#1E90FF' }]} onPress={() => router.push('/filter')}>
        <Text style={styles.buttonText}>Filter Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  statsContainer: { marginBottom: 30 },
  statText: { fontSize: 16, marginVertical: 2 },
  button: { backgroundColor: 'green', paddingVertical: 15, paddingHorizontal: 40, borderRadius: 10, marginBottom: 15 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
