import * as React from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const menuCategories = [
  { id: '1', name: 'Starters' },
  { id: '2', name: 'Mains' },
  { id: '3', name: 'Desserts' },
  { id: '4', name: 'Drinks' },
];

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

      {/* Category boxes */}
      <FlatList
        data={menuCategories}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 15 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => {
              if (item.name === 'Starters') router.push('/filter?course=Starter');
              if (item.name === 'Mains') router.push('/filter?course=Main');
              if (item.name === 'Desserts') router.push('/filter?course=Dessert');
              if (item.name === 'Drinks') router.push('/filter?course=Drink');
            }}
          >
            <Text style={styles.cardText}>{item.name}</Text>
          </Pressable>
        )}
      />

      {/* Buttons Row */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionButton, styles.addButton]} onPress={addMenuItem}>
          <Text style={styles.actionText}>Add Dish</Text>
        </TouchableOpacity>

        <Pressable
          style={[styles.button, { backgroundColor: '#1E90FF' }]}
          onPress={() => router.push('/filter')}
        >
          <Text style={styles.buttonText}>View Full Menu</Text>
        </Pressable>
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
  container: { flex: 1, padding: 20, backgroundColor: '#329759ff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  card: {
    width: '48%',
    backgroundColor: '#f4f4f4',
    borderRadius: 15,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  cardText: { fontSize: 18, fontWeight: '600', color: '#333' },
  buttonsContainer: { marginTop: 25, width: '100%', alignItems: 'center' },
  button: {
    backgroundColor: 'green',
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
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
