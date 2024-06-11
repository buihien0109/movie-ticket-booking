import React from 'react';
import { Link } from 'react-router-dom';
import ModalBase from '../base/ModalBase';

function ModalTrailer({ movie, open, handleOpen, hasShowtimes }) {
    return (
        <>
            <ModalBase isOpen={open} onClose={handleOpen} size="md" style={{ width: "1000px" }}>
                <div className="modal-body h-full overflow-auto rounded-md bg-black/85 p-0">
                    <div className="relative aspect-[16/9] w-full bg-black">
                        <div className="">
                            <iframe className="absolute inset-0 h-full w-full" frameBorder="0" allowFullScreen=""
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                title={movie?.name}
                                width="560" height="315"
                                src={movie?.trailer}
                                id="widget14" data-gtm-yt-inspected-10104547_111="true" data-gtm-yt-inspected-9="true"
                                data-gtm-yt-inspected-15="true"></iframe>
                        </div>
                    </div>
                    <div
                        className="relative z-[1] flex flex-nowrap bg-black/40 bg-opacity-80 py-4 px-6 backdrop-blur sm:space-x-5">
                        <div className="hidden w-20 min-w-0 flex-shrink-0 sm:block ">
                            <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, position: "relative", maxWidth: "100%" }}>
                                <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: "100%" }}>
                                    <img alt="" aria-hidden="true"
                                        src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27300%27%20height=%27450%27/%3e"
                                        style={{ display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: 0, margin: 0, padding: 0 }} />
                                </span>
                                <img alt={movie?.name}
                                    src={movie?.poster}
                                    decoding="async" data-nimg="intrinsic" className=""
                                    style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
                            </span>
                        </div>
                        <div className="min-w-0">
                            <h3 className="text-xl font-bold text-white">{movie?.name} <span
                                className="hidden text-sm text-white text-opacity-70 sm:inline-block">- {movie?.genres.map(genre => genre.name).join(", ")}</span></h3>
                            <p className="mt-2 text-sm text-white text-opacity-70  line-clamp-3 font-normal">
                                {movie?.description}
                            </p>
                            <div className="mt-3 flex space-x-3">
                                {hasShowtimes && (
                                    <Link
                                        className="btn tracking-engage-btn-popup inline-block cursor-pointer rounded-md bg-pink-700 px-5 py-1.5 text-center text-sm  font-bold text-white text-opacity-90 transition-all hover:bg-pink-800"
                                        to={`#phimLichChieu`}
                                        onClick={handleOpen}
                                    >Đặt vé</Link>
                                )}
                                <button onClick={handleOpen} className="btn inline-block cursor-pointer rounded-md bg-gray-500 px-5 py-1.5 text-center text-sm font-bold  text-gray-100 text-opacity-90 transition-all hover:bg-gray-600">Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBase>
        </>
    );
}

export default ModalTrailer