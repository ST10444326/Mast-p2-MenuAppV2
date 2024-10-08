import React, { useState, useEffect } from 'react';
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
import { Picker } from '@react-native-picker/picker';  // Picker library for course selection
//import { useFonts, Roboto_400Regular } from 'expo-google-fonts/roboto';  // Load custom fonts
import * as FileSystem from 'expo-file-system';
//import AppLoading from 'expo-app-loading' ;// Use expo-app-loading to handle loading screen

// Types for the menu item and stack navigation
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

// Create the Stack Navigator
const Stack = createStackNavigator<RootStackParamList>();

// Predefined courses
const courses = ['Soups', 'Appetizers', 'Main Course 1', 'Main Course 2', 'Dessert', 'Beverages'];

const App: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  // Load custom font (example: Google Font)
  //let [fontsLoaded] = useFonts({
  //  Roboto_400Regular,
  //});

  // Load menu items from file system (mock loading if required)
  useEffect(() => {
    loadMenu();
  }, []);

  // Fallback to loading screen while fonts are being loaded
  //if (!fontsLoaded) {
  //  return <AppLoading />;
  //}

  // Add a menu item
  const addItem = (item: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, item]);
  };

  // Load menu items (mock example, you can add file loading logic here)
  const loadMenu = async () => {
    // Example mock data
    const mockItems: MenuItem[] = [
      { name: 'Chicken & Corn', description: 'Blended chicken and corn', course: 'Soups', price: '22' },
      { name: 'Butternut', description: 'Blended butternut with cinnamon', course: 'Soups', price: '25' },
      { name: 'Grilled Chicken Salad', description: 'Grilled chicken with dressing', course: 'Appetizers', price: '33' },
      { name: 'Smoked Salmon Salad', description: 'Smoked salmon with Quinoa dressing', course: 'Appetizers', price: '42' },
      { name: 'Mixed Grill Combo', description: 'Variety of meat', course: 'Main Course 1', price: '185' },
      { name: 'Mediterranean Seafood Boil', description: 'Mix of various seafood and veggies', course: 'Main Course 2', price: '105' },
    ];
    setMenuItems(mockItems);
  };

  // HomeScreen to display menu items and total count
  const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chef's Prepared Menu</Text>
        <Text style={styles.subtitle}>Total Items: {menuItems.length}</Text>
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.name} - {item.course}</Text>
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
  };

  // AddItemScreen for adding new menu items
  const AddItemScreen = ({ navigation, route }: any) => {
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    //fontFamily: 'Roboto_400Regular',  
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  item: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  itemTitle: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    padding: 10,
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 5,
    marginTop: 10,
    width: '100%',
  },
});

export default App;
