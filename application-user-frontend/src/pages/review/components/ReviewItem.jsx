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
                                    <div key={index} className="relative cursor-pointer overflow-hidden rounded">
                                        <img
                                            alt="Ảnh review"
                                            src={image}
                                            className="w-full h-full object-cover aspect-[4/3]"
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
                                className="flex items-center justify-center text-sm border border-blue-500 text-blue-500 px-3 py-1 rounded-full me-2"
                            >
                                <svg
                                    className='w-5 h-5'
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill='currentColor' d="m19 20.25c0-.402-.356-.75-.75-.75-2.561 0-11.939 0-14.5 0-.394 0-.75.348-.75.75s.356.75.75.75h14.5c.394 0 .75-.348.75-.75zm-7.403-3.398 9.124-9.125c.171-.171.279-.423.279-.684 0-.229-.083-.466-.28-.662l-3.115-3.104c-.185-.185-.429-.277-.672-.277s-.486.092-.672.277l-9.143 9.103c-.569 1.763-1.555 4.823-1.626 5.081-.02.075-.029.15-.029.224 0 .461.349.848.765.848.511 0 .991-.189 5.369-1.681zm-3.27-3.342 2.137 2.137-3.168 1.046zm.955-1.166 7.651-7.616 2.335 2.327-7.637 7.638z" fillRule="nonzero" />
                                </svg>
                                <span className="ms-1">Sửa</span>
                            </button>
                            <button
                                onClick={handleOpenDelete}
                                className="flex items-center justify-center text-sm border border-red-500 text-red-500 px-3 py-1 rounded-full"
                            >
                                <svg
                                    className='w-4 h-4'
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="2"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path fill='currentColor' d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z" fillRule="nonzero" />
                                </svg>
                                <span className="ms-1">Xóa</span>
                            </button>
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