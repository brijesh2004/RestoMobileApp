import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { configData } from '../config';
import FoodItem from './FoodItem';
import { ActivityIndicator } from 'react-native';

interface BreakFastType {
    id: number;
    name: string;
    imageurl: string;
    price: number;
}

const BreakFask = () => {
    const [breakfastData, setBreakFastData] = useState<BreakFastType[]>([]);

    const BreakFastFun = async () => {
        try {
            const res = await fetch(`${configData.uri}/breakfast`);
            const data = await res.json();
            setBreakFastData(data);
        } catch (error) {
            Alert.alert("Error");
        }
    };

    const LoadingBar = ()=>{
        <ActivityIndicator size="large"/>
    }

    useEffect(() => {
        BreakFastFun();
    }, []);

    return (
        <View style={styles.item}>
            {breakfastData.length===0 && <ActivityIndicator size="large"/>}
            <FlatList
                data={breakfastData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <>
                    <FoodItem imageUrl={item.imageurl} id={item.id} item={item.name} price={item.price} />
                    </>
                )}
                numColumns={2}
                key={'column_2'}
            />
        </View>
    );
};

export default BreakFask;



const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        marginBottom: 100,
    }
})