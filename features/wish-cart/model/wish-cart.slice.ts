import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CartItem = {
  id: string;
  title: string;
  quantity: number;
  price: string | null;
};

const wishCartSlice = createSlice({
  name: 'wishCart',
  initialState: [] as CartItem[],
  reducers: {
    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
      const exists = state.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = wishCartSlice.actions;
export default wishCartSlice.reducer;
