import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import Context from '../context/context.js';
import { Dimensions, StyleSheet, StatusBar, View, TouchableOpacity, TextInput, Text } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BASE_URL } from '../helper/constant.js';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? getStatusBarHeight() : 0;

function StatusBarPlaceHolder() {
  return (
    <View style={{
      width: "100%",
      height: STATUS_BAR_HEIGHT,
      backgroundColor: "#009cd8"
    }}>
      <StatusBar barStyle="light-content" backgroundColor="#009cd8"/>
    </View>
  );
}

export default function OrderingStepOne(props) {
  const cartContext = useContext(Context);
  const [error, setError] = useState(0);
  const [name, setName] = useState(cartContext.user.name || '');
  const [phone, setPhone] = useState(cartContext.user.phone || '');
  const [cartCategories, setCartCategories] = useState();

  useEffect( _ => {
    checkCartCategories();
  }, [])

  // Check cart cotegories
  const checkCartCategories = _ => {
    let cart = cartContext.cart;
    let type = [];
  
    for (let i = 0; i < cart.length; i++) {
      type.push(cart[i].type)
    }

    setCartCategories(type);
  }

  // Text input set onChange
  const handleSetName = e => setName(e);
  const handleSetPhone = e => setPhone(e);  

  // Submit Information
  const handleSubmit = async _ => {
    let nav = props.navigation;
    const user = { name: name, phone: phone }

    let nameRegex = /^[a-zA-Z\s]*$/;  
    let phoneRegex = /^\d+$/;

    if (user.name && nameRegex.test(user.name)) { // Check Name
      if (phoneRegex.test(user.phone) && phone.length === 10) { // Check Phone
        setError(0);  
        try {
          const token = await AsyncStorage.getItem('token');
          const config = { headers: { Authorization: token }};
          const id = cartContext.user.id;
  
          await axios.put(`${BASE_URL}/user/${id}`, user, config)
          .then(res => {
            cartContext.setUser(res.data[0]);
            if (cartCategories.includes('merch')) {
              if (cartContext.previousRoute) nav.navigate(cartContext.previousRoute);
              else nav.navigate('MerchOrderOverview');
            } else nav.navigate('MerchOrderOverview');
          })
          .catch(err => console.log(err))
        } catch (err) { console.log(err) }
      } else setError(2);
    } else setError(1);
  }

  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <LinearGradient colors={['#009cd8', '#008CC1', '#0080B1']} style={styles.gradient} >
          <View style={styles.content}>
            <View style={styles.text_box}>
              <Text style={styles.text_title}>Contact Information</Text>
              <Text style={styles.text_content}>What is your name and number?</Text>
            </View>
            <View style={styles.address_box}>
              { error ? (
                <View style={styles.error_box}>
                  <Text style={styles.error_text}>
                    { error === 1 ? 'Please Enter Your Name' : 'Enter a valid number'}
                  </Text>
                </View>
              ): null}
              <TextInput 
                style={[styles.input, error === 1 ? styles.input_err : null ]}
                placeholder={'Name'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetName(e)}
                value={name}>
              </TextInput>
              <TextInput 
                style={[styles.input, error === 2 ? styles.input_err : null]}
                placeholder={'Phone'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetPhone(e)}
                keyboardType={'number-pad'}
                value={phone}>
              </TextInput>
            </View>
            <TouchableOpacity style={styles.continue_btn} onPress={ _ => handleSubmit() }>
              <Text style={styles.continue_btn_text}>Continue</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },

    content: {
      width: Dimensions.get('screen').width,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    
    text_box: {
        width: Dimensions.get('screen').width - 60,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'column',
        marginTop: -100,
      },

        text_title: {
          color: '#fefefe',
          fontWeight: 'bold',
          fontSize: 26,
        },

        text_content: {
          color: '#efefef',
          fontSize: 14,
          lineHeight: 19,
          width: '80%',
        },

    address_box: {
      width: Dimensions.get('screen').width - 60,
      flexWrap: 'wrap',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginTop: 20,
    },

        error_box: {
          width: '100%',
          padding: 5,
          borderRadius: 4,
          backgroundColor: 'pink',
        },

          error_text: {
            fontSize: 13,
            color: '#000',
          },

        input: {
          alignSelf: 'center',
          width: Dimensions.get('screen').width - 60,
          paddingTop: 8,
          paddingBottom: 8,
          paddingLeft: 15,
          paddingRight: 15,
          backgroundColor: '#0078A4',
          borderRadius: 4,
          marginTop: 10,
          color: '#fefefe',
        },

        input_err: {
          borderWidth: 1,
          borderColor: 'pink',
        },

    continue_btn: {
      padding: 14,
      marginTop: 20,
      borderRadius: 6,
      backgroundColor: '#fefefe',
      flexDirection: 'row', 
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 20,
      position: 'absolute',
      width: Dimensions.get('screen').width - 60,
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
      },

      continue_btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#018bc0',
      },
});