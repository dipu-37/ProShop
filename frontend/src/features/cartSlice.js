import {createSlice} from "@reduxjs/toolkit";


// obj ---> { key : value }
// like --->  { cartItem : [] } 
// state = initialState
// state.cartItem = []

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItem : []};

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItem.find((i) => i.id === item.id);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                state.cartItem.push(item);
            }
            localStorage.setItem("cart", JSON.stringify(state.cartItem));
        },
    }
})


export default cartSlice.reducer;