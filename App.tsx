import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';  // Picker moved to @react-native-picker/picker

// Define the types for MenuItem and stack parameters
type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: string;
};

type RootStackParamList = {
  Home: undefined;
  AddItem: { addItem: (item: MenuItem) => void };
};

// Create Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

const courses = ['Starters', 'Mains', 'Dessert'];

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const addItem = (item: MenuItem) => {
    setMenuItems([...menuItems, item]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="AddItem"
          component={AddItemScreen}
          options={{ title: 'Add Menu Item' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );

  // HomeScreen
  function HomeScreen({ navigation }: { navigation: any }) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chef's Menu</Text>
        <Text style={styles.subtitle}>Total Items: {menuItems.length}</Text>
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>
                {item.name} - {item.course}
              </Text>
              <Text>{item.description}</Text>
              <Text>Price: ${item.price}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddItem', { addItem })}>
          <Text style={styles.button}>Add New Item</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // AddItemScreen
  function AddItemScreen({ navigation, route }: any) {
    const { addItem } = route.params;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState(courses[0]);
    const [price, setPrice] = useState('');

    const handleAddItem = () => {
      if (!name || !description || !price) {
        alert('All fields are required.');
        return;
      }

      addItem({ name, description, course, price });
      navigation.goBack();
    };

    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Dish Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <Picker
          selectedValue={course}
          onValueChange={(itemValue) => setCourse(itemValue)}
          style={styles.input}
        >
          {courses.map((course, index) => (
            <Picker.Item key={index} label={course} value={course} />
          ))}
        </Picker>

        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
          keyboardType="numeric"
        />
        <Button title="Add Item" onPress={handleAddItem} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
});

export default App;
