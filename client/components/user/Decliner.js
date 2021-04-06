import { useState, Fragment, React, useEffect } from 'react';
import useRequest5 from '../../hooks/use-request5';
import useRequest3 from '../../hooks/use-request3';
import moment from 'moment';

const Decliner = ({ date }) => {
  const [data, setData] = useState([]);

  const { doRequest3, errors3, loading3 } = useRequest3({
    url: `/api/equity/inbox/${date}/${date}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData(data);
    },
  });
  useEffect(() => {
    doRequest3();
  }, []);

  return (
    <Fragment>
      <div className="nk-block nk-block-lg">
        <div className="nk-block-head nk-block-head">
          <div className="nk-block-head-content">
            <h4 className="nk-block-title">Decliner</h4>
            <div className="nk-block-des">
              <p>
                Culpa dolor voluptate do laboris laboris irure reprehenderit id
                incididunt duis pariatur mollit aute magna pariatur consectetur.
                Eu veniam duis non ut dolor deserunt commodo et minim in quis
                laboris ipsum velit id veniam. Quis ut consectetur adipisicing
              </p>
            </div>
          </div>
        </div>
        <div className="card card-preview">
          <div className="card-inner">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col">Security</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Last Close Price</th>
                  <th scope="col">Current Price (₦)</th>
                  <th scope="col">Change (₦)</th>
                  <th scope="col">% Change</th>
                </tr>
              </thead>
              <tbody>
                {data.map((advancer, i) => {
                  let change = advancer.CLOSE_PRICE - advancer.refprice;
                  let percentage = (change / advancer.CLOSE_PRICE) * 100;

                  let changeText;

                  if (change < 0) {
                    if (change < 0) {
                      changeText = (
                        <span style={{ fontSize: '15px', color: 'green' }}>
                          &uarr;{' '}
                        </span>
                      );
                    }

                    return (
                      <tr key={i}>
                        <td> {advancer.SECURITY} </td>
                        <td> {advancer.SYMBOL}</td>
                        <td> {advancer.refprice}</td>
                        <td> {advancer.CLOSE_PRICE}</td>

                        <td>{parseFloat(change).toFixed(2)}</td>
                        <td>{percentage.toFixed(2)}</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Decliner;
