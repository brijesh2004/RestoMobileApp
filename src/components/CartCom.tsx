import { FlatList, StyleSheet, Text, View, Image, Pressable, SafeAreaView } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DecreaseQuantity, IncreaseQuantity, RemoteCartItem } from '../redux/slice';

const CartCom = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cartData.cart);
  const totalPrice = useSelector((state: any) => state.cartData.totalPrice);

  const renderItem = ({ item }: any) => {
    return (
      <View>
        <View style={styles.item}>
          <View style={styles.itemfirst}>
            <View>
              <Image
                source={{ uri: `${item.image}` }}
                width={120}
                height={120}
                resizeMode='stretch'
              />
            </View>
            <View style={styles.itemName}>
              <Text>Name:</Text>
              <Text>{item.name}</Text>
            </View>
          </View>
          <View style={styles.itemSecond}>
            <View>
              <Text>Price:</Text>
              <Text>{item.price}</Text>
            </View>
            <View>
              <Text>Quantity:</Text>
              <Text>{item.numberOf}</Text>
            </View>
            <View>
              <Text>Total Price:</Text>
              <Text>{item.price * item.numberOf}</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.cartAdded}>
            <Pressable
              onPress={() => dispatch(DecreaseQuantity(item))}
              pointerEvents={item.numberOf === 1 ? 'none' : 'auto'}>
              <Text style={item.numberOf === 1 ? styles.dissable : styles.incrDecr}
              >-</Text>
            </Pressable>
            <Text>{item.numberOf}</Text>
            <Pressable
              onPress={() => dispatch(IncreaseQuantity(item))}>
              <Text style={styles.incrDecr}> +</Text>
            </Pressable>
            <Pressable
              onPress={() => dispatch(RemoteCartItem(item))}>
              <Text style={styles.removeCartBG}>X</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.bottomItem}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
      <View>
        <Text>Total Price: ${totalPrice}</Text>
      </View>
    </SafeAreaView>
  );
};

export default CartCom;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  itemfirst: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  itemSecond: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  itemName: {
    marginLeft: 5,
  },
  cartAdded: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 1,
    marginBottom:5,
    borderBottomWidth:1,
  },
  incrDecr: {
    width: 35,
    height: 35,
    backgroundColor: 'blue',
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  dissable: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#b3b3b3',
    fontSize: 20,
    marginLeft: 10,
    marginRight: 10,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  removeCartBG:{
    width: 35,
    height: 35,
    backgroundColor: 'red',
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
  },
  bottomItem:{
    marginBottom:100,
  }
});
