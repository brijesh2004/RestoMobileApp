import { StyleSheet, Text, View ,Image, Pressable} from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'
import AddToCart from './AddToCart';

type propsItem =  PropsWithChildren<{
    id:number;
    imageUrl:string,
    item:string,
    price:number
}>;
const FoodItem = ({id,imageUrl , item , price}:propsItem) => {
    
    const elem = {id, imageurl:imageUrl,name:item ,price};
    return (
        <>
            <View style={styles.imageView}>
                <Image
                    source={{ uri: `${imageUrl}`}}
                    style={styles.imageStyle}
                    resizeMode='stretch'
                />
                <Text style={styles.item}> {item}</Text>
                <View style={styles.price}>
                    <Text>Price :</Text>
                    <Text>{price} ₹</Text>
                </View>
                <AddToCart elem={elem}/>
            </View>
        </>
    )
}

export default FoodItem

const styles = StyleSheet.create({
    imageView: {
        borderWidth: 1,
        borderRadius: 10,
        margin:10,
        width:170,
        justifyContent:'center'
    },
    imageStyle: {
        width: 150,
        height: 150,
        margin: 5
    },
    price: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    item: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 800,
        fontStyle: 'italic'
    },
    addToCart:{
        width:169,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#7CEC9F',
        height:40,
        borderRadius:10,
    },
    addToCartText:{
     textAlign:'center'
    }
})