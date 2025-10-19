import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const predefinedMenu = [
  // Starters
  { id: '1', name: 'Salad', course: 'Starter', description: 'Fresh veggies', price: 8 },
  { id: '2', name: 'Soup', course: 'Starter', description: 'Tomato soup', price: 7 },
  { id: '3', name: 'Bruschetta', course: 'Starter', description: 'Toasted bread', price: 6 },

  // Mains
  { id: '4', name: 'Steak', course: 'Main', description: 'Grilled beef', price: 18 },
  { id: '5', name: 'Pasta', course: 'Main', description: 'Creamy Alfredo', price: 14 },
  { id: '6', name: 'Salmon', course: 'Main', description: 'Grilled salmon', price: 20 },

  // Desserts
  { id: '7', name: 'Ice Cream', course: 'Dessert', description: 'Vanilla scoop', price: 6 },
  { id: '8', name: 'Cheesecake', course: 'Dessert', description: 'Rich cheesecake', price: 8 },
  { id: '9', name: 'Brownie', course: 'Dessert', description: 'Chocolate brownie', price: 7 },

  // Drinks
  { id: '10', name: 'Cola', course: 'Drink', description: 'Chilled soda', price: 3 },
  { id: '11', name: 'Red Wine', course: 'Drink', description: 'House wine', price: 9 },
  { id: '12', name: 'Coffee', course: 'Drink', description: 'Espresso', price: 4 },
];

export default function FilterMenu() {
  const router = useRouter();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filteredMenu = selectedCourse
    ? predefinedMenu.filter(dish => dish.course === selectedCourse)
    : predefinedMenu;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </Pressable>

      <Text style={styles.title}>Christoffel’s Menu</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['Starter', 'Main', 'Dessert', 'Drink'].map(course => (
          <Pressable
            key={course}
            style={[styles.filterButton, selectedCourse === course && styles.selectedButton]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text style={[styles.filterText, selectedCourse === course && styles.selectedText]}>
              {course}
            </Text>
          </Pressable>
        ))}
        <Pressable style={styles.resetButton} onPress={() => setSelectedCourse(null)}>
          <Text style={styles.resetText}>Show All</Text>
        </Pressable>
      </View>

      {/* Menu List */}
      <FlatList
        data={filteredMenu}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemTitle}>{item.name} (${item.price})</Text>
            <Text style={styles.course}>{item.course}</Text>
            <Text style={styles.desc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  backButton: { marginBottom: 10 },
  backText: { color: '#1E90FF', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  filterContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', marginBottom: 20 },
  filterButton: { backgroundColor: '#ccc', padding: 10, margin: 5, borderRadius: 8 },
  selectedButton: { backgroundColor: 'green' },
  filterText: { color: '#000', fontWeight: '600' },
  selectedText: { color: '#fff' },
  resetButton: { backgroundColor: '#1E90FF', padding: 10, margin: 5, borderRadius: 8 },
  resetText: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#f8f8f8', padding: 15, borderRadius: 10, marginBottom: 10 },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  course: { fontSize: 14, color: '#777', marginTop: 3 },
  desc: { fontSize: 14, color: '#555', marginTop: 3 },
});
