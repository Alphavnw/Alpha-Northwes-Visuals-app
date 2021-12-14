import React, { useState, useEffect, useContext } from 'react'
import Context from '../../context/context.js';
import axios from 'axios';
import { StyleSheet, Dimensions, ActivityIndicator,View,Button,Text, Alert } from 'react-native'
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { BASE_URL } from '../../helper/constant.js';



export default function StripeCheckout(props) {
  const [loading, setLoading] = useState(false);
  const cartContext = useContext(Context);
  const {confirmPayment} = useStripe();
   const[err,setErr]=useState(0)
  useEffect( _ => {
    convertCartToDesc();
  }, [])

  const convertCartToDesc = _ => {
    let cart = [];
    cartContext.cart.forEach(el => cart.push(el.product));
    // setDescription(cart);
  }

  const onCheckStatus = async (res) => {
    // setResponse(res);
    setLoading(true);

    // let jsonRes = JSON.parse(res);

    try {
      const data = {
        price: cartContext.total,
        cart: cartContext.cart,
        user: cartContext.user,
        // authToken: jsonRes,
        location: cartContext.shootLocation,
        photographer: cartContext.curPhotographer,
        date: cartContext.date,
      }

      const makePayment = await axios.post(`${BASE_URL}/user/pay`, data);
      if (makePayment) {
        const {paymentIntent} = makePayment.data;
        console.log(paymentIntent);
         const { error} = await confirmPayment(`${paymentIntent}`,{
           type: 'Card'
         });
         
         if(!error){
          props.navigation.navigate('Orders');
          cartContext.cartRESET();
         }else{
           console.log(error);
           Alert.alert("Error", `${error.message}`)
         }
        setLoading(false);
      } else {
        console.log('Could not make the payment');
        setLoading(false);
      };
    } catch (err) { console.log(err.response), setLoading(false); setErr(1) }
  }


  

  const onMessage = (event) => {
    const { data } =  event.nativeEvent;
    const jsonData = JSON.parse(data)

    if (jsonData.error) return;
    else onCheckStatus(data)
  }
  
  return (

    <View style={styles.webview}>
       {err==1? <Text style={styles.payment_err_box}>
                  { err === 1 ?`Payment can not be completed at the moment`:null}
               </Text>:null}
      <Text style={{color:'white',fontSize:20,textAlign:'center'}}>Enter Your Card below to Proceed</Text>
    <CardField
      postalCodeEnabled={false}
      placeholder={{
        number: '4242 4242 4242 4242',
      }}
      cardStyle={{
        backgroundColor: '#FFFFFF',
        textColor: '#000000',
      }}
      style={{
        width: '100%',
        height: 50,
        marginVertical: 30,
      }}
    />
     <Button onPress={onCheckStatus} title={loading?"Processing...":"PAY NOW"} disabled={loading} />

   
  </View>
    )
    
};

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get('screen').width,
    backgroundColor: '#0078A4',
    justifyContent:'center',
    height: '400%',
    flex: 0,
  },
  payment_err_box: {
    width: '100%',
    padding: 16,
    borderRadius: 6,
    backgroundColor: 'pink',
    marginBottom: 10,
  },

  indicator: {
    marginTop: Dimensions.get('screen').height / 2 - 100,
  }
});



