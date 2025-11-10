import { useRouter } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useMenu } from '../content/MenuContext';

export default function FilterMenu() {
  const router = useRouter();
  const { menu } = useMenu();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const filteredMenu = selectedCourse
    ? menu.filter(dish => dish.course === selectedCourse)
    : menu;

  return (
    <View style={styles.container}>
     

      <Text style={styles.title}>Christoffel’s Menu</Text>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['Starter', 'Main', 'Dessert', 'Drink'].map(course => (
          <Pressable
            key={course}
            style={[
              styles.filterButton,
              selectedCourse === course && styles.selectedButton,
            ]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCourse === course && styles.selectedText,
              ]}
            >
              {course}
            </Text>
          </Pressable>
        ))}
        <Pressable style={styles.resetButton} onPress={() => setSelectedCourse(null)}>
          <Text style={styles.resetText}>Show All</Text>
        </Pressable>
      </View>

      {/* Menu List */}
      {filteredMenu.length === 0 ? (
        <Text style={styles.emptyText}>No dishes available. Add some first!</Text>
      ) : (
        <FlatList
          data={filteredMenu}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.itemTitle}>
                {item.name} (${item.price})
              </Text>
              <Text style={styles.course}>{item.course}</Text>
              <Text style={styles.desc}>{item.description}</Text>
            </View>
          )}
        />
      )}
       {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#419136ff' },
  backButton: { marginBottom: 10 },
  backText: { color: '#1E90FF', fontWeight: 'bold', fontSize: 16 },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  filterButton: { backgroundColor: '#ccc', padding: 10, margin: 5, borderRadius: 8 },
  selectedButton: { backgroundColor: 'green' },
  filterText: { color: '#000', fontWeight: '600' },
  selectedText: { color: '#fff' },
  resetButton: { backgroundColor: '#1E90FF', padding: 10, margin: 5, borderRadius: 8 },
  resetText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  course: { fontSize: 14, color: '#777', marginTop: 3 },
  desc: { fontSize: 14, color: '#555', marginTop: 3 },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#777',
  },
});
