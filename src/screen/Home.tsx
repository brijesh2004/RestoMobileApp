import { StyleSheet, Text, View, ScrollView, Image, Pressable } from 'react-native'
import React from 'react'
import Navbar from './Navbar';
import FoodItemHome from '../components/FoodItemHome';

const Home = ({ navigation }: any) => {
    return (
        <>
            <ScrollView >
                <View style={styles.mainItem}>
                <View>
                    <Text style={styles.homeItem}> Home Delivery Unavailable</Text>
                </View>
                
                <Text style={styles.name}>Breakfast</Text>
                <View style={styles.imageContainer}>
                    <FoodItemHome id={1} imageUrl='https://th.bing.com/th/id/OIP.qm3ug0amNLMPqe2j7sHPVwHaGi?pid=ImgDet&rs=1' item="Tea" price={15}/>
                    <FoodItemHome id={2}imageUrl='https://cdn.zmescience.com/wp-content/uploads/2018/04/Cappuccino_at_Sightglass_Coffee.jpg' item="Coffee" price={30}/>
                </View>
                <Pressable
                onPress={()=>navigation.navigate("Items")}
                style={styles.viewMore}>
                    <Text style={styles.viewButton}> View More..</Text>
                </Pressable>
                <Text style={styles.name}>Lunch</Text>
                <View style={styles.imageContainer}>
                    <FoodItemHome id={1} imageUrl='https://th.bing.com/th/id/OIP.QTjz61wv6sgCnzN8SxIh-QHaHa?pid=ImgDet&rs=1' item="Sambar Rice" price={160}/>
                    <FoodItemHome id={2} imageUrl='https://th.bing.com/th/id/OIP.67U2rP_RKXfB41eahe0wTwHaFP?w=276&h=195&c=7&r=0&o=5&dpr=1.3&pid=1.7' item="Rajma Rice" price={140}/>
                </View>
                <Pressable
                onPress={()=>navigation.navigate("Items")}
                style={styles.viewMore}>
                    <Text style={styles.viewButton}> View More..</Text>
                </Pressable>
                <Text style={styles.name}>Dinner</Text>
                <View style={styles.imageContainer}>
                    <FoodItemHome id={1} imageUrl='https://wallpapercave.com/wp/wp2055348.jpg' item="fried chicken" price={120}/>
                    <FoodItemHome id={2} imageUrl='https://i1.wp.com/news365.co.za/wp-content/uploads/2020/07/omelette-1.jpg?fit=1500%2C1125&ssl=1' item="Omelet" price={40}/>
                </View>
                <Pressable
                onPress={()=>navigation.navigate("Items")}
                style={styles.viewMore}>
                    <Text style={styles.viewButton}> View More..</Text>
                </Pressable>
                </View>
            </ScrollView>
            <Navbar navigation={navigation} />
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    mainItem:{
        marginBottom:100,
    },
    homeItem: {
        textAlign: 'center',
        marginTop: 10,
        color: 'red',
        fontSize: 20,
        fontWeight: '800',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    name:{
     textAlign:'center',
     fontSize:25,
     marginTop:25,
     marginBlock:10,
    },
    viewMore:{
        alignItems:'center',
        justifyContent:'center',
    },
    viewButton:{
        width:200,
        height:35,
        justifyContent:'center',
        textAlign:'center',
        backgroundColor:'blue',
        color:'white',
        fontSize:20,
    },
})