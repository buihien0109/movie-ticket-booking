import { LeftOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Spin,
  message,
  theme
} from "antd";
import "easymde/dist/easymde.min.css";
import React from "react";
import { Helmet } from "react-helmet";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useGetActorsQuery } from "../../../app/services/actors.service";
import { useGetCountriesQuery } from "../../../app/services/countries.service";
import { useGetDirectorsQuery } from "../../../app/services/directors.service";
import { useGetGenresQuery } from "../../../app/services/genres.service";
import { useCreateMovieMutation } from "../../../app/services/movies.service";
import AppBreadCrumb from "../../../components/layout/AppBreadCrumb";

const breadcrumb = [
  { label: "Danh sách phim", href: "/admin/movies" },
  { label: "Tạo phim", href: "/admin/movies/create" },
];
const MovieCreate = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [createMovie, { isLoading }] = useCreateMovieMutation();
  const { data: countries, isLoading: isLoadingCountries } = useGetCountriesQuery();
  const { data: genres, isLoading: isLoadingGenres } = useGetGenresQuery();
  const { data: directors, isLoading: isLoadingDirectors } = useGetDirectorsQuery();
  const { data: actors, isLoading: isLoadingActors } = useGetActorsQuery();

  if (isLoadingCountries || isLoadingGenres || isLoadingDirectors || isLoadingActors) {
    return <Spin size="large" fullscreen />;
  }

  const handleCreate = () => {
    form.validateFields()
      .then((values) => {
        return createMovie(values).unwrap();
      })
      .then((data) => {
        message.success("Tạo phim thành công!");
        setTimeout(() => {
          navigate(`/admin/movies/${data.id}/detail`);
        }, 1500);
      })
      .catch((error) => {
        message.error(error.data.message);
      });
  };

  return (
    <>
      <Helmet>
        <title>Tạo phim</title>
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
        <Space style={{ marginBottom: "1rem" }}>
          <RouterLink to="/admin/movies">
            <Button type="default" icon={<LeftOutlined />}>
              Quay lại
            </Button>
          </RouterLink>
          <Button
            style={{ backgroundColor: "rgb(60, 141, 188)" }}
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleCreate}
            loading={isLoading}
          >
            Tạo phim
          </Button>
        </Space>

        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          initialValues={{ status: false }}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label="Tên phim"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Tên phim không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>

              <Form.Item
                label="Tên phim (tiếng anh)"
                name="nameEn"
                rules={[
                  {
                    required: true,
                    message: "Tên phim (tiếng anh) không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Enter english name" />
              </Form.Item>

              <Form.Item
                label="Trailer"
                name="trailer"
                rules={[
                  {
                    required: true,
                    message: "Trailer không được để trống!",
                  },
                ]}
              >
                <Input placeholder="Enter trailer" />
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
                  rows={5}
                  placeholder="Enter description"
                />
              </Form.Item>

              <Form.Item label="Thể loại" name="genreIds">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select genres"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={genres.map((genre) => ({
                    label: genre.name,
                    value: genre.id,
                  }))}
                />
              </Form.Item>

              <Form.Item label="Đạo diễn" name="directorIds">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select directors"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={directors.map((director) => ({
                    label: director.name,
                    value: director.id,
                  }))}
                />
              </Form.Item>

              <Form.Item label="Diễn viên" name="actorIds">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select actors"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={actors.map((actor) => ({
                    label: actor.name,
                    value: actor.id,
                  }))}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Hình thức chiếu"
                name="graphics"
                rules={[
                  {
                    required: true,
                    message:
                      "Hình thức chiếu không được để trống!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select a graphics"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={[
                    { label: "2D", value: "_2D" },
                    { label: "3D", value: "_3D" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Hình thức dịch"
                name="translations"
                rules={[
                  {
                    required: true,
                    message:
                      "Hình thức dịch không được để trống!",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select a graphics"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={[
                    { label: "Phụ đề", value: "SUBTITLING" },
                    { label: "Lồng tiếng", value: "DUBBING" },
                  ]}
                />
              </Form.Item>
              <Form.Item
                label="Độ tuổi xem phim"
                name="age"
                rules={[
                  {
                    required: true,
                    message:
                      "Độ tuổi xem phim không được để trống!",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select a age"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={[
                    { label: "P", value: "P" },
                    { label: "K", value: "K" },
                    { label: "T13", value: "T13" },
                    { label: "T16", value: "T16" },
                    { label: "T18", value: "T18" },
                    { label: "C", value: "C" },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="Ngày chiếu"
                name="showDate"
                rules={[
                  {
                    required: true,
                    message: "Ngày chiếu không được để trống!",
                  }
                ]}
              >
                <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
              </Form.Item>

              <Form.Item
                label="Năm phát hành"
                name="releaseYear"
                rules={[
                  {
                    required: true,
                    message: "Năm phát hành không được để trống!",
                  },
                  {
                    validator: (_, value) => {
                      if (value <= 0) {
                        return Promise.reject(
                          "Năm phát hành phải lớn hơn 0!"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <InputNumber placeholder="Enter release year" style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                label="Thời lượng phim (phút)"
                name="duration"
                rules={[
                  {
                    required: true,
                    message: "Thời lượng phim không được để trống!",
                  },
                  {
                    validator: (_, value) => {
                      if (value <= 0) {
                        return Promise.reject(
                          "Thời lượng phim phải lớn hơn 0!"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <InputNumber placeholder="Enter duration" style={{ width: "100%" }} />
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

              <Form.Item
                label="Quốc gia"
                name="countryId"
                rules={[
                  {
                    required: true,
                    message:
                      "Quốc gia không được để trống!",
                  },
                ]}
              >
                <Select
                  style={{ width: "100%" }}
                  showSearch
                  placeholder="Select a country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  options={countries.map((country) => ({
                    label: country.name,
                    value: country.id,
                  }))}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default MovieCreate;
