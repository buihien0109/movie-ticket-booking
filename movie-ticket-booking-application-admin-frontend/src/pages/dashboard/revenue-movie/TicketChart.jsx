import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Số vé bán ra theo phim',
        },
    },
};

function TicketChart({ data }) {
    const chartData = {
        labels: data?.map((movie) => movie?.movieName.slice(0, 10) + "..."),
        datasets: [
            {
                label: 'Số vé bán ra',
                data: data?.map((movie) => movie?.totalTickets),
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={chartData} />;
}

export default TicketChart;
