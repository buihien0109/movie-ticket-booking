import { Table, Tag } from "antd";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import useSearchTable from "../../../hooks/useSearchTable";
import { formatDate } from "../../../utils/functionUtils";

const MovieTable = ({ data }) => {
  const { getColumnSearchProps } = useSearchTable();
  const columns = [
    {
      title: "Tên phim",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
      render: (text, record, index) => {
        return (
          <RouterLink to={`/admin/movies/${record.id}/detail`}>
            {text}
          </RouterLink>
        );
      },
    },
    {
      title: "Năm phát hành",
      dataIndex: "releaseYear",
      key: "releaseYear",
      width: "12%",
      ...getColumnSearchProps('releaseYear'),
      sorter: (a, b) => a.releaseYear - b.releaseYear,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => {
        return text;
      },
    },
    {
      title: "Thể loại",
      dataIndex: "genres",
      key: "genres",
      render: (text, record, index) => {
        return text.map((category) => (
          <Tag color={"geekblue"} key={category.id} style={{ marginBottom: 7 }}>
            {category.name}
          </Tag>
        ));
      },
    },
    {
      title: "Lịch chiếu",
      dataIndex: "showDate",
      key: "showDate",
      render: (text, record, index) => {
        return <Tag color="volcano">{formatDate(text)}</Tag>;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
      sorter: (a, b) => a.status - b.status,
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => {
        return text ? <Tag color="success">Công khai</Tag> : <Tag color="warning">Nháp</Tag>;;
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: "15%",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      sortDirections: ['descend', 'ascend'],
      render: (text, record, index) => {
        return formatDate(text);
      },
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey={(record) => record.id} />;
}
export default MovieTable;
