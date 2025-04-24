import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCryptoData, updateRandomData } from '../features/crypto/cryptoSlice';
import { formatNumber } from '../utils/formatNumber';
import BinanceWebSocket from './BinanceWebSocket';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import CryptoCard from './CryptoCard';

const CryptoTracker = () => {
  const dispatch = useDispatch();
  const cryptoData = useSelector((state) => state.crypto.data);

  const [search, setSearch] = useState(() => localStorage.getItem('search') || '');
  const [sortType, setSortType] = useState(() => localStorage.getItem('sortType') || '');
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchCryptoData = async () => {
    try {
      const response = await fetch('https://openapiv1.coinstats.app/coins?currency=INR', {
        headers: {
          accept: 'application/json',
          'X-API-KEY': '1uYAa8X89o1w6RoFyrhmebYw3C7b6xRN+8HOqQegYDM=',
        },
      });
      const data = await response.json();
      dispatch(setCryptoData(data.result));
    } catch (err) {
      console.error('API error:', err);
    }
  };

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  useEffect(() => {
    localStorage.setItem('search', search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem('sortType', sortType);
  }, [sortType]);

  useEffect(() => {
    fetchCryptoData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateRandomData());
    }, 2000);
    return () => clearInterval(interval);
  }, [dispatch]);

  const rightCell = "px-2 py-1 text-right";
  const leftCell = "px-0 py-1 text-left";
  const leftHeader = "px-0 py-1 text-left";

  return (
    <div className="p-6">
      <BinanceWebSocket />
      <h1 className="text-3xl font-bold mb-4 text-center">Real-Time Crypto Price Tracker</h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
        />
       <select
  value={sortType}
  onChange={(e) => setSortType(e.target.value)}
  className="border border-gray-300 rounded px-4 py-2 w-full md:w-1/3"
>
  <option value="">Default (Rank)</option>
  <option value="top_gainers">Top Gainers</option>
  <option value="top_losers">Top Losers</option>
  <option value="price_desc">Price (High → Low)</option>
  <option value="price_asc">Price (Low → High)</option>
  <option value="marketcap_desc">Market Cap (High → Low)</option>
  <option value="marketcap_asc">Market Cap (Low → High)</option>
</select>
      </div>

      <table className="w-full table-auto text-sm hidden md:block">
        <thead className="bg-gray-100">
          <tr>
            <th className={leftHeader}></th>
            <th className={leftCell}>#</th>
            <th className={leftCell}>Name</th>
            <th className={rightCell}>Price</th>
            <th className={rightCell}>1h %</th>
            <th className={rightCell}>24h %</th>
            <th className={rightCell}>7d %</th>
            <th className={rightCell}>Market Cap</th>
            <th className={rightCell}>Volume (24h)</th>
            <th className={rightCell}>Circulating&nbsp;Supply</th>
            <th className={rightCell}>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData
            .filter((crypto) =>
              crypto.name.toLowerCase().includes(search.toLowerCase())
            )
                .sort((a, b) => {
                    switch (sortType) {
                      case 'top_gainers':
                        return b.priceChange1d - a.priceChange1d;
                      case 'top_losers':
                        return a.priceChange1d - b.priceChange1d;
                      case 'price_desc':
                        return b.price - a.price;
                      case 'price_asc':
                        return a.price - b.price;
                      case 'marketcap_desc':
                        return b.marketCap - a.marketCap;
                      case 'marketcap_asc':
                        return a.marketCap - b.marketCap;
                      default:
                        return a.rank - b.rank;
                    }
                  })
                  
            .map((crypto, index) => (
              <tr key={crypto.id || index} className="border-b border-gray-300">
                <td className="text-left">
                  <FontAwesomeIcon
                    icon={faStar}
                    className={`cursor-pointer ${
                      favorites.includes(crypto.id)
                        ? 'text-yellow-500'
                        : 'text-gray-400'
                    }`}
                    onClick={() => toggleFavorite(crypto.id)}
                  />
                </td>
                <td>{crypto.rank}</td>
                <td className="text-left">
                  <div className="flex items-center gap-1">
                    <img src={crypto.icon} alt={crypto.name} className="w-6 h-6" />
                    <span className="font-semibold">{crypto.name}</span>
                    <span className="text-xs text-gray-500 ml-1">{crypto.symbol}</span>
                  </div>
                </td>
                <td className={rightCell}>${crypto.price?.toFixed(2)}</td>
                <td className={`${rightCell} ${crypto.priceChange1h > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="inline-flex items-center gap-1 justify-end">
                    <span>{crypto.priceChange1h > 0 ? '▲' : '▼'}</span>
                    <span>{crypto.priceChange1h?.toFixed(2)}%</span>
                  </span>
                </td>
                <td className={`${rightCell} ${crypto.priceChange1d > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="inline-flex items-center gap-1 justify-end">
                    <span>{crypto.priceChange1d > 0 ? '▲' : '▼'}</span>
                    <span>{crypto.priceChange1d?.toFixed(2)}%</span>
                  </span>
                </td>
                <td className={`${rightCell} ${crypto.priceChange1w > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  <span className="inline-flex items-center gap-1 justify-end">
                    <span>{crypto.priceChange1w > 0 ? '▲' : '▼'}</span>
                    <span>{crypto.priceChange1w?.toFixed(2)}%</span>
                  </span>
                </td>
                <td className={rightCell}>${crypto.marketCap?.toLocaleString()}</td>
                <td className={rightCell}>
                  ${crypto.volume?.toLocaleString()}<br />
                  <span className="text-xs text-gray-500">
                    {(crypto.volume / crypto.price)?.toFixed(2)} {crypto.symbol}
                  </span>
                </td>
                <td className={rightCell}>
                  {formatNumber(crypto.availableSupply)} {crypto.symbol}
                  <div className="w-full bg-gray-300 h-1 rounded mt-1">
                    <div
                      className="bg-gray-200 h-1 rounded"
                      style={{
                        width: `${Math.min(
                          formatNumber(crypto.availableSupply / 1_000_000_000) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </td>
                <td className={rightCell}>
  <div className="relative w-full">
    <img
      src="https://www.coingecko.com/coins/1/sparkline.svg"
      alt="7d trend"
      className="h-16 object-contain mx-auto" 
    />
  </div>
</td>

              </tr>
            ))}
        </tbody>
      </table>
     
<div className="block md:hidden space-y-4">
  {cryptoData
    .filter((crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortType) {
        case 'top_gainers': return b.priceChange1d - a.priceChange1d;
        case 'top_losers': return a.priceChange1d - b.priceChange1d;
        case 'price_desc': return b.price - a.price;
        case 'price_asc': return a.price - b.price;
        case 'marketcap_desc': return b.marketCap - a.marketCap;
        case 'marketcap_asc': return a.marketCap - b.marketCap;
        default: return a.rank - b.rank;
      }
    })
    .map((crypto, index) => (
      <CryptoCard
        key={crypto.id || index}
        crypto={crypto}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    ))}
</div>

    </div>
  );
};

export default CryptoTracker;
