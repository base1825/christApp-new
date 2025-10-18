import { Picker } from '@react-native-picker/picker';
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
import { Dish, useMenu } from '../MenuContext';

export default function AddMenu() {
  const router = useRouter();
  const { menu, addDish, removeDish } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState<Dish['course']>('Starter');
  const [price, setPrice] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const handleAdd = () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue)) {
      Alert.alert('Error', 'Invalid price');
      return;
    }
    const newDish: Dish = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price: priceValue,
    };
    addDish(newDish);
    setName('');
    setDescription('');
    setCourse('Starter');
    setPrice('');
    Alert.alert('Success', `${newDish.name} added to ${course}!`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </Pressable>

      <Text style={styles.title}>Add a Dish</Text>

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

      <Text style={{ marginBottom: 5 }}>Course</Text>
      <Picker
        selectedValue={course}
        onValueChange={(itemValue) => setCourse(itemValue as Dish['course'])}
        style={styles.input}
      >
        <Picker.Item label="Starter" value="Starter" />
        <Picker.Item label="Main" value="Main" />
        <Picker.Item label="Dessert" value="Dessert" />
        <Picker.Item label="Drink" value="Drink" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Pressable style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Save Dish</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: '#555', marginTop: 10 }]}
        onPress={() => setShowMenu(!showMenu)}
      >
        <Text style={styles.buttonText}>{showMenu ? 'Hide Menu' : 'View Menu'}</Text>
      </Pressable>

      {showMenu && (
        <View style={{ marginTop: 20 }}>
          <FlatList
            data={menu}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.name} (${item.price})</Text>
                <Text style={styles.courseText}>
                  {item.course} — {item.description}
                </Text>
                <Pressable style={styles.removeButton} onPress={() => removeDish(item.id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </Pressable>
              </View>
            )}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#06611dff' },
  backButton: { marginBottom: 10 },
  backText: { color: '#1E90FF', fontWeight: 'bold' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' },
  itemText: { fontSize: 18, fontWeight: 'bold' },
  courseText: { fontSize: 14, color: 'gray' },
  removeButton: { backgroundColor: 'red', padding: 8, borderRadius: 6, marginTop: 5, alignSelf: 'flex-start' },
  removeText: { color: '#fff', fontWeight: 'bold' },
});
