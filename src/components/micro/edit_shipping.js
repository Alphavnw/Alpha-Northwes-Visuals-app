import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from '../../context/context.js';
import { Dimensions, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../helper/constant.js';

export default function EditShipping(props) {
  const cartContext = useContext(Context);

  const [error, setError] = useState([]);
  const [address, setAddress] = useState(cartContext.user.address || '');
  const [unit, setUnit] = useState(cartContext.user.unit || '');
  const [city, setCity] = useState(cartContext.user.city || '');
  const [state, setState] = useState(cartContext.user.state || '');
  const [zip, setZip] = useState(cartContext.user.zip.toString() || '');

  const handleSetAddress = e => setAddress(e);
  const handleSetUnit = e => setUnit(e);
  const handleSetCity = e => setCity(e);
  const handleSetState = e => setState(e);
  const handleSetZip = e => setZip(e);
  const handleCancel = _ => cartContext.handleEditShippingToggle();

  // Handle Submit Edit
  const handleConfirm = async _ => {
    let err = [...error];
    // address
    if (!address) {
      if (!err.includes(1)) {
        err.push(1);
        setError(err);
      }
    } else {
      if (err.includes(1)) {
        let i = err.indexOf(1);
        err.splice(i, 1);
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
        err.splice(i, 1);
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
        err.splice(i, 1);
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
        err.splice(i, 1);
        setError(err);
      }
    }

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
          cartContext.handleEditShippingToggle();
        })
        .catch(err => console.log(err))
      } catch (err) { console.log(err) } 
    } else console.log('err');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Edit Shipping Location
      </Text>
      { error.includes(1) ? (
        <View style={styles.error_box}>
          <Text style={styles.error_text}>Please Enter a Valid Address</Text>
        </View>
      ): null }
      { error.includes(3) ? (
        <View style={styles.error_box}>
          <Text style={styles.error_text}>Please Enter a Valid City</Text>
        </View>
      ): null }
      { error.includes(4) ? (
        <View style={styles.error_box}>
          <Text style={styles.error_text}>Please Enter a Valid State</Text>
        </View>
      ): null }
      { error.includes(5) ? (
        <View style={styles.error_box}>
          <Text style={styles.error_text}>Please Enter a Valid Zip Number</Text>
        </View>
      ): null }
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetAddress(e)}
        value={address}
        placeholderTextColor="#000"
        placeholder="Address" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetUnit(e)}
        value={unit}
        placeholderTextColor="#000"
        placeholder="Unit" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetCity(e)}
        value={city}
        placeholderTextColor="#000"
        placeholder="City" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetState(e)}
        value={state}
        placeholderTextColor="#000"
        placeholder="State" />
      <TextInput
        style={styles.input}
        onChangeText={e => handleSetZip(e)}
        value={zip}
        placeholderTextColor="#000"
        placeholder="Zip" />
      <View style={styles.btns_box}>
        <TouchableOpacity
          onPress={ _ => handleCancel()}
          style={[styles.btn, styles.btn_cancel]}>
          <Text style={[styles.btn_text, styles.btn_text_cancel]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ _ => handleConfirm()}
          style={[styles.btn, styles.btn_confirm]}>
          <Text style={[styles.btn_text, styles.btn_text_confirm]}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: Dimensions.get('screen').width - 60,
    padding: 15,
    position: 'absolute',
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 20,
    marginTop: 100,
    zIndex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 5,
  },

    heading: {
      fontWeight: 'bold',
      fontSize: 16,
      opacity: 0.7,
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
        width: '100%',
        backgroundColor: '#D5E8F0',
        marginTop: 10,
        borderRadius: 4,
        paddingLeft: 10,
        paddingTop: 8,
        paddingBottom: 8,
      },

      btns_box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: 10,
      },
      
        btn_cancel: {
          width: Dimensions.get('screen').width / 2 - 50,

          borderColor: 'gray',
          backgroundColor: '#fff',
          borderRadius: 4,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.28,
          shadowRadius: 5,
          elevation: 5,
        },

        btn_confirm: {
          width: Dimensions.get('screen').width / 2 - 50,
          borderWidth: 1,
          borderColor: '#018bc0',
          borderRadius: 4,
          backgroundColor: '#018bc0',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.28,
          shadowRadius: 5,
          elevation: 5,
        },

          btn_text: {
            textAlign: 'center',
            padding: 10,
          },
          
          btn_text_cancel: {
            opacity: 0.8,
          },

          btn_text_confirm: {
            color: '#fff',
          },
});