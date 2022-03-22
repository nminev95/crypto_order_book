import { IReduxAction } from "../../models/models";

const loading = (state: boolean = false, action: IReduxAction<boolean>) => {
    switch (action.type) {
      case 'SET_LOADING':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default loading;
  