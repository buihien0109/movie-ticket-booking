import { DeleteOutlined, LeftOutlined, SaveOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Pagination,
  Row,
  Select,
  Space,
  Spin,
  Upload,
  message,
  theme
} from "antd";
import "easymde/dist/easymde.min.css";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import {
  useDeleteAdditionalServiceMutation,
  useGetAdditionalServiceByIdQuery,
  useUpdateAdditionalServiceMutation,
} from "../../../app/services/additionalServices.service";
import {
  useDeleteImageMutation,
  useGetImagesQuery,
  useUploadImageMutation,
} from "../../../app/services/images.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";
import { API_DOMAIN } from "../../../data/constants";

const AdditionalServiceDetail = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { additionalServiceId } = useParams();
  const imagesData = useSelector((state) => state.images);
  const { data: additionalService, isLoading: isFetchingAdditionalService } =
    useGetAdditionalServiceByIdQuery(additionalServiceId);
  const { isLoading: isFetchingImages } =
    useGetImagesQuery(additionalServiceId);

  const images =
    imagesData &&
    imagesData.map((image) => {
      return {
        id: image.id,
        url: `${API_DOMAIN}${image.url}`,
      };
    });
  const [updateAdditionalService, { isLoading: isLoadingUpdateAdditionalService }] =
    useUpdateAdditionalServiceMutation();
  const [deleteAdditionalService, { isLoading: isLoadingDeleteAdditionalService }] =
    useDeleteAdditionalServiceMutation();
  const [uploadImage, { isLoading: isLoadingUploadImage }] =
    useUploadImageMutation();
  const [deleteImage, { isLoading: isLoadingDeleteImage }] =
    useDeleteImageMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSelected, setImageSelected] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // số lượng hình ảnh mỗi trang
  const totalImages = images.length; // tổng số hình ảnh
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalImages);
  const imagesRendered = images.slice(startIndex, endIndex);

  const breadcrumb = [
    { label: "Danh sách combo-nước", href: "/admin/additional-services" },
    { label: additionalService?.name, href: `/admin/additional-services/${additionalService?.id}/detail` },
  ];

  useEffect(() => {
    if (additionalService && thumbnail === null) {
      setThumbnail(additionalService?.thumbnail.startsWith("/api") ? `${API_DOMAIN}${additionalService?.thumbnail}` : additionalService?.thumbnail);
    }
  }, [additionalService, thumbnail]);

  if (isFetchingAdditionalService || isFetchingImages) {
    return <Spin size="large" fullscreen />;
  }

  const onPageChange = page => {
    setCurrentPage(page);
  };

  const handleUpdate = () => {
    form.validateFields()
      .then((values) => {
        return updateAdditionalService({ additionalServiceId, ...values }).unwrap();
      })
      .then((data) => {
        message.success("Cập nhật combo-nước thành công!");
      })
      .catch((error) => {
        console.log("error", error);
        message.error(error.data.message);
      });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa combo-nước này?",
      content: "Hành động này không thể hoàn tác!",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        deleteAdditionalService(additionalService.id)
          .unwrap()
          .then((data) => {
            message.success("Xóa combo-nước thành công!");
            setTimeout(() => {
              navigate("/admin/additional-services");
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

  const selecteImage = (image) => () => {
    setImageSelected(image);
  };

  const handleUploadImage = ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("file", file);
    uploadImage(formData)
      .unwrap()
      .then((data) => {
        onSuccess();
        message.success("Tải ảnh lên thành công!");
      })
      .catch((error) => {
        onError();
        message.error(error.data.message);
      });
  };

  const handleDeleteImage = () => {
    const imageObj = images.find((image) => image.url == imageSelected);
    if (!imageObj) {
      return;
    }
    deleteImage(imageObj.id)
      .unwrap()
      .then((data) => {
        message.success("Xóa ảnh thành công!");
        setImageSelected(null);
      })
      .catch((error) => {
        console.log(error);
        message.error(error.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>{additionalService.title}</title>
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
            <RouterLink to="/admin/additional-services">
              <Button type="default" icon={<LeftOutlined />}>
                Quay lại
              </Button>
            </RouterLink>
            <Button
              style={{ backgroundColor: "rgb(60, 141, 188)" }}
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleUpdate}
              loading={isLoadingUpdateAdditionalService}
            >
              Cập nhật
            </Button>
          </Space>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            loading={isLoadingDeleteAdditionalService}
          >
            Xóa combo-nước
          </Button>
        </Flex>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={{
            ...additionalService
          }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Tên combo-nước"
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
                label="Mô tả"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Mô tả không được để trống!",
                  },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  placeholder="Enter description"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Giá tiền"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Giá tiền không được để trống!",
                  },
                  {
                    validator: (_, value) => {
                      if (value <= 0) {
                        return Promise.reject(
                          "Giá tiền phải lớn hơn 0!"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <InputNumber placeholder="Enter price" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[
                  {
                    required: true,
                    message:
                      "Trạng thái không được để trống!",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select a status"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={[
                    { label: "Nháp", value: false },
                    { label: "Công khai", value: true },
                  ]}
                />
              </Form.Item>

              <Form.Item name="thumbnail">
                <Space
                  direction="vertical"
                  style={{ width: "100%" }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: 300,
                      objectFit: "cover",
                    }}
                    src={thumbnail}
                    alt="Thumbnail"
                  />
                  <Button
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Thay đổi ảnh combo-nước
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        <Modal
          title="Chọn ảnh của bạn"
          open={isModalOpen}
          onCancel={() => {
            setIsModalOpen(false);
            setImageSelected(null);
          }}
          footer={null}
          width={1200}
          style={{ top: 20 }}
        >
          <Flex justify="space-between" align="center">
            <Space direction="horizontal">
              <Upload
                maxCount={1}
                customRequest={handleUploadImage}
                showUploadList={false}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "rgb(243, 156, 18)",
                  }}
                  loading={isLoadingUploadImage}
                >
                  Tải ảnh lên
                </Button>
              </Upload>

              <Button
                type="primary"
                disabled={!imageSelected}
                onClick={() => {
                  setThumbnail(imageSelected);
                  setIsModalOpen(false);
                  form.setFieldsValue({
                    thumbnail: imageSelected.slice(API_DOMAIN.length),
                  });
                }}
              >
                Chọn ảnh
              </Button>
            </Space>
            <Button
              type="primary"
              disabled={!imageSelected}
              danger
              onClick={handleDeleteImage}
              loading={isLoadingDeleteImage}
            >
              Xóa ảnh
            </Button>
          </Flex>

          <div style={{ marginTop: "1rem" }} id="image-container">
            <Row gutter={[16, 16]} wrap={true}>
              {imagesRendered &&
                imagesRendered.map((image, index) => (
                  <Col span={6} key={index}>
                    <div
                      className={`${imageSelected === image.url
                        ? "image-selected"
                        : ""
                        } image-item`}
                      onClick={selecteImage(image.url)}
                    >
                      <img
                        src={image.url}
                        alt={`image-${index}`}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Col>
                ))}
            </Row>
          </div>

          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalImages}
            onChange={onPageChange}
            showSizeChanger={false}
            style={{ marginTop: 16, textAlign: 'center' }}
          />
        </Modal>
      </div>
    </>
  );
};

export default AdditionalServiceDetail;
