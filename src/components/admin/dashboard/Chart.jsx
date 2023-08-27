import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}
function compare(a, b) {
  if (a._id < b._id) {
    return 1;
  }
  if (a._id > b._id) {
    return -1;
  }
  return 0;
}
export default function Chart() {
  const theme = useTheme();

  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get('http://localhost:5000/api');
        res.data.sort(compare);
        const result = res.data.filter((_, index) => index < 10);
        setUsers(result);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Map and transform users data for the chart
  const chartData = users.map((user) => createData(user._id, user.cartTotalAmount));

  return (
    <React.Fragment>
      <p  style={{color:'orange',fontSize:'2rem',fontWeight:'700'}}>Today Analysis</p>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
