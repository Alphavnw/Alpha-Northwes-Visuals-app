import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GlobalState from './src/context/global_state.js';
import Index from './src/views/index.js';
import Store from './src/views/store.js';
import BookingStepOne from './src/views/booking_step_one.js';
import BookingStepTwo from  './src/views/booking_step_two.js';
import BookingStepThree from './src/views/booking_step_three.js';
import { StripeProvider } from '@stripe/stripe-react-native';
import Cart from './src/views/cart.js';
import Profile from './src/views/profile.js';
import Login from './src/views/login.js';
import MerchOrderOverview from './src/views/merch_order_overview.js';
import Gallery from './src/views/gallery.js';
import AdminPanel from './src/views/admin/admin_panel.js';
import PhotographerForm from './src/views/admin/photographer_form.js';
import ServiceForm from './src/views/admin/service_form.js';
import ProductForm from './src/views/admin/product_form.js';
import OrderingStepOne from './src/views/ordering_step_one.js';
import OrderingStepTwo from './src/views/ordering_step_two.js';
import Orders from './src/views/orders.js';
import SelectedMerchOrder from './src/views/selected_merch_order.js';
import SelectedServiceOrder from './src/views/selected_service_order.js';
import SelectedMerchOrderADMIN from './src/views/admin/selected_merch_order.js';
import SelectedServiceOrderADMIN from './src/views/admin/selected_service_order.js';
import PaymentPortal from './src/components/payment_portal.js';
import TS from './src/views/ts.js';
import SelectedProduct from './src/views/selected_product.js';

export default function App() {
  const STRIPE_PK = 'pk_live_AUzulzbWhPDJgwGRez3gHcBB00oJ5lfR7v';
  return (
    <StripeProvider
    publishableKey={STRIPE_PK}
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
  >
    <GlobalState>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Index" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Index">
            { props => <Index {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Store">
            { props => <Store {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BookingStepOne">
            { props => <BookingStepOne {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BookingStepTwo">
            { props => <BookingStepTwo {...props} />}
          </Stack.Screen>
          <Stack.Screen name="BookingStepThree">
            { props => <BookingStepThree {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Cart">
            { props => <Cart {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Profile">
            { props => <Profile {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Login">
            { props => <Login {...props} />}
          </Stack.Screen>
          <Stack.Screen name="MerchOrderOverview">
            { props => <MerchOrderOverview {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Gallery">
            { props => <Gallery {...props} />}
          </Stack.Screen>
          <Stack.Screen name="AdminPanel">
            { props => <AdminPanel {...props} />}
          </Stack.Screen>
          <Stack.Screen name="PhotographerForm">
            { props => <PhotographerForm {...props} />}
          </Stack.Screen>
          <Stack.Screen name="ServiceForm">
            { props => <ServiceForm {...props} />}
          </Stack.Screen>
          <Stack.Screen name="ProductForm">
            { props => <ProductForm {...props} />}
          </Stack.Screen>
          <Stack.Screen name="OrderingStepOne">
            { props => <OrderingStepOne {...props} />}
          </Stack.Screen>
          <Stack.Screen name="OrderingStepTwo">
            { props => <OrderingStepTwo {...props} />}
          </Stack.Screen>
          <Stack.Screen name="Orders">
            { props => <Orders {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SelectedMerchOrder">
            { props => <SelectedMerchOrder {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SelectedServiceOrder">
            { props => <SelectedServiceOrder {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SelectedMerchOrderADMIN">
            { props => <SelectedMerchOrderADMIN {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SelectedServiceOrderADMIN">
            { props => <SelectedServiceOrderADMIN {...props} />}
          </Stack.Screen>
          <Stack.Screen name="PaymentPortal">
            { props => <PaymentPortal {...props} />}
          </Stack.Screen>
          <Stack.Screen name="TS">
            { props => <TS {...props} />}
          </Stack.Screen>
          <Stack.Screen name="SelectedProduct">
            { props => <SelectedProduct {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
    </StripeProvider>
  );
}

const Stack = createStackNavigator();
