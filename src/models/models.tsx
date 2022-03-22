import { ESMap } from "typescript";

export interface IReduxAction<T> {
    type: string;
    payload: T;
}

export interface IOrders {
    bids: ESMap<string, string>;
    asks: ESMap<string, string>;
}

export interface IBufferValue {
    U: number;
    bids: string[][],
    asks: string[][]
}

export interface IOrderSnapshot {
    lastUpdateId: number;
    orderSnapshot: IOrders; 
}