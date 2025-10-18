import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Dish, useMenu } from '../MenuContext';

export default function FilterMenu() {
  const router = useRouter();
  const { menu, removeDish } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<Dish['course'] | null>(null);

  const filteredMenu = selectedCourse
    ? menu.filter((dish) => dish.course === selectedCourse)
    : menu;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </Pressable>

      <Text style={styles.title}>Guest Menu</Text>

      <View style={styles.filterContainer}>
        {['Starter', 'Main', 'Dessert', 'Drink'].map((course) => (
          <Pressable
            key={course}
            style={[styles.filterButton, selectedCourse === course && styles.selectedButton]}
            onPress={() => setSelectedCourse(course as Dish['course'])}
          >
            <Text style={styles.filterText}>{course}</Text>
          </Pressable>
        ))}

        <Pressable style={styles.resetButton} onPress={() => setSelectedCourse(null)}>
          <Text style={styles.resetText}>Show All</Text>
        </Pressable>
      </View>

      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name} (${item.price})</Text>
            <Text style={styles.courseText}>{item.course} — {item.description}</Text>
            <Pressable style={styles.removeButton} onPress={() => removeDish(item.id)}>
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#0a7a1dff' },
  backButton: { marginBottom: 10 },
  backText: { color: '#1E90FF', fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  filterContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' },
  filterButton: { backgroundColor: 'lightgray', padding: 10, margin: 5, borderRadius: 8 },
  selectedButton: { backgroundColor: 'darkgreen' },
  filterText: { color: '#000', fontWeight: 'bold' },
  resetButton: { backgroundColor: '#1E90FF', padding: 10, margin: 5, borderRadius: 8 },
  resetText: { color: '#fff', fontWeight: 'bold' },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  courseText: { fontSize: 14, color: 'gray' },
  removeButton: { backgroundColor: 'red', padding: 8, borderRadius: 6, marginTop: 5, alignSelf: 'flex-start' },
  removeText: { color: '#fff', fontWeight: 'bold' },
});
