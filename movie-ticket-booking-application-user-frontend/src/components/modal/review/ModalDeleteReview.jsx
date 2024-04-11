import React from 'react';
import { toast } from 'react-toastify';
import { useDeleteReviewMutation } from '../../../app/services/review.api';
import ModalBase from '../base/ModalBase';

function ModalDeleteReview({ open, handleClose, reviewId, onSetPage }) {
    const [deleteReview, { isLoading }] = useDeleteReviewMutation();

    const handleDeleteReview = (reviewId) => {
        deleteReview({ reviewId })
            .unwrap()
            .then(() => {
                toast.success("Xóa bình luận thành công");
                onSetPage(1)
                handleClose();
            })
            .catch((error) => {
                console.error('Failed to delete review: ', error);
            });
    }
    return (
        <ModalBase isOpen={open} onClose={handleClose} size="sm" style={{ width: "500px" }}>
            <div className="p-6 space-y-4 md:space-y-5 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Xác nhận xóa bình luận</h1>
                <p className="text-gray-800">Bạn có chắc chắn muốn xóa bình luận này?</p>
                <div className="flex justify-end">
                    <button
                        onClick={handleClose}
                        className="flex items-center justify-center bg-white border border-gray-500 text-gray-500 font-medium rounded-full text-sm px-8 me-2 py-2.5 text-center"
                    >Hủy</button>
                    <button
                        onClick={() => handleDeleteReview(reviewId)}
                        disabled={isLoading}
                        className="flex items-center justify-center text-white bg-pink-600 hover:bg-pink-800 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    >Xác nhận</button>
                </div>
            </div>
        </ModalBase>
    )
}

export default ModalDeleteReview