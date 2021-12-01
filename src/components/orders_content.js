import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Context from '../context/context.js';
import { Dimensions, StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { BASE_URL } from '../helper/constant.js';

export default function OrdersContent(props) {
  const [toggleMerch, setToggleMerch] = useState(true);
  const [toggleServices, setToggleServices] = useState(true);
  const cartContext = useContext(Context);
  const route = useRoute();

  useEffect( _ => {
    getUserMerchOrders();
    getUserServiceOrders();
  }, [])

  // // GET USER MERCH ORDERS
  const getUserMerchOrders = async _ => {
    let id = cartContext.user.id;
    const token = await AsyncStorage.getItem('token');
    const config = { headers: { Authorization: token }}

    try {
      await axios.get(`https://${BASE_URL}/user/${id}/merch-orders`, config)
      .then(res => {
        cartContext.setUserMerchOrders(res.data)
        console.log(res.data);
      })
      .catch(err => console.log(err))
    } catch (err) { console.log(err)}
  }

  // GET USER SERVICE ORDERS
  const getUserServiceOrders = async _ => {
    let id = cartContext.user.id;
    const token = await AsyncStorage.getItem('token');
    const config = { headers: { Authorization: token }}

    try {
      await axios.get(`https://${BASE_URL}/user/${id}/service-orders`, config)
      .then(res => cartContext.setUserServiceOrders(res.data))
      .catch(err => console.log(err))
    } catch (err) { console.log(err)}
  }

  // HANDLE MERCH ORDER SELECTION
  const handleMerchOrderSelect = el => {
    cartContext.setSelectedMerchOrder(el);
    props.navigation.navigate('SelectedMerchOrder');
  }

  // HANDLE SERVICE ORDER SELECTION
  const handleServiceOrderSelect = el => {
    cartContext.setSelectedServiceOrder(el);
    props.navigation.navigate('SelectedServiceOrder');
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={[styles.wrap, toggleMerch ? styles.wrap_on : null ]}
        onPress={ _ => setToggleMerch(!toggleMerch)}
        disabled={cartContext.menuToggle}>
        <View style={styles.header}>
          <Text style={[styles.header_text, toggleMerch ? styles.header_text_on : null]}>
            Product Orders
          </Text>
          <TouchableOpacity onPress={ _ => setToggleMerch(!toggleMerch) }>
            <View style={ toggleMerch ? styles.arrow_btn_up : styles.arrow_btn_down}></View>
          </TouchableOpacity>
        </View>
        { toggleMerch ? (
          cartContext.merchOrders.length > 0 ? (
            cartContext.merchOrders.map(el => {
              return (
                <TouchableOpacity
                  style={styles.order} key={el.id}
                  onPress={ _ => handleMerchOrderSelect(el)}
                  disabled={cartContext.menuToggle}>
                  <Text style={styles.order_product}>{el.merch.product}</Text>
                  <Text style={styles.order_status}>{el.status.toUpperCase()}</Text>
                </TouchableOpacity>
              )
            })
          ) : (
            <View style={styles.err}>
              <Text style={styles.err_text}>You have no orders</Text>
            </View>
          )
        ) : null }
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.wrap, toggleServices ? styles.wrap_on : null ]}
        onPress={ _ => setToggleServices(!toggleServices)}
        disabled={cartContext.menuToggle}>
        <View style={styles.header}>
          <Text style={[styles.header_text, toggleServices ? styles.header_text_on : null]}>
            Service Orders
          </Text>
          <TouchableOpacity onPress={ _ => setToggleServices(!toggleServices) }>
            <View style={ toggleServices ? styles.arrow_btn_up : styles.arrow_btn_down}></View>
          </TouchableOpacity>
        </View>
        { toggleServices ? (
          cartContext.serviceOrders.length > 0 ? (
            cartContext.serviceOrders.map(el => {
              return (
                <TouchableOpacity
                  style={styles.order} key={el.id}
                  onPress={ _ => handleServiceOrderSelect(el)}>
                  <Text style={styles.order_product}>{el.service.product}</Text>
              </TouchableOpacity>
              )
            })
          ) : (
            <View style={styles.err}>
              <Text style={styles.err_text}>You have no orders</Text>
            </View>
          )
        ) : null }
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('screen').width,
  },

    wrap: {
      width: Dimensions.get('screen').width - 40,
      marginTop: 20,
      paddingBottom: 20,
      backgroundColor: '#fff',
      borderRadius: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.28,
      shadowRadius: 5,
      elevation: 4,
    },

    wrap_on: {
      backgroundColor: '#fff',
    },

      header: {
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#009cd8'
      },

        header_text: {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#000',
          opacity: 0.6,
        },

        header_text_on: {
          color: '#fff',
          opacity: 1,
        },

        arrow_btn_down: {
          width: 0,
          height: 0,
          borderLeftWidth: 8,
          borderRightWidth: 8,
          borderTopWidth: 13,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: '#000',
          opacity: 0.35,
        },

        arrow_btn_up: {
          width: 0,
          height: 0,
          borderLeftWidth: 8,
          borderRightWidth: 8,
          borderBottomWidth: 13,
          borderStyle: 'solid',
          backgroundColor: 'transparent',
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#fefefe',
          opacity: 1,
        },

        err: {
          width: '100%',
          backgroundColor: '#fff',
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },

          err_text: {
            padding: 10,
            opacity: 0.8,
          },

        order: {
          width: '100%',
          backgroundColor: '#fff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          borderBottomLeftRadius: 6,
          borderBottomRightRadius: 6,
        },

          order_product: {
            fontWeight: 'bold',
            opacity: 0.6,
          },

          order_status: {
            fontSize: 13,
            fontWeight: 'bold',
          },
});