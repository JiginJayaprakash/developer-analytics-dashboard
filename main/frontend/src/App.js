import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import moment from 'moment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts/BarChart';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { Button } from '@mui/base/Button';
import 'moment/locale/en-gb';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';

const App = () => {
  const styleCard = { width: 170, float: 'right', margin: 1, cursor: 'pointer' };
  const styleTypoHeader = { fontSize: 20, color: "#003399", textAlign: "center" };
  const styleTypoContent = { fontSize: 40, color: "#003399", textAlign: "center" };
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const [filterDatetime, setfilterDatetime] = useState({ 'startDateTime': moment(yesterday), 'endDateTime': moment(today) });
  const [data, setdata] = useState([]);
  const [cardData, setcardData] = useState({ "uniqueUsersCount": 0, "totalCallsCount": 0, "totalFailureCount": 0 });
  const [graphData, setgraphData] = useState([[moment(yesterday).format('DD-MM-YYYY')], [0], [0], [0]]);
  const columns = [
    { field: 'user_id', headerName: 'User Id', width: 100 },
    { field: 'timestamp', headerName: 'Timestamp', width: 200, valueFormatter: params => moment(params?.value).format("DD/MM/YYYY HH:mm") },
    { field: 'status', headerName: 'Status', width: 150, valueFormatter: params => params?.value ? "Success" : "Fail" },
    { field: 'error_message', headerName: 'Error Message', width: 150 },
    { field: 'request', headerName: 'Request', width: 100 },
    { field: 'response', headerName: 'Response', width: 150 },
  ];
  const changeDateFilter = (input) => {
    today = new Date();
    var secondDate = new Date(today);

    switch (input) {
      case 1:
        secondDate.setDate(today.getDate() - 1);
        break;
      case 2:
        secondDate.setDate(today.getDate() - 7);
        break;
      default:
        secondDate.setDate(today.getDate() - 1);

        break;
    }
    setfilterDatetime({ 'startDateTime': moment(secondDate), 'endDateTime': moment(today) });
    applyDateFilter(moment(secondDate), moment(today));
  }

  const applyDateFilter = (start, end) => {
    if (start > end) {
      alert('Start date should be before end date');
      return;
    }

    axios
      .get("/api/search/?page=1&page_size=1000&timestamp__range=" + start.format('YYYY-MM-DDTHH:mm:ss') + "__" + end.format('YYYY-MM-DDTHH:mm:ss'))
      .then((res) => {
        var d = res.data.results;
        if (d != null && d.length > 0) {
          setdata(d);
          var uniqueUsers = d.map(call => call.user_id).filter((user_id, index, array) => {
            return array.indexOf(user_id) === index;
          });
          var failCall = d.filter((call) => {
            return call.status === false;
          });
          setcardData({ "uniqueUsersCount": uniqueUsers.length, "totalCallsCount": d.length, "totalFailureCount": failCall.length })
          var graph = {}
          d.map(call => {
            var momentData = moment(call.timestamp).format('DD-MM-YYYY');
            if (!graph[momentData]) {
              graph[momentData] = { "user": [call.user_id], "successCall": call.status ? 1 : 0, "failCall": call.status ? 0 : 1 };
            }
            else {
              if (call.status) {
                graph[momentData].successCall = graph[momentData].successCall + 1;
              }
              else {
                graph[momentData].failCall = graph[momentData].failCall + 1;
              }
              graph[momentData].user.push(call.user_id);
            }
          });
          var keys = Object.keys(graph)
          var unique = keys.map(function (key) {
            return graph[key].user.map(u => u).filter((user_id, index, array) => {
              return array.indexOf(user_id) === index;
            }).length;

          });
          var sc = keys.map(function (key) { return graph[key].successCall });
          var fc = keys.map(function (key) { return graph[key].failCall });
          setgraphData([keys, unique, sc, fc]);
        }
      })
      .catch((err) => console.log(err));
  }


  useEffect(
    () => {
      applyDateFilter(filterDatetime.startDateTime, filterDatetime.endDateTime);
    },
    []

  );
  return (
    <div>
      <Container maxWidth="100vw" sx={{ position: 'relative' }} >
        <Box sx={{ height: '95vh' }} >
          <Grid container spacing={1}>
            <Grid item xl={2} style={{ display: "flex", gap: "1rem" }}>
              <Card sx={styleCard} >
                <CardContent>
                  <Typography sx={styleTypoHeader} >
                    Unique Users
                  </Typography>
                  <Typography sx={styleTypoContent} >
                    {cardData.uniqueUsersCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={2} style={{ display: "flex", gap: "1rem" }}>
              <Card sx={styleCard}  >
                <CardContent>
                  <Typography sx={styleTypoHeader} >
                    Total calls
                  </Typography>
                  <Typography sx={styleTypoContent} >
                    {cardData.totalCallsCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={2} style={{ display: "flex", gap: "1rem" }}>
              <Card sx={styleCard} >
                <CardContent>
                  <Typography sx={styleTypoHeader}>
                    Total failures
                  </Typography>
                  <Typography sx={styleTypoContent} >
                    {cardData.totalFailureCount}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xl={2}></Grid>
            <Grid item xl={4} style={{ display: "flex", gap: "1rem" }}>
              <Card sx={{ width: 400, float: 'left', margin: 1, cursor: 'pointer' }} >
                <Grid container spacing={1}>
                  <Grid item sm={12}></Grid>
                  <Grid item sm={12} style={{ display: "flex", gap: "1rem" }}>
                    <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
                      <DateTimeField
                        label="Select Start DateTime Range"
                        value={filterDatetime.startDateTime}
                        onChange={(value) => setfilterDatetime({ ...filterDatetime, 'startDateTime': value })}
                      />
                      <DateTimeField
                        label="Select End DateTime Range"
                        value={filterDatetime.endDateTime}
                        onChange={(value) => setfilterDatetime({ ...filterDatetime, 'endDateTime': value })}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item sm={4} style={{ display: "flex", gap: "1rem" }}>
                    <Button onClick={() => changeDateFilter(1)}>Last 24 hours</Button>
                  </Grid>
                  <Grid item sm={4} style={{ display: "flex", gap: "1rem" }}>
                    <Button onClick={() => changeDateFilter(2)}>Last 7 days</Button>
                  </Grid>
                  <Grid item sm={1}></Grid>
                  <Grid item sm={3} style={{ display: "flex", gap: "1rem" }}>
                    <Button onClick={() => applyDateFilter(filterDatetime.startDateTime, filterDatetime.endDateTime)}>Apply</Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xl={36} style={{ display: "flex", gap: "1rem" }}></Grid>
            <Grid item xl={6} style={{ display: "flex", gap: "1rem" }}>
              <DataGrid columns={columns} rows={data}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10 } },
                }}
              />
            </Grid>
            <Grid item xl={6} style={{ display: "flex", gap: "1rem" }}>
              <BarChart
                xAxis={[
                  {
                    id: 'barCategories',
                    data: graphData[0],
                    scaleType: 'band',
                  },
                ]}
                series={[
                  {
                    label: 'success',
                    data: graphData[2],
                    color: '#66CCFF',
                    stack: 'stack1'
                  },
                  { data: graphData[1], label: 'user', color: '#CCFFCC', },
                  { data: graphData[3], label: 'fail', stack: 'stack1', color: '#003399', },
                ]}
                height={600}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div >
  );
}

export default App;
