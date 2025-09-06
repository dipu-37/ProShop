import { createSlice } from "@reduxjs/toolkit";

// { key: value } → object
// [] → array

// like --->  { cartItem : [] }     state.cartItem
// state = initialState
// state.cartItem = []

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItem: [] , shippingAddress: {}, paymentMethod: 'PayPal' };

const addDecimal = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // note : we don't need to user,rating , numReview or reviews
      const item = action.payload;
      const existingItem = state.cartItem.find((i) => i._id === item._id);
      if (existingItem) {
        state.cartItem = state.cartItem.map((i) =>
          i._id === existingItem._id ? item : i
        );
      } else {
        state.cartItem = [...state.cartItem, item];
      }
      // calculate item price
      // calculate shipping price
      // calculate tax price
      // calculate total price

      const itemPriceNum = state.cartItem.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
      );
      state.itemPrice = addDecimal(itemPriceNum);
      state.shippingPrice = addDecimal(itemPriceNum > 100 ? 0 : 10);
      state.taxPrice = addDecimal(0.15 * itemPriceNum);
      state.totalPrice = addDecimal(
        parseFloat(state.itemPrice) +
          parseFloat(state.shippingPrice) +
          parseFloat(state.taxPrice)
      );

      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItem = state.cartItem.filter((item) => item._id !== id);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCartItems: (state) => {
      state.cartItem = [];
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;

// state = {
//   cartItem: [
//     {
//       id: "p1",
//       name: "Laptop",
//       price: 500,
//       qty: 2,
//       image: "/laptop.jpg"
//     },
//     {
//       id: "p2",
//       name: "Headphone",
//       price: 50,
//       qty: 1,
//       image: "/headphone.jpg"
//     }
//   ],
//   itemPrice: "1050.00",
//   shippingPrice: "0.00",
//   taxPrice: "157.50",
//   totalPrice: "1207.50"
// }
