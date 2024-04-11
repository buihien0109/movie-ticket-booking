import React from 'react';
import { Helmet } from 'react-helmet';
import { useGetOrdersQuery } from '../../../app/services/order.api';
import Error from '../../../components/error/Error';
import Loading from '../../../components/loading/Loading';
import HistoryItem from './HistoryItem';

function History() {
    const { data: orders, isLoading, isError, error } = useGetOrdersQuery();

    if (isLoading) return <Loading />;
    if (isError) return <Error error={error} />;

    return (
        <>
            <Helmet>Lịch sử mua vé</Helmet>
            <h2 className="text-2xl font-bold text-gray-800 mb-7">Lịch sử mua vé</h2>
            <table className="min-w-full divide-y divide-gray-200 overflow-x-auto">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Ngày giao dịch
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Mã đơn hàng
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tên phim
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Số tiền
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                        <HistoryItem key={order.id} order={order} />
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default History