import { useCallback, useEffect, useState } from "react";
import DataTable from "../components/DataTable";
import useMelodiesService from "../services/melodyService";
import { useAuth } from "../contexts/authContext";


const Stats = () => {
  const [data, setData] = useState(null);

  const { getUserMelodies } = useMelodiesService();
  const { user } = useAuth();

  const getData = useCallback( async () => {
    try {
      const res = await getUserMelodies();
      setData(res);
      console.log(res) 
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
    <>
      <div onClick={() => {getData()}}>stats page</div>
      <DataTable data={data}/>
    </>
  );
}

export default Stats;