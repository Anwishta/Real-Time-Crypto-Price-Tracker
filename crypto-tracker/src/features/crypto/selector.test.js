import { selectPrices, selectTopGainers } from './selectors';

describe('crypto selectors', () => {
  const state = {
    crypto: {
      prices: [{ id: 1, price: 100 }],
      topGainers: [{ id: 1, price: 150 }],
    },
  };

  it('should select prices', () => {
    const result = selectPrices(state);
    expect(result).toEqual([{ id: 1, price: 100 }]);
  });

  it('should select top gainers', () => {
    const result = selectTopGainers(state);
    expect(result).toEqual([{ id: 1, price: 150 }]);
  });
});
