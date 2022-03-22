# Orderbook Visualisation App #

Our goal is to have a simple web app which offers information about the orderbook of Binance for two cryptocurrency trading pairs - BTC/USDT and BTC/ETH

API: https://binance-docs.github.io/apidocs/spot/en/

The single screen should consist of a select box, giving the customer the option to choose between the two trading pairs and the orderbook widget. The orderbook widget should be dynamic, updating the orderbook bids and asks live. While dealing with Orderbook data we require the latest information published by the exchanges to reach us ASAP
since we want to be in sync with the latest orderbook state. There are a couple of ways to acquire current orderbook data, one of which is through REST invocations provided as API from various exchanges. However due to the former, this proves to be inefficient. There are many order executions taking place in the exchange at any given time.
This would cause our latest orderbook snapshot (which we acquired through REST) to become outdated very quickly.

To combat this issue, another protocol must be used. Enter Websockets. Most of the crypto exchanges also offer Websocket APIs for public market data (Orderbook data is an example of such).  Websockets essentially provide a bidirectional communication connection between 2 nodes. Once the connection is opened, the server node can push messages to the client “instantly” and vice versa. This allows us to maintain an in-memory Orderbook and update it with outstanding time precision (depending of course on other factors like geographic location and network stability).


### What can be used:
 
* ReactJS
* Redux
* Webpack
* Any other library considered necessary

---

Please upload your complete source code to a GitHub repo or send us a zip with the code.

### How we will test your code:

Please, make sure you provide a short readme on how to install and test the application. 
