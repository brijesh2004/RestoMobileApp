import {  Alert, Button, FlatList, Image, StyleSheet, Text, View , ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { configData } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ProfileDataType = {
  photo: string;
  name: string;
  email: string;
};

type CartItemType = {
  id: string;
  image: string;
  name: string;
  numberOf: number;
  price: string;
  _id: string;
};

type OrderType = {
  name: string;
  table: string;
  orderedAt: string;
  cart: CartItemType[];
  _id: string;
};

const ProfileCom = ({ navigation }: any) => {
  const [profile, setProfile] = useState<ProfileDataType | null>(null);
  const [yourOrder, setYourOrder] = useState<OrderType[]>([]);
  const [isLoading , setLoading] = useState<boolean>(false);

  const profileData = async () => {
    try {
      let token = await AsyncStorage.getItem('restotoken');
      if (!token) token = '';

      const res = await fetch(`${configData.uri}/profiledata`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      const data = await res.json();
      if (res.status === 401 || !data) {
        Alert.alert('Data Not Found');
        navigation.replace('Login');
      } else {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      Alert.alert('Error fetching profile data.');
    }
  };

  const getOrder = async () => {
    try {
      setLoading(true);
      let token = await AsyncStorage.getItem('restotoken');
      if (!token) token = '';

      const res = await fetch(`${configData.uri}/gettheorder`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
      });

      const data = await res.json();
      if (data?.mess) {
        setYourOrder(data.mess);
      } else {
        Alert.alert('No orders found.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error fetching orders.');
    }
    finally{
        setLoading(false);
    }
  };

  useEffect(() => {
    profileData();
  }, []);

  const renderFooter = ()=>{
    if(!isLoading) return null;
    return <ActivityIndicator size="large"/>
  }

  const renderHeader = () => (
    <>
      {profile ? (
        <View style={styles.profileContent}>
          <Image
            source={{ uri: profile.photo }}
            style={styles.profileImage}
          />
          <Text style={styles.profileText}>Name: {profile.name}</Text>
          <Text style={styles.profileText}>Email: {profile.email}</Text>
        </View>
      ):
      <ActivityIndicator size="large" />
      }
      <Button onPress={getOrder} title="Get Orders" />
    </>
  );

  const renderOrderItem = ({ item }: { item: OrderType }) => {
    const orderedAtDate = new Date(item.orderedAt);
    const formattedDate = orderedAtDate.toISOString().slice(0, 10);
    const formattedTime = orderedAtDate.toTimeString().slice(0, 5);

    return (
      <View style={styles.orderContainer} key={item._id}>
        <Text style={styles.orderText}>Name: {item.name}</Text>
        <Text style={styles.orderText}>Table: {item.table}</Text>
        <Text style={styles.orderText}>Ordered At: {formattedDate} {formattedTime}</Text>

        <FlatList
          data={item.cart}
          keyExtractor={(cartItem) => cartItem._id}
          renderItem={({ item: cartItem }) => (
            <View style={styles.cartItem} key={cartItem._id}>
              <View style={styles.cartTextContainer}>
                <Text style={styles.cartText}>Dish: {cartItem.name}</Text>
                <Text style={styles.cartText}>Price: {cartItem.price} ₹</Text>
                <Text style={styles.cartText}>Quantity: {cartItem.numberOf}</Text>
              </View>
              <Image
                source={{ uri: cartItem.image }}
                style={styles.cartImage}
              />
            </View>
          )}
          numColumns={1}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={yourOrder}
      keyExtractor={(item) => item._id}
      renderItem={renderOrderItem}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.listContent}
      ListFooterComponent={renderFooter}
    />
  );
};

export default ProfileCom;

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 20, // Add some padding at the bottom
  },
  profileContent: {
    marginTop: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  orderContainer: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  orderText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-between',
  },
  cartTextContainer: {
    flex: 1,
  },
  cartText: {
    fontSize: 14,
    marginBottom: 5,
  },
  cartImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginLeft: 10,
  },
});
