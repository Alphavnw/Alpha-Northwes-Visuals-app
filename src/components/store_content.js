import React, { useContext, useEffect } from 'react';
import Context from '../context/context.js';
import { Dimensions, StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';

export default function StoreContent(props) {
  const cartContext = useContext(Context);

  useEffect( _ => {
    cartContext.setPreviousRoute('Store');
  }, [])

  // Handle Selection
  const handleProductSelect = el => {
    cartContext.setChosenProduct(el);
    props.navigation.navigate('SelectedProduct');
  }

  console.log(cartContext.merch);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.store}>
        { cartContext.merch.length > 0 ? (
          <View style={styles.more_services_box}>
            <Text style={styles.more_services_text}>For Custom Orders Contact Us Directly at alphavnw@gmail.com</Text>
          </View>
        ) : null }
        { cartContext.merch.length > 0 ? (
          cartContext.merch.map((el) => {
            return (
              <TouchableOpacity
                onPress={ _ => handleProductSelect(el)}
                key={el.id}
                disabled={cartContext.menuToggle}>
                <View style={styles.prod_box}>
                  <View style={styles.prod_img_box}>
                    <Image source={{ uri: el.image1 }} style={styles.prod_img} />
                  </View>
                  <View style={styles.prod_price}>
                    <Text style={styles.prod_price_text}>{`$${el.price}`}</Text>
                  </View>
                  <View style={styles.prod_desc}>
                    <View>
                      <Text style={styles.prod_desc_title}>{el.product}</Text>
                      <Text style={styles.prod_desc_text}>
                        {el.description.length > 40 ? (
                          `${el.description.substring(0, 40)} ...`
                        ) : el.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })
        ) : <ActivityIndicator size="large" color="#0080B1" style={styles.indicator} /> }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fdfdfd',
  },

    store: {
      width: Dimensions.get('screen').width,
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      paddingRight: 15,
      paddingLeft: 15,
      paddingBottom: 15,
      paddingTop: 5,
    },

      prod_box: {
        width: Dimensions.get('screen').width / 2 - 24,
        borderRadius: 6,
        backgroundColor: '#fff',
        marginTop: 8,
        marginBottom: 7,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
      },

        prod_img_box: {
          width: 110,
          height: 110,
          borderTopRightRadius: 6,
          borderTopLeftRadius: 6,
        },

          prod_img: {
            width: '100%',
            height: 120,
            borderTopRightRadius: 6,
            borderTopLeftRadius: 6,
          },

        prod_price: {
          position: 'absolute',
          color: '#fff',
          backgroundColor: '#009cd8',
          fontSize: 14,
          borderRadius: 22,
          width: 44,
          height: 44,
          justifyContent: 'center',
          alignItems: 'center',
          top: 90,
          right: 10,
          zIndex: 2,
        },

          prod_price_text: {
            color: '#fff',
            fontSize: 14,
            fontWeight: 'bold', 
          },

        prod_desc: {
          justifyContent: 'space-between',
          width: '100%',
          height: 120,
          borderBottomRightRadius: 6,
          borderBottomLeftRadius: 6,
          padding: 12,
          backgroundColor: '#F2F2F2',
        },

          prod_desc_title: {
            paddingBottom: 5,
            color: '#666666',
            fontWeight: 'bold',
            fontSize: 14,
            width: 100,
          },

          prod_desc_text: {
            color: 'gray',
            fontSize: 13,
            paddingTop: 4,
          },

      more_services_box: {
        width: Dimensions.get('screen').width - 26,
        borderRadius: 4,
        backgroundColor: 'lightblue',
        padding: 5,
        marginTop: 5,
      },
  
        more_services_text: {
          fontSize: 13,
          textAlign: 'center',
        },
          
      gradient: {
        alignItems: 'center',
        borderRadius: 8, 
      },

      indicator: {
        marginTop: Dimensions.get('screen').height / 2 - 100,
      }
});