import { Alert, FlatList, StyleSheet, Text, View , ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { configData } from '../config';
import FoodItem from './FoodItem';

interface LunchType {
  id: number;
  name: string;
  imageurl: string; 
  price: number;
}

const Lunch = () => {
  const [lunchData, setLunchData] = useState<LunchType[]>([]);

  const BreakFastFun = async () => {
    try {
      const res = await fetch(`${configData.uri}/lunch`);
      const data = await res.json();
      setLunchData(data);
    } catch (error) {
      Alert.alert("Error");
    }
  };

  useEffect(() => {
    BreakFastFun();
  }, []);

  return (
    <View style={styles.item}>
        {lunchData.length===0 && <ActivityIndicator size="large"/>}
      <FlatList
      data={lunchData} 
      keyExtractor={(item)=>item.id.toString()}
      renderItem={({item})=>(
        <FoodItem imageUrl={item.imageurl} id={item.id} item={item.name} price={item.price} />
      )}
      numColumns={2}
      key={'column_2'}
      />
    </View>
  );
};

export default Lunch;



const styles = StyleSheet.create({
    item:{
        alignItems:'center',
        marginBottom:100,
       }
})