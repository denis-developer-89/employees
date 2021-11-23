import { createReducer } from "@reduxjs/toolkit";
import { changeUserStatus, getUsers } from "../actions/userActions";

const initialState = {
  users: {},
  isLoading: false,
  error: [],
  usersBithday: [],
};

const usersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    })
    .addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    })
    .addCase(getUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase(changeUserStatus, (state, action) => {
      Object.keys(state.users).forEach(function (key) {
        state.users[key].forEach((user) => {
          if (user.id === action.payload.user.id) {
            if (action.payload.status === "active") {
              user.status = action.payload.status;
              state.usersBithday.push(user);
            } else {
              user.status = action.payload.status;
              state.usersBithday = state.usersBithday.filter((userBithday) => {
                return userBithday.id !== action.payload.user.id;
              });
            }
          }
        });
      });
    })

    .addDefaultCase((state, action) => state);
});

export default usersReducer;
