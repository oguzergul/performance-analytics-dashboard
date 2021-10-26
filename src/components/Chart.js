import {Line} from 'react-chartjs-2';
import {LoadingIndicator} from "./index";


const DataChart = ({type = "line", dataList, label, border, background, loading = false}) => {

    const {set, labels} = dataList;

    const data = {
        labels: labels,
        datasets: [
            {
                label: label,
                data: set,
                backgroundColor: border,
                borderColor: background,
                fill: false,
            },
        ],
    };
    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };
    return (<>{loading === true ? <LoadingIndicator/> : <Line data={data} options={options} type={type}/>}</>)
}
export default DataChart