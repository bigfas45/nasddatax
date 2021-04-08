import { Fragment, useState, useEffect } from "react"
import useRequest from '../../hooks/use-request';


const MarketDepth = () => {
    const [state, setstate] = useState([]);
  let count = 0;

    const { doRequest, errors, loading } = useRequest({
      url: `/api/equity/orders`,
      method: 'get',
      body: {},

      onSuccess: (data) => {
        setstate(data);
      },
    });
  
  useEffect(() => {
   doRequest();
  }, [])

    const MarketDepth = () => {
      return (
        <Fragment>
          <div className="nk-block nk-block-lg">
            <div className="nk-block-head nk-block-head">
              <div className="nk-block-head-content">
                <h4 className="nk-block-title">OTC Market Depth Report</h4>
                <div className="nk-block-des">
                  <p>
                    Culpa dolor voluptate do laboris laboris irure reprehenderit
                    id incididunt duis pariatur mollit aute magna pariatur
                    consectetur. Eu veniam duis non ut dolor deserunt commodo et
                    minim in quis laboris ipsum velit id veniam. Quis ut
                    consectetur adipisicing
                  </p>
                </div>
              </div>
            </div>
            <div
              className="card card-preview"
              style={{ overflow: 'scroll', height: '300px' }}
            >
              <div className="card-inner">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">orderdate</th>
                      <th scope="col">security</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.map((orders, i) => {
                      count++;
                      return (
                        <tr key={i}>
                          <th scope="row">{count}</th>
                          <td>{orders.orderdate}</td>
                          <td>{orders.security}</td>
                          <td>{orders.Quantity}</td>
                          <td>{parseFloat(orders.Price).toFixed(2)}</td>
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


  return (
    <Fragment>{MarketDepth()}</Fragment>
  )
}

export default MarketDepth;