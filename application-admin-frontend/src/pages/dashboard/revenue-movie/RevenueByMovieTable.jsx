import { Table } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { formatCurrency } from "../../../utils/functionUtils";

const columns = [
  {
    title: "Tên phim",
    dataIndex: "",
    key: "movie",
    width: "55%",
    render: (text, record, index) => {
      return (
        <RouterLink to={`/admin/movies/${record.movieId}/detail`}>
          {record.movieName}
        </RouterLink>
      );
    },
  },
  {
    title: "Tổng vé bán ra",
    dataIndex: "totalTickets",
    key: "totalTickets",
    width: "20%",
    sorter: (a, b) => a.totalTickets - b.totalTickets,
    sortDirections: ['descend', 'ascend'],
    render: (text, record, index) => {
      return formatCurrency(text);
    },
  },
  {
    title: "Tổng doanh thu",
    dataIndex: "totalRevenue",
    key: "totalRevenue",
    width: "25%",
    sorter: (a, b) => a.totalRevenue - b.totalRevenue,
    sortDirections: ['descend', 'ascend'],
    render: (text, record, index) => {
      return formatCurrency(text);
    },
  },
];

function RevenueByMovieTable({ data }) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.movieId}
      style={{ marginTop: 20 }}
    />
  );
}

export default RevenueByMovieTable;
