import React, { useState } from 'react';
import { formatCurrency } from '../../../../utils/functionUtils';

function DecreaseIcon({ onClick, count }) {
    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className={`h-7 ${count === 0 ? 'pointer-events-none text-gray-400' : 'cursor-pointer text-pink-500'}`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );
}

function IncreaseIcon({ onClick }) {
    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="h-7 cursor-pointer text-pink-500"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );
}

function AdditionalServiceItem({ service, onServiceChange }) {
    const [count, setCount] = useState(0);

    const increaseCount = () => {
        setCount(prevCount => prevCount + 1);
        onServiceChange(service, 1);
    }

    const decreaseCount = () => {
        setCount(prevCount => prevCount > 0 ? prevCount - 1 : 0);
        if (count > 0) {
            onServiceChange(service, -1);
        }
    }

    return (
        <div className="flex space-x-4 border-b border-gray-200 py-4 text-sm last:border-b-0">
            <div className="relative aspect-[3/4] h-fit w-24 shrink-0 overflow-x-hidden rounded-md">
                <img
                    src={service.thumbnail}
                    decoding="async"
                    data-nimg="fill"
                    style={{ position: "absolute", inset: 0, boxSizing: "border-box", padding: 0, border: "none", margin: "auto", display: "block", width: 0, height: 0, minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
            </div>
            <ul>
                <li className="text-base"><b>{service.name} - {formatCurrency(service.price)}đ</b></li>
                <li className="text-gray-600" style={{ whiteSpace: "pre-wrap" }}>
                    {service.description}
                </li>
                <li className="mt-1 flex items-center space-x-2">
                    <DecreaseIcon onClick={decreaseCount} count={count} />
                    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-gray-300"><b>{count}</b></span>
                    <IncreaseIcon onClick={increaseCount} />
                </li>
            </ul>
        </div>
    )
}

export default AdditionalServiceItem