import {useEffect, useState} from "react";
import {Card, Container, Flex, Link, Grid, Header, Text, TimeBlock, Footer, Modal, Chart} from "./components";
import {axiosInstance} from "./utils/axios";
import useModal from "./hooks/useModal";
import {parseDates} from "./helpers/date";

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
                description: "Date selection is required for specific date records!"
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
        const labels = data.map((e) => parseDates(e.measurement_date));
        return [
            {title: 'TTFB', set: data.map((e) => e.ttfbTime), labels},
            {title: 'FCP', set: data.map((e) => e.fcpTime), labels},
            {title: 'DOM LOAD TIME', set: data.map((e) => e.domLoadTime), labels},
            {title: 'WINDOW LOAD TIME', set: data.map((e) => e.windowLoadTime), labels},
        ]
    }
    const currentReportData = () => {
        const {measurement_date, user_agent, url, resourcesLoadTime, files} = analytics[currentReport];

        return [
            {title: 'Report Date', value: parseDates(measurement_date)},
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
                    content={modalBody}
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
                        {createChart(analytics).map((report, index) =>
                            <Card key={index}>
                                <Flex layouts={['col', 'col', 'col', 'col']} justify={['center', 'center', 'center', 'center']} align={['center', 'center', 'center', 'center']}>
                                    <Text tag='h2' type='cardTitle'>{report.title}</Text>
                                    <Chart loading={loader} type={'line'} border={'#000000'} background={'#009aff'} label={"ms"} dataList={report}>
                                    </Chart>
                                </Flex>
                            </Card>)
                        }
                        <div>
                            <Card>
                                <Text tag="h2" type="cardTitle">Report Summary</Text>

                                {currentReportData()?.map((report, index) =>
                                    <Grid key={index} direction={'cols'} gap={1} lg={2} sm={1}>
                                        <Text tag="p" type="label">{report.title}</Text>
                                        <Text tag="p" type="regular">{report.value}</Text>
                                    </Grid>
                                )}
                            </Card>


                            <Footer
                                rightDisabled={currentReport === analytics.length - 1}
                                leftDisabled={currentReport === 0}
                                onNext={() => setCurrentReport(currentReport + 1)}
                                onPrev={() => setCurrentReport(currentReport - 1)}
                                date={parseDates(analytics[currentReport]?.measurement_date)}>
                            </Footer>

                        </div>
                    </Grid>
                    :
                    <Card>
                        <Flex layouts={['col', 'col', 'col', 'col']} justify={['center', 'center', 'center', 'center']}
                              align={['center', 'center', 'center', 'center']}>
                            <Text tag='span' type="cardTitle">Currently there is no performance measurement.</Text>
                            <Text tag='span' type="cardTitle">Please visit link below or search for specific dates using
                                time picker.</Text>
                            <Link target={"_blank"} href={"https://performance-test-app.vercel.app/"}>VISIT TEST
                                APP</Link>
                        </Flex>
                    </Card>
                }
            </Container>
        </div>
    );
}

export default App;
