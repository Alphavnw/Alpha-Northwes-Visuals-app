import React, { useState, useContext } from 'react';
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

export default function OrderingStepTwo(props) {
  const cartContext = useContext(Context);
  const [error, setError] = useState([]);
  const [address, setAddress] = useState(cartContext.user.address || '');
  const [unit, setUnit] = useState(cartContext.user.unit || '');
  const [city, setCity] = useState(cartContext.user.city || '');
  const [state, setState] = useState(cartContext.user.state || '');
  const [zip, setZip] = useState(cartContext.user.zip || '');

  // Text input set onChange
  const handleSetAddress = e => setAddress(e);
  const handleSetUnit = e => setUnit(e);
  const handleSetCity = e => setCity(e);
  const handleSetState = e => setState(e);
  const handleSetZip = e => setZip(e);


  // Submit Information
  const handleSubmit = async _ => {
    let err = [...error];
    // address
    if (!address) {
      if (!err.includes(1)) {
        err.push(1);
        setError(err)
      }
    } else {
      if (err.includes(1)) {
        let i = err.indexOf(1);
        err.splice(i, 1)
        setError(err);
      }
    }

    // city
    if (!city) {
      if (!err.includes(3)) {
        err.push(3);
        setError(err);
      }
    } else {
      if (err.includes(3)) {
        let i = err.indexOf(3);
        err.splice(i, 1)
        setError(err);
      }
    }

    // state
    if (!state) {
      if (!err.includes(4)) {
        err.push(4);
        setError(err);
      }
    } else {
      if (err.includes(4)) {
        let i = err.indexOf(4);
        err.splice(i, 1)
        setError(err);
      }
    }

    // zip
    if (!zip) {
      if (!err.includes(5)) {
        err.push(5);
        setError(err);
      }
    } else {
      if (err.includes(5)) {
        let i = err.indexOf(5);
        err.splice(i, 1)
        setError(err);
      }
    }

    let nav = props.navigation;
    const location = {
      address: address,
      unit: unit,
      city: city,
      state: state,
      zip: zip,
    }

    if (err.length === 0 && location) {
      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }};
        const id = cartContext.user.id;
  
        await axios.put(`${BASE_URL}/user/${id}`, location, config)
        .then(res => {
          cartContext.setUser(res.data[0]);
          nav.navigate('MerchOrderOverview')
        })
        .catch(err => console.log(err))
      } catch (err) { console.log(err) }
    }
  }

  return (
    <>
      <StatusBarPlaceHolder />
      <View style={styles.container}>
        <LinearGradient colors={['#009cd8', '#008CC1', '#0080B1']} style={styles.gradient} >
          <View style={styles.content}>
            <View style={styles.text_box}>
              <Text style={styles.text_title}>Shipping Address</Text>
              <Text style={styles.text_content}>What is your shipping address?</Text>
            </View>
            <View style={styles.address_box}>
              { error.length > 0 ? (
                <View style={styles.error_box}>
                  <Text style={styles.error_text}>Please Enter a Valid Address</Text>
                </View>
              ): null}
              <TextInput 
                style={[styles.input, styles.address_input, error.includes(1) ? styles.input_err : null]}
                placeholder={'Address'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetAddress(e)}
                value={address}>
              </TextInput>
              <TextInput 
                style={[styles.input, styles.unit_input, error.includes(2) ? styles.input_err : null ]}
                placeholder={'Unit'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetUnit(e)}
                value={unit}>
              </TextInput>
              <TextInput 
                style={[styles.input, styles.city_input, error.includes(3) ? styles.input_err : null ]}
                placeholder={'City'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetCity(e)}
                value={city}>
              </TextInput>
              <TextInput 
                style={[styles.input, styles.state_input, error.includes(4) ? styles.input_err : null ]}
                placeholder={'State'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetState(e)}
                value={state}>
              </TextInput>
              <TextInput 
                style={[styles.input, styles.zip_input, error.includes(5) ? styles.input_err : null ]}
                placeholder={'Zip'}
                placeholderTextColor='#fff'
                onChangeText={e => handleSetZip(e)}
                value={zip ? zip.toString() : zip}
                keyboardType={'numeric'}>
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
      marginTop: 10,
    },

        error_box: {
          width: '100%',
          padding: 5,
          marginTop: 10,
          borderRadius: 4,
          backgroundColor: 'pink',
        },

          error_text: {
            fontSize: 13,
            color: '#000',
          },

        input: {
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

        address_input: { width: Dimensions.get('screen').width - 170 },
        unit_input: { width: 100 },
        city_input: { width: Dimensions.get('screen').width - 240 },
        state_input: { width: 80 },
        zip_input: { width: 100 },


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