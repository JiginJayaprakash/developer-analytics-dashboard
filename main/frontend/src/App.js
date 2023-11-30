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
import Stack from '@mui/material/Stack';
import 'moment/locale/en-gb';

const App = () => {
  const styleCard = { width: 170, float: 'left', margin: 1, cursor: 'pointer' };
  const styleTypoHeader = { fontSize: 20, color: "#003399", textAlign: "center" };
  const styleTypoContent = { fontSize: 40, color: "#003399", textAlign: "center" };
  var today = new Date();
  var yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const [filterDatetime, setfilterDatetime] = useState({ 'startDateTime': moment(yesterday), 'endDateTime': moment(today) });
  const [data, setdata] = useState([]);
  const [showFilter, setshowFilter] = useState(true);
  const [cardData, setcardData] = useState({ "uniqueUsersCount": 0, "totalCallsCount": 0, "totalFailureCount": 0 });
  const filterText = 'click here to toggle filter'
  const styleDate = { color: "#FFFFFF" }
  const [graphData, setgraphData] = useState([["test1", "test2"], [1, 2], [1, 2], [1, 2]]);
  const changeFilterClick = () => {
    setshowFilter(!showFilter);
  }
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
      .get("/api/search/?timestamp__range=" + start.format('YYYY-MM-DDTHH:mm:ss') + "__" + end.format('YYYY-MM-DDTHH:mm:ss'))
      .then((res) => {
        setdata(res.data);
        var uniqueUsers = res.data.map(call => call.user_id).filter((user_id, index, array) => {
          return array.indexOf(user_id) === index;
        });
        var failCall = res.data.filter((call) => {
          return call.status === false;
        });
        setcardData({ "uniqueUsersCount": uniqueUsers.length, "totalCallsCount": res.data.length, "totalFailureCount": failCall.length })
        var graph = {}
        res.data.map(call => {
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

      })
      .catch((err) => console.log(err));
  }


  useEffect(
    () => {

    },
    []
  );
  return (
    <div>
      <Container sx={{ position: 'fixed', width: "300px", display: showFilter ? 'block' : "none", zIndex: 1 }} className='filter' >
        <Box sx={{ height: '100vh' }} >
          <Stack spacing={1} direction="column">
            <Button onClick={() => changeDateFilter(1)}>Last 24 hours</Button>
            <Button onClick={() => changeDateFilter(2)}>Last 7 days</Button>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
              <DateTimeField sx={styleDate}
                label="Select Start DateTime Range"
                value={filterDatetime.startDateTime}
                onChange={(value) => setfilterDatetime({ ...filterDatetime, 'startDateTime': value })}
              />
              <DateTimeField sx={styleDate}
                label="Select End DateTime Range"
                value={filterDatetime.endDateTime}
                onChange={(value) => setfilterDatetime({ ...filterDatetime, 'endDateTime': value })}
              />
            </LocalizationProvider>
            <Button onClick={() => applyDateFilter(filterDatetime.startDateTime, filterDatetime.endDateTime)}>Apply</Button>
          </Stack>
        </Box>
      </Container>
      <Container maxWidth="100vw" sx={{ position: 'relative' }} >
        <Box sx={{ height: '100vh' }} >
          <Card onClick={changeFilterClick} sx={styleCard} title={filterText}>
            <CardContent>
              <Typography sx={styleTypoHeader} >
                Unique Users
              </Typography>
              <Typography sx={styleTypoContent} >
                {cardData.uniqueUsersCount}
              </Typography>
            </CardContent>
          </Card>
          <Card onClick={changeFilterClick} sx={styleCard} title={filterText} >
            <CardContent>
              <Typography sx={styleTypoHeader} >
                Total calls
              </Typography>
              <Typography sx={styleTypoContent} >
                {cardData.totalCallsCount}
              </Typography>
            </CardContent>
          </Card>
          <Card onClick={changeFilterClick} sx={styleCard} title={filterText}>
            <CardContent>
              <Typography sx={styleTypoHeader}>
                Total failures
              </Typography>
              <Typography sx={styleTypoContent} >
                {cardData.totalFailureCount}
              </Typography>
            </CardContent>
          </Card>

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
                label:'success',
                  data: graphData[2],
          color: '#66CCFF',
          stack: 'stack1'
              },
              { data: graphData[1], label: 'user' , color: '#003399',},
              { data: graphData[3], label: 'fail', stack: 'stack1', color: '#003399', },
            ]}
          height={350}
          />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">User ID</th>
                <th scope="col">Timestamp</th>
                <th scope="col">Status: Success or failure</th>
                <th scope="col">Error message</th>
                <th scope="col">Request</th>
                <th scope="col">Response</th>
              </tr>
            </thead>
            <tbody>
              {data.map((e) => {
                return (<tr>
                  <td>{e.user_id}</td>
                  <td>{moment(e.timestamp).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  <td>{e.status === true ? "Success" : "Fail"}</td>
                  <td>{e.error_message}</td>
                  <td>{e.request}</td>
                  <td>{e.response}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </Box>
      </Container>
    </div>
  );
}

export default App;
