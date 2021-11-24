import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import UserService from '../../services/userService';
import { CHANGE_USER_STATUS, GET_USERS } from '../constant/usersConstant';
import getAlphabet from '../../utils/helpers/getAlphabet';

export const getUsers = createAsyncThunk(GET_USERS, async () => {
  try {
    const response = await UserService.getUsers();
    const usersList = response.data;
    const usersSortable = {};
    const alphabet = getAlphabet();
    alphabet.forEach((character) => {
      usersSortable[character] = [];
      usersList.forEach(userItem => {
        const firstLetter = userItem.firstName[0].toUpperCase();
        if (character === firstLetter) {
          usersSortable[character].push({ ...userItem,status: 'not-active' });
        }
      });
    });
    return usersSortable;
  } catch (error) {
    console.log(error.response);
  }
});

export const changeUserStatus = createAction(
  CHANGE_USER_STATUS,
  (user, status) => {
    return {
      payload: {
        user: user,
        status: status,
      },
    };
  },
);
