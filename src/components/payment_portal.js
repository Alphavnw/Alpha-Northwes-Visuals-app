import React, { useContext } from 'react';
import Context from '../context/context.js';
import StripeCheckout from './micro/stripe-checkout.js';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { StyleSheet, View, SafeAreaView, Text,TouchableOpacity, StatusBar } from 'react-native';

export default function PaymentPortal(props) {
  const cartContext = useContext(Context);

  const handleClose = _ => {
    console.log('Closed');
    props.navigation.navigate('MerchOrderOverview');
  }


  
  const onCheckStatus = async (res) => {
  
    let jsonRes = JSON.parse(res);

    try {
      const data = {
        price: cartContext.total,
        cart: cartContext.cart,
        user: cartContext.user,
        authToken: jsonRes,
        location: cartContext.shootLocation,
        photographer: cartContext.curPhotographer,
        date: cartContext.date,
      }

      const makePayment = await axios.post(`${BASE_URL}/user/pay`, data);
       console.log(makePayment);
      if (makePayment) {

     
        // props.navigation.navigate('Orders');
        // cartContext.cartRESET();
        setLoading(false);
      } else {
        console.log('Could not make the payment')
      };
    } catch (err) { console.log(err.response), setLoading(false); setErr(1) }
  }


  const handleSuccess = _ => {
    console.log('Success');
    props.navigation.navigate('Orders');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      { Platform.OS === 'ios' ? (
        <View style={styles.btn_view}>
          <TouchableOpacity onPressIn={ _ => props.navigation.goBack()}>
            <View style={styles.back_btn}>
              <Text style={styles.back_btn_text}>Back</Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : null }
      <StripeCheckout
        navigation={props.navigation}
        publicKey="pk_live_AUzulzbWhPDJgwGRez3gHcBB00oJ5lfR7v"
        amount={cartContext.total}
        imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
        storeName="Alpha Visuals"
        description="Merchant Online Payment"
        currency="USD"
        allowRememberMe={false}
        prepopulatedEmail={cartContext.user.email}
        onClose={ _ => handleClose()}
        onPaymentSuccess={ _ => handleSuccess()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },

    btn_view: {
      alignSelf: 'flex-start',
    },

    back_btn: {
      marginTop: 15,
      marginLeft: 15,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 20,
      backgroundColor: '#0078A4',
    },

      back_btn_text: {
        fontWeight: 'bold',
        color: '#fff',
      },
});








































