import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import uuid from 'react-native-uuid';
import { useMenu } from '../content/MenuContext';

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

  // Calculate total items 
  const totalItems = menu.length;
  const totalPrice = menu.reduce((sum, dish) => sum + dish.price, 0);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.title}>🍽️ Add New Dish</Text>

        {/* Form */}
        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          placeholderTextColor="#555"
        />
        <TextInput
          style={styles.input}
          placeholder="Price ($)"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
          placeholderTextColor="#555"
        />

        <Text style={styles.label}>Select Course:</Text>
        <FlatList
          data={courses}
          horizontal
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.courseButton,
                course === item && styles.selectedCourse,
              ]}
              onPress={() => setCourse(item as any)}
            >
              <Text
                style={[
                  styles.courseText,
                  course === item && styles.selectedCourseText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 5 }}
        />

        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>+ Add Dish</Text>
        </Pressable>

        {/* Menu Header */}
        <View style={styles.menuHeader}>
          <Text style={styles.subTitle}>Your Menu</Text>
          <Text style={styles.totalText}>
            Total Items: {totalItems} | 
            Total Price: ${totalPrice.toFixed(2)}
          </Text>
        </View>

        {menu.length === 0 ? (
          <Text style={styles.emptyText}>No dishes yet. Add your first one!</Text>
        ) : (
          <FlatList
            data={menu}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.dishItem}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.dishName}>
                    {item.name} (${item.price})
                  </Text>
                  <Text style={styles.dishDetails}>
                    {item.course} · {item.description}
                  </Text>
                </View>
                <Pressable
                  style={styles.removeButton}
                  onPress={() => removeDish(item.id)}
                >
                  <Text style={styles.removeText}>Remove</Text>
                </Pressable>
              </View>
            )}
          />
        )}
      </ScrollView>

      {/* Bottom Buttons */}
      <View style={styles.bottomButtons}>
        <Pressable style={styles.bottomButton} onPress={() => router.push('/filter')}>
          <Text style={styles.bottomButtonText}>Filter</Text>
        </Pressable>
        <Pressable style={[styles.bottomButton, { backgroundColor: '#555' }]} onPress={() => router.back()}>
          <Text style={styles.bottomButtonText}>⬅ Back</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#3e9e2bff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1C3F2E', marginBottom: 15 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  label: { fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  courseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    marginRight: 10,
  },
  selectedCourse: { backgroundColor: '#1E90FF' },
  courseText: { color: '#333', fontWeight: '600' },
  selectedCourseText: { color: '#fff' },
  addButton: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  addText: { color: '#fff', fontSize: 17, fontWeight: 'bold' },

  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  subTitle: { fontSize: 20, fontWeight: 'bold', color: '#1C3F2E' },
  totalText: { fontSize: 16, color: '#555', fontWeight: '600' },

  emptyText: { color: '#777', fontSize: 16, textAlign: 'center' },
  dishItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dishName: { fontSize: 17, fontWeight: 'bold', color: '#2E8B57' },
  dishDetails: { color: '#666', fontSize: 14 },
  removeButton: {
    backgroundColor: '#E63946',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  removeText: { color: '#fff', fontWeight: 'bold' },

  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  bottomButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
