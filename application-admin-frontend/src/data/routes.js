import {
    BulbOutlined,
    CalculatorOutlined,
    CarOutlined,
    CopyrightOutlined,
    FileTextOutlined,
    PieChartOutlined,
    ProjectOutlined,
    ReadOutlined,
    RobotOutlined,
    RocketOutlined,
    TabletOutlined,
    TeamOutlined,
    UserOutlined,
    TrophyOutlined
} from "@ant-design/icons";

const menu = [
    {
        id: 1,
        label: "Dashboard",
        icon: PieChartOutlined,
        url: "/admin/dashboard",
        subs: [
            {
                id: 11,
                label: "Tổng quan",
                url: "/admin/dashboard",
            },
            {
                id: 12,
                label: "Doanh thu theo phim",
                url: "/admin/revenue/movie",
            },
            {
                id: 13,
                label: "Doanh thu theo rạp",
                url: "/admin/revenue/cinema",
            },
        ],
    },
    {
        id: 7,
        label: "Quản lý rạp phim",
        icon: RobotOutlined,
        url: "/admin/cinemas",
        subs: [
            {
                id: 71,
                label: "Danh sách rạp phim",
                url: "/admin/cinemas",
            },
            {
                id: 72,
                label: "Tạo rạp phim",
                url: "/admin/cinemas/create",
            },
        ],
    },
    {
        id: 8,
        label: "Quản lý phim",
        icon: TabletOutlined,
        url: "/admin/movies",
        subs: [
            {
                id: 81,
                label: "Danh sách phim",
                url: "/admin/movies",
            },
            {
                id: 82,
                label: "Tạo phim",
                url: "/admin/movies/create",
            },
        ],
    },
    {
        id: 9,
        label: "Quản lý lịch chiếu",
        icon: BulbOutlined,
        url: "/admin/schedules",
        subs: [
            {
                id: 91,
                label: "Danh sách lịch chiếu",
                url: "/admin/schedules",
            },
        ],
    },
    {
        id: 100,
        label: "Quản lý suất chiếu",
        icon: CopyrightOutlined,
        url: "/admin/showtimes",
        subs: [
            {
                id: 1002,
                label: "Danh sách suất chiếu",
                url: "/admin/showtimes",
            },
        ],
    },
    {
        id: 400,
        label: "Quản lý đơn hàng",
        icon: CarOutlined,
        url: "/admin/orders",
        subs: [
            {
                id: 4001,
                label: "Danh sách đơn hàng",
                url: "/admin/orders",
            }
        ],
    },
    {
        id: 200,
        label: "Quản lý giá vé",
        icon: CalculatorOutlined,
        url: "/admin/ticket-prices",
        subs: [
            {
                id: 2001,
                label: "Giá vé cơ bản",
                url: "/admin/ticket-prices/base-price",
            }
        ],
    },
    {
        id: 300,
        label: "Quản lý khuyến mại",
        icon: CarOutlined,
        url: "/admin/coupons",
        subs: [
            {
                id: 3001,
                label: "Danh sách khuyến mại",
                url: "/admin/coupons",
            }
        ],
    },
    {
        id: 2,
        label: "Quản lý bài viết",
        icon: FileTextOutlined,
        url: "/admin/blogs",
        subs: [
            {
                id: 21,
                label: "Tất cả bài viết",
                url: "/admin/blogs",
            },
            {
                id: 22,
                label: "Bài viết của tôi",
                url: "/admin/blogs/own-blogs",
            },
            {
                id: 23,
                label: "Tạo bài viết",
                url: "/admin/blogs/create",
            },
        ],
    },
    {
        id: 3,
        label: "Quản lý user",
        icon: UserOutlined,
        url: "/admin/users",
        subs: [
            {
                id: 31,
                label: "Danh sách user",
                url: "/admin/users",
            },
            {
                id: 32,
                label: "Tạo user",
                url: "/admin/users/create",
            },
        ],
    },
    {
        id: 4,
        label: "Quản lý thể loại",
        icon: TeamOutlined,
        url: "/admin/genres",
        subs: [
            {
                id: 41,
                label: "Danh sách thể loại",
                url: "/admin/genres",
            },
        ],
    },
    {
        id: 5,
        label: "Quản lý quốc gia",
        icon: ProjectOutlined,
        url: "/admin/countries",
        subs: [
            {
                id: 51,
                label: "Danh sách quốc gia",
                url: "/admin/countries",
            }
        ],
    },
    {
        id: 6,
        label: "Quản lý combo-nước",
        icon: ReadOutlined,
        url: "/admin/additional-services",
        subs: [
            {
                id: 61,
                label: "Danh sách combo-nước",
                url: "/admin/additional-services",
            },
            {
                id: 62,
                label: "Tạo combo-nước",
                url: "/admin/additional-services/create",
            },
        ],
    },
    {
        id: 500,
        label: "Quản lý đạo diễn",
        icon: RocketOutlined,
        url: "/admin/directors",
        subs: [
            {
                id: 5001,
                label: "Danh sách đạo diễn",
                url: "/admin/directors",
            },
            {
                id: 5002,
                label: "Tạo đạo diễn",
                url: "/admin/directors/create",
            },
        ],
    },
    {
        id: 600,
        label: "Quản lý diễn viên",
        icon: TrophyOutlined,
        url: "/admin/actors",
        subs: [
            {
                id: 6001,
                label: "Danh sách diễn viên",
                url: "/admin/actors",
            },
            {
                id: 6002,
                label: "Tạo diễn viên",
                url: "/admin/actors/create",
            },
        ],
    },
];

export default menu;
