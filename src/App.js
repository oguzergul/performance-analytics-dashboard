import {useState} from "react";
import {Card, Container, Flex, Grid, Header, Text, TimeBlock} from "./components";
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
        const getsample = await axiosInstance('find-performance', {
            params: {
                min: selectedMinDate,
                max: selectedMaxDate
            }
        }).then(res => res.data)
            .catch(e => console.log(e))
            .finally(() => setLoader(false));
        console.log(getsample)
        setAnalytics(getsample);
    };

    return (
        <div>
            <Header/>
            <Container>
                <TimeBlock onDateSubmit={getAnalyticsBetweenRange} getFromTime={getMinSelectedDate}
                           getToTime={getMaxSelectedDate}/>

                <Grid lg={2} sm={1} direction={'column'} gap={4}>
                    <Card>
                        <Flex layouts={['col']} justify={['center']} align={['center', 'center', 'center', 'center']}>
                            <Text tag='h2' type='cardTitle'>TTFB</Text>
                            {analytics.length &&
                            <Chart
                                loading={loader}
                                type={'line'}
                                border={'#000000'}
                                background={'#009aff'}
                                label={""}
                                dataSet={analytics.map((e) => e.ttfbTime)}
                                labels={analytics.map((e) => new Date(e.measurement_date).getUTCDate())}/>
                            }
                        </Flex>
                    </Card>

                    <Card>
                        <Flex layouts={['col']} justify={['center']} align={['center', 'center', 'center', 'center']}>
                            <Text tag='h2' type='cardTitle'>FCP</Text>
                            {analytics.length &&
                            <Chart loading={loader} type={'line'}
                                   border={'#000000'}
                                   background={'#009aff'}
                                   label={""}
                                   dataSet={analytics.map((e) => e.fcpTime)}
                                   labels={analytics.map((e) => new Date(e.measurement_date).getUTCDate())}/>}
                        </Flex>
                    </Card>

                    <Card>
                        <Flex layouts={['col']} justify={['center']} align={['center', 'center', 'center', 'center']}>
                            <Text tag='h2' type='cardTitle'>DOM Load</Text>
                            {analytics.length &&
                            <Chart border={'#000000'}
                                   background={'#009aff'}
                                   loading={loader} type={'line'} label={""}
                                   dataSet={analytics.map((e) => e.domLoadTime)}
                                   labels={analytics.map((e) => new Date(e.measurement_date).getUTCDate())}/>}
                        </Flex>
                    </Card>

                    <Card>
                        <Flex layouts={['col']} justify={['center']} align={['center', 'center', 'center', 'center']}>
                            <Text tag='h2' type='cardTitle'>Window Load</Text>
                            {analytics.length &&
                            <Chart loading={loader}
                                   type={'line'}
                                   border={'#000000'}
                                   background={'#009aff'}
                                   label={""}
                                   dataSet={analytics.map((e) => e.windowLoadTime)}
                                   labels={analytics.map((e) => new Date(e.measurement_date).getUTCDate())}/>}
                        </Flex>
                    </Card>
                </Grid>
            </Container>
        </div>
    );
}

export default App;
