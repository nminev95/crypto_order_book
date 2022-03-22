import { combineReducers } from 'redux';
import orders from './orders';
import selectedPair from './selectedPair';
import loading from './loading';

const allReducers = combineReducers({
  orders,
  selectedPair,
  loading,
})

export type RootState = ReturnType<typeof allReducers>

export default allReducers;
