import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View, ScrollView, Linking} from 'react-native';
import { Card } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';


export default function Home() {

  let YOUR_APP_ID = '5c278427';
  let YOUR_APP_KEY = '117789f2ba4c112f615c3f7bcd6dab21';

  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [snack, setSnack] = useState([]);

  //show recipes
 useEffect(() => {
   getBreakfast();
   getLunch();
   getDinner();
   getSnack();
 },[]);

 //fetch breakfast recipes
  const getBreakfast = () => {
    fetch(`https://api.edamam.com/search?q=breakfast&&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&mealType=breakfast&to=30`)
     .then(response => response.json())
     .then (data => {
       setBreakfast(data.hits);
    })
     .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  //fetch lunch recipes
  const getLunch = () => {
    fetch(`https://api.edamam.com/search?q=lunch&&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&mealType=lunch&to=30`)
     .then(response => response.json())
     .then (data => {
       setLunch(data.hits);
    })
     .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  //fetch dinner recipes
  const getDinner = () => {
    fetch(`https://api.edamam.com/search?q=dinner&&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&mealType=dinner&to=30`)
     .then(response => response.json())
     .then (data => {
       setDinner(data.hits);
    })
     .catch((error) => {
      Alert.alert('Error', error);
    });
  }

  //fetch snack recipes
  const getSnack = () => {
    fetch(`https://api.edamam.com/search?q=snack&&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&mealType=snack&to=30`)
     .then(response => response.json())
     .then (data => {
       setSnack(data.hits);
    })
     .catch((error) => {
      Alert.alert('Error', error);
    });
  }

    //breakfastcards 
    const brenderItem = ({ item }) => {
      return (
        
        <Card style={styles.card}>
          <Card.Image style={{width: 385, height: 250, marginLeft: 2}}
            source={{ uri: item.recipe.image }}>
              <Ionicons
                name='ios-book-outline'
                color='black'
                size={50}
                onPress={() => Linking.openURL(item.recipe.url)}
                style={{position: 'absolute', top: 5, left: 330,
                shadowOpacity:5, shadowColor: 'white'}}
              />
              <Text style={{ fontSize: 20, color: 'black',
                shadowOpacity: 5, shadowColor: 'white', 
                marginHorizontal: 12, marginTop: 10, width: 385, 
                height: 50, top: 190 }}>{item.recipe.label}</Text>
          </Card.Image>
        </Card>
      )
    }

    //lunchcards
    const lrenderItem = ({ item }) => {
      return (
        
        <Card style={styles.card}>
          <Card.Image style={{width: 385, height: 250, marginLeft: 2}}
            source={{ uri: item.recipe.image }}>
              <Ionicons
                name='ios-book-outline'
                color='black'
                size={50}
                onPress={() => Linking.openURL(item.recipe.url)}
                style={{position: 'absolute', top: 5, left: 330,
                shadowOpacity:5, shadowColor: 'white'}}
              />
              <Text style={{ fontSize: 20, color: 'black',
                shadowOpacity: 5, shadowColor: 'white', 
                marginHorizontal: 12, marginTop: 10, width: 385, 
                height: 50, top: 190 }}>{item.recipe.label}</Text>
          </Card.Image>
        </Card>
      )
    }

    //dinnercards
    const drenderItem = ({ item }) => {
      return (
        
        <Card style={styles.card}>
          <Card.Image style={{width: 385, height: 250, marginLeft: 2}}
            source={{ uri: item.recipe.image }}>
              <Ionicons
                name='ios-book-outline'
                color='black'
                size={50}
                onPress={() => Linking.openURL(item.recipe.url)}
                style={{position: 'absolute', top: 5, left: 330,
                shadowOpacity:5, shadowColor: 'white'}}
              />
              <Text style={{ fontSize: 20, color: 'black',
                shadowOpacity: 5, shadowColor: 'white', 
                marginHorizontal: 12, marginTop: 10, width: 385, 
                height: 50, top: 190 }}>{item.recipe.label}</Text>
          </Card.Image>
        </Card>
      )
    }

    //snackcards
    const srenderItem = ({ item }) => {
      return (
        
        <Card style={styles.card}>
          <Card.Image style={{width: 385, height: 250, marginLeft: 2}}
            source={{ uri: item.recipe.image }}>
              <Ionicons
                name='ios-book-outline'
                color='black'
                size={50}
                onPress={() => Linking.openURL(item.recipe.url)}
                style={{position: 'absolute', top: 5, left: 330,
                shadowOpacity:5, shadowColor: 'white'}}
              />
              <Text style={{ fontSize: 20, color: 'black',
                shadowOpacity: 5, shadowColor: 'white', 
                marginHorizontal: 12, marginTop: 10, width: 385, 
                height: 50, top: 190, left: -3 }}>{item.recipe.label}</Text>
          </Card.Image>
        </Card>
      )
    }

  return (
    <ScrollView> 
    <View style={styles.container}>
      <Text style={styles.h1}>Breakfast recipes</Text>
      <View style={styles.list}>
        <FlatList 
          data={breakfast}
          renderItem={brenderItem}
          keyExtractor={(item) => item.recipe.uri} 
          horizontal
        />
      </View>
      <Text style={styles.h1}>Lunch recipes</Text>
      <View style={styles.list}>
        <FlatList 
          data={lunch}
          renderItem={lrenderItem}
          keyExtractor={(item) => item.recipe.uri} 
          horizontal
        />
      </View>
      <Text style={styles.h1}>Dinner recipes</Text>
      <View style={styles.list}>
        <FlatList
          data={dinner}
          renderItem={drenderItem}
          keyExtractor={(item) => item.recipe.uri} 
          horizontal
        />
      </View>
      <Text style={styles.h1}>Snack recipes</Text>
      <View style={styles.list}>
        <FlatList
          data={snack}
          renderItem={srenderItem}
          keyExtractor={(item) => item.recipe.uri} 
          horizontal
        />
      </View>
      <StatusBar style="light" />
     </View> 
     </ScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    flex: 1, 
    backgroundColor: '#fff',
    marginHorizontal: -15,
    marginTop: 2,
   
  },
  card:{
    height: 200,
    width: 200,
    borderWidth: 2, 
    shadowOpacity:10, 
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 6,
    color: 'gray',
    marginTop: 10
  }
});
