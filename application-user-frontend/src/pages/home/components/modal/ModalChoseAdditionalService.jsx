import React, { useState } from 'react'
import { useGetAllAdditionalServicesQuery } from '../../../../app/services/additionalService.api'
import Error from '../../../../components/error/Error'
import LoadingInside from '../../../../components/loading/LoadingInside'
import { formatCurrency } from '../../../../utils/functionUtils'
import AdditionalServiceItem from './AdditionalServiceItem'
import ModalOrder from './ModalOrder'
import useModal from '../../../../components/modal/hook/useModal'
import ModalBase from '../../../../components/modal/base/ModalBase'

function ModalChoseAdditionalService({ open, handleOpen, zIndex, ...props }) {
    const [selectedServices, setSelectedServices] = useState([]);
    const { open: openModalOrder, handleOpen: handleOpenModalOrder } = useModal()
    const { data, isLoading, isFetching, isError, error } = useGetAllAdditionalServicesQuery()
    if (isLoading || isFetching) return <LoadingInside />
    if (isError) return <Error error={error} />

    const handleServiceChange = (service, change) => {
        setSelectedServices((prevSelected) => {
            const existingService = prevSelected.find(s => s.id === service.id);
            if (existingService) {
                if (existingService.count + change <= 0) {
                    // Xóa dịch vụ ra khỏi mảng nếu số lượng là 0
                    return prevSelected.filter(s => s.id !== service.id);
                } else {
                    // Cập nhật số lượng cho dịch vụ hiện tại
                    return prevSelected.map(s => s.id === service.id ? { ...s, count: s.count + change } : s);
                }
            } else {
                // Thêm dịch vụ mới vào mảng với số lượng là 1
                return [...prevSelected, { ...service, count: 1 }];
            }
        });
    };
    const totalPrice = selectedServices.reduce((total, service) => total + service.count * service.price, 0);
    return (
        <>
            <ModalBase isOpen={open} onClose={handleOpen} size="sm" zIndex={zIndex} style={{width: "500px"}}>
                <div className="flex h-full flex-col bg-white overflow-auto rounded-md p-0">
                    <div className="relative flex shrink-0 items-center bg-pink-600 px-4 py-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="absolute left-3 h-6 shrink-0 cursor-pointer text-white transition-all hover:opacity-70"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
                        <b className="grow text-center text-white">Combo - Bắp nước</b>
                    </div>

                    <div className='webkit-overflow-scroll flex-1 select-none overflow-auto px-4'>
                        {data && data.map((service) => (
                            <AdditionalServiceItem
                                key={service.id}
                                service={service}
                                onServiceChange={handleServiceChange}
                            />
                        ))}
                    </div>

                    <div className="shrink-0 select-none border-t border-gray-200 px-4 pb-4">
                        <div className="my-3 flex items-center justify-between space-x-3">
                            <span className="text-md lg:text-base">Tổng cộng</span>
                            <b className="text-lg">{formatCurrency(totalPrice)}đ</b>
                        </div>
                        <button
                            onClick={handleOpenModalOrder}
                            type="button"
                            className="relative mx-auto !flex items-center justify-center btn-primary h-12 w-full !px-8 !text-md hover:bg-pink-500 bg-pink-600 text-white rounded-lg font-bold">
                            <div className="pointer-events-none">Tiếp tục</div>
                        </button>
                    </div>
                </div>
            </ModalBase>

            <ModalOrder 
                open={openModalOrder} 
                handleOpen={handleOpenModalOrder} 
                zIndex={70} 
                selectedServices={selectedServices}
                totalPriceService={totalPrice}
                {...props}
            />
        </>
    )
}

export default ModalChoseAdditionalService