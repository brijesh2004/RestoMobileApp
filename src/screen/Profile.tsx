import { Pressable, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProfileCom from '../components/ProfileCom';

const Profile = ({ navigation }: any) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.scrollContent}>
                <ProfileCom navigation={navigation} />
                <Pressable
                    style={styles.logoutBtnContainer}
                    onPress={async () => {
                        await AsyncStorage.clear();
                        navigation.replace('Login');
                    }}
                >
                    <Text style={styles.logoutBtn}>Logout</Text>
                </Pressable>
            </View>
            <View style={styles.navbarContainer}>
                <Navbar navigation={navigation} />
            </View>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 60, 
        marginBottom:100,
    },
    logoutBtnContainer: {
        alignItems: 'center',
        marginVertical: 10,
    },
    logoutBtn: {
        textAlign: 'center',
        fontSize: 22,
        color: 'white',
        width: 110,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'red',
        lineHeight: 40,
    },
    navbarContainer: {
        ...StyleSheet.absoluteFillObject, // Positions the Navbar
        justifyContent: 'flex-end', // Aligns it at the bottom
        height: '100%',
    },
});
