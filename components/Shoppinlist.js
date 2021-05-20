import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput,  View, KeyboardAvoidingView} from 'react-native';
import { Card} from 'react-native-elements';
import firebase from '../Firebase';
import { FontAwesome } from '@expo/vector-icons';

export default function Shoppinglist() {

  const [product, setProduct] = useState('');
  const [amount, setAmount] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    firebase.database().ref('list/').on('value', snapshot => {
      const data = snapshot.val();
      const products = Object.values(data);
      setList(products);
      setProduct('');
      setAmount('');
    });
  }, []);
  
  saveItem = () => {
    if (product && amount) {
  firebase.database().ref('list/').push(
    {'product': product, 'amount': amount}
    );
  }
  else {
    Alert.alert('Error', 'Type product and amount first');
  }
  }

  const deleteItem = () => {
    firebase.database().ref("list/")
      .once("value").then((snapshot) => {
        snapshot.forEach((item) => {
          return firebase.database().ref("list").child(item.key).remove();
        });
      });
  };

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.card}>
        <View style={{flexDirection: 'row'}}>
        <Text style={styles.text}>{item.product} {item.amount}</Text>
        <FontAwesome 
          name='trash'
          size={30}
          color='gray'
          onPress={(item) =>deleteItem(item)}/>
        </View>
      </Card>   
    )
  }

return (
  <KeyboardAvoidingView 
    enabled behavior={Platform.OS === 'ios'? 'padding': 'height'} 
    style={styles.container}
    >
     <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.h1}>Shopping list</Text>
      <Text style={styles.text}>Add products to your shopping list for the recipes!</Text>
      <TextInput 
        style={styles.input}
        placeholder='add product'
        onChangeText={product => setProduct(product)}
        value={product}
        />
        <TextInput 
        style={styles.input}
        placeholder='add amount'
        onChangeText={amount => setAmount(amount)}
        value={amount}
        />
       <FontAwesome.Button name="save" backgroundColor="gray" onPress={saveItem}>
           Save new product
        </FontAwesome.Button>
      
      <FlatList
        data={list}
        keyExtractor={((item, index) => index.toString())}
        renderItem={renderItem}   
      />
      
    </View>
   </KeyboardAvoidingView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  h1: {
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 6,
    color: 'gray'
  },
});