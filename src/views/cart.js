import React from 'react';

import Header from '../components/header.js';
import CartContent from '../components/cart_content.js';

import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

export default function Cart(props) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Header navigation={props.navigation} />
      <CartContent navigation={props.navigation}/>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});