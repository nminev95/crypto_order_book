import { Dispatch } from "redux";
import { IOrders } from "../models/models";
import { loading, orders } from "../redux/actions";

const updateOrderBook = async (bids: string[][], asks: string[][], currentOrders: IOrders, dispatchCb: Dispatch) => {
    bids.forEach((bid) => {
        const [price, quantity] = bid;

        if (currentOrders.bids.has(price) && +quantity !== 0) {
            currentOrders.bids.set(price, quantity)
        }

        if (+quantity === 0) {
            currentOrders.bids.delete(price)
        }

        if (!currentOrders.bids.has(price) && +quantity !== 0) {
            currentOrders.bids.set(price, quantity)
        }
    })

    asks.forEach((bid) => {
        const [price, quantity] = bid;

        if (currentOrders.asks.has(price) && +quantity !== 0) {
            currentOrders.asks.set(price, quantity)
        }

        if (+quantity === 0) {
            currentOrders.asks.delete(price)
        }

        if (!currentOrders.asks.has(price) && +quantity !== 0) {
            currentOrders.asks.set(price, quantity)
        }
    })

    const sortedBids = new Map<string, string>([...currentOrders.bids.entries() as any].sort((a, b) => {
        if (+a[0] > +b[0]) return -1;
        if (+a[0] < +b[0]) return 1;
        return 0;
    }));

    const sortedAsks = new Map<string, string>([...currentOrders.asks.entries() as any].sort((a, b) => {
        if (+a[0] > +b[0]) return 1;
        if (+a[0] < +b[0]) return -1;
        return 0;
    }));

    currentOrders = { bids: sortedBids, asks: sortedAsks }
    dispatchCb(orders({ bids: sortedBids, asks: sortedAsks }))
    dispatchCb(loading(false))
}


export default updateOrderBook;