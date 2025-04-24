import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  status: 'idle', 
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setCryptoData: (state, action) => {
      state.data = action.payload;
      state.status = 'succeeded'; 
    },
    updateLivePrice: (state, action) => {
      const { symbol, price } = action.payload;
      state.data = state.data.map((coin) =>
        coin.symbol.toLowerCase() === symbol.toLowerCase()
          ? { ...coin, price: parseFloat(price) }
          : coin
      );
    },
    updateRandomData: (state) => {
      state.data = state.data.map((coin) => {
        const priceChange = (Math.random() - 0.5) * 2; 
        const volumeChange = (Math.random() - 0.5) * 100000000; 

        return {
          ...coin,
          price: coin.price + priceChange,
          priceChange1h: coin.priceChange1h + priceChange / 100,
          volume: coin.volume + volumeChange,
        };
      });
    },
    setStatusLoading: (state) => {
      state.status = 'loading'; 
    },
    setStatusFailed: (state) => {
      state.status = 'failed'; 
    },
  },
});

export const {
  setCryptoData,
  updateRandomData,
  updateLivePrice,
  setStatusLoading,
  setStatusFailed,
} = cryptoSlice.actions;

export default cryptoSlice.reducer;
