import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type MenuItem = {
  id: string;
  name: string;
  description: string;
  course: string;
  price: string;
};

const courses = ['Starters', 'Main', 'Desserts', 'Drinks'];

export default function HomeScreen() {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [course, setCourse] = React.useState('Main');
  const [price, setPrice] = React.useState('');
  const [menuList, setMenuList] = React.useState<MenuItem[]>([]);

  const addMenuItem = () => {
    if (!name.trim() || !price.trim()) return;
    const newItem: MenuItem = {
      id: Date.now().toString(),
      name,
      description,
      course,
      price,
    };
    setMenuList([...menuList, newItem]);
    setName('');
    setDescription('');
    setCourse('Main');
    setPrice('');
  };

  const cancelMenu = () => {
    setMenuList([]); // clear all dishes
  };

  // Calculate total price
  const total = menuList.reduce((sum, item) => sum + parseFloat(item.price || '0'), 0);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🍽️ Christ App Menu</Text>

      {/* Course Buttons */}
      <View style={styles.courseRow}>
        {courses.map((c) => (
          <TouchableOpacity
            key={c}
            style={[styles.courseButton, course === c && styles.courseButtonActive]}
            onPress={() => setCourse(c)}
          >
            <Text style={[styles.courseButtonText, course === c && styles.courseButtonTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Top Inputs Row */}
      <View style={styles.topRow}>
        <TextInput
          style={[styles.smallInput, { flex: 1, marginRight: 10 }]}
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.smallInput, { flex: 1 }]}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Price Input */}
      <Text style={styles.label}>Price (R)</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      {/* Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={addMenuItem}>
          <Text style={styles.actionText}>Add Dish</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={cancelMenu}>
          <Text style={styles.actionText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <Text style={styles.subtitle}>Menu List</Text>
      {menuList.length === 0 ? (
        <Text style={styles.emptyText}>No dishes added yet.</Text>
      ) : (
        <FlatList
          data={menuList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.menuCard}>
              <Text style={styles.menuName}>{item.name} - R{item.price}</Text>
              <Text style={styles.menuCourse}>{item.course}</Text>
              {item.description ? <Text style={styles.menuDescription}>{item.description}</Text> : null}
            </View>
          )}
        />
      )}

      {/* Total Section */}
      {menuList.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R{total.toFixed(2)}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#3b8531ff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#fff' },

  courseRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  courseButton: {
    flex: 1,
    padding: 10,
    backgroundColor: '#a3d9a5',
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  courseButtonActive: { backgroundColor: '#71c4cfff' },
  courseButtonText: { fontWeight: '600', color: '#333' },
  courseButtonTextActive: { color: '#fff', fontWeight: 'bold' },

  topRow: { flexDirection: 'row', marginBottom: 15 },
  smallInput: {
    borderWidth: 1,
    borderColor: '#8aa34fff',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#63b67cff',
  },

  label: { fontSize: 16, marginBottom: 5, fontWeight: '600', color: '#fff' },
  input: {
    borderWidth: 1,
    borderColor: '#798557ff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#6ba782ff',
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  addButton: { backgroundColor: 'darkgreen' },
  cancelButton: { backgroundColor: '#b03030' },
  actionText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  subtitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
  emptyText: { fontSize: 16, fontStyle: 'italic', color: '#ddd' },

  menuCard: {
    backgroundColor: '#dfd793ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  menuName: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  menuCourse: { fontSize: 14, fontStyle: 'italic', color: '#666', marginBottom: 5 },
  menuDescription: { fontSize: 14, color: '#333' },

  totalContainer: {
    marginTop: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ffffffaa',
    alignItems: 'center',
  },
  totalText: { fontSize: 20, fontWeight: 'bold', color: 'darkgreen' },
});
