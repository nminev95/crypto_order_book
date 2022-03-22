import './OrdersView.scss';
import calculateTotal from './../../helpers/calculateTotal';
import createUUID from '../../helpers/createUUID';
import { ESMap } from 'typescript';

interface IComponentProps {
    data: string[][];
    className: string;
    header: string;
    ticker: string;
}

const OrdersView = (props: IComponentProps) => {
    const { data, className, header, ticker } = props;

    return (
        <div className='orders-view-wrapper'>
            <div className='view-header'>
                {header}
            </div>
            <table className="orders-view">
                <thead>
                    <tr className='orders-labels'>
                        <th>Side</th>
                        <th>Price ({ticker.split('/')[1]})</th>
                        <th>Amount ({ticker.split('/')[0]})</th>
                        <th>Total ({ticker.split('/')[1]})</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((dataSet, i) =>
                        <tr className={`single-order ${className}`} key={createUUID()}>
                            <td key={createUUID()}>{header.split(' ')[0]} {i + 1}</td>
                            <td key={createUUID()}>{dataSet[0].slice(0, dataSet[0].length - 4)}</td>
                            <td key={createUUID()}>{dataSet[1].slice(0, dataSet[1].length - 4)}</td>
                            <td key={createUUID()}>{calculateTotal(+dataSet[0], +dataSet[1])}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>)
}

export default OrdersView;