import { StyleSheet, Text, View, TextInput, Pressable, SafeAreaView, ScrollView, KeyboardAvoidingView, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configData } from '../config';
import { useDispatch } from 'react-redux';
import { Logind } from '../redux/slice';
interface propsType {
    register: boolean;
    handleLogin: () => void;
    navigation: any,
}

type inputType = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const SignIn = ({ register, handleLogin, navigation }: propsType) => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState<inputType>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [loading, setLoading] = useState(false);

    const handleChange = (name: string, value: string) => {
        setInputData((prevData: inputType) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async () => {
        setLoading(true);
        try {

            const { name, email, password, confirmPassword } = inputData;
            if (register === true && password !== confirmPassword) {
                Alert.alert('Password and confim password must be same');
            }
            const res = await fetch(`${configData.uri}/${register === true ? 'register' : 'login'}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(register === true ? {
                    name, email, password, cpassword: confirmPassword
                } : {
                    email, password
                })

            })
            if (res.status === 200 || res.status === 201) {
                const data = await res.json();
                const token = data.token;
                await AsyncStorage.setItem('restotoken', token);
                if (register === true) {
                    Alert.alert("Register Success");
                }
                else {
                    Alert.alert('Login Success');
                }
                const tk = await AsyncStorage.getItem('restotoken');
                dispatch(Logind(true));
                navigation.replace("Home");
            }
            else if (res.status === 401) {
                dispatch(Logind(true));
                Alert.alert("Wrong details");
            }
            else {
                dispatch(Logind(true));
                Alert.alert("Error");
            }
        }
        catch (error) {
            Alert.alert("Error");
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <SafeAreaView style={styles.container}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                >
                    <ScrollView>
                        {register
                            &&
                            <TextInput value={inputData.name} style={styles.inputField} keyboardType='default' placeholder='Enter Your Name' placeholderTextColor="black"
                                onChangeText={(value: string) => handleChange('name', value)} />
                        }
                        <TextInput style={styles.inputField} keyboardType='email-address' placeholder='Enter Your Email' placeholderTextColor="black"
                            onChangeText={(value: string) => handleChange('email', value)} />
                        <TextInput style={styles.inputField} secureTextEntry={true} placeholder='Enter the Password' placeholderTextColor="black"
                            onChangeText={(value: string) => handleChange('password', value)} />

                        {register
                            &&
                            <TextInput style={styles.inputField} secureTextEntry={true} placeholder='Confirm Password' placeholderTextColor="black"
                                onChangeText={(value: string) => handleChange('confirmPassword', value)} />
                        }

                        <Pressable style={styles.button}
                            onPress={handleSubmit}>
                            {loading ?
                                <ActivityIndicator size="large" /> :
                                <Text style={styles.buttonText}> {register ? 'Register' : 'Login'}</Text>
                            }
                        </Pressable>
                        <View style={styles.registerItem}>
                            <Text>{register ? 'Already have an account' : "Don't have an account"}</Text>
                            <Pressable
                                onPress={() => handleLogin()}>
                                <Text style={styles.account}>
                                    {register ? 'login' : 'register'}
                                </Text>
                            </Pressable>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputField: {
        width: 300,
        borderWidth: 2,
        borderRadius: 10,
        height: 55,
        margin: 10,
        color: 'black'
    },
    button: {
        width: 300,
        marginTop: 10,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#25CCF7',
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
    },
    registerItem: {
        flexDirection: 'row',
    },
    account: {
        color: 'blue',
        marginLeft: 12,
    }
})