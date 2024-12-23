import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logind } from '../redux/slice';

const Navbar = ({navigation}:any) => {
    const dispatch =useDispatch();
    const login = useSelector((data:any)=>data.cartData.login);

    const setLogin = async () =>{
        const token =await AsyncStorage.getItem("restotoken");
        if(!token){
            dispatch(Logind(false));
        }
        else{
            dispatch(Logind(true));
        }
    }

    useEffect(()=>{
      setLogin();
    } ,[login]);
    return (
        <View style={styles.navbar}>
            <View style={styles.fixedFooter}>
                <View style={styles.footerText}>
                    <Pressable
                    onPress={()=>navigation.navigate("Home")}>
                    <Text style={styles.footerItem}>
                        <Icon name="home" size={30} color="#900"/>
                    </Text>
                    </Pressable>
                    <Pressable
                    onPress={()=>navigation.navigate("Cart")}>
                    <Text style={styles.footerItem}>
                        <Icon name='cart-arrow-down' size={30} color="#900"/>
                    </Text>
                    </Pressable>
                    <Pressable
                    onPress={()=>navigation.navigate('Items')}>
                    <Text style={styles.footerItem}>
                    <Icon name='sitemap' size={30} color="#900"/>
                    </Text>
                    </Pressable>
                    <Pressable
                    onPress={()=>{
                        login?
                        navigation.navigate('Profile'):
                        navigation.navigate('Login')
                    }
                    }>
                    <Text style={styles.footerItem}>
                        {
                            login?<Icon name='user' size={30} color="#900"/>:
                            <Icon name='user-plus' size={30} color="#900"/>
                        }
                    </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default Navbar

const styles = StyleSheet.create({
    navbar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fixedFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderWidth: 2,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor:'black'
    },
    footerText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    footerItem: {
        fontSize: 17,
        margin: 20,
    }
})