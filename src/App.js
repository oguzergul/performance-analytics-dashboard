import {useEffect, useState} from "react";
import {Card, Container, Flex, Link, Grid, Header, Text, TimeBlock, Footer, Modal, Chart} from "./components";
import {axiosInstance} from "./utils/axios";
import useModal from "./hooks/useModal";
import moment from "moment";

function App() {
    const [selectedMinDate, setSelectedMinDate] = useState("");
    const [selectedMaxDate, setSelectedMaxDate] = useState("");
    const [currentReport, setCurrentReport] = useState(0);
    const [analytics, setAnalytics] = useState([]);
    const [loader, setLoader] = useState(false);

    const {toggleModel, isVisible, modalBody} = useModal();


    const getMinSelectedDate = (event) => {
        setSelectedMinDate(event.target.value);
    }

    const getMaxSelectedDate = (event) => {
        setSelectedMaxDate(event.target.value);
    }

    const getAnalyticsBetweenRange = async () => {
        setLoader(true);
        if (selectedMinDate && selectedMaxDate) {
            await axiosInstance('/find-performance', {
                params: {
                    min: selectedMinDate,
                    max: selectedMaxDate
                }
            }).then(response => {
                if (!response.data.length) {
                    toggleModel({
                        title: "Opps!",
                        description: "There is no performance measurement found for the date range you choose!"
                    });

                } else {
                    setAnalytics(response.data);
                }

            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoader(false);
            });
        } else {
            toggleModel({
                title: "Opps!",
                description: "Please be sure you select dates!"
            });
            setLoader(false);
        }
    };

    const getLastHalfHoursMetrics = async () => {
        setLoader(true);
        await axiosInstance('/').then(res => {
            setAnalytics(res.data);
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
        const labels = data.map((e) => moment(e.measurement_date).format('L'));
        return [
            {title: 'TTFB', data: data.map((e) => e.ttfbTime), label: labels},
            {title: 'FCP', data: data.map((e) => e.fcpTime), label: labels},
            {title: 'DOM LOAD TIME', data: data.map((e) => e.domLoadTime), label: labels},
            {title: 'WINDOW LOAD TIME', data: data.map((e) => e.windowLoadTime), label: labels},
        ]
    }
    const currentReportData = () => {
        const {measurement_date, user_agent, url, resourcesLoadTime, files} = analytics[currentReport];

        return [
            {title: 'Report Date', value: moment(measurement_date).format("L")},
            {title: 'User Agent', value: user_agent},
            {title: 'Report Url', value: url},
            {title: 'Resources Load Time', value: `${files.length} file-${resourcesLoadTime}ms`}
        ]
    }

    return (
        <div className={'pb-12'}>
            <Header/>
            <Container>

                <Modal
                    title={modalBody.title}
                    description={modalBody.description}
                    onClose={toggleModel}
                    show={isVisible}
                />

                <TimeBlock
                    onDateSubmit={getAnalyticsBetweenRange}
                    getFromTime={getMinSelectedDate}
                    getToTime={getMaxSelectedDate}
                />


                {analytics.length > 0 ?
                    <Grid lg={2} sm={1} direction={'cols'} gap={4}>
                        {createChart(analytics).map((e, index) =>
                            <Card key={index}>
                                <Flex
                                    layouts={['col', 'col', 'col', 'col']}
                                    justify={['center', 'center', 'center', 'center']}
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
                        <div>
                            <Card>
                                <Text tag="h2" type="cardTitle">Report Summary</Text>

                                {currentReportData()?.map((e, index) =>
                                    <Grid key={index} direction={'cols'} gap={1} lg={2} sm={1}>
                                        <Text tag="p" type="label">{e.title}</Text>
                                        <Text tag="p" type="regular">{e.value}</Text>
                                    </Grid>
                                )}
                            </Card>


                            <Footer
                                rightDisabled={currentReport === analytics.length - 1}
                                leftDisabled={currentReport === 0}
                                onNext={() => setCurrentReport(currentReport + 1)}
                                onPrev={() => setCurrentReport(currentReport - 1)}
                                date={moment(analytics[currentReport]?.measurement_date).format("L")}>
                            </Footer>

                        </div>
                    </Grid>
                    :
                    <Card>
                        <Flex layouts={['col', 'col', 'col', 'col']} justify={['center', 'center', 'center', 'center']} align={['center', 'center', 'center', 'center']}>
                            <Text tag='span' type="cardTitle">Currently there is no performance measurement.</Text>
                            <Text tag='span' type="cardTitle">Please visit link below or search for specific dates using time picker.</Text>
                            <Link target={"_blank"} href={"https://performance-test-app.vercel.app/"}>VISIT TEST APP</Link>
                        </Flex>
                    </Card>
                }
            </Container>
        </div>
    );
}

export default App;
