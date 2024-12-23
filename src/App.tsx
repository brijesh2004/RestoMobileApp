import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Provider } from 'react-redux';
import {store} from './redux/store';
import Main from './screen/Main';



const App = () => {
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  uppertonav:{
    marginBottom:200,
  }
})