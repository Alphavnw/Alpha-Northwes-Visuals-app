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

export default function ProductForm(props) {
  const [productName, setProductName] = useState();
  const [productDescription, setProductDescription] = useState();
  const [productPrice, setProductPrice] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productImageOne, setProductImageOne] = useState();
  const [productImageTwo, setProductImageTwo] = useState();
  const [productImageThree, setProductImageThree] = useState();
  
  const cartContext = useContext(Context);

  useEffect( _ => {
    if (cartContext.productEditing.price) {
      setProductPrice(cartContext.productEditing.price.toString());
    } else {
      setProductPrice(cartContext.productEditing.price);
    }
    setProductName(cartContext.productEditing.product);
    setProductDescription(cartContext.productEditing.description);
    setProductCategory(cartContext.productEditing.category);
    setProductImageOne(cartContext.productEditing.image1);
    setProductImageTwo(cartContext.productEditing.image2);
    setProductImageThree(cartContext.productEditing.image3);
  }, [cartContext.productEditing])
  
  const handleProductName = e => setProductName(e);
  const handleProductDescription = e => setProductDescription(e);
  const handleProductPrice = e => setProductPrice(e);
  const handleProductCategory = e => setProductCategory(e);
  const handleProductImageOne = e => setProductImageOne(e);
  const handleProductImageTwo = e => setProductImageTwo(e);
  const handleProductImageThree = e => setProductImageThree(e);

  // Handle Canel Button; Reset State and Navigate
  const handleCancel = _ => {
    props.navigation.navigate('AdminPanel');
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductCategory('');
    setProductImageOne('');
    setProductImageTwo('');
    setProductImageThree('');
  }

  // Exicute ADD or EDIT function based on "formType"
  const handleFormType = async _ => {
    let formType = cartContext.adminProductInteraction;
    if(formType === 'new') handleAdd()
    else handleEdit();
    console.log(formType);
  }

  // Handles adding new content
  const handleAdd = async _ => {
    if (productName && productDescription && productPrice && productCategory) {
      const product = {
        product: productName,
        description: productDescription,
        price: parseInt(productPrice),
        category: productCategory,
        image1: productImageOne,
        image2: productImageTwo,
        image3: productImageThree,
        type: 'merch',
        quantity: 1,
        createdAt: new Date(),
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}

        await axios.post(`${BASE_URL}/store/`, product, config)
          .then(res => {
            cartContext.setProducts(res.data);
            props.navigation.navigate('AdminPanel')
          })
          .catch(err => console.log(err))
      } catch(err) { console.log(err, 'Client Error')}
    } else setErr(1);
  }

  // Handles editing content
  const handleEdit = async _ => {
    console.log('here');
    console.log(cartContext.productEditing.product);
    if (productName && productDescription && productPrice && productCategory) {
      const product = {
        product: productName,
        description: productDescription,
        price: parseInt(productPrice),
        category: productCategory,
        image1: productImageOne,
        image2: productImageTwo,
        image3: productImageThree,
      }

      try {
        const token = await AsyncStorage.getItem('token');
        const config = { headers: { Authorization: token }}
        let id = cartContext.productEditing.id;

        console.log(id);

        await axios.put(`${BASE_URL}/store/${id}`, product, config)
          .then(res => {
            cartContext.setProducts(res.data);
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
              { cartContext.adminProductInteraction === 'new' ? 'New Product' : 'Edit Product' }
            </Text>
            <View style={styles.content}>
              <TextInput 
                style={[styles.input]}
                placeholder={'Product'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductName(e)}
                value={productName}>
              </TextInput>
              <TextInput 
                style={[styles.input]}
                keyboardType={'numeric'}
                placeholder={'Price'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductPrice(e)}
                value={productPrice}>
              </TextInput>
              <TextInput 
                style={[styles.input]}
                placeholder={'Category'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductCategory(e)}
                value={productCategory}>
              </TextInput>
              <TextInput 
                style={[styles.input]}
                placeholder={'Image One'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductImageOne(e)}
                value={productImageOne}>
              </TextInput>
              <TextInput 
                style={[styles.input]}
                placeholder={'Image Two'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductImageTwo(e)}
                value={productImageTwo}>
              </TextInput>
              <TextInput 
                style={[styles.input]}
                placeholder={'Image Three'}
                placeholderTextColor='#393939'
                onChangeText={(e) => handleProductImageThree (e)}
                value={productImageThree}>
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
                { cartContext.adminProductInteraction === 'new' ? 'Add' : 'Edit' }
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
          height: 60,
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
