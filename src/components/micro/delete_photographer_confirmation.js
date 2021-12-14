import React, { useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StyleSheet, View, Text, Dimensions,} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Context from '../../context/context.js';
import { BASE_URL } from '../../helper/constant.js';

export default function DeletePhotographerConfirmation() {
  const cartContext = useContext(Context);
  const [confirm, setConfirm] = useState(false);
  // Handle Delete Confirmation
  const handleConfirmDelete = async _ => {
    const data = { deletedAt: new Date() }
      setConfirm(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const config = { headers: { Authorization: token }}
      let id = cartContext.photographerEdit.id;

      await axios.put(`${BASE_URL}/photographers/${id}/delete`, data, config)
        .then(res => {
          cartContext.setPhotographers(res.data);
          cartContext.handleDeletePhotographerConfirmation();
        })
        .catch(err => console.log(err))
    } catch (err) { console.log(err) }
  }

  // Handle Delete Cancelation
  const handleCancelDelete = _ => cartContext.handleDeletePhotographerConfirmation();

  return (
     
    <View style={styles.wrap}>
    <Text style={styles.text}>
      Are you sure you want to delete {cartContext.photographerEdit.name}
    </Text>
    <View style={styles.btns}>
      <TouchableOpacity
        style={styles.confirm_btn}
        onPress={ _ => handleConfirmDelete()}>
        <Text style={styles.confirm_btn_text}>{confirm?"Wait...":'Confirm'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deny_btn}
        onPress={ _ => handleCancelDelete()}>
        <Text style={styles.deny_btn_text}>Cancel</Text>
      </TouchableOpacity>
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
      width: '85%',
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



