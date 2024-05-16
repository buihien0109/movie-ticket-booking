import { DeleteOutlined, LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Spin,
  theme
} from "antd";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteCinemaMutation,
  useGetCinemaByIdQuery,
  useUpdateCinemaMutation,
} from "../../../app/services/cinemas.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import AuditoriumList from "../auditorium/AuditoriumList";
import MapIframeComponent from "./MapIframeComponent";

const CinemaDetail = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { cinemaId } = useParams();
  const { data: cinema, isLoading: isFetchingCinema } =
    useGetCinemaByIdQuery(cinemaId);

  const [updateCinema, { isLoading: isLoadingUpdateCinema }] =
    useUpdateCinemaMutation();
  const [deleteCinema, { isLoading: isLoadingDeleteCinema }] =
    useDeleteCinemaMutation();

  const breadcrumb = [
    { label: "Danh sách rạp chiếu", href: "/admin/cinemas" },
    { label: cinema?.name, href: `/admin/cinemas/${cinema?.id}/detail` },
  ];

  if (isFetchingCinema) {
    return <Spin size="large" fullscreen />;
  }

  const handleUpdate = () => {
    form.validateFields()
      .then((values) => {
        return updateCinema({ cinemaId, ...values }).unwrap();
      })
      .then((data) => {
        message.success("Cập nhật rạp chiếu thành công!");
      })
      .catch((error) => {
        console.log(error);
        message.error(error.data.message);
      });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa rạp chiếu này?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        deleteCinema(cinema.id)
          .unwrap()
          .then((data) => {
            message.success("Xóa rạp chiếu thành công!");
            setTimeout(() => {
              navigate("/admin/cinemas");
            }, 1500);
          })
          .catch((error) => {
            message.error(error.data.message);
          });
      },
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  };

  return (
    <>
      <Helmet>
        <title>{cinema?.name}</title>
      </Helmet>
      <AppBreadCrumb items={breadcrumb} />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Flex justify="space-between" align="center" style={{ marginBottom: "1rem" }}>
          <Space>
            <RouterLink to="/admin/cinemas">
              <Button type="default" icon={<LeftOutlined />}>
                Quay lại
              </Button>
            </RouterLink>
            <Button
              style={{ backgroundColor: "rgb(60, 141, 188)" }}
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleUpdate}
              loading={isLoadingUpdateCinema}
            >
              Cập nhật
            </Button>
          </Space>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            loading={isLoadingDeleteCinema}
          >
            Xóa rạp chiếu
          </Button>
        </Flex>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={{
            ...cinema
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên rạp chiếu"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>

              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ không được để trống!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="Enter address"
                />
              </Form.Item>

              <Form.Item
                label="Địa chỉ map"
                name="mapLocation"
                rules={[
                  {
                    required: true,
                    message: "Địa chỉ map không được để trống!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  placeholder="Enter map location"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <MapIframeComponent mapLocation={cinema.mapLocation} />
            </Col>
          </Row>
        </Form>
      </div>

      <AuditoriumList cinemaId={cinemaId} />
    </>
  );
};

export default CinemaDetail;
