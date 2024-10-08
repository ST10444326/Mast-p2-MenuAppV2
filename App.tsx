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
import { Picker } from '@react-native-picker/picker';  

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


const Stack = createStackNavigator<RootStackParamList>();


const courses = ['Soups', 'Appetizers', 'Main Course 1', 'Main Course 2', 'Dessert', 'Beverages'];

const App = function() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

 
  const addItem = (item: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, item]);
  };

  
  const HomeScreen = ({ navigation }: { navigation: any }) => {
    const total = menuItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
    const average = menuItems.length > 0 ? total / menuItems.length : 0;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Chef's Prepared Menu</Text>
        <Text style={styles.subtitle}>Total Items: {menuItems.length}</Text>
        <Text style={styles.subtitle}>Average Price: R{average.toFixed(2)}</Text>
        <FlatList
          data={menuItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemTitle}>{item.name} - {item.course}</Text>
              <Text>{item.description}</Text>
              <Text style={styles.priceText}>R{parseFloat(item.price).toFixed(2)}</Text>
            </View>
          )}
        />
        <TouchableOpacity onPress={() => navigation.navigate('AddItem', { addItem })}>
          <Text style={styles.button}>Add New Item</Text>
        </TouchableOpacity>
      </View>
    );
  };

  
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
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
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
