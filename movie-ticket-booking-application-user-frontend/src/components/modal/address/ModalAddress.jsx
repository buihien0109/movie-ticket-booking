import React from 'react';
import ModalBase from '../base/ModalBase';

function ModalAddress({ url, open, handleOpen }) {
    return (
        <>
            <ModalBase isOpen={open} onClose={handleOpen} size="md" style={{ width: "1000px" }}>
                <div className="p-4">
                    <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                        Bản đồ
                    </h1>
                </div>
                <div className="relative aspect-[16/9] w-full bg-black">
                    <div className="w-full h-full">
                        <iframe
                            src={url}
                            style={{ border: 0, width: "100%", height: "100%" }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        >
                        </iframe>
                    </div>
                </div>
                <div className="flex justify-end p-4">
                    <button
                        onClick={handleOpen}
                        className="flex items-center justify-center text-white bg-pink-600 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-8 py-2.5 text-center"
                    >
                        Đóng
                    </button>
                </div>
            </ModalBase>
        </>
    );
}

export default ModalAddress