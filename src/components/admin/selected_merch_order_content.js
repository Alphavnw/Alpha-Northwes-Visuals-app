import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import Context from '../../context/context.js';
import EditIMG from '../../assets/edit.png';
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';

export default function SelectedMerchOrderContentADMIN(props) {
  const [toggle, setToggle] = useState(false);
  const [status, setStatus] = useState('');
  const [tracking, setTracking] = useState('');
  const cartContext = useContext(Context);
  const route = useRoute();

  useEffect( _ => {
    setStatus(cartContext.selectedMerchOrder.status.toUpperCase());
    setTracking(cartContext.selectedMerchOrder.tracking);
  }, [])

  const handleEditToggle = _ => setToggle(!toggle);
  const handleStatus = el => setStatus(el);
  const handleTracking = el => setTracking(el);
  const handleCancel = el => setToggle(false);
  
  // SUBMIT ORDER EDIT
  const handleSubmit = async _ => {
    const order = {
      status: status,
      tracking: tracking,
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: token }}
      let id = cartContext.selectedMerchOrder.id;

      await axios.put(`${BASE_URL}/merch-orders/${id}/edit`, order, config)
        .then(res => {
          cartContext.setMerchOrdersALL(res.data);
          setToggle(false);
        })
        .catch(err => console.log(err))
    } catch(err) { console.log(err) }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_text}>Order</Text>
        <TouchableOpacity
          style={styles.edit_btn}
          onPress={ _ => handleEditToggle()}>
          <Image source={EditIMG} style={styles.edit_img} />
        </TouchableOpacity>
      </View>
      { toggle ? (
        <View style={styles.order_edit}>
          <TextInput 
            style={[styles.input]}
            placeholder={'Status'}
            placeholderTextColor='#393939'
            onChangeText={(e) => handleStatus(e)}
            value={status}>
          </TextInput>
          <TextInput 
            style={[styles.input, styles.input_b]}
            placeholder={'Tracking'}
            placeholderTextColor='#393939'
            onChangeText={(e) => handleTracking(e)}
            value={tracking}>
          </TextInput>
          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.btn, styles.btn_save]}
              onPress={ _ => handleSubmit()}>
              <Text style={[styles.btn_text, styles.btn_text_save]}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn,  styles.btn_cancel]}
              onPress={ _ => handleCancel()}>
              <Text style={[styles.btn_text, styles.btn_text_cancel]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      ): null }
      <View style={styles.order}>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.email}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.phone}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.address}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Unit</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.unit}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>City</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.city}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>State</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.state}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Zip</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.user.zip}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Product</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.merch.product}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Quantity</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.quantity}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Size</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.size}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Status</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.status.toUpperCase()}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.createdAt.substring(0, 10)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Tracking</Text>
          <Text style={styles.text} selectable>{cartContext.selectedMerchOrder.tracking}</Text>
        </View>
        <View style={[styles.row, styles.row_long]}>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.text}>{cartContext.selectedMerchOrder.merch.description}</Text>
        </View>
        <View style={[styles.row, styles.row_b]}>
          <Text style={styles.label}>Transaction</Text>
          <Text style={styles.text} selectable>{cartContext.selectedMerchOrder.payment_token}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 30,
    width: Dimensions.get('screen').width,
  },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: Dimensions.get('screen').width - 60,
      marginTop: 30,
    },

      header_text: {
        fontSize: 24,
        fontWeight: 'bold',
        opacity: 0.65,
      },


        edit_img: {
          width: 24,
          height: 24,
          opacity: 0.7,
          marginTop: -10,
        },

    order_edit: {
      width: Dimensions.get('screen').width - 60,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: '#fff',
      borderRadius: 6,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.28,
      shadowRadius: 5,
      elevation: 4,
      padding: 10,
    },

      input: {
        width: '100%',
        padding: 8,
        borderRadius: 4,
        backgroundColor: '#D5E8F0',
      },

      input_b: {
        marginTop: 10,
      },

      buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
      },

        btn: {
          width: Dimensions.get('screen').width / 2 - 50,
          padding: 8,
          textAlign: 'center',
          borderRadius: 4,
        },

        btn_cancel: {
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: 'lightgray',
        },
        
        btn_save: {
          backgroundColor: '#008CC1',
        },

          btn_text: {
            textAlign: 'center',
            fontWeight: 'bold',
          },

          btn_text_save: {
            color: '#fff',
          },

          btn_text_cancel: {
            opacity: 0.7,

          },

    order: {
      width: Dimensions.get('screen').width - 60,
      marginTop: 10,
      borderRadius: 6,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.28,
      shadowRadius: 5,
      elevation: 4,
    },

      row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: 12,
        paddingLeft: 12,
        paddingRight: 12,
      },

      row_b: {
        paddingBottom: 12,
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },
      row_long: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
      },

      label: {
        fontWeight: 'bold',
        opacity: 0.70,
      },

      text: {
        opacity: 0.75,
        flexWrap: 'wrap',
      },
});