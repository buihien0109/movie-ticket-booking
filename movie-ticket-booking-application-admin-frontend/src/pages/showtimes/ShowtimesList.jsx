import { Button, DatePicker, Form, Select, Space, theme } from "antd";
import dayjs from 'dayjs';
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useLazyGetAuditoriumsByCinemaQuery } from "../../app/services/auditorium.service";
import { useGetCinemasQuery } from "../../app/services/cinemas.service";
import { useLazySearchShowtimesQuery } from "../../app/services/showtimes.service";
import AppBreadCrumb from "../../components/layout/AppBreadCrumb";
import { formatDate } from "../../utils/functionUtils";
import ShowtimesTable from "./ShowtimesTable";

const breadcrumb = [{ label: "Danh sách suất chiếu", href: "/admin/showtimes" }];
const ShowtimesList = () => {
    const [form] = Form.useForm();
    const [dateSelected, setDateSelected] = useState(dayjs(new Date().toISOString()));
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const {
        data: cinemas,
        isLoading: isFetchingCinemas,
    } = useGetCinemasQuery();

    const [getAuditoriumsByCinema,
        { data: auditoriums, isFetching: isFetchingAuditoriums }
    ] = useLazyGetAuditoriumsByCinemaQuery();

    const [searchShowtimes,
        { data: showtimes, isFetching: isFetchingSearchShowtimes }
    ] = useLazySearchShowtimesQuery();


    useEffect(() => {
        const showDate = new Date().toISOString();
        searchShowtimes({ showDate: formatDate(showDate) });
    }, [])

    const handleSearch = (values) => {
        const { cinemaId, auditoriumId, showDate } = values;
        searchShowtimes({ cinemaId, auditoriumId, showDate: formatDate(showDate) });
        setDateSelected(dayjs(values.showDate.toISOString()))
    };

    return (
        <>
            <Helmet>
                <title>Danh sách suất chiếu</title>
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
                <Space style={{ marginBottom: "2rem" }}>
                    <Form
                        form={form}
                        layout="inline"
                        onFinish={handleSearch}
                        autoComplete="off"
                        initialValues={{
                            showDate: dayjs(formatDate(new Date().toISOString()), 'DD/MM/YYYY'),
                        }}
                    >

                        <Form.Item
                            label="Rạp chiếu"
                            name="cinemaId"
                            style={{ width: "400px" }}
                        >
                            <Select
                                style={{ width: "100%" }}
                                showSearch
                                placeholder="Select a cinema"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={cinemas?.map((cinema) => ({
                                    value: cinema.id,
                                    label: cinema.name,
                                }))}
                                onChange={(value) => {
                                    form.setFieldsValue({ auditoriumId: undefined });
                                    getAuditoriumsByCinema(value)
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phòng chiếu"
                            name="auditoriumId"
                            style={{ width: "300px" }}
                        >
                            <Select
                                style={{ width: "100%" }}
                                showSearch
                                placeholder="Select a auditorium"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={auditoriums?.map((auditorium) => ({
                                    value: auditorium.id,
                                    label: auditorium.name,
                                }))}
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
                            <DatePicker
                                style={{ width: "100%" }}
                                format={"DD/MM/YYYY"}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isFetchingSearchShowtimes}
                                >
                                    Tìm kiếm
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Space>

                <ShowtimesTable data={showtimes} dateSelected={dateSelected} />
            </div>
        </>
    );
};

export default ShowtimesList;
