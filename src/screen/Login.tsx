import { Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Navbar from './Navbar'
import SignIn from '../components/SignIn'

const Login = ({ navigation }: any) => {
    const [register , setRegister] = useState<boolean>(false);

     const handleLogin = ()=>{
            setRegister(!register);
        }
    return (
        <>
            <SignIn register={register} handleLogin={handleLogin} navigation={navigation}/>
            <Navbar navigation={navigation}/>
        </>
    )
}

export default Login

const styles = StyleSheet.create({
   
})