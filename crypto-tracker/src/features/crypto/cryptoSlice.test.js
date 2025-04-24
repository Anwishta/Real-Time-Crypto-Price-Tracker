import cryptoReducer, { setPrices, setTopGainers } from './cryptoSlice';

describe('cryptoSlice reducer', () => {
  const initialState = {
    prices: [],
    topGainers: [],
  };

  it('should handle setPrices action', () => {
    const action = setPrices([{ id: 1, price: 100 }]);
    const newState = cryptoReducer(initialState, action);
    expect(newState.prices).toEqual([{ id: 1, price: 100 }]);
  });

  it('should handle setTopGainers action', () => {
    const action = setTopGainers([{ id: 1, price: 150 }]);
    const newState = cryptoReducer(initialState, action);
    expect(newState.topGainers).toEqual([{ id: 1, price: 150 }]);
  });
});
