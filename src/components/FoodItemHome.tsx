import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { PropsWithChildren } from 'react'

type propsItem =  PropsWithChildren<{
    id:number;
    imageUrl:string,
    item:string,
    price:number
}>;
const FoodItemHome = ({id,imageUrl , item , price}:propsItem) => {
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
            </View>
        </>
    )
}

export default FoodItemHome

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