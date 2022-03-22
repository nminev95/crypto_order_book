import { IOrders } from "../../models/models";

export const orders = (orders: IOrders) => ({
  type: 'SET_ORDERS',
  payload: orders,
});

export const selectedPair = (pairTicker: string) => ({
  type: 'SET_SELECTED_PAIR',
  payload: pairTicker,
});

export const loading = (loadingState: boolean) => ({
  type: 'SET_LOADING',
  payload: loadingState,
});