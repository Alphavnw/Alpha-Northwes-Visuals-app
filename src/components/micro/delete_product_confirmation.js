import React, { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, View, Text, Dimensions,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../context/context.js';
import { BASE_URL } from '../../helper/constant.js';
import { useState } from 'react/cjs/react.development';

export default function DeleteProductConfirmation() {
  const cartContext = useContext(Context);
  const [deletes, setDelete] = useState(false)
  // Handle Delete Confirmation
  const handleConfirmDelete = async _ => {
    const data = { deletedAt: new Date() }
     setDelete(true)
    try {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: token }}
      let id = cartContext.productEditing.id;

      await axios.put(`${BASE_URL}/store/${id}`, data, config)
        .then(res => {
          cartContext.setProducts(res.data);
          cartContext.handleDeleteProductConfirmation();
          setDelete(false);
        })
        .catch(err => {setDelete(false)})
    } catch (err) { console.log(err) }
  }

  // Handle Delete Cancelation
  const handleCancelDelete = _ => cartContext.handleDeleteProductConfirmation();

  return (
    <View>
      <View style={styles.wrap}>
        <Text style={styles.text}>
          Are you sure you want to delete {cartContext.productEditing.product}
        </Text>
        <View style={styles.btns}>
          <TouchableOpacity
            style={styles.confirm_btn}
            onPress={ _ => handleConfirmDelete()}>
            <Text style={styles.confirm_btn_text}>{deletes?"Wait...":"Confirm"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deny_btn}
            onPress={ _ => handleCancelDelete()}>
            <Text style={styles.deny_btn_text}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 6,
    zIndex: 1,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'lightgray',
  },

    text: {
      fontSize: 15,
      fontWeight: 'bold',
      width: 300,
      opacity: 0.6,
      textAlign: 'center',
      marginBottom: 20,
    },

    btns: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

      confirm_btn: {
        width: Dimensions.get('screen').width / 2 - 90,
        textAlign: 'center',
        borderRadius: 4,
        marginRight: 5,
        backgroundColor: '#009cd8'
      },

      deny_btn: {
        width: Dimensions.get('screen').width / 2 - 80,
        textAlign: 'center',
        borderRadius: 4,
        marginLeft: 5,
        backgroundColor: '#005575',
      },

        confirm_btn_text: {
          textAlign: 'center',
          padding: 10,
          color: '#fff',
          fontWeight: 'bold',
        },

        deny_btn_text: {
          textAlign: 'center',
          padding: 10,
          color: '#fff',
          fontWeight: 'bold',
        },
});
