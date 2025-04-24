# Real-Time Crypto Price Tracker

A Real-Time Crypto Price Tracker built with **React**, **Redux Toolkit**, and **WebSocket integration** to track the latest prices, market cap, volume, and 7-day trends of popular cryptocurrencies in INR.

---

## Setup Instructions

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/crypto-price-tracker.git
cd crypto-price-tracker

2. Install dependencies:

npm install

3. Run the development server:

npm start

This will start the application on http://localhost:5173

Tech Stack
React: For building the user interface and managing state.

Redux Toolkit: For global state management and handling the real-time data updates.

WebSocket (Binance API): For streaming live data updates for cryptocurrency prices and market details.

Tailwind CSS: For utility-first CSS styling.

Font Awesome: For icons like the star to mark favorite cryptocurrencies.

Architecture
The app is organized as follows:

Components: Contains reusable UI elements like the search bar, dropdown filters, and the crypto cards.

Features: The Redux slice (cryptoSlice.js) is located here, which manages the state for crypto data and actions.

Utils: Includes helper functions like formatNumber.js to format large numbers (market cap, volume, etc.) and display price changes.

WebSocket Integration: The WebSocket listener is set up using Binance’s API to fetch real-time updates and push them to the Redux store.

Demo
Check out the live demo of the Real-Time Crypto Price Tracker:

Watch Demo

Additional Features
Sorting and Filtering: Sort cryptocurrencies by price, market cap, rank, or by top gainers/losers.

LocalStorage Support: The app saves user preferences for search, filters, and sorting options across sessions.

7-day Trend Chart: Displays a cleaner and slightly bigger graph showing the price trend over the last 7 days.

Price Format in INR: All prices are formatted in Indian Rupees (INR).

Responsive Layout: Works seamlessly across devices, with a mobile-friendly view of the crypto data.

Future Improvements
Add unit tests for Redux selectors and reducers.

Improve error handling and data validation.

Implement additional visualizations for price trends.

Add more customizable features like alert notifications for price changes.

Feel free to contribute or give feedback!








