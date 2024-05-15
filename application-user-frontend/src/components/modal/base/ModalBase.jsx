import React, { useRef } from 'react';

function ModalBase({ isOpen, onClose, size, children, zIndex, style }) {
    const modalRef = useRef();
    const sizeClasses = {
        sm: 'w-1/4',
        md: 'w-1/2',
        lg: 'w-3/4',
        xl: 'w-11/12',
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 p-0 overflow-y-auto w-screen h-screen"
            style={{ background: "rgba(0, 0, 0, .5)", zIndex: zIndex ?? 50 }}
            onClick={onClose}
        >
            <div
                className={`relative top-5 mx-auto ${sizeClasses[size] || sizeClasses.md} shadow-lg rounded-md bg-white transition-all ease-in-out duration-300 transform ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
                ref={modalRef}
                onClick={(e) => e.stopPropagation()}
                style={style}
            >
                {children}
            </div>
        </div>
    );
}

export default ModalBase;
