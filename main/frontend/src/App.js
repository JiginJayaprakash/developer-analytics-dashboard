import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import moment from 'moment';

const App = () => {
  const [data, setdata] = useState([]);
  useEffect(
    () => {
      axios
        .get("/api/rest/")
        .then((res) => setdata(res.data))
        .catch((err) => console.log(err));
    },
    []
  );
  return (
    <div className="table-responsive">
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
    </div>
  );
}

export default App;
