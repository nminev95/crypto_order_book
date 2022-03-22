import { IReduxAction } from "../../models/models";

const selectedPair = (state: string = 'btcusdt', action: IReduxAction<string>) => {
    switch (action.type) {
      case 'SET_SELECTED_PAIR':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default selectedPair;
  