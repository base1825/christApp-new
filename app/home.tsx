import { useRouter } from 'expo-router';
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

const menuCategories = [
  { id: '1', name: 'Starters' },
  { id: '2', name: 'Mains' },
  { id: '3', name: 'Desserts' },
  { id: '4', name: 'Drinks' },
];

export default function Home() {
  const router = useRouter();

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

      {/* Buttons at bottom */}
      <View style={styles.buttonsContainer}>
        <Pressable style={styles.button} onPress={handleAddMenu}>
          <Text style={styles.buttonText}>Add Menu</Text>
        </Pressable>

        <Pressable
          style={[styles.button, { backgroundColor: '#1E90FF' }]}
          onPress={() => router.push('/filter')}
        >
          <Text style={styles.buttonText}>View Full Menu</Text>
        </Pressable>
      </View>
    </View>
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
    marginBottom: 15,
    width: '65%',
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
