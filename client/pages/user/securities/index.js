import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest from '../../../hooks/use-request';
import useRequest1 from '../../../hooks/use-request-post';

import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';
import useRequest4 from '../../../hooks/use-request4';
import useRequest5 from '../../../hooks/use-request5';
import useRequest6 from '../../../hooks/use-request6';
import Router, { useRouter } from 'next/router';
import highchart from '../../../components/highchart.css';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
var strtotime = require('strtotime');
import Loader from 'react-loader-spinner';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import ExportToExcel from '../../../components/user/Exports/ExportToExcel';
import moment from 'moment';
import MarketDepth from '../../../components/user/Market-depth'

const Securities = ({ currentUser }) => {
  const [data, setData] = useState({
    securitySymbols: [],
    symbols: '',
    search: '',
    results: [],
    loadingN: false,
    searched: false,
  });
  const {
    securitySymbols,
    symbols,
    search,
    results,
    searched,
    loadingN,
  } = data;

  const [dataC, setDataChart] = useState([]);
  const [SecTrade, setSecTrade] = useState([]);
  const [SecMcap, setSecMcap] = useState([]);
  const [tTtade, setTtrade] = useState([]);
  const [tVolume, setTvolume] = useState([]);
    const [tValue, setTvalue] = useState([]);

  // fetching data for security symbols
  const { doRequest, errors, loading } = useRequest({
    url: `/api/securities/symbol`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData({ ...data, securitySymbols: data });
    },
  });

  // fetching data for price and volume chart
  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/securities/trades/${symbols}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setDataChart(data);
    },
  });

  // fetching data for security trade
  const { doRequest3, errors3, loading3, success3 } = useRequest3({
    url: `/api/securities/trades/${symbols}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setSecTrade(data);
    },
  });

  // fetching data for security marketcap
  const { doRequest4, errors4, loading4, success4 } = useRequest4({
    url: `/api/securities/mcap/${symbols}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setSecMcap(data);
    },
  });

  // fetching data for security Total trades
  const { doRequest5, errors5, loading5, success5 } = useRequest5({
    url: `/api/securities/trades/sum/${symbols}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setTtrade(data);
    },
  });

  // fetching data for security Total volume traded
  const { doRequest6, errors6, loading6, success6 } = useRequest6({
    url: `/api/securities/trades/volume/${symbols}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setTvolume(data);
    },
  });

  // fetching data for security Total value traded
  const { doRequest1, errors1, loading1 } = useRequest1({
    url: `/api/securities/trades/value/${symbols}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setTvalue(data);
    },
  });

  useEffect(() => {
    
    currentUser && currentUser.status === 'free'
      ? Router.push('/auth/access-denied')
      : '';
    doRequest();
  }, []);

  const searchData = () => {
    setData({ ...data, error: false, loading: true });
    doRequest2();
    doRequest3();
    doRequest4();
    doRequest5();
    doRequest6();
    doRequest1();
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group" style={{ height: '10%' }}>
            <div className="input-group-prepend">
              <select className="btn mr-2" onChange={handleChange('symbols')}>
                <option value="All">Pick Security Symbol</option>
                {securitySymbols.map((s, i) => (
                  <option key={i} value={s.symbol}>
                    {s.securityName}
                  </option>
                ))}
              </select>
            </div>
            {/* <input
              type="search"
              className="form-control"
              placeholder="Search by name"
              onChange={handleChange('search')}
            ></input> */}
          </div>
          <div className="input-group-prepend" style={{ border: 'none' }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  };

  // Highchart data

  var dataChart = [];

  for (var j = 0; j < dataC.length; j++) {
    var presentdate = dataC[j].DATE;
    presentdate = strtotime(presentdate);
    presentdate *= 1000;
    var colseprice = dataC[j].CLOSE_PRICE;
    var volume = dataC[j].VOLUME;
    dataChart.push([presentdate, colseprice, volume]);
  }

  var price = [],
    volume = [],
    dataLength = dataChart.length,
    groupingUnits = [
      [
        'week', // unit name
        [1], // allowed multiples
      ],
      ['month', [1, 2, 3, 4, 6]],
    ],
    i = 0;

  for (i; i < dataLength; i += 1) {
    price.push([
      dataChart[i][0], // the date
      dataChart[i][1], // open
    ]);

    volume.push([
      dataChart[i][0], // the date
      dataChart[i][2], // the volume
    ]);
  }
  const options = {
    rangeSelector: {
      selected: 2,
    },

    title: {
      text: 'Securities Historical',
    },

    yAxis: [
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'PRICE',
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: 'Volume',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
    ],

    chart: {
      height: 37 + '%',
      styledMode: true,
    },

    series: [
      {
        type: '',
        name: 'CLOSE PRICE',
        data: price,
        dataGrouping: {
          units: groupingUnits,
        },
      },
      {
        type: 'column',
        name: 'VOLUMES',
        data: volume,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits,
        },
      },
    ],
  };

  const showLoading = () =>
    loading2 && (
      <div className="text-center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000000} //3 secs
        />
      </div>
    );

  const columns = [
    {
      Header: 'DATE',
      accessor: 'DATE', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>{moment.utc(props.original.DATE).format('YYYY-MM-DD')}</span>
        );
      },
    },

    {
      Header: 'SYMBOL',
      accessor: 'SYMBOL', // String-based value accessors!
    },
    {
      Header: 'OPEN PRICE',
      accessor: 'open', // String-based value accessors!
      Cell: (props) => {
        return <span>{parseFloat(props.original.open).toFixed(2)}</span>;
      },
    },
    {
      Header: 'CLOSE_PRICE',
      accessor: 'CLOSE_PRICE', // String-based value accessors!
      Cell: (props) => {
        return <span>{parseFloat(props.original.CLOSE_PRICE).toFixed(2)}</span>;
      },
    },
    {
      Header: 'DEALS',
      accessor: 'DEALS', // String-based value accessors!
    },
    {
      Header: 'VOLUME',
      accessor: 'VOLUME', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>
            {props.original.VOLUME.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </span>
        );
      },
    },
    {
      Header: 'VALUE',
      accessor: 'VALUE', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>
            {props.original.VALUE.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </span>
        );
      },
    },
  ];

  return (
    <Fragment>
      <Layout title="User Dashboard | NASD Data Portal" description="" />
      <body className="nk-body npc-crypto bg-white has-sidebar ">
        <div className="nk-app-root">
          <div className="nk-main ">
            <SiderBar />
            <div className="nk-wrap ">
              <Header currentUser={currentUser} />
              <div className="nk-content nk-content-fluid">
                <Ticker />

                <div className="nk-content nk-content-fluid">
                  <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                      <div className="components-preview wide-md mx-auto">
                        <div className="nk-block-head nk-block-head-lg wide-sm">
                          <div className="nk-block-head-content">
                            <div className="nk-block-head-sub">
                              <a className="back-to" href="/user/inbox">
                                <em className="icon ni ni-arrow-left"></em>
                                <span>Inbox</span>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="nk-block nk-block-lg">
                          <div className="card card-preview">
                            <div className="card-inner">
                              <div className="preview-block">
                                <span className="preview-title-lg overline-title">
                                  Security Preview
                                </span>
                                <div className="row gy-6">
                                  <div className="col-sm-12">
                                    <div className="form-group">
                                      {searchForm()}
                                    </div>
                                  </div>
                                </div>

                                <hr className="preview-hr" />
                                <span className="preview-title-lg overline-title">
                                  {symbols ? symbols : 'Symbol'}
                                  {showLoading()}
                                </span>
                                {success4 ? (
                                  <div class="row g-2">
                                    {SecMcap.map((smcap, i) => {
                                      return (
                                        <Fragment>
                                          <div key={i} class="col-sm-3">
                                            <div class="card bg-light">
                                              <div class="nk-wgw sm">
                                                <div class="nk-wgw-name">
                                                  <div class="nk-wgw-icon">
                                                    <em class="icon ni ni-sign-btc"></em>
                                                  </div>
                                                  <h5 class="nk-wgw-title title">
                                                    MarketCap(₦)
                                                  </h5>
                                                </div>
                                                <div class="nk-wgw-balance">
                                                  <div class="amount">
                                                    {smcap.mcap.toLocaleString(
                                                      navigator.language,
                                                      {
                                                        minimumFractionDigits: 0,
                                                      }
                                                    )}
                                                    <span class="currency currency-nio">
                                                      MCAP
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Fragment>
                                      );
                                    })}

                                    {tTtade.map((sums, i) => {
                                      return (
                                        <Fragment>
                                          <div key={i} class="col-sm-3">
                                            <div class="card bg-light">
                                              <div class="nk-wgw sm">
                                                <div class="nk-wgw-name">
                                                  <div class="nk-wgw-icon">
                                                    <em class="icon ni ni-sign-btc"></em>
                                                  </div>
                                                  <h5 class="nk-wgw-title title">
                                                    Total Deals
                                                  </h5>
                                                </div>
                                                <div class="nk-wgw-balance">
                                                  <div class="amount">
                                                    {sums.sumOfDeals.toLocaleString(
                                                      navigator.language,
                                                      {
                                                        minimumFractionDigits: 0,
                                                      }
                                                    )}

                                                    <span class="currency currency-nio">
                                                      Deals
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Fragment>
                                      );
                                    })}

                                    {tVolume.map((volume, i) => {
                                      return (
                                        <Fragment>
                                          <div key={i} class="col-sm-3">
                                            <div class="card bg-light">
                                              <div class="nk-wgw sm">
                                                <div class="nk-wgw-name">
                                                  <div class="nk-wgw-icon">
                                                    <em class="icon ni ni-sign-btc"></em>
                                                  </div>
                                                  <h5 class="nk-wgw-title title">
                                                    Volume Traded
                                                  </h5>
                                                </div>
                                                <div class="nk-wgw-balance">
                                                  <div class="amount">
                                                    {volume.sumOfVolumes.toLocaleString(
                                                      navigator.language,
                                                      {
                                                        minimumFractionDigits: 0,
                                                      }
                                                    )}
                                                    <span class="currency currency-nio">
                                                      Volume
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Fragment>
                                      );
                                    })}

                                    {tValue.map((value, i) => {
                                      return (
                                        <Fragment>
                                          <div key={i} class="col-sm-3">
                                            <div class="card bg-light">
                                              <div class="nk-wgw sm">
                                                <div class="nk-wgw-name">
                                                  <div class="nk-wgw-icon">
                                                    <em class="icon ni ni-sign-btc"></em>
                                                  </div>
                                                  <h5 class="nk-wgw-title title">
                                                    Value Traded
                                                  </h5>
                                                </div>
                                                <div class="nk-wgw-balance">
                                                  <div class="amount">
                                                    {value.sumOfValues.toLocaleString(
                                                      navigator.language,
                                                      {
                                                        minimumFractionDigits: 0,
                                                      }
                                                    )}
                                                    <span class="currency currency-nio">
                                                      Value
                                                    </span>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Fragment>
                                      );
                                    })}
                                  </div>
                                ) : (
                                  ''
                                )}

                                <hr className="preview-hr" />
{/* 
                                <MarketDepth />

                                <hr className="preview-hr" /> */}

                                <span className="preview-title-lg overline-title">
                                  Price chart
                                  {showLoading()}
                                </span>
                                <div className="row gy-4">
                                  <div className="col-sm-12">
                                    {success ? (
                                      <div
                                        style={{
                                          borderTop: '50px soild #FFFFFF',
                                        }}
                                      >
                                        <HighchartsReact
                                          highcharts={Highcharts}
                                          constructorType={'stockChart'}
                                          options={options}
                                        />
                                      </div>
                                    ) : (
                                      ''
                                    )}

                                    <hr className="preview-hr" />
                                    <span className="preview-title-lg overline-title">
                                      Securitiy Trade
                                      {showLoading()}
                                    </span>
                                    <div className="row gy-4">
                                      <div className="col-sm-12">
                                        {success3 ? (
                                          <div className="container-fluid mt-3 mb-3">
                                            <ReactTable
                                              data={SecTrade}
                                              columns={columns}
                                              filterable
                                              sortable
                                              defaultPageSize={10}
                                              showPaginationTop
                                              showPaginationBottom={false}
                                            >
                                              {(
                                                state,
                                                filtredData,
                                                instance
                                              ) => {
                                                const reactTable = state.pageRows.map(
                                                  (post) => {
                                                    return post._original;
                                                  }
                                                );
                                                return (
                                                  <div>
                                                    {filtredData()}
                                                    <ExportToExcel
                                                      post={reactTable}
                                                    />
                                                  </div>
                                                );
                                              }}
                                            </ReactTable>
                                          </div>
                                        ) : (
                                          ''
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </Fragment>
  );
};

export default Securities;
