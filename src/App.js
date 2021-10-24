import {useEffect, useState} from "react";
import {Card, Container, Flex, Link, Grid, Header, Text, TimeBlock} from "./components";
import {axiosInstance} from "./utils/axios";
import Chart from "./components/Chart";

function App() {
    const [analytics, setAnalytics] = useState([]);
    const [loader, setLoader] = useState(false);

    const [selectedMinDate, setSelectedMinDate] = useState("");
    const [selectedMaxDate, setSelectedMaxDate] = useState("");

    const getMinSelectedDate = (event) => {
        setSelectedMinDate(event.target.value);
    }

    const getMaxSelectedDate = (event) => {
        setSelectedMaxDate(event.target.value);
    }

    const getAnalyticsBetweenRange = async () => {
        setLoader(true);
        await axiosInstance('/find-performance', {
            params: {
                min: selectedMinDate,
                max: selectedMaxDate
            }
        }).then(response => {
            setAnalytics(response.data);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoader(false)
        });
    };

    const getLastHalfHoursMetrics = async () => {
        setLoader(true);
        await axiosInstance('/').then(res => {
            setAnalytics(res.data);
            console.log('res',res)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoader(false)
        });

    };

    useEffect(() => {
        getLastHalfHoursMetrics();
    }, [])


    const createChart = (data = []) => {
        const labels = data.map((e) => new Date(e.measurement_date).getUTCDate());
        return [
            {title: 'TTFB', data: data.map((e) => e.ttfbTime), label: labels},
            {title: 'TTFB', data: data.map((e) => e.fcpTime), label: labels},
            {title: 'DOM LOAD TIME', data: data.map((e) => e.domLoadTime), label: labels},
            {title: 'WINDOW LOAD TIME', data: data.map((e) => e.windowLoadTime), label: labels},
        ]
    }

    return (
        <div className={'pb-12'}>
            <Header/>
            <Container>

                <TimeBlock
                    onDateSubmit={getAnalyticsBetweenRange}
                    getFromTime={getMinSelectedDate}
                    getToTime={getMaxSelectedDate}
                />


                {analytics.length > 0 ? <Grid lg={2} sm={1} direction={'column'} gap={4}>
                        {createChart(analytics).map((e, index) =>
                            <Card key={index}>
                                <Flex layouts={['col']} justify={['center']}
                                      align={['center', 'center', 'center', 'center']}>
                                    <Text tag='h2' type='cardTitle'>{e.title}</Text>
                                    <Chart
                                        loading={loader}
                                        type={'line'}
                                        border={'#000000'}
                                        background={'#009aff'}
                                        label={""}
                                        dataSet={e.data}
                                        labels={e.label}>
                                    </Chart>
                                </Flex>
                            </Card>)
                        }
                    </Grid>
                    :
                    <Card>
                        <Flex layouts={['col']} justify={['center']}
                              align={['center', 'center', 'center', 'center']}>
                            <Text tag='h3'>There is no performance measurement in half an hour.</Text>
                            <Text tag='h4'>Please visit link below or search for specific dates using time
                                picker.</Text>
                            <Link target={"_blank"} href={"https://performance-test-app.vercel.app/"}>TEST ME</Link>
                        </Flex>
                    </Card>
                }
            </Container>
        </div>
    );
}

export default App;
