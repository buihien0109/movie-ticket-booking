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
            text: 'Doanh thu theo rạp',
        },
    },
};

function RevenueChart({ data }) {
    const chartData = {
        labels: data?.map((cinema) => cinema?.cinemaName),
        datasets: [
            {
                label: 'Doanh thu',
                data: data?.map((cinema) => cinema?.totalRevenue),
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };
    return <Bar options={options} data={chartData} />;
}

export default RevenueChart;
