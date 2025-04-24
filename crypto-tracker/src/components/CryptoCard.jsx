import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatNumber } from '../utils/formatNumber';

const CryptoCard = ({ crypto, favorites, toggleFavorite }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={crypto.icon} alt={crypto.name} className="w-6 h-6" />
          <div>
            <div className="font-semibold">{crypto.name}</div>
            <div className="text-xs text-gray-500">{crypto.symbol}</div>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faStar}
          className={`cursor-pointer ${
            favorites.includes(crypto.id) ? 'text-yellow-500' : 'text-gray-400'
          }`}
          onClick={() => toggleFavorite(crypto.id)}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-sm">
        <div>Price:</div>
        <div className="text-right font-medium">${crypto.price?.toFixed(2)}</div>

        <div>1h %:</div>
        <div className={`text-right ${crypto.priceChange1h > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {crypto.priceChange1h > 0 ? '▲' : '▼'} {crypto.priceChange1h?.toFixed(2)}%
        </div>

        <div>24h %:</div>
        <div className={`text-right ${crypto.priceChange1d > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {crypto.priceChange1d > 0 ? '▲' : '▼'} {crypto.priceChange1d?.toFixed(2)}%
        </div>

        <div>7d %:</div>
        <div className={`text-right ${crypto.priceChange1w > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {crypto.priceChange1w > 0 ? '▲' : '▼'} {crypto.priceChange1w?.toFixed(2)}%
        </div>

        <div>Market Cap:</div>
        <div className="text-right">${crypto.marketCap?.toLocaleString()}</div>

        <div>Volume (24h):</div>
        <div className="text-right">
          ${crypto.volume?.toLocaleString()}<br />
          <span className="text-xs text-gray-500">
            {(crypto.volume / crypto.price)?.toFixed(2)} {crypto.symbol}
          </span>
        </div>

        <div>Circulating Supply:</div>
        <div className="text-right">{formatNumber(crypto.availableSupply)} {crypto.symbol}</div>
      </div>

      <div className="mt-2">
        <img
          src="https://www.coingecko.com/coins/1/sparkline.svg"
          alt="7d trend"
          className="h-10 w-full"
        />
      </div>
    </div>
  );
};

export default CryptoCard;
