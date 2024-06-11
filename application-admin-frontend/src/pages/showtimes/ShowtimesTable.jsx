import { Divider, Typography } from "antd";
import React from "react";
import { formatDate } from "../../utils/functionUtils";
import ShowtimesByAuditorium from "./ShowtimesByAuditorium";


const ShowtimesTable = ({ data, dateSelected }) => {
    return (
        <>
            <Divider>Lịch chiếu ngày: {formatDate(dateSelected)}</Divider>
            {data && data.map((item, index) => (
                <div key={index}>
                    <Typography.Title level={5} style={{ color: "#fff", backgroundColor: "#1677ff", textAlign: "center", boxShadow: "0 2px 0 rgba(5, 145, 255, 0.1)", borderRadius: "6px", padding: "8px 16px" }}>
                        Rạp: {item.cinema.name}
                    </Typography.Title>
                    {item.auditoriums.map((data, index) => (
                        <ShowtimesByAuditorium
                            key={index}
                            data={data}
                            cinema={item.cinema}
                            auditorium={data.auditorium}
                            dateSelected={dateSelected}
                        />
                    ))}
                </div>
            ))}
        </>
    );
};
export default ShowtimesTable;
