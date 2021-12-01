import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StatusBar, StyleSheet, View, Text, TextInput, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../context/context.js';
import Header from '../../components/header.js';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { BASE_URL } from '../../helper/constant.js';

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

export default function ServiceForm(props) {
  const [productName, setProductName] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productDescription, setProductDescription] = useState();
  
  const cartContext = useContext(Context);

  useEffect( _ => {
    if (cartContext.serviceEditing.price) {
      setProductPrice(cartContext.serviceEditing.price.toString());
    } else {
      setProductPrice(cartContext.serviceEditing.price);
    }
    setProductName(cartContext.serviceEditing.product);
    setProductDescription(cartContext.serviceEditing.description);
  }, [cartContext.serviceEditing])
  
  const handleProductName = e => setProductName(e);
  const handleProductPrice = e => setProductPrice(e);
  const handleProductDescription = e => setProductDescription(e);
  
  // Handle Canel Button; Reset State and Navigate
  const handleCancel = _ => {
    props.navigation.navigate('AdminPanel');
    setProductName('');
    setProductPrice('');
    setProductDescription('');
  }
  
  // Exicute ADD or EDIT function based on "formType"
  const handleFormType = async _ => {
    let formType = cartContext.adminServiceInteraction;
    console.log(formType);
    if(formType === 'new') handleAdd()
    else if (formType === 'edit') handleEdit();
  }

  // Handles adding new content
  const handleAdd = async _ => {
    if (productName && productPrice && productDescription) {
      const service = {
        product: productName,
        description: productDescription,
        price: parseInt(productPrice),
        type: 'service',
        quantity: 1,
        createdAt: new Date(),
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}

        await axios.post(`${BASE_URL}/services/`, service, config)
          .then(res => {
            cartContext.setServices(res.data);
            props.navigation.navigate('AdminPanel')
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err, 'Client Error')}
    } else setErr(1);
  }

  // Handles editing content
  const handleEdit = async _ => {
    if (productName && productPrice && productDescription) {
      const service = {
        product: productName,
        price: parseInt(productPrice),
        description: productDescription,
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}
        let id = cartContext.serviceEditing.id;

        await axios.put(`${BASE_URL}/services/${id}`, service, config)
          .then(res => {
            cartContext.setServices(res.data);
            props.navigation.navigate('AdminPanel')
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err) }
    } else setErr(1);
  }

  return (
    <>
      <StatusBarPlaceHolder />
      <View
        style={styles.container}>
        <Header navigation={props.navigation} />
          <View style={styles.wrap}>
            <Text style={styles.title}>
              { cartContext.adminServiceInteraction === 'new' ? 'New Service' : 'Edit Service' }
            </Text>
            <View style={styles.content}>
              <TextInput 
                style={[styles.input]}
                placeholder={'Name'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductName(e)}
                value={productName}>
              </TextInput>
              <TextInput 
                style={[styles.input]}
                placeholder={'Price'}
                placeholderTextColor='#393939'
                keyboardType={'numeric'}
                onChangeText={(e) => handleProductPrice(e)}
                value={productPrice}>
              </TextInput>
              <TextInput 
                style={[styles.input, styles.bio_intput]}
                multiline={true}
                placeholder={'Description'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductDescription(e)}
                value={productDescription}>
              </TextInput>
            </View>
            <View style={styles.btns_box}>
              <TouchableOpacity style={styles.btn} onPress={ _ => handleCancel()}>
                <Text style={styles.btn_text}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btn, styles.btn_add]} onPress={ _ => handleFormType()}>
                <Text style={styles.btn_text}>
                { cartContext.adminServiceInteraction === 'new' ? 'Add' : 'Edit' }
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    zIndex: 2,
  },

    wrap: {
      width: '100%',
      borderRadius: 6,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: '#fff',
      marginTop: 20,
      height: '100%',
    },

      title: {
        fontWeight: 'bold',
        fontSize: 22,
        opacity: 0.6,
        alignSelf: 'flex-start',
        marginLeft: 30,
      },

      content: {
        marginBottom: 15,
      },

        input: {
          width: Dimensions.get('screen').width - 60,
          padding: 8,
          paddingLeft: 10,
          borderRadius: 4,
          backgroundColor: '#f2f2f2',
          borderWidth: 1,
          borderColor: 'lightgray',
          marginTop: 12,
        },

        bio_intput: {
          height: 120,
          textAlignVertical: 'top',
          lineHeight: 20,
        },

    btns_box: {
      width: Dimensions.get('screen').width - 60,
      marginBottom: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      btn: {
        width: Dimensions.get('screen').width / 2 - 36,
        borderRadius: 4,
        backgroundColor: '#005575',
      },

      btn_add: {
        backgroundColor: '#009cd8',
      },

        btn_text: {
          textAlign: 'center',
          fontSize: 14,
          fontWeight: 'bold',
          color: '#fff',
          padding: 12,
        },
});
