import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useUpdateReviewMutation } from '../../../app/services/review.api';
import { getReviewFeelings, parseReviewMessage, prepareImageURL } from '../../../utils/functionUtils';
import ModalBase from '../base/ModalBase';

const schema = yup.object({
    comment: yup.string().required('Nội dung không được để trống'),
}).required();

function ModalUpdateReview({ open, handleClose, review, movieId, onSetPage }) {
    const [updateReview, { isLoading }] = useUpdateReviewMutation();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [rating, setRating] = useState(review.rating);
    const [hoverIdx, setHoverIdx] = useState(null);
    const [feelings, setFeelings] = useState(() => getReviewFeelings(review.rating));
    const [selectedFeelings, setSelectedFeelings] = useState(review.feeling || []);
    const [imageURLs, setImageURLs] = useState([]);
    const [files, setFiles] = useState([]);
    const [currentImageURLs, setCurrentImageURLs] = useState(review.images || []);

    const onSubmit = data => {
        if (rating === 0) {
            toast.warn("Vui lòng chọn số sao");
            return;
        }

        const formData = new FormData();
        formData.append('comment', data.comment);
        formData.append('rating', rating);
        formData.append('movieId', movieId);
        formData.append('feeling', selectedFeelings);
        formData.append('images', currentImageURLs.map(url => prepareImageURL(url)));

        files.forEach(file => {
            formData.append('files', file);
        });
        updateReview({ id: review.id, formData })
            .unwrap()
            .then(() => {
                toast.success("Cập nhật đánh giá thành công");
                onSetPage(1);
                handleClose()
            })
            .catch((error) => {
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

    const handleImageChange = (event) => {
        // Nếu quá 4 ảnh thì không cho thêm
        if (imageURLs.length + currentImageURLs.length >= 4) {
            toast.warn("Bạn chỉ được thêm tối đa 4 ảnh");
            return;
        }

        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageURLs([...imageURLs, url]);
            setFiles([...files, file]);
        }
    };

    const handleRemoveImage = (index) => {
        // Giải phóng bộ nhớ cho URL tạm thời
        URL.revokeObjectURL(imageURLs[index]);

        const newImageURLs = imageURLs.filter((_, idx) => idx !== index);
        const newFiles = files.filter((_, idx) => idx !== index);
        setImageURLs(newImageURLs);
        setFiles(newFiles);
    }

    const handleRemoveCurrentImage = (index) => {
        const newCurrentImageURLs = currentImageURLs.filter((_, idx) => idx !== index);
        setCurrentImageURLs(newCurrentImageURLs);
    }

    return (
        <ModalBase isOpen={open} onClose={handleClose} size="sm" style={{ width: "700px" }} zIndex={1080}>
            <div className="flex h-full flex-col overflow-auto rounded-md p-0">
                <div className="p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Đánh giá phim
                    </h1>

                    <hr className="my-4" />

                    <div className='mb-6'>
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
                                    onClick={() => {
                                        setRating(index + 1);
                                        setFeelings(getReviewFeelings(index + 1));

                                        if (index + 1 === review.rating) {
                                            setSelectedFeelings(review.feeling || []);
                                        } else {
                                            setSelectedFeelings([]);
                                        }
                                    }}
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        {rating > 0 && (
                            <p className="text-center text-gray-800 text-sm mt-3 font-bold">Bạn đã đánh giá {rating}/10 sao. ({parseReviewMessage(rating)})</p>
                        )}
                    </div>

                    {feelings.length > 0 && (
                        <div className="mb-6">
                            <p className="block mb-2 text-base font-bold text-gray-900">Bạn cảm thấy...</p>
                            <div className="flex flex-wrap gap-2">
                                {feelings.map((feel, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (selectedFeelings.includes(feel)) {
                                                setSelectedFeelings(selectedFeelings.filter(item => item !== feel))
                                            } else {
                                                setSelectedFeelings([...selectedFeelings, feel])
                                            }
                                        }}
                                        className={`text-sm px-3 py-1 rounded-full font-medium text-gray-500 border border-gray-300 focus:ring-primary-600 focus:border-primary-600 ${selectedFeelings.includes(feel) ? 'border-pink-600 text-pink-600' : 'bg-white'}`}
                                    >
                                        {feel}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <p className="block mb-2 text-base font-bold text-gray-900">Cảm nhận thêm về bộ phim</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mb-2'>
                            <textarea
                                {...register('comment')}
                                placeholder="Giờ là lúc ngôn từ lên ngôi ✍️"
                                rows={6}
                                className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            >
                                {review.comment}
                            </textarea>
                            <p className="text-red-500 text-xs mt-1">{errors.comment?.message}</p>
                        </div>

                        <div className='flex items-center gap-2 mb-4'>
                            <div className="rounded-lg border border-gray-300 w-28 h-28 flex justify-center items-center">
                                <label htmlFor="upload" className="flex flex-col items-center justify-center gap-2 cursor-pointer p-4 w-full h-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 fill-white stroke-pink-600" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="text-gray-600 text-sm">Thêm ảnh</span>
                                </label>
                                <input id="upload" type="file" className="hidden" onChange={handleImageChange} />
                            </div>

                            {currentImageURLs.length > 0 && currentImageURLs.map((url, index) => (
                                <div key={index} className="relative rounded-lg w-28 h-28 overflow-hidden">
                                    <img
                                        key={index}
                                        src={url}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <svg
                                        onClick={() => handleRemoveCurrentImage(index)}
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='absolute top-0 right-0 text-gray-300 w-6 h-6 cursor-pointer'
                                    >
                                        <path fill="currentColor" d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fillRule="nonzero" />
                                    </svg>
                                </div>
                            ))}

                            {imageURLs.length > 0 && imageURLs.map((url, index) => (
                                <div key={index} className="relative rounded-lg w-28 h-28 overflow-hidden">
                                    <img
                                        key={index}
                                        src={url}
                                        alt="preview"
                                        className="w-full h-full object-cover"
                                    />
                                    <svg
                                        onClick={() => handleRemoveImage(index)}
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        strokeLinejoin="round"
                                        strokeMiterlimit="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className='absolute top-0 right-0 text-gray-300 w-6 h-6 cursor-pointer'
                                    >
                                        <path fill="currentColor" d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8.933-2.721-2.722c-.146-.146-.339-.219-.531-.219-.404 0-.75.324-.75.749 0 .193.073.384.219.531l2.722 2.722-2.728 2.728c-.147.147-.22.34-.22.531 0 .427.35.75.751.75.192 0 .384-.073.53-.219l2.728-2.728 2.729 2.728c.146.146.338.219.53.219.401 0 .75-.323.75-.75 0-.191-.073-.384-.22-.531l-2.727-2.728 2.717-2.717c.146-.147.219-.338.219-.531 0-.425-.346-.75-.75-.75-.192 0-.385.073-.531.22z" fillRule="nonzero" />
                                    </svg>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="flex items-center justify-center text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-8 py-2.5 text-center"
                                disabled={isLoading}
                            >
                                {isLoading ? "Đang xử lý..." : "Hoàn tất"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalBase>
    );
}

export default ModalUpdateReview;
