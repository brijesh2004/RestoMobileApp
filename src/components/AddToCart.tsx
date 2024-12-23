import { Button, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, DecreaseQuantity, IncreaseQuantity } from '../redux/slice';


const AddToCart = ({elem}:any) => {
    const dispatch = useDispatch();
    const cart = useSelector((data:any) => data.cartData.cart);
    const cartItem = cart.find((cartitem:any)=>cartitem.id===elem.id);
    
  return (
    <View>
      {
        cartItem?(
            <View style={styles.cartAdded}>
               <Pressable
                onPress={()=>dispatch(DecreaseQuantity(elem))}
                pointerEvents={cartItem.numberOf===1?'none':'auto'}>
                <Text style={cartItem.numberOf===1?styles.dissable:styles.incrDecr}
                >-</Text>
              </Pressable>
              <Text>{cartItem.numberOf}</Text>
              <Pressable
              onPress={()=>dispatch(IncreaseQuantity(elem))}>
                <Text style={styles.incrDecr}> +</Text>
              </Pressable>
            </View>
        ):(
            <View>
                <Button
                onPress={()=>dispatch(addToCart(elem))}
                title='Add To Cart'/>
            </View>
        )
      }
    </View>
  )
}

export default AddToCart

const styles = StyleSheet.create({
    cartAdded:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginLeft:1,
    },
    incrDecr:{
        width:35,
        height:35,
        backgroundColor:'blue',
        fontSize:20,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
        justifyContent:'center',
        marginLeft:10,
        marginRight:10,
        borderRadius:20,
    },
    dissable:{
        width:35,
        height:35,
        borderRadius:20,
        backgroundColor:'#b3b3b3',
        fontSize:20,
        marginLeft:10,
        marginRight:10,
        color:'white',
        fontWeight:'bold',
        textAlign:'center',
    }
})