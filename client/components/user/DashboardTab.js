import { Fragment, useState, useEffect } from 'react';
import useRequest from '../../hooks/use-request';
import useRequest2 from '../../hooks/use-request2';
import useRequest3 from '../../hooks/use-request3';
import useRequest4 from '../../hooks/use-request4';
import useRequest5 from '../../hooks/use-request5';
import moment from 'moment';
import TopTradeByVolume from '../../components/user/TopTradeByVolumeCard'
import TopTradeByValueCard from '../../components/user/TopTradeByValueCard';
import Advancers from '../../components/user/Advancer';
import Decliner from '../../components/user/Decliner';


const DashboardTab = ({ date }) => {

  const [state, setstate] = useState([]);

  const [nisT, setNsiT] = useState([]);
  const [nisT2, setNsiT2] = useState([]);

  const [nisY, setNsnisty] = useState([]);
  // const [date, setDate] = useState([]);


  //   const { doRequest5, errors5, loading5 } = useRequest5({
  //     url: `/api/equity/date`,
  //     method: 'get',
  //     body: {},

  //     onSuccess: (data) => {
  //       setDate(data);
  //     },
  //   });

  const { doRequest3, errors3, loading3 } = useRequest3({
    url: `/api/equity/MarketIndexT`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setNsiT2(data);
    },
  });

  const { doRequest4, errors4, loading4 } = useRequest4({
    url: `/api/equity/MarketIndexT`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setNsiT(data);
    },
  });

  const { doRequest2, errors2, loading2 } = useRequest2({
    url: `/api/equity/MarketIndexY`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setNsnisty(data);
    },
  });

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
    doRequest2();
    doRequest3();
    doRequest4();
  }, []);
  let count = 0;

    const changeUSI = () => {
      const todayrow = nisT2.usi;
      const yesterdayrow = nisY.usi;
      const usiPercentageChange = (
        ((todayrow - yesterdayrow) / yesterdayrow) *
        100
      ).toFixed(2);
      let usiTextChange;
      if (usiPercentageChange > 0) {
        usiTextChange = (
          <span
            style={{
              color: '#07fe00',
              fontWeight: '900',
              fontSize: 'large',
            }}
          >
            &#9650; {usiPercentageChange} %{' '}
          </span>
        );
      } else if (usiPercentageChange < 0) {
        usiTextChange = (
          <span
            style={{
              color: 'red',
              fontWeight: '900',
              fontSize: 'large',
            }}
          >
            &#9660; {usiPercentageChange} %{' '}
          </span>
        );
      } else {
        usiTextChange = (
          <span
            style={{
              color: '#333300',
              fontWeight: '900',
              fontSize: 'large',
            }}
          >
            &#8212; {usiPercentageChange} %{' '}
          </span>
        );
      }
      return <span className="currency currency-nio">{usiTextChange}</span>;
  };
  

  const MarketCapChange = () => {
    const McapRowT = nisT2.capitalisation;
  const McapRowY = nisY.capitalisation;
  const McapPercentageChange = (
    ((McapRowT - McapRowY) / McapRowY) *
    100
  ).toFixed(2);
  let McapTextChange;
  if (McapPercentageChange > 0) {
    McapTextChange = (
      <span
        style={{
          color: '#07fe00',
          fontWeight: '900',
          fontSize: 'large',
        }}
      >
        &#9650; {McapPercentageChange} %{' '}
      </span>
    );
  } else if (McapPercentageChange < 0) {
    McapTextChange = (
      <span
        style={{
          color: 'red',
          fontWeight: '900',
          fontSize: 'large',
        }}
      >
        &#9660; {McapPercentageChange} %{' '}
      </span>
    );
  } else {
    McapTextChange = (
      <span
        style={{
          color: '#333300',
          fontWeight: '900',
          fontSize: 'large',
        }}
      >
        &#8212; {McapPercentageChange} %{' '}
      </span>
    );
  }
    return <span className="currency currency-nio">{McapTextChange}</span>;
  }
  
  const volumeChange = () => {
    const McapRowT = nisT2.volume;
    const McapRowY = nisY.volume;
    const McapPercentageChange = (
      ((McapRowT - McapRowY) / McapRowY) *
      100
    ).toFixed(2);
    let McapTextChange;
    if (McapPercentageChange > 0) {
      McapTextChange = (
        <span
          style={{
            color: '#07fe00',
            fontWeight: '900',
            fontSize: 'large',
          }}
        >
          &#9650; {McapPercentageChange} %{' '}
        </span>
      );
    } else if (McapPercentageChange < 0) {
      McapTextChange = (
        <span
          style={{
            color: 'red',
            fontWeight: '900',
            fontSize: 'large',
          }}
        >
          &#9660; {McapPercentageChange} %{' '}
        </span>
      );
    } else {
      McapTextChange = (
        <span
          style={{
            color: '#333300',
            fontWeight: '900',
            fontSize: 'large',
          }}
        >
          &#8212; {McapPercentageChange} %{' '}
        </span>
      );
    }
    return <span className="currency currency-nio">{McapTextChange}</span>;
  }


    const valueChange = () => {
      const McapRowT = nisT2.value;
      const McapRowY = nisY.value;
      const McapPercentageChange = (
        ((McapRowT - McapRowY) / McapRowY) *
        100
      ).toFixed(2);
      let McapTextChange;
      if (McapPercentageChange > 0) {
        McapTextChange = (
          <span
            style={{
              color: '#07fe00',
              fontWeight: '900',
              fontSize: 'large',
            }}
          >
            &#9650; {McapPercentageChange} %{' '}
          </span>
        );
      } else if (McapPercentageChange < 0) {
        McapTextChange = (
          <span
            style={{
              color: 'red',
              fontWeight: '900',
              fontSize: 'large',
            }}
          >
            &#9660; {McapPercentageChange} %{' '}
          </span>
        );
      } else {
        McapTextChange = (
          <span
            style={{
              color: '#333300',
              fontWeight: '900',
              fontSize: 'large',
            }}
          >
            &#8212; {McapPercentageChange} %{' '}
          </span>
        );
      }
      return <span className="currency currency-nio">{McapTextChange}</span>;
  };
  

   const dealsChange = () => {
     const McapRowT = nisT2.deals;
     const McapRowY = nisY.deals;
     const McapPercentageChange = (
       ((McapRowT - McapRowY) / McapRowY) *
       100
     ).toFixed(2);
     let McapTextChange;
     if (McapPercentageChange > 0) {
       McapTextChange = (
         <span
           style={{
             color: '#07fe00',
             fontWeight: '900',
             fontSize: 'large',
           }}
         >
           &#9650; {McapPercentageChange} %{' '}
         </span>
       );
     } else if (McapPercentageChange < 0) {
       McapTextChange = (
         <span
           style={{
             color: 'red',
             fontWeight: '900',
             fontSize: 'large',
           }}
         >
           &#9660; {McapPercentageChange} %{' '}
         </span>
       );
     } else {
       McapTextChange = (
         <span
           style={{
             color: '#333300',
             fontWeight: '900',
             fontSize: 'large',
           }}
         >
           &#8212; {McapPercentageChange} %{' '}
         </span>
       );
     }
     return <span className="currency currency-nio">{McapTextChange}</span>;
   };


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
                    <th scope="col">TimeinForce</th>
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
                        <td>{orders.Price}</td>
                        <td>{orders.TimeinForce}</td>
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

  const Otc = () => {
    return (
      <Fragment>
        <div className="nk-block nk-block-lg">
          <div className="nk-block-head nk-block-head">
            <div className="nk-block-head-content">
              <h4 className="nk-block-title">
                MARKET STATS AS AT  {moment(date.Date).format('LL')}
              </h4>
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
          <div className="card card-preview">
            <div className="card-inner">
              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col">Parameter</th>
                    <th scope="col">Current</th>
                    <th scope="col">Change</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>NSI</td>
                    <td>
                      <strong>{nisT.usi}</strong>
                    </td>
                    <td>{changeUSI()}</td>
                  </tr>
                  <tr>
                    <td>Mkt. Capitalization (BN)</td>
                    <td>
                      <strong>
                        {(nisT.capitalisation / 1000000000).toFixed(2)}
                      </strong>
                    </td>
                    <td>{MarketCapChange()}</td>
                  </tr>
                  <tr>
                    <td>Volume Traded</td>
                    <td>
                      <strong>{nisT.volume}</strong>
                    </td>
                    <td>{volumeChange()}</td>
                  </tr>
                  <tr>
                    <td>Value Traded</td>
                    <td>
                      <strong>{nisT.value}</strong>
                    </td>
                    <td>{valueChange()}</td>
                  </tr>
                  <tr>
                    <td>Deals Executed</td>
                    <td>{nisT.deals}</td>
                    <td>{dealsChange()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };



  return (
    <Fragment>
      <div className="nk-content nk-content-fluid">
        <div className="container-xl wide-lg">
          <div className="nk-content-body">
            <div className="components-preview wide-mx mx-auto">
              <div className="nk-block nk-block-lg">
                <div className="card card-preview">
                  <div className="card-inner">
                    <ul className="nav nav-tabs mt-n3">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#tabItem1"
                        >
                          Market Depth
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tabItem2"
                        >
                          OTC Snapshot
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tabItem3"
                        >
                          Top Trades By Volume(YTD)
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tabItem4"
                        >
                          Top Trades By Value(YTD)
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tabItem5"
                        >
                          Advancers
                        </a>
                      </li>

                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#tabItem6"
                        >
                          Decliner
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div className="tab-pane active" id="tabItem1">
                        {MarketDepth()}
                      </div>
                      <div className="tab-pane" id="tabItem2">
                        {Otc()}
                      </div>
                      <div className="tab-pane" id="tabItem3">
                        <TopTradeByVolume />
                      </div>
                      <div className="tab-pane" id="tabItem4">
                        <TopTradeByValueCard />
                      </div>
                      <div className="tab-pane" id="tabItem5">
                        <Advancers date={date} />
                      </div>

                      <div className="tab-pane" id="tabItem6">

                        <Decliner date={date} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};




export default DashboardTab;
