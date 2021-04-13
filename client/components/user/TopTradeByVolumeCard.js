
import { useState, Fragment, React, useEffect } from 'react';
import useRequest5 from '../../hooks/use-request5';


const TopTradeByVolume = () => {
      
   const [data, setData] = useState([]);

   const { doRequest5, errors5, loading5 } = useRequest5({
     url: `/api/equity/volume`,
     method: 'get',
     body: {},

     onSuccess: (data) => {
       setData(data);
     },
   });
  
    useEffect(() => {
     
      doRequest5();
    }, []);
    return (
      <Fragment>
        <div className="nk-block nk-block-lg">
          <div className="nk-block-head nk-block-head">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">Top Trades By Volume(YTD)</h4>
              <div className="nk-block-des">
               
              </div>
            </div>
          </div>
          <div className="card card-preview">
            <div className="card-inner">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Symbol</th>
                    <th scope="col">Volume</th>
                    <th scope="col">Value(₦)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((volume, i) => {
                    return (
                      <tr key={i}>
                        <td>{volume.SYMBOL}</td>
                        <td>{volume.Volume}</td>
                        <td>
                          {volume.Value.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })}
                          
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
};
  
export default TopTradeByVolume
