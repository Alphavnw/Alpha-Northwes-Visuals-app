import React, { useState, useContext, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

import Context from '../context/context.js';

import {
  Dimensions,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';

export default function BookingStepTwo(props) {
  const route = useRoute();
  const cartContext = useContext(Context);

  const handleServiceToggle = el => cartContext.handleCart(el);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient colors={['#009cd8', '#018bc0', '#018bc0']} style={styles.gradient} >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.text_box}>
            <Text style={styles.text_title}>Step Two</Text>
            <Text style={styles.text_content}>Choose your photoshoot</Text>
          </View>
          <View style={styles.services_box}>
            { cartContext.services.map((el) => {
              return (
                <View key={el.id} style={styles.service}>
                  <View style={styles.service_info}>
                    <Text style={styles.service_info_title}>{el.product}</Text>
                    <Text style={styles.service_info_desc}>{el.desc}</Text>
                  </View>
                  <View style={styles.service_btns}>
                    <View style={styles.service_btns_price_box}>
                      <Text style={styles.service_btns_price_title}>Starting At:</Text>
                      <View style={styles.service_btns_price_circle}>
                        <Text style={styles.service_btns_price_text}>${el.price}</Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={ _ => handleServiceToggle(el)}
                      style={[styles.service_btns_add, cartContext.cart.includes(el) ? styles.service_btns_add_on : null]}>
                      <Text style={[
                        styles.service_btns_add_text,
                        cartContext.cart.includes(el) ? styles.service_btns_add_text_on : null]}>
                        { cartContext.cart.includes(el) ? 'In Cart' : 'Add to Cart'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            })}
          </View>
          <TouchableOpacity style={styles.continue_btn} onPress={ _ => props.navigation.navigate('BookingStepThree')}>
            <Text style={styles.continue_btn_text}>Continue</Text>
            <View style={styles.continue_btn_arrow}></View>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

    content: {
      width: Dimensions.get('screen').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },

      text_box: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      },

        text_title: {
          color: '#fefefe',
          fontWeight: 'bold',
          fontSize: 28,
        },

        text_content: {
          color: '#fefefe',
          fontSize: 17,
        },

      services_box: {
        marginTop: 30,
        marginBottom: 20,
        padding: 5,
        width: Dimensions.get('screen').width - 40,
        borderRadius: 10,
        backgroundColor: '#fefefe',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },

        service: { 
          width: Dimensions.get('screen').width - 65,
          padding: 15,
          borderRadius: 8,
          backgroundColor: '#f1f1f1',
          borderWidth: 1,
          borderColor: 'lightgray',
          marginBottom: 15,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },

          service_info: {
            width: '100%',
          },

            service_info_title: {
              fontSize: 15,
              fontWeight: 'bold',
              color: '#000',
              opacity: 0.6,
            },

            service_info_desc: {
              paddingTop: 5,
              color: '#000',
              opacity: 0.5,
            },

          service_btns: {
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginTop: 15,
          },

            service_btns_price_box: {
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              width: '60%',
              height: 48,
              backgroundColor: '#fff',
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 1,
              elevation: 2,
            },

              service_btns_price_title: {
                color: '#000',
                fontSize: 14,
                fontWeight: 'bold',
                marginRight: 5,
                opacity: 0.6,
              },

              service_btns_price_circle: {
                width: 32,
                height: 32,
                borderRadius: 20,
                backgroundColor: '#018bc0',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 5,
              },

                service_btns_price_text: {
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 'bold',
                },

        service_btns_add: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
          height: 48,
          borderRadius: 8,
          width: Dimensions.get('screen').width / 2 * 0.5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 1,
          elevation: 2,
        },

        service_btns_add_on: {
          backgroundColor: '#009cd8',
        },

          service_btns_add_text: {
            fontSize: 12,
            fontWeight: 'bold',
            color: '#000',
            opacity: 0.6,
          },

          service_btns_add_text_on: {
            color: '#fff',
            opacity: 1,
          },

    continue_btn: {
      marginBottom: 30,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

      continue_btn_arrow: {
        width: 0,
        height: 0,
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderLeftWidth: 10,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderTopColor: 'transparent',
        borderBottomColor: 'transparent',
        borderLeftColor: '#fefefe',
        marginLeft: 10,
        marginTop: 5,
      },

      continue_btn_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
      },
});