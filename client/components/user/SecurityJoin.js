import { Fragment } from "react"
import useRequest from '../../hooks/use-request';


const SecurityJoin = ({date, sym}) => {
  const [data, setData] = useState([]);
  
    const { doRequest, errors, loading } = useRequest({
      url: `/api/securities/join/${date}/${sym}`,
      method: 'get',
      body: {},

      onSuccess: (data) => {
        setRates(data);
      },
    });

  
    useEffect(() => {
      doRequest();
     
    }, []);
  return (
    <Fragment>
      {data.close}
    </Fragment>
  )
}

export default SecurityJoin