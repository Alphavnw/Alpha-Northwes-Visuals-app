import React,{Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Context from './context';
import { BASE_URL } from '../helper/constant';

export default class GlobalState extends React.Component{
  state = {
    user: [],
    photographers: [],
    shootLocationToggle: false,
    shootDateToggle: false,
    basicInfoToggle: false,
    shippingInfoToggle: false,
    newPhotographerToggle: false,
    editPhotographerToggle: false,
    shootLocation: [],
    services: [],
    curPhotographer: null,
    curGallery: [],
    cart: [],
    merch: [],
    filterList: [],
    cartError: false,
    serviceError: false,
    token: '',
    previousRoute: '',
    accountType: '',
    menuToggle: false,
    photographerEdit: [],
    serviceEditing: [],
    productEditing: [],
    deletePhotographerConfirmation: false,
    deleteServiceConfirmation: false,
    deleteProductConfirmation: false,
    adminPhotographerInteraction: '',
    adminServiceInteraction: '',
    adminProductInteraction: '',
    editAccountToggle: false,
    editShippingToggle: false,
    merchOrders: [],
    serviceOrders: [],
    selectedMerchOrder: [],
    selectedServiceOrder: [],
    merchOrdersALL: [],
    serviceOrdersALL: [],
    date: '',
    total: '',
    chosenPhotographer: '',
    chosenProduct: [],
  }

  componentDidMount() {
    this.getLoginToken();
    this.getPhotographers();
    this.getServices();
    this.getMerch();
  };

  getLoginToken = async _ => {
    const getToken = await AsyncStorage.getItem('token');
    const getUser = await AsyncStorage.getItem('user');

    if (getToken !== null) {
      this.setState({ token: getToken })
      this.setState({ user: JSON.parse(getUser) })
      this.setState({ accountType: JSON.parse(getUser).account_type })
    } else {
      this.setState({ token: '' });
      this.setState({ user: [] })
      this.setState({ accountType: '' })
    }
  }

  setLoginToken = async (token, user) => {
    const jsonUser = JSON.stringify(user);
    try {
       await AsyncStorage.setItem('token', token)
       await AsyncStorage.setItem('user', jsonUser)
       this.setState({ token: token })
       this.setState({ user: user })
       this.setState({ accountType: user.account_type })
    } catch (err) {
      console.log(err);
    }
  }

  handleSignout = async _ => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      this.setState({ token: '' })
      this.setState({ user: [] })
    } catch (err) {
      console.log(err);
    }
  }

  setPhotographers = el => this.setState({ photographers: el })
  setServices = el => this.setState({ services: el })
  setProducts = el => this.setState({ merch: el })
  setUser = el => this.setState({ user: el })
  setUserMerchOrders = el => this.setState({ merchOrders: el })
  setUserServiceOrders = el => this.setState({ serviceOrders: el })
  setSelectedMerchOrder = el => this.setState({ selectedMerchOrder: el })
  setSelectedServiceOrder = el => this.setState({ selectedServiceOrder: el })
  setMerchOrdersALL = el => this.setState({ merchOrdersALL: el })
  setServiceOrdersALL = el => this.setState({ serviceOrdersALL: el })
  setTotal = el => this.setState({ total: el })

  handleShootLocation = el => this.setState({ shootLocation: el });
  handleShootDate = el => this.setState({ date: el });

  getPhotographers = async _ => {
    try {
      await axios.get(`${BASE_URL}/photographers`)
      .then(res => this.setState({ photographers: res.data }))
        .catch(err => console.log(err))
    } catch (err) { console.log(err) }
  }

  getServices = async _ => {
    try {
      await axios.get(`${BASE_URL}/services`)
        .then(res => this.setState({ services: res.data }))
        .catch(err => console.log(err) )
    } catch (err) { console.log(err) }
  }

  getMerch = async _ => {
    try {
      await axios.get(`${BASE_URL}/store`)
        .then(res => this.setState({ merch: res.data }))
        .catch(err => console.log(err) )
    } catch (err) { console.log(err) }
  }

  setCurPhotographer = el => {
    this.setState({ curPhotographer: el });
  }

  setCurGallery = el => {
    this.setState({ curGallery: el });
  }
 
  handleCart = (prod) => {
    let cart = this.state.cart;
    let cartLength = this.state.cart.length;
    let isAlreadyInCart = false;

    if(cartLength > 0) {
      for (let i = 0; i < cartLength; i++) {
        if (cart[i].id === prod.id) {
          isAlreadyInCart = true;
          break;
        }
      }

      if (isAlreadyInCart) {
        let removeItemCart = [...cart];
        removeItemCart.splice(cart.indexOf(prod), 1);
        this.setState({ cart: removeItemCart });
      } else {
        let newItemCart = [...cart, prod];
        this.setState({ cart: newItemCart });
      }
    } else {
      let updatedCart = [...cart, prod];
      this.setState({ cart: updatedCart });
    }
  };

  changeItemQuantity = (q, el) => {
    var numRegex = /^[0-9]+$/;
    let cart = [...this.state.cart];
    let i = cart.indexOf(el);

    if (q.match(numRegex)) {
      cart[i].quantity = q;
      this.setState({ cart: cart });
      this.setState({ cartError: false });
    } else {
      this.setState({ cartError: !this.state.cartError });
    }
  };

  handleShootLocationToggle = _ => {
    let toggle = this.state.shootLocationToggle;
    this.setState({ shootLocationToggle: !toggle });
  }

  handleBasicInfoToggle = _ => {
    let toggle = this.state.basicInfoToggle;
    this.setState({ basicInfoToggle: !toggle });
  }

  handleShippingInfoToggle = _ => {
    let toggle = this.state.shippingInfoToggle;
    this.setState({ shippingInfoToggle: !toggle });
  }

  handleServiceError = res => {
    this.setState({ serviceError: res });
  }

  setPreviousRoute = route => {
    this.setState({ previousRoute: route });
  }

  handleMenuToggle = _ => {
    let toggle = this.state.menuToggle;
    this.setState({ menuToggle: !toggle })
  }

  setEditPhotographer = el => {
    this.setState({ photographerEdit: el })
  }

  setEditService = el => {
    this.setState({ serviceEditing: el })
  }

  setEditProduct = el => {
    this.setState({ productEditing: el })
  }

  handleDeletePhotographerConfirmation=(el)=>{
    const toggle = this.state.deletePhotographerConfirmation;
    this.setState({ deletePhotographerConfirmation: !toggle});
  }

  handleDeleteServiceConfirmation = _ => {
    let toggle = this.state.deleteServiceConfirmation;
    this.setState({ deleteServiceConfirmation: !toggle })
  }

  handleDeleteProductConfirmation = _ => {
    let toggle = this.state.deleteProductConfirmation;
    this.setState({ deleteProductConfirmation: !toggle })
  }

  handleEditAccountToggle = _ => {
    let toggle = this.state.editAccountToggle;
    this.setState({ editAccountToggle: !toggle })
  }

  handleEditShippingToggle = _ => {
    let toggle = this.state.editShippingToggle;
    this.setState({ editShippingToggle: !toggle })
  }

  handleAdminPhotographerInteraction = status => {
    this.setState({ adminPhotographerInteraction: status });
  }

  handleAdminServiceInteraction = status => {
    this.setState({ adminServiceInteraction: status });
  }

  handleAdminProductInteraction = status => { 
    this.setState({ adminProductInteraction: status });
  }

  setChosenPhotographer = el => this.setState({ chosenPhotographer: el });
  setChosenProduct = el => this.setState({ chosenProduct: el });

  photographerEditRESET = _ => this.setState({ photographerEdit: [] });
  serviceEditingRESET = _ => this.setState({ serviceEditing: [] });
  productEditingRESET = _ => this.setState({ productEditing: [] });
  cartRESET = _ => this.setState({ cart: [] });

  setMenuToggleOff = _ => this.setState({ menuToggle: false });

  render(){
    return (
      <Context.Provider 
        value={{
          user: this.state.user,
          photographers: this.state.photographers,
          curPhotographer: this.state.curPhotographer,
          curGallery: this.state.curGallery,
          cart: this.state.cart,
          shootLocation: this.state.shootLocation,
          shootLocationToggle: this.state.shootLocationToggle,
          shootDateToggle: this.state.shootDateToggle,
          basicInfoToggle: this.state.basicInfoToggle,
          shippingInfoToggle: this.state.shippingInfoToggle,
          merch: this.state.merch,
          services: this.state.services,
          filterList: this.state.filterList,
          cartError: this.state.cartError,
          serviceError: this.state.serviceError,
          token: this.state.token,
          previousRoute: this.state.previousRoute,
          accountType: this.state.accountType,
          menuToggle: this.state.menuToggle,
          photographerEdit: this.state.photographerEdit,
          serviceEditing: this.state.serviceEditing,
          productEditing: this.state.productEditing,
          adminPhotographerInteraction: this.state.adminPhotographerInteraction,
          adminServiceInteraction: this.state.adminServiceInteraction,
          adminProductInteraction: this.state.adminProductInteraction,
          deletePhotographerConfirmation: this.state.deletePhotographerConfirmation,
          deleteServiceConfirmation: this.state.deleteServiceConfirmation,
          deleteProductConfirmation: this.state.deleteProductConfirmation,
          editAccountToggle: this.state.editAccountToggle,
          editShippingToggle: this.state.editShippingToggle,
          merchOrders: this.state.merchOrders,
          serviceOrders: this.state.serviceOrders,
          selectedMerchOrder: this.state.selectedMerchOrder,
          selectedServiceOrder: this.state.selectedServiceOrder,
          merchOrdersALL: this.state.merchOrdersALL,
          serviceOrdersALL: this.state.serviceOrdersALL,
          date: this.state.date,
          total: this.state.total,
          chosenPhotographer: this.state.chosenPhotographer,
          chosenProduct: this.state.chosenProduct,
          setLoginToken: this.setLoginToken,
          getLoginToken: this.getLoginToken,
          handleSignout: this.handleSignout,
          setCurGallery: this.setCurGallery,
          setCurPhotographer: this.setCurPhotographer,
          changeItemQuantity: this.changeItemQuantity,
          getMerch: this.getMerch,
          handleShootLocation: this.handleShootLocation,
          handleCart: this.handleCart,
          handleShootLocationToggle: this.handleShootLocationToggle,
          handleBasicInfoToggle: this.handleBasicInfoToggle,
          handleShippingInfoToggle: this.handleShippingInfoToggle,
          handleServiceError: this.handleServiceError,
          setPreviousRoute: this.setPreviousRoute,
          handleMenuToggle: this.handleMenuToggle,
          setPhotographers: this.setPhotographers,
          getPhotographers: this.getPhotographers,
          setServices: this.setServices,
          getServices: this.getServices,
          setProducts: this.setProducts,
          setUser: this.setUser,
          setUserMerchOrders: this.setUserMerchOrders,
          setUserServiceOrders: this.setUserServiceOrders,
          setSelectedMerchOrder: this.setSelectedMerchOrder,
          setSelectedServiceOrder: this.setSelectedServiceOrder,
          setTotal: this.setTotal,
          handleShootDate: this.handleShootDate,
          setEditPhotographer: this.setEditPhotographer,
          setEditService: this.setEditService,
          setEditProduct: this.setEditProduct,
          handleDeletePhotographerConfirmation: this.handleDeletePhotographerConfirmation,
          handleDeleteServiceConfirmation: this.handleDeleteServiceConfirmation,
          handleDeleteProductConfirmation: this.handleDeleteProductConfirmation,
          handleEditAccountToggle: this.handleEditAccountToggle,
          handleEditShippingToggle: this.handleEditShippingToggle,
          handleAdminPhotographerInteraction: this.handleAdminPhotographerInteraction,
          handleAdminServiceInteraction: this.handleAdminServiceInteraction,
          handleAdminProductInteraction: this.handleAdminProductInteraction,
          photographerEditRESET: this.photographerEditRESET,
          serviceEditingRESET: this.serviceEditingRESET,
          productEditingRESET: this.productEditingRESET,
          cartRESET: this.cartRESET,
          setMerchOrdersALL: this.setMerchOrdersALL,
          setServiceOrdersALL: this.setServiceOrdersALL,
          setChosenPhotographer: this.setChosenPhotographer,
          setChosenProduct: this.setChosenProduct,
          setMenuToggleOff: this.setMenuToggleOff,
        }}>
      {this.props.children}
      </Context.Provider>
    );
  }
}