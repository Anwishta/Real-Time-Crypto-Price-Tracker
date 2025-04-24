import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLivePrice } from '../features/crypto/cryptoSlice';

const BinanceWebSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const formatted = data.map((item) => ({
        symbol: item.s,
        price: parseFloat(item.c),
      }));

      dispatch(updateLivePrice(formatted));
    };

    return () => socket.close();
  }, [dispatch]);

  return null; 
};

export default BinanceWebSocket;
