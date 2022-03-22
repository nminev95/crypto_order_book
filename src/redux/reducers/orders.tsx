import { IOrders, IReduxAction } from "../../models/models";

const orders = (state: IOrders = {} as IOrders, action: IReduxAction<IOrders>) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {...action.payload};
    default:
      return state;
  }
};

export default orders;
