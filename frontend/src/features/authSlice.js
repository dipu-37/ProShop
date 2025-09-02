import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // login
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
    },
    logout : (state) => {
      state.userInfo = null;
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      //localStorage.removeItem("userInfo");
      localStorage.clear();
    }
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// action.payload = data ,  form input ar time a j formate a data pathbo oi vabe pabe;



// {
//   auth: {
//     userInfo: {
//       id: "123",
//       name: "Dipu",
//       email: "dipu@example.com",
//       token: "jwt-token-here"
//     }
//   }
// }


// form theke data pathice ai vabe obj aker a 

/*

{
  id: "123",
  name: "Dipu",
  email: "dipu@example.com",
  token: "jwt-token-here"
}

*/


// action.payload o amr obj aker a data pabe 

// action.payload = {
//   id: "123",
//   name: "Dipu",
//   email: "dipu@example.com",
//   token: "jwt-token-here"
// };

