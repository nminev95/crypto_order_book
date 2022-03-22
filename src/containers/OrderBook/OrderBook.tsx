import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import OrdersView from '../../components/OrdersView/OrdersView';
import { RootState } from '../../redux/reducers';
import './OrderBook.scss';
import useStartStream from '../../hooks/useStartStream';
import { useDispatch } from 'react-redux';
import { selectedPair } from '../../redux/actions';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { depthDropdownOptions, pairsDropdownOptions, pairTickersConfig } from '../../constants/constants';

const OrderBook = () => {
  const { orders, selectedPair: pairTicker, loading: isLoading } = useSelector((state: RootState) => state);
  const [orderDepth, setOrderDepth] = useState(15);
  const dispatch = useDispatch();
  useStartStream();

  const onDepthChange = useCallback((e) => {
    setOrderDepth(e.value);
  }, [])

  const onPairChange = useCallback((e) => {
    dispatch(selectedPair(e.value))
  }, [])

  return (<div className='order-book'>
    <div className='order-book-header'>
      <div className='order-book-pair-info'>
        Order Book - <Dropdown options={pairsDropdownOptions} value={pairTicker} onChange={onPairChange} />
      </div>
      <div className='additional-header-buttons'>

        <div className='order-book-depth-selector'>
          <div className='depth-label'>Depth</div>
          <Dropdown options={depthDropdownOptions} value={orderDepth} onChange={onDepthChange} />
        </div>
      </div>
    </div>
    <div className="order-book-container">
      <div className='order-book-wrapper'>
        <div className='order-book-body'>
          {isLoading ?
            <ProgressSpinner animationDuration=".5s" className='loading-spinner' />
            : <>
              {orders.bids && <OrdersView data={Array.from(orders.bids as any).slice(0, orderDepth) as string[][]} className="bids" header="Buy orders" ticker={pairTickersConfig[pairTicker]} />}
              {orders.asks && <OrdersView data={Array.from(orders.asks as any).slice(0, orderDepth) as string[][]} className="asks" header="Sell orders" ticker={pairTickersConfig[pairTicker]} />}
            </>
          }
        </div>
      </div>
    </div>
  </div>
  )
}

export default OrderBook;
