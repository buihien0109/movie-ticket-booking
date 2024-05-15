import { Button, DatePicker, Form, message, Modal, Select, Space } from "antd";
import dayjs from 'dayjs';
import React from "react";
import { useUpdateScheduleMutation } from "../../app/services/schedules.service";
import { formatDate } from "../../utils/functionUtils";

const ModalUpdate = (props) => {
    const { schedule, open, onCancel, movies } = props;
    const [updateSchedule, { isLoading }] = useUpdateScheduleMutation();

    const onFinish = (values) => {
        updateSchedule({ id: schedule.id, ...values })
            .unwrap()
            .then((data) => {
                message.success("Cập nhật lịch chiếu thành công!");
                onCancel();
            })
            .catch((error) => {
                message.error(error.data.message);
            });
    };

    return (
        <>
            <Modal
                open={open}
                title="Cập nhật lịch chiếu"
                footer={null}
                onCancel={onCancel}
                confirmLoading={isLoading}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    autoComplete="off"
                    initialValues={{
                        movieId: schedule.movie.id,
                        startDate: schedule.startDate ? dayjs(formatDate(schedule.startDate), 'DD/MM/YYYY') : null,
                        endDate: schedule.endDate ? dayjs(formatDate(schedule.endDate), 'DD/MM/YYYY') : null,
                    }}
                >
                    <Form.Item
                        label="Phim chiếu"
                        name="movieId"
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
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                            options={movies.map((movie) => ({
                                label: movie.name,
                                value: movie.id,
                            }))}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ngày bắt đầu"
                        name="startDate"
                        rules={[
                            {
                                required: true,
                                message: "Ngày bắt đầu không được để trống!",
                            }
                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                    </Form.Item>

                    <Form.Item
                        label="Ngày kết thúc"
                        name="endDate"
                        rules={[
                            {
                                required: true,
                                message: "Ngày kết thúc không được để trống!",
                            }
                        ]}
                    >
                        <DatePicker style={{ width: "100%" }} format={"DD/MM/YYYY"} />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={isLoading}>
                                Cập nhật
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
};
export default ModalUpdate;
