// Format date
export const formatDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);

    return `${day}/${month}/${year}`
}


// Format date time -> return format: 
export const formatDateTime = (datetimeStr) => {
    const z = n => ('0' + n).slice(-2);
    return `${datetimeStr.getFullYear()}-${z(datetimeStr.getMonth() + 1)}-${z(datetimeStr.getDate())} ${z(datetimeStr.getHours())}:${z(datetimeStr.getMinutes())}:${z(datetimeStr.getSeconds())}`;
}

export const formatTime = (timeString) => {
    const time = new Date(timeString);

    const hours = `0${time.getHours()}`.slice(-2);
    const minutes = `0${time.getMinutes()}`.slice(-2);

    return `${hours}:${minutes}`
}

export const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    const dayLabels = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];

    // if date = today => return "Hôm nay"
    if (date.toDateString() === new Date().toDateString()) {
        return "Hôm nay";
    }
    return dayLabels[date.getDay()];
}

export const formatDateToDDMM = (dateString) => {
    const date = new Date(dateString);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    return `${day}/${month}`
}

// Format movie age
export const formatMovieAge = (age) => {
    const movieAge = {
        P: {
            text: 'P',
            color: 'bg-green-500'
        },
        K: {
            text: 'K',
            color: 'bg-blue-500'
        },
        T13: {
            text: '13+',
            color: 'bg-yellow-500'
        },
        T16: {
            text: '16+',
            color: 'bg-orange-500'
        },
        T18: {
            text: '18+',
            color: 'bg-red-500'
        },
        C: {
            text: 'C',
            color: 'bg-gray-500'
        }
    }
    return movieAge[age]
}

export const parseReviewMessage = (rating) => {
    switch (rating) {
        case 1:
            return "Không thích";
        case 2:
            return "Rất tệ";
        case 3:
            return "Tệ";
        case 4:
            return "Dưới trung bình";
        case 5:
            return "Trung bình";
        case 6:
            return "Khá ổn";
        case 7:
            return "Tốt";
        case 8:
            return "Rất tốt";
        case 9:
            return "Tuyệt vời";
        case 10:
            return "Xuất sắc";
        default:
            return "";
    }
}

export const formatCurrency = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const groupShowtimes = (showtimesInput) => {
    let result = [];
    let grouped = {};

    let showtimes = [...showtimesInput];

    // Sắp xếp mảng showtimes dựa vào startTime
    showtimes.sort((a, b) => a.startTime.localeCompare(b.startTime));

    for (let showtime of showtimes) {
        let cinemaId = showtime.auditorium.cinema.id;
        let movieId = showtime.movie.id;
        let cinemaMovieKey = `${cinemaId}-${movieId}`;
        let label = createLabel(showtime);

        if (!grouped[cinemaMovieKey]) {
            grouped[cinemaMovieKey] = {
                cinema: showtime.auditorium.cinema,
                movie: showtime.movie,
                showtimes: {}
            };
        }

        if (!grouped[cinemaMovieKey].showtimes[label]) {
            grouped[cinemaMovieKey].showtimes[label] = [];
        }

        grouped[cinemaMovieKey].showtimes[label].push({
            auditorium: showtime.auditorium,
            id: showtime.id,
            date: showtime.date,
            startTime: showtime.startTime,
            endTime: showtime.endTime,
            graphicsType: showtime.graphicsType,
            translationType: showtime.translationType,
            createdAt: showtime.createdAt,
            updatedAt: showtime.updatedAt
        });
    }

    // Chuyển định dạng dữ liệu thành cấu trúc mong muốn
    for (let key in grouped) {
        let group = grouped[key];
        let showtimesArray = [];

        for (let label in group.showtimes) {
            showtimesArray.push({
                label: label,
                showtimes: group.showtimes[label]
            });
        }

        result.push({
            cinema: group.cinema,
            movie: group.movie,
            showtimesInfo: showtimesArray
        });
    }

    return result;
}

export function createLabel(showtime) {
    let label = `${showtime.graphicsType} ${showtime.translationType}`;
    if (showtime.auditorium.type !== 'STANDARD') {
        label += ` | ${showtime.auditorium.type}`;
    }
    return label.replace('_2D', '2D').replace('_3D', '3D').replace('SUBTITLING', 'Phụ đề').replace('DUBBING', 'Lồng tiếng');
}
