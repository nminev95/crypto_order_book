import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loading, orders } from './../redux/actions/index';
import updateOrderBook from './../helpers/updateOrderBook';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { IBufferValue, IOrders, IOrderSnapshot } from '../models/models';

const buffer = new Map<number, IBufferValue>();
let currentOrders: IOrders = {} as IOrders;
let snapshot: IOrderSnapshot = {} as IOrderSnapshot;
let isBufferActive: boolean = false;

const useStartStream = () => {
  const { selectedPair } = useSelector((state: RootState) => state)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loading(true));

    const ws = new WebSocket(process.env.REACT_APP_BINANCE_WEBSOCKET_API || '');

    ws.onopen = () => {
      currentOrders = {} as IOrders;
      const msg = {
        method: 'SUBSCRIBE',
        params:
          [
            `${selectedPair}@depth`,
          ],
        id: 1,
      };
      ws.send(JSON.stringify(msg));
      isBufferActive = true;
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const { b: bids, a: asks, u: finalUpdateId, U: firstUpdateId } = response;

      if (finalUpdateId && isBufferActive) {
        buffer.set(finalUpdateId, { bids: response.b, asks: response.a, U: firstUpdateId })
      }

      if (buffer.size === 1 && isBufferActive) {
        fetch(`${process.env.REACT_APP_BINANCE_SNAPSHOT_API}symbol=${selectedPair.toUpperCase()}&limit=1000` || '')
          .then((response) => response.json()).then(({ asks, bids, lastUpdateId }) => {
            snapshot = { lastUpdateId, orderSnapshot: { asks: new Map<string, string>(asks), bids: new Map<string, string>(bids) } }
            currentOrders = { asks: new Map<string, string>(asks), bids: new Map<string, string>(bids) }
            dispatch(orders({ asks: new Map<string, string>(asks), bids: new Map<string, string>(bids) }))
            dispatch(loading(false));
          })
      }

      try {
        if (bids && asks) {
          const { lastUpdateId } = snapshot;

          if (isBufferActive) {

            [...buffer].forEach((setup) => {
              const [u, data] = setup;
              console.log(data);
              
              const { bids, asks, U } = data;

              if (u < lastUpdateId) {
                buffer.delete(u)
              }

              if (U <= lastUpdateId + 1 && u >= lastUpdateId + 1) {
                updateOrderBook(bids, asks, currentOrders, dispatch)
                isBufferActive = false;
                buffer.clear();
              }
            })
          } else {
            updateOrderBook(bids, asks, currentOrders, dispatch)
          }
        }

      } catch (err) {
        console.log(err);
      }
    };



    return () => ws.close();

  }, [selectedPair])

};

export default useStartStream;
