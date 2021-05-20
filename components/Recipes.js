import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView, Linking } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Recipes() {

  let YOUR_APP_ID = '5c278427';
  let YOUR_APP_KEY = '117789f2ba4c112f615c3f7bcd6dab21';

  const [recipes, setRecipes] = useState([]);
  const [ing, setIng] = useState('');
  const [favorite, setFavorite] = useState(recipes.isFavorite);
  
  const editFavorite = (item) => {
    setFavorite(!favorite)
  }

  //fetch recipes
  const getRecipes = () => {
    fetch(`https://api.edamam.com/search?q=${ing}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&to=30`)
     .then(response => response.json())
     .then (data => {
       setRecipes(data.hits);
    })
     .catch((error) => {
      Alert.alert('Error', error);
    });
  }

    //recipecards 
    const renderItem = ({ item }) => {
      return (
        <Card style={styles.card}>
          <Card.Image style={{width: 385, height: 250}}
            source={{ uri: item.recipe.image }}>
              <Ionicons
                name={favorite === true ? 'heart' : 'heart-outline'}
                color={favorite === true ? 'pink' : 'black'}
                size={50}
                onPress={() => editFavorite(item)}
                style={{position: 'absolute', top: 195, left: 330}}
              />
          </Card.Image>
          <Text style={styles.label}>{item.recipe.label}</Text>
          <Card.Divider/>
          <Text style={styles.text}>Number of servings: {item.recipe.yield}</Text>
          <Text style={styles.text}>Ingredients:</Text>
          <ScrollView>
                {item.recipe.ingredientLines.map((ingredient, index) => (
                  <ListItem key={index} >
                    <Text style={styles.ing}>
                     - {ingredient}
                    </Text>
                  </ListItem>    
                ))}
            </ScrollView>
            <Card.Divider/>
            <FontAwesome.Button 
                  backgroundColor='gray'
                  name='arrow-right'
                  color='white'
                  size={20} 
                  onPress={() => Linking.openURL(item.recipe.url)}
                  >Check the recipe</FontAwesome.Button>
        </Card>
      )
    }
  
  return (
    <KeyboardAvoidingView 
    enabled behavior={Platform.OS === 'ios'? 'padding': 'height'} 
    style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.h1}>Find a new recipe</Text>
        <TextInput style={styles.input}
         placeholder="E.g. mango, pizza.."
         onChangeText={ing => setIng(ing)}
         value={ing}
        />
        <FontAwesome.Button name="search" backgroundColor="gray" onPress={getRecipes}>
           Seach recipes
        </FontAwesome.Button>
      <View style={styles.list}>
        <FlatList 
          style={{width: '100%'}}
          data={recipes}
          renderItem={renderItem}
          keyExtractor={(item) => item.recipe.uri} 
        />
        </View>
      <StatusBar style="light" />
     </View> 
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 10,
    marginBottom: 5,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 3
  },
  text: {
    fontSize: 18,
    marginHorizontal: 12,
    marginTop: 10,
    color: 'gray',
  },
  label:{
    fontSize: 20,
    color: 'gray',
    marginHorizontal: 12,
    marginTop: 10,
  },
  list: {
    flex: 1, 
    backgroundColor: '#fff',
    marginHorizontal: -15,
    marginTop: 25
  },
  card:{
    paddingHorizontal: 10,
    paddingVertical: 10, 
    borderWidth: 2, 
    shadowOpacity:10,
  },
  ing:{
    fontSize: 14,
    marginHorizontal: 12,
    marginTop: 2,
    color: 'gray',
  },
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 6,
    color: 'gray'
  },
 
});
