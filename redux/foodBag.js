import { createSlice } from '@reduxjs/toolkit';

const url = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

export const cartSlice = createSlice({
  name: 'foodCart',
  initialState: {
    items: [],
    itemsAmount: 0,
    itemsTotal: 0,
  },
  reducers: {
    storeItemsInCart: function (state, action) {
      state.items = action.payload?.items;
      state.itemsAmount = action.payload?.itemsAmount;
      state.itemsTotal = action.payload?.itemsTotal;
    },
    addToCart: function (state, action) {
      const isThere = state.items.find(
        (item) => item._id === action.payload?.data?._id
      );
      if (!isThere && state.items.length > 0) {
        const updateToDB = async (data) => {
          try {
            await axios.patch(
              `${url}/orders/${localStorage.getItem('cartID')}`,
              data
            );
          } catch (error) {
            console.log(error);
          }
        };
        const amount = action.payload?.data?.amount;
        const price = action.payload?.data?.price;
        state.items.push(action.payload?.data);
        state.itemsAmount += 1;
        state.itemsTotal += Number(price * amount);
        updateToDB(state);
      }
      if (!isThere && !state.items.length) {
        const addToDB = async (data) => {
          try {
            const res = await axios.post(`${url}/orders`, data);
            localStorage.setItem('cartID', res.data?.order?._id);
          } catch (error) {
            console.log(error);
          }
        };
        const amount = action.payload?.data?.amount;
        const price = action.payload?.data?.price;
        state.items.push(action.payload?.data);
        state.itemsAmount += 1;
        state.itemsTotal += Number(price * amount);
        addToDB(state);
      }
    },
    addAmount: (state, action) => {
      const updateToDB = async (data) => {
        try {
          const res = await axios.patch(
            `${url}/orders/${localStorage.getItem('cartID')}`,
            data
          );
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      const stateCopy = JSON.parse(JSON.stringify(state));
      const itemIndex = stateCopy.items.findIndex(
        (item) => item._id === action.payload.props.id
      );
      const item = stateCopy.items[itemIndex];
      item.amount += 1;
      state.items[itemIndex] = item;
      state.itemsTotal += Number(action.payload.props.price);
      updateToDB(state);
    },
    reduceAmount: (state, action) => {
      const updateToDB = async (data) => {
        try {
          await axios.patch(
            `${url}/orders/${localStorage.getItem('cartID')}`,
            data
          );
        } catch (error) {
          console.log(error);
        }
      };
      const stateCopy = JSON.parse(JSON.stringify(state));
      const itemIndex = stateCopy.items.findIndex(
        (item) => item._id === action.payload.props.id
      );
      const item = stateCopy.items[itemIndex];
      item.amount -= 1;
      state.items[itemIndex] = item;
      state.itemsTotal -= Number(action.payload.props.price);
      updateToDB(state);
    },
    reset: (state, action) => {
      const empty = [];
      state.items = empty;
      state.itemsAmount = 0;
      state.itemsTotal = 0;
    },
    removeFromCart: (state, action) => {
      const updateToDB = async (data) => {
        try {
          const res = await axios.patch(
            `${url}/orders/${localStorage.getItem('cartID')}`,
            data
          );
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      };
      state.items = state.items.filter(
        (item) => item._id !== action.payload.id
      );
      state.itemsAmount -= 1;
      state.itemsTotal -= Number(action.payload.price * action.payload.amount);
      updateToDB(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  storeItemsInCart,
  addAmount,
  reduceAmount,
  reset,
} = cartSlice.actions;
export default cartSlice.reducer;
