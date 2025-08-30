import {createSlice} from "@reduxjs/toolkit";

// { key: value } → object
// [] → array

// like --->  { cartItem : [] }     state.cartItem
// state = initialState
// state.cartItem = []

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItem : []};

const addDecimal = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            // note : we don't need to user,rating , numReview or reviews
            const item = action.payload;
            const existingItem = state.cartItem.find((i) => i.id === item.id);
            if (existingItem) {
                state.cartItem = state.cartItem.map((i) => i._id === existingItem._id ? item : i);
            } else {
                state.cartItem = [...state.cartItem, item];
            }
            // calculate item price 
            // calculate shipping price
            // calculate tax price
            // calculate total price

            state.itemPrice = addDecimal(state.cartItem.reduce((acc, item) => acc + item.price * item.qty, 0));
            state.shippingPrice = addDecimal(state.itemPrice > 100 ? 0 : 10);
            state.taxPrice = addDecimal(0.15 * state.itemPrice);
            state.totalPrice = addDecimal(state.itemPrice + state.shippingPrice + state.taxPrice).toFixed(2);

            localStorage.setItem("cart", JSON.stringify(state));
        },
    }
})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;