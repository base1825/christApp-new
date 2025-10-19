import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';
import uuid from 'react-native-uuid';
import { useMenu } from '../MenuContext';

export default function AddMenu() {
  const router = useRouter();
  const { menu, addDish, removeDish } = useMenu();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<'Starter' | 'Main' | 'Dessert' | 'Drink' | ''>('');
  const [price, setPrice] = useState('');

  const courses = ['Starter', 'Main', 'Dessert', 'Drink'];

  const handleAdd = () => {
    if (!name || !description || !course || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    addDish({
      id: uuid.v4().toString(),
      name,
      description,
      course,
      price: parseFloat(price),
    });

    Alert.alert('Success', 'Dish added successfully!');
    setName('');
    setDescription('');
    setCourse('');
    setPrice('');
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </Pressable>

      <Text style={styles.title}>Add a New Dish</Text>

      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Price ($)"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Select Course:</Text>
      <FlatList
        data={courses}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.courseButton, course === item && styles.selectedCourse]}
            onPress={() => setCourse(item as any)}
          >
            <Text style={styles.courseText}>{item}</Text>
          </Pressable>
        )}
        showsHorizontalScrollIndicator={false}
      />

      <Pressable style={styles.addButton} onPress={handleAdd}>
        <Text style={styles.addText}>Add Dish</Text>
      </Pressable>

      {/* Display Added Dishes */}
      <FlatList
        data={menu}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <View style={styles.dishItem}>
            <Text style={styles.dishText}>
              {item.name} (${item.price}) - {item.course}
            </Text>
            <Pressable
              style={styles.removeButton}
              onPress={() => removeDish(item.id)}
            >
              <Text style={styles.removeText}>Remove</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#146d20ff' },
  backButton: { marginBottom: 10 },
  backText: { color: '#1E90FF', fontWeight: 'bold' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, color: '#ffffffff' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#bea96cff',
  },
  label: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: '#fff' },
  courseButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginRight: 10,
  },
  selectedCourse: { backgroundColor: 'lightblue' },
  courseText: { color: '#d3a973ff', fontWeight: '600' },
  addButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
  },
  addText: { color: '#1fa8a1ff', fontSize: 16, fontWeight: 'bold' },
  dishItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#37a899ff',
    borderRadius: 8,
    marginBottom: 10,
  },
  dishText: { fontSize: 16, fontWeight: '500' },
  removeButton: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeText: { color: '#fff', fontWeight: 'bold' },
});
