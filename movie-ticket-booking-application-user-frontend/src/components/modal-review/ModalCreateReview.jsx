import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useCreateReviewMutation } from '../../app/services/review.api';
import { parseReviewMessage } from '../../utils/functionUtils';
import ModalBase from '../modal-trailer/ModalBase';

const schema = yup.object({
    comment: yup.string().required('Nội dung không được để trống'),
}).required();

function ModalCreateReview({ open, handleClose, movieId }) {
    const [createReview, { isLoading }] = useCreateReviewMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [rating, setRating] = useState(0);
    const [hoverIdx, setHoverIdx] = useState(null);

    const onSubmit = data => {
        if (rating === 0) {
            toast.warn("Vui lòng chọn số sao");
            return;
        }

        const reviewData = { ...data, rating, movieId };
        createReview(reviewData)
            .unwrap()
            .then(() => {
                toast.success("Đánh giá của bạn đã được gửi thành công");
                handleClose()
            })
            .catch((error) => {
                console.log(error);
                const message = error?.data?.message;
                if (typeof message === 'string') {
                    toast.error(message)
                } else if (typeof message === 'object') {
                    for (const key in message) {
                        toast.error(message[key])
                    }
                } else {
                    toast.error("Có lỗi xảy ra. Vui lòng thử lại sau.")
                }
            });
    };

    return (
        <ModalBase isOpen={open} onClose={handleClose} size="sm" style={{ width: "700px" }} zIndex={1080}>
            <div className="flex h-full flex-col overflow-auto rounded-md p-0">
                <div className="p-6 space-y-4 md:space-y-5 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Đánh giá phim
                    </h1>

                    <div>
                        <div className="flex justify-center">
                            {Array.from({ length: 10 }, (_, index) => (
                                <svg
                                    key={index}
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className={`h-7 w-7 cursor-pointer ${index <= (hoverIdx !== null ? hoverIdx : rating - 1) ? 'text-yellow-500' : 'text-gray-600'}`}
                                    onMouseEnter={() => setHoverIdx(index)}
                                    onMouseLeave={() => setHoverIdx(null)}
                                    onClick={() => setRating(index + 1)}
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="text-center text-gray-800 text-sm mt-3">Bạn đã đánh giá {rating} sao. ({parseReviewMessage(rating)})</p>
                        )}
                    </div>

                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <textarea
                                {...register('comment')}
                                placeholder="Chia sẻ cảm nhận của bạn về phim..."
                                rows={6}
                                className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            />
                            <p className="text-red-500 text-xs mt-1">{errors.comment?.message}</p>
                        </div>
                        <button
                            type="submit"
                            className="flex items-center justify-center text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                            disabled={isLoading}
                        >
                            {isLoading ? "Đang xử lý..." : "Hoàn tất"}
                        </button>
                    </form>
                </div>
            </div>
        </ModalBase>
    );
}

export default ModalCreateReview;
