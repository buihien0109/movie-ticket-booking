import { PlusOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, message, Modal, Select, Space, Table, Tag, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useGetAllMoviesInScheduleQuery } from '../../app/services/movies.service';
import { useCreateShowtimesMutation } from '../../app/services/showtimes.service';
import { formatDate } from '../../utils/functionUtils';

const parseGraphicsType = (type) => {
    switch (type) {
        case "_2D":
            return <Tag color="blue">2D</Tag>;
        case "_3D":
            return <Tag color="red">3D</Tag>;
        default:
            return "";
    }
}

const parseTranslationType = (type) => {
    switch (type) {
        case "SUBTITLING":
            return <Tag color="green">Phụ đề</Tag>;
        case "DUBBING":
            return <Tag color="orange">Lồng tiếng</Tag>;
        default:
            return "";
    }
}

function ShowtimesByAuditorium({ data, cinema, auditorium, dateSelected }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [timeRange, setTimeRange] = useState([]);
    const [form] = Form.useForm();
    const { data: movies, isLoading: isFetchingMovies } = useGetAllMoviesInScheduleQuery();
    const [createShowtimes, { isLoading: isLoadingCreateShowtimes }] =
        useCreateShowtimesMutation();

    useEffect(() => {
        form.setFieldsValue({
            date: dateSelected,
            time: timeRange,
        });
    }, [dateSelected, timeRange])


    const columns = [
        {
            title: "Phim chiếu",
            dataIndex: "movie",
            key: "movie",
            render: (text, record, index) => {
                return (
                    <RouterLink to={`/admin/movies/${text.id}/detail`}>
                        {text.name}
                    </RouterLink>
                );
            },
        },
        {
            title: "Hình thức chiếu",
            dataIndex: "graphicsType",  // Sử dụng trực tiếp dataIndex nếu có thể
            key: "graphicsType",
            render: (text, record, index) => {
                return parseGraphicsType(text);
            },
        },
        {
            title: "Hình thức dịch",
            dataIndex: "translationType",  // Sử dụng trực tiếp dataIndex nếu có thể
            key: "translationType",
            render: (text, record, index) => {
                return parseTranslationType(text);
            },
        },
        {
            title: "Thời gian chiếu",
            dataIndex: "startTime",  // Sử dụng trực tiếp dataIndex nếu có thể
            key: "time",
            render: (text, record, index) => {
                return <Tag color="volcano">{record.startTime} - {record.endTime}</Tag>;
            },
        },
        {
            title: "Ngày chiếu",
            dataIndex: "date",  // Sử dụng một trong các trường ngày để xác định phân loại
            key: "date",
            render: (text, record, index) => {
                return formatDate(record.date);
            },
        },
        {
            title: "Loại suất chiếu",
            dataIndex: "",  // Sử dụng một trong các trường ngày để xác định phân loại
            key: "type",
            render: (text, record, index) => {
                const now = new Date();
                const showDate = new Date(record.movie.showDate);

                if (showDate > now) {
                    return <Tag color="orange">Suất chiếu sớm</Tag>;
                } else {
                    return <Tag color="green">Suất chiếu theo lịch</Tag>;
                }
            },
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (text, record, index) => {
                const now = new Date();
                const startTime = new Date(`${record.date}T${record.startTime}`);
                const endTime = new Date(`${record.date}T${record.endTime}`);

                if (now < startTime) {
                    return <Tag color="blue">Sắp chiếu</Tag>;
                } else if (now >= startTime && now <= endTime) {
                    return <Tag color="green">Đang chiếu</Tag>;
                } else {
                    return <Tag color="red">Đã chiếu</Tag>;
                }
            },
        },
    ];

    const disabledHours = () => {
        const hours = [];
        for (let i = 0; i < 24; i++) {
            if (i < 8) {
                hours.push(i);
            }
        }
        return hours;
    }

    const getClassification = (showDateStr) => {
        const now = new Date();
        const showDate = new Date(showDateStr);
        if (now < showDate) return 1;
        return 2;
    };

    const onFinish = (values) => {
        const [startTime, endTime] = values.time.map(time => time.format("HH:mm"));
        createShowtimes({
            auditoriumId: auditorium.id,
            movieId: values.movieId,
            date: dayjs(values.date).format("YYYY-MM-DD"),
            startTime,
            endTime,
            graphicsType: values.graphicsType,
            translationType: values.translationType
        })
            .unwrap()
            .then((data) => {
                form.resetFields();
                setIsModalOpen(false);
                message.success("Tạo lịch chiếu thành công!");
            })
            .catch((error) => {
                console.log(error)
                message.error(error.data.message);
            });
    }

    const handleTimeChange = (values) => {
        const startTime = values[0];
        const endTime = dayjs(startTime).add(selectedMovie.duration, 'minutes');
        setTimeRange([startTime, endTime]);
    };

    const handleMovieChange = (value) => {
        const movie = movies.find(movie => movie.id === Number(value));
        setSelectedMovie(movie);

        // Lấy startTime từ hàm getLatestEndTime và thêm duration
        let startTime = getLatestEndTime(data.showtimes);
        let endTime = dayjs(startTime).add(movie.duration, 'minutes');

        // Làm tròn endTime lên sao cho phút chia hết cho 5
        const roundedMinutes = roundUpToNextFive(endTime.minute());
        if (roundedMinutes >= 60) {
            // Nếu số phút làm tròn lớn hơn 60, cần tăng giờ lên và reset phút về 0
            endTime = endTime.add(roundedMinutes - endTime.minute(), 'minutes').add(1, 'hour').minute(0);
        } else {
            endTime = endTime.minute(roundedMinutes);
        }

        setTimeRange([startTime, endTime]);
    };

    // Hàm làm tròn phút lên đến số gần nhất chia hết cho 5
    const roundUpToNextFive = (num) => {
        return Math.ceil(num / 5) * 5;
    };

    const getLatestEndTime = (showtimes) => {
        if (showtimes.length === 0) {
            // Trả về 08:00 nếu không có suất chiếu nào
            return dayjs().hour(8).minute(0).second(0);
        }

        const latestEndTime = showtimes.reduce((latest, showtime) => {
            const currentEndTime = dayjs(`${showtime.date}T${showtime.endTime}`);
            return currentEndTime.isAfter(latest) ? currentEndTime : latest;
        }, dayjs(`${showtimes[0].date}T${showtimes[0].endTime}`));

        // Thêm 30 phút vào endTime muộn nhất
        return latestEndTime.add(30, 'minute');
    };

    const getOptions = (movie, property, mapping) => {
        if (!movie || !movie[property]) return [];
        return movie[property].map((type) => {
            return { label: mapping[type], value: type };
        });
    }

    const graphicsMapping = {
        "_2D": "2D",
        "_3D": "3D"
    };

    const translationMapping = {
        "SUBTITLING": "Phụ đề",
        "DUBBING": "Lồng tiếng"
    };

    const getGraphicsTypeOptions = (movie) => getOptions(movie, 'graphics', graphicsMapping);
    const getTranslationTypeOptions = (movie) => getOptions(movie, 'translations', translationMapping);

    return (
        <>
            <Table
                style={{ marginBottom: 30 }}
                columns={columns}
                dataSource={data.showtimes}
                pagination={false}
                rowKey="id"
                title={() => <Typography.Title level={5} style={{ color: "#722ed1" }}>{data.auditorium.name}</Typography.Title>}
                footer={() => {
                    // TODO: Kiểm tra ngày đang chọn có nhỏ hơn ngày hiện tại không
                    // Nếu ngày đang chọn nhỏ hơn ngày hiện tại thì không cho thêm lịch chiếu
                    const now = new Date(dayjs().format("DD/MM/YYYY"));
                    const dateSelectedObj = new Date(dayjs(new Date(dateSelected)).format("DD/MM/YYYY"));

                    // console.log({ dateSelectedObj, dateSelected, type: typeof dateSelected })
                    // console.log(dateSelectedObj.getTime(), now.getTime());
                    // console.log(dateSelectedObj.getTime() < now.getTime());
                    if (dateSelectedObj.getTime() < now.getTime()) return null;

                    return (
                        <Button
                            style={{ backgroundColor: "rgb(60, 141, 188)" }}
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setIsModalOpen(true)}
                        >
                            Thêm lịch chiếu
                        </Button>
                    )
                }}
            />

            {isModalOpen && (
                <Modal
                    title={`Thêm suất chiếu (${cinema.name} - ${auditorium.name})`}
                    open={isModalOpen}
                    footer={null}
                    onCancel={() => setIsModalOpen(false)}
                >
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Phim chiếu"
                            name="movieId"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Phim chiếu không được để trống!",
                                },
                            ]}
                        >
                            <Select
                                style={{ width: "100%" }}
                                showSearch
                                placeholder="Select a movie"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.searchValue ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={movies?.map((movie) => {
                                    const classification = getClassification(movie.showDate);  // Sử dụng hàm từ sorter
                                    const color = classification === 1 ? "processing" : "success";
                                    const statusText = classification === 1 ? "Sắp chiếu" : "Đang chiếu";
                                    return {
                                        value: movie.id,
                                        label: (
                                            <>{movie.name} <Tag color={color}>{statusText}</Tag></>
                                        ),
                                        searchValue: movie.name  // Property mới chỉ chứa text để search
                                    }
                                })}
                                onChange={handleMovieChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Ngày chiếu"
                            name="date"
                            rules={[
                                {
                                    required: true,
                                    message: "Ngày chiếu không được để trống!",
                                }
                            ]}
                        >
                            <DatePicker disabled style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                        </Form.Item>

                        <Form.Item
                            label="Hình thức chiếu"
                            name="graphicsType"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Hình thức chiếu không được để trống!",
                                },
                            ]}
                        >
                            <Select
                                disabled={!selectedMovie}
                                style={{ width: "100%" }}
                                showSearch
                                placeholder="Select a graphics type"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={getGraphicsTypeOptions(selectedMovie)}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Hình thức dịch"
                            name="translationType"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Hình thức dịch không được để trống!",
                                },
                            ]}
                        >
                            <Select
                                disabled={!selectedMovie}
                                style={{ width: "100%" }}
                                showSearch
                                placeholder="Select a translation type"
                                optionFilterProp="children"
                                filterOption={(input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                options={getTranslationTypeOptions(selectedMovie)}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Thời gian chiếu"
                            name="time"
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Thời gian chiếu không được để trống!",
                                },
                            ]}
                        >
                            <TimePicker.RangePicker
                                style={{ width: "100%" }}
                                format="HH:mm"
                                minuteStep={5}
                                onCalendarChange={handleTimeChange}
                                disabled={!selectedMovie}
                                disabledTime={(current, type) => {
                                    if (type === 'start') {
                                        return {
                                            disabledHours: disabledHours
                                        }
                                    } else {
                                        return {
                                            disabledHours: () => [],
                                        }
                                    }
                                }}
                            />
                        </Form.Item>

                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" loading={isLoadingCreateShowtimes}>
                                    Tạo suất chiếu
                                </Button>
                            </Space>
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </>
    )
}

export default ShowtimesByAuditorium