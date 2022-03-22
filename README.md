# Order book

The order book is a front-end app that allows us to follow all orders for the BTC/USDT and ETH/BTC pairs. It allows us to also change the depth of the order book between 15/30/50/100 orders. It is implemented to work with the binance APIs for order book fetch and depth stream. 

The Order book has been developed exactly following binance official guidelines:

1. How to manage a local order book correctly
2. Open a stream to wss://stream.binance.com:9443/ws/bnbbtc@depth.
3. Buffer the events you receive from the stream.
4. Get a depth snapshot from https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=1000 .
5. Drop any event where u is <= lastUpdateId in the snapshot.
6. The first processed event should have U <= lastUpdateId+1 AND u >= lastUpdateId+1.
7. While listening to the stream, each new event's U should be equal to the previous event's u+1.
8. The data in each event is the absolute quantity for a price level.
9. If the quantity is 0, remove the price level.
10 Receiving an event that removes a price level that is not in your local order book can happen and is normal.

# Tech stack

* React
* Redux
* Primereact (UI components)

# How to run

### `npm i`

Run this command to install all necessary dependencies for the project.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# How to use

