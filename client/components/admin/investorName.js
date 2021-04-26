import { Fragment, useEffect, useState } from "react";
import useRequest2 from '../../hooks/use-request2';


const InvestorName = ({account}) => {

  const [data2, setData2] = useState([]);

    const { doRequest2, error2, loading2, success2 } = useRequest2({
      url: `/api/surveillance/name/get/${account}`,
      method: 'get',
      body: {},

      onSuccess: (data) => {
        setData2(data);
      },
    });


    useEffect(() => {
     
     
      doRequest2();
    }, []);


  return (
    <Fragment>
      {data2.investor_name}
    </Fragment>
  );
}


export default InvestorName