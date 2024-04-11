import React from 'react';
import { useSelector } from 'react-redux';
import useModal from '../../../components/modal/hook/useModal';
import ModalDeleteReview from '../../../components/modal/review/ModalDeleteReview';
import ModalUpdateReview from '../../../components/modal/review/ModalUpdateReview';
import { formatDate, parseReviewMessage } from '../../../utils/functionUtils';

function UserAvatar({ user, date }) {
    return (
        <div className="relative flex items-center">
            <img src={user.avatar}
                alt={user.name} width="44" height="44" loading="lazy"
                className="z-2 overflow-hidden rounded-full object-cover h-9 w-9" />
            <div className="ml-2 sm:ml-3">
                <div className="text-[15px] text-gray-800">{user.name}</div>
                <div className="mt-0.5 flex items-center">
                    <div className="text-xs text-gray-500">{formatDate(date)}</div>
                </div>
            </div>
        </div>
    );
}

function ReviewRating({ rating }) {
    return (
        <div className="flex items-center mb-0.5 text-[15px] font-semibold text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
            <span className="pl-0.5">{rating}/10</span><span>· {parseReviewMessage(rating)}!</span>
        </div>
    );
}


function ReviewItem({ review, movieId, onSetPage }) {
    const { open: openModalDelete, handleOpen: handleOpenDelete } = useModal();
    const { open: openModalUpdate, handleOpen: handleOpenUpdate } = useModal();
    const { auth } = useSelector(state => state.auth)

    return (
        <>
            <div className="relative w-full py-5">
                <UserAvatar user={review.user} date={review.updatedAt} />
                <div className="relative mt-3">
                    <ReviewRating rating={review.rating} />
                    <p className="whitespace-pre-wrap break-words text-[15px] leading-relaxed text-gray-900">{review.comment}</p>

                    {review.feeling && review.feeling.length > 0 && (
                        <div className="scroll-hidden mt-4 flex w-full items-center space-x-2 overflow-x-auto">
                            {review.feeling.map((feeling, index) => (
                                <span key={index} className="block whitespace-nowrap rounded bg-blue-50 px-2 py-1 text-sm leading-4 text-gray-800">
                                    {feeling}
                                </span>
                            ))}
                        </div>
                    )}

                    {review.images && review.images.length > 0 && (
                        <div className="relative mt-4 w-full">
                            <div className="gap-0.5 rounded-xl md:grid-cols-4 md:gap-2 md:rounded-none grid grid-cols-1 grid-rows-1 overflow-hidden">
                                {review.images.map((image, index) => (
                                    <div key={index} className="aspect-w-4 relative cursor-pointer overflow-hidden md:aspect-w-4 md:aspect-h-3 md:rounded aspect-h-3">
                                        <img
                                            alt="Ảnh review"
                                            src={image}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="order-1 col-span-12 md:order-2 md:col-span-6 lg:col-span-8"><div className="relative z-[1] -mx-5 md:mx-0"></div></div>

                    {auth && auth.id === review.user.id && (
                        <div className="mt-3 flex items-center">
                            <button
                                onClick={handleOpenUpdate}
                                className="text-sm text-blue-500 underline me-3"
                            >Sửa</button>
                            <button
                                onClick={handleOpenDelete}
                                className="text-sm text-red-500 underline"
                            >Xóa</button>
                        </div>
                    )}
                </div>
            </div>
            {openModalDelete && (
                <ModalDeleteReview
                    open={openModalDelete}
                    handleClose={handleOpenDelete}
                    reviewId={review.id}
                    onSetPage={onSetPage}
                />
            )}

            {openModalUpdate && (
                <ModalUpdateReview
                    open={openModalUpdate}
                    handleClose={handleOpenUpdate}
                    review={review}
                    movieId={movieId}
                    onSetPage={onSetPage}
                />
            )}
        </>
    )
}

export default ReviewItem