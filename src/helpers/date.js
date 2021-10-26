import moment from "moment";

const parseDates = (value) => {
    return moment(value).format('L')
}

export {parseDates}