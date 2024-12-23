import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import Navbar from './Navbar';
import CartCom from '../components/CartCom';
import { useDispatch, useSelector } from 'react-redux';
import { configData } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EmptyCartItem } from '../redux/slice';

type orderDataType = {
  name: string;
  table: number | null;
};

const Cart = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const login = useSelector((data: any) => data.cartData.login);
  const cart = useSelector((data: any) => data.cartData.cart);
  const [loading , setLoading] = useState(false);
  const [orderData, setOrderData] = useState<orderDataType>({ name: '', table: null });

  const onChangeTextInput = (name: string, value: string | number) => {
    setOrderData((prevData: orderDataType) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const OrderIt=async ()=>{
    setLoading(true);
    try{
    const {name , table} = orderData;
    if(!name || !table || cart.length===0){
      Alert.alert("Fill all the fields or add item to cart");
      return;
    }
    let token = await AsyncStorage.getItem("restotoken");
    if(!token){
      token='';
    }
    const res = await fetch(`${configData.uri}/order` , {
      method:'POST',
      credentials:'include',
      headers:{
        "Content-Type":'application/json',
        "x-access-token":token,
      },
      body:JSON.stringify({
        cart , name , table
      })
    })
    if(res.status!==201){
      Alert.alert("Error");
    }
    else{
      dispatch(EmptyCartItem());
      Alert.alert("Ordered");
      setOrderData({name:'',table:null});
    }
  }
catch(error){
  Alert.alert("Error");
}
finally{
  setLoading(false);
}
}

  return (
    <View style={styles.container}>
      {/* FlatList from CartCom will handle scrolling */}
      <View style={styles.cartComContainer}>
        <CartCom />
      </View>
      {/* Form Section */}
      <View style={styles.formContainer}>
        <Text style={styles.labelText}>Name: </Text>
        <TextInput
          onChangeText={(value: string) => onChangeTextInput('name', value)}
          value={orderData.name}
          style={styles.inputText}
          placeholder="Enter Name"
          placeholderTextColor="black"
        />
        <Text style={styles.labelText}>Table Number:</Text>
        <TextInput
          onChangeText={(value: string) => onChangeTextInput('table', Number(value))}
          value={orderData.table !== null ? String(orderData.table) : ''}
          style={styles.inputText}
          keyboardType="number-pad"
          placeholder="Enter Table Number"
          placeholderTextColor="black"
        />
        {login ? (
          <Pressable
          onPress={OrderIt}>
            {loading?
            <ActivityIndicator size="large"/>
            :
            <Text style={styles.orderText}>Order</Text>
            }
          </Pressable>
        ) : (
          <Text style={styles.logintoorder}>Login to Order</Text>
        )}
      </View>
      {/* Navbar Section */}
      <View style={styles.navbarContainer}>
        <Navbar navigation={navigation} />
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartComContainer: {
    flex: 1, // Allow CartCom to take up the available space
  },
  formContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  inputText: {
    margin: 10,
    width: '90%',
    borderWidth: 2,
    borderRadius: 5,
    color: 'black',
    alignSelf: 'center',
    padding: 8,
  },
  labelText: {
    marginHorizontal: 16,
    marginTop: 10,
    fontSize: 16,
  },
  orderText: {
    width: '50%',
    backgroundColor: 'blue',
    margin: 10,
    height: 40,
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    color: 'white',
    paddingVertical: 6,
  },
  logintoorder: {
    width: '50%',
    backgroundColor: 'red',
    margin: 10,
    height: 40,
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    color: 'white',
    paddingVertical: 6,
  },
  navbarContainer: {
    height: 60,
    justifyContent: 'flex-end',
  },
});
