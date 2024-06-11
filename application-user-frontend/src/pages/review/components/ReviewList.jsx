import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setActiveModal } from '../../../app/slices/authModal.slice';
import ReviewItem from './ReviewItem';
import useModal from '../../../components/modal/hook/useModal';
import ModalCreateReview from '../../../components/modal/review/ModalCreateReview';
import { useGetAllReviewsByMovieIdQuery } from '../../../app/services/reviewPublic.api';


function ReviewList({ movie }) {
    const { auth } = useSelector(state => state.auth)
    const { open, handleOpen } = useModal();
    const dispatch = useDispatch();
    const { movieId } = useParams();

    const [totalReviews, setTotalReviews] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [isShowLoadMore, setIsShowLoadMore] = useState(true);

    const { data: pageData, refetch } = useGetAllReviewsByMovieIdQuery({ movieId, page }, {
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        setReviews([]);
        setPage(1);
    }, []);


    useEffect(() => {
        if (pageData && pageData.content) {
            if (page === 1) {
                setReviews(pageData.content);
            } else {
                const newReviews = [...reviews, ...pageData.content];
                const uniqueReviews = Array.from(new Set(newReviews.map(review => review.id)))
                    .map(id => {
                        return newReviews.find(review => review.id === id);
                    });

                setReviews(uniqueReviews);
            }
            setTotalReviews(pageData.totalElements);
            setIsShowLoadMore(!pageData.last);
        }
    }, [pageData, page]);

    const handleLoadMore = () => {
        setPage(page + 1);
    };

    const handleSetPage = (page) => {
        setPage(page);
        refetch();
    }

    return (
        <>
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold">Bình luận từ người xem</h3>
                {auth ? (
                    <button
                        onClick={handleOpen}
                        type="button"
                        className="relative !flex items-center justify-center btn-primary !px-8 py-3 !text-md hover:bg-pink-500 bg-pink-600 text-white rounded-full text-sm"
                    >Viết bình luận</button>
                ) : (
                    <button
                        onClick={() => dispatch(setActiveModal('LOGIN'))}
                        type="button"
                        className="relative !flex items-center justify-center btn-primary !px-8 py-3 !text-md hover:bg-pink-500 bg-pink-600 text-white rounded-full text-sm"
                    >Đăng nhập để viết bình luận</button>
                )}
            </div>
            {reviews.length > 0 && (
                <>
                    <div className="relative mb-1 flex items-center font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className=" h-9 w-9 text-yellow-400"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                        <div className="pl-2 pr-0.5 text-3xl text-gray-600 sm:text-4xl">{movie.rating}</div>
                        <div className="mr-1 self-end pb-1 text-sm font-normal text-gray-600">/10</div>
                        <div className="self-end pb-1 text-sm font-normal text-gray-600">· {totalReviews} đánh giá</div>
                    </div>
                    <div className="grid grid-cols-1 divide-y divide-gray-200">
                        {reviews.map((review) => (
                            <ReviewItem
                                key={review.id}
                                review={review}
                                movieId={movieId}
                                onSetPage={handleSetPage}
                            />
                        ))}
                    </div>
                    {
                        isShowLoadMore && (
                            <div className="mb-3 mt-1 text-center">
                                <button
                                    onClick={handleLoadMore}
                                    className="rounded-full border border-pink-500 bg-white/10 py-1 pl-4 pr-6 font-semibold text-pink-500 transition-all hover:text-pink-600">
                                    <span><i className="fa-solid fa-arrow-down"></i></span>
                                    Xem tiếp nhé!
                                </button>
                            </div>
                        )
                    }
                </>
            )}

            {pageData?.totalElements === 0 && (
                <>
                    <div className="py-5 text-center">
                        <div>
                            <img src="https://homepage.momocdn.net/next-js/_next/static/public/cinema/not-found.svg" alt="Not found" loading="lazy" width="120" height="120" className=" mx-auto block" />
                        </div>
                        <div className="mb-0 mt-3 font-semibold text-gray-500">Phim hiện tại chưa có bài đánh giá.
                            <br />
                            Trở lại trang <Link to={"/lich-chieu"} className="text-gray-800 underline hover:text-pink-500">Đặt Vé Xem Phim</Link> ngay!
                        </div>
                    </div>
                </>
            )}

            {open && (
                <ModalCreateReview
                    open={open}
                    handleClose={handleOpen}
                    movieId={movieId}
                    onSetPage={handleSetPage}
                />
            )}
        </>
    )
}

export default ReviewList