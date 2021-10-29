import React, { useContext } from 'react';
import { Dimensions ,Platform, StyleSheet, View, Image, Text, TouchableNativeFeedback } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import Context from '../context/context.js';
import CartIMG from '../assets/cart.png';
import ProfileIMG from '../assets/profile.png';
import LogoIMG from '../assets/logo.png';

export default function Header(props) {
  const cartContext = useContext(Context);

  // Handle Profile Btn Click
  const handleProfileBtn = _ => {
    if (cartContext.token) cartContext.handleMenuToggle();
    else props.navigation.navigate('Login')
  }

  // Handle Cart Btn Click
  const handleCartBtn = _ => {
    if (cartContext.menuToggle) {
      cartContext.handleMenuToggle()
      props.navigation.navigate('Cart')
    } else props.navigation.navigate('Cart')
  }

  // Handle Profile Navigation
  const handleProfileNavigation = _ => {
    cartContext.handleMenuToggle();
    props.navigation.navigate('Profile');
  }

  // Handle Orders Navigation
  const handleOrdersNavigation = _ => {
    cartContext.handleMenuToggle();
    props.navigation.navigate('Orders');
  }

  // Handle Sign Out
  const handleSignout = _ => {
    cartContext.handleSignout();
    cartContext.handleMenuToggle();
    props.navigation.navigate('Index')
  }
  
  // Check Account Level and Navigate
  const handleAdmin = _ => {
    if (cartContext.accountType === 'admin') {
      cartContext.handleMenuToggle()
      
      props.navigation.navigate('AdminPanel')
    } else {
      cartContext.handleSignout()
      props.navigation.navigate('Index')
    }
  }

  // Handle Logo Press
  const handleLogoPress = _ => {
    cartContext.setMenuToggleOff();
    props.navigation.navigate('Index')
  }

  return (
    <View style={styles.container}>
      <View style={styles.logo_box}>
        { Platform.OS === 'ios' ? (
          <TouchableOpacity onPress={ _ => props.navigation.goBack()}>
            <View style={styles.back_btn}>
              <Text style={styles.back_btn_text}>Back</Text>
            </View>
          </TouchableOpacity>
        ) : null }
        <TouchableOpacity onPress={ _ => handleLogoPress()} >
          <Image source={LogoIMG} style={styles.logoIMG} />
        </TouchableOpacity>
      </View>
      <View name="navBox" style={styles.navBox}>        
        <View style={styles.menu_wrap} >
          <TouchableOpacity onPress={ _ => handleCartBtn()} >
            <View name="cart" style={styles.cart}>
              <Image source={CartIMG} style={styles.cartIMG} />
              {cartContext.cart.length > 0 ? (
                <View style={styles.cart_notification}>
                  <Text style={styles.cart_notification_text}>{cartContext.cart.length}</Text>
                </View>
              ) : null }
            </View>  
          </TouchableOpacity>
          <TouchableOpacity onPress={ _ => handleProfileBtn()} >
            <View name="profile" style={styles.profile}>
              <Image source={ProfileIMG} style={styles.profileIMG} />
            </View>  
          </TouchableOpacity>
        </View>
      </View>
      { cartContext.menuToggle ? (
        <View style={styles.cover}>
          <TouchableOpacity
            style={styles.profile_menu_reset}
            onPressIn={ _ => cartContext.handleMenuToggle()}>
          </TouchableOpacity>
        </View>
        ): null }
      { cartContext.menuToggle ? (
        <View style={styles.profile_menu_box}>
          <TouchableOpacity
            onPress={ _ => handleProfileNavigation()}
            style={[ styles.btn, styles.btn_first]}>
            <Text style={[styles.btn_text]}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[ styles.btn]}
            onPress={ _ => handleOrdersNavigation()}>
            <Text style={[styles.btn_text]}>My Orders</Text>
          </TouchableOpacity>
          { cartContext.accountType === 'admin' ? (
            
            <TouchableOpacity
              style={[ styles.btn]}
              onPress={ _ => handleAdmin()}>
             {cartContext.accountType==='admin'?<Text style={[styles.btn_text]}>Admin Panel</Text>:null}
            </TouchableOpacity>
          ) : null }
          <TouchableOpacity style={[styles.btn, styles.btn_last]} onPressIn={ _ => handleSignout()}>
            <Text style={[styles.btn_text, styles.signout_btn_text]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      ): null }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
    zIndex: 10,
    elevation: 16,
    backgroundColor: '#009cd8',
  },

    logo_box: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },

      logoIMG: {
        width: 40,
        height: 34,
      },

      gradient: {
        padding: 0,
        alignItems: 'center',
        borderRadius: 6,
      },
    
    back_btn: {
      marginRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 20,
      backgroundColor: '#fff',
    },

      back_btn_text: {
        fontWeight: 'bold',
        opacity: 0.65,
      },

    navBox: {
      height: 42,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-end',
    },

      filter: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        marginRight: 15,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
      },

      close_IMG: {
        width: 16,
        height: 16,
        opacity: 0.35,
      },

      menu_wrap: {
        width: 100,
        height: 42,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        elevation: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.28,
        shadowRadius: 5,
      },

        cart: {
          width: 52,
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 21,
          borderBottomLeftRadius: 21,
          backgroundColor: '#fff',
        },

        cartIMG: {
          width: 24,
          height: 24,
          opacity: 0.45,
          marginLeft: 8,
        },

        cart_notification: {
          width: 16,
          height: 16,
          borderRadius: 8,
          bottom: 6,
          left: 14,
          position: 'absolute',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        },

          cart_notification_text: {
            color: '#fff',
            fontSize: 9,
            fontWeight: 'bold',
          },

        profile: {
          width: 52,
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 21,
          borderBottomRightRadius: 21,
          backgroundColor: '#fff',
        },

        profileIMG: {
          width: 24,
          height: 24,
          marginRight: 8,
          opacity: 0.45,
        },

        navBtnBox: {
          width: 26,
          height: 20,
          marginLeft: 20,
          justifyContent: 'space-between',
        },

        navBtnLine: {
          width: '100%',
          height: 4,
          borderRadius: 6,
          backgroundColor: '#fdfdfd',
        },

    profile_menu_box: {
      zIndex: 15,
      elevation: 15,
      position: 'absolute',
      width: 140,
      borderRadius: 8,
      backgroundColor: '#fff',
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.28,
      shadowRadius: 5,
      right: 15,
      top: 65,
    },

      btn: {
        width: '100%',
      },

      btn_first: {
        marginTop: 10,
      },

      btn_last: {
        marginBottom: 10,
      },

        btn_text: {
          opacity: 0.6,
          textAlign: 'center',
          padding: 5,
        },

        signout_btn_text: {
          fontWeight: 'bold',
        },

    cover: {
      marginTop: 80,
      position: 'absolute',
      width: Dimensions.get('screen').width,
      height: Dimensions.get('screen').height,
      backgroundColor: '#fff',
      opacity: 0.5,
      elevation: 10,
    },

      profile_menu_reset: {
        height: '100%',
      }
});