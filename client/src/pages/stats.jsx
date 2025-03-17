import { useCallback, useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import useMelodiesService from "../services/melodyService";
import { useAuth } from "../contexts/authContext";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Stats = () => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);

  const { getUserMelodies } = useMelodiesService();
  const { user } = useAuth();

  const getData = useCallback( async () => {
    try {
      const res = await getUserMelodies();
      setData(res);

      const melodiesPerDay = {};
      res.forEach(e => {
        const options = { day: "2-digit", month: "short", year: "numeric" };
        const date = new Date(e.createdAt).toLocaleDateString("en-GB", options);
        melodiesPerDay[date] = (melodiesPerDay[date] + 1) || 1;
      });

      const melodyChart = Object.keys(melodiesPerDay).map(date => ({
        day: date,
        numberOfMelodies: melodiesPerDay[date]
      }));
      setChartData(melodyChart);
      console.log(melodyChart)
    } 
    catch (error) {
      console.log('error fetching data', error);
    }
  }, [getUserMelodies]);

  useEffect(() => {
    if(user) {
      getData();
    }
  },[user, getData]);

  if(!data || !user) {
    return (
      <div>fetching data</div>
    );
  }

  return(
    <div className="flex flex-col align-center items-center gap-5">
      <p className="font-bold text-xl mt-5">History</p>
      <DataTable data={data}/>
      <p>melodies per day</p>
      <div className="min-w-4/5" style={{height:'50vh'}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 5,
              right: 50,
              left: 10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="numberOfMelodies" fill="#7d936c" activeBar={<Rectangle fill="#89b46a" stroke="white" />} />
        
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Stats;