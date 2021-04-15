import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';
import useRequest4 from '../../../hooks/use-request4';
import useRequest5 from '../../../hooks/use-request5';

import ExportToExcel from '../../../components/user/Exports/ExportToExcelEquityMonthly';
import Router, { useRouter } from 'next/router';
import moment from 'moment';
import Loader from 'react-loader-spinner';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

const Summary = ({ currentUser }) => {
  const [data, setData] = useState({
    securitySymbols: [],
    end: '',
    start: '',
    results: [],
    loading: false,
    searched: false,
  });

  const [search2, setSearch2] = useState(false);

  let Tdeals = 0;
  let TvolumeTrade = 0;
  let TvalueTrade = 0;
  let uusi = 0;

  const [usi, setUsi] = useState([]);

  const [mcapData, setMcapData] = useState([]);
  const [tTtade, setTtrade] = useState([]);

  const { securitySymbols, searched, loading, end, start } = data;

    const { doRequest5, errors5, loading5 } = useRequest5({
      url: `/api/equity/MarketIndexT`,
      method: 'get',
      body: {},

      onSuccess: (data) => {
        setUsi(data);
      },
    });

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/equity/year/summary`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData({
        ...data,
        securitySymbols: data,
      });
    },
  });

  const { doRequest3, errors3, loading3, success3 } = useRequest3({
    url: `/api/equity/year/summary/${start}/${end}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      //  setData({ ...data, results: response, searched: true });

      setTtrade(data);
      setSearch2(true);
    },
  });

  const { doRequest4, errors4, loading4, success4 } = useRequest4({
    url: `/api/equity/year/sum/${start}/${end}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      //  setData({ ...data, results: response, searched: true });

      setMcapData(data);
      setSearch2(true);
    },
  });

  useEffect(() => {
    currentUser === null ? Router.push('/auth/redirect-login') : '';
    
    currentUser && currentUser.status === 'free'
      ? Router.push('/auth/access-denied')
      : '';
    doRequest2();
    doRequest5();
  }, []);

  const cardLoading = () => {
    return (
      <div className="text-center">
        <Loader
          type="Rings"
          color="#00BFFF"
          height={50}
          width={50}
          timeout={1000000}
          //3 secs
        />
      </div>
    );
  };
  const searchData = () => {
    console.log(start, end);
    setData({ ...data, error: false, loading: true });
    Tdeals = 0;
    TvolumeTrade = 0;
    TvalueTrade = 0;
    uusi = 0;

    if (start) {
      doRequest3();
      doRequest4();
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
      searched: false,
    });
    setSearch2(false);
  };

  const datePickerForm = () => {
    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={searchSubmit}>
                  <label>Daterange Picker</label>
                  <div id="dateragne-picker">
                    <div className="input-daterange input-group">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange('start')}
                        placeholder="2021-01-04"
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">to</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange('end')}
                        placeholder="2021-04-01"
                      />
                      <div
                        className="input-group-prepend"
                        style={{ border: 'none' }}
                      >
                        <button className="input-group-text">Search</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const columns = [
    {
      Header: 'SECURITY',
      accessor: 'SECURITY', // String-based value accessors!
    },
    {
      Header: 'SYMBOL',
      accessor: 'SYMBOL', // String-based value accessors!
    },
    {
      Header: 'HIGEST CLOSE',
      accessor: 'MAX_CLOSE_PRICE', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>{parseFloat(props.original.MAX_CLOSE_PRICE).toFixed(2)}</span>
        );
      },
    },
    {
      Header: 'LOWEST CLOSE',
      accessor: 'MIN_CLOSE_PRICE', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>{parseFloat(props.original.MIN_CLOSE_PRICE).toFixed(2)}</span>
        );
      },
    },
    {
      Header: 'DEALS',
      accessor: 'sumDeals', // String-based value accessors!
    },
    {
      Header: 'VOLUME',
      accessor: 'sumVolume', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>
            {props.original.sumVolume.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </span>
        );
      },
    },
    {
      Header: 'VALUE',
      accessor: 'sumValue', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>
            {props.original.sumValue.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </span>
        );
      },
    },
  ];

  const columns2 = [
    {
      Header: 'SECURITY',
      accessor: 'SECURITY', // String-based value accessors!
    },
    {
      Header: 'SYMBOL',
      accessor: 'SYMBOL', // String-based value accessors!
    },
    {
      Header: 'HIGEST CLOSE',
      accessor: 'MAX_CLOSE_PRICE', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>{parseFloat(props.original.MAX_CLOSE_PRICE).toFixed(2)}</span>
        );
      },
    },
    {
      Header: 'LOWEST CLOSE',
      accessor: 'MIN_CLOSE_PRICE', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>{parseFloat(props.original.MIN_CLOSE_PRICE).toFixed(2)}</span>
        );
      },
    },
    {
      Header: 'DEALS',
      accessor: 'sumDeals', // String-based value accessors!
    },
    {
      Header: 'VOLUME',
      accessor: 'sumVolume', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>
            {props.original.sumVolume.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </span>
        );
      },
    },
    {
      Header: 'VALUE',
      accessor: 'sumValue', // String-based value accessors!
      Cell: (props) => {
        return (
          <span>
            {props.original.sumValue.toLocaleString(navigator.language, {
              minimumFractionDigits: 0,
            })}
          </span>
        );
      },
    },
  ];

  const showLoading = () =>
    loading2 && (
      <div className="text-center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000000}
          //3 secs
        />
      </div>
    );

  const showLoading2 = () =>
    loading3 && (
      <div className="text-center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000000}
          //3 secs
        />
      </div>
    );

  const CardOne = () => {
    {
      securitySymbols.map((d, i) => {
        Tdeals += d.sumDeals;
        TvolumeTrade += d.sumVolume;
        TvalueTrade += d.sumValue;
      });
    }
    return (
      <Fragment>
        <div className="nk-block">
          <div className="row g-gs">
            <div className="col-md-2">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle"> Number of Deals</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Total Deals"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {Tdeals ? Tdeals : cardLoading()}{' '}
                    </span>
                    <em style={{ fontSize: '11px' }}>YTD</em>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">Total Volume</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Total Volume"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {TvolumeTrade
                        ? TvolumeTrade.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </span>
                    <em style={{ fontSize: '11px' }}>YTD</em>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">Total Value </h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Total Value"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {' '}
                      {TvalueTrade
                        ? TvalueTrade.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </span>
                    <em style={{ fontSize: '11px' }}>YTD</em>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">USI</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="USI"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount"> {usi.usi}</span>
                    <em style={{ fontSize: '11px' }}>YTD</em>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">Mkt. CAP (BN)</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Mkt. Capitalization (BN)"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {' '}
                      {(usi.capitalisation / 1000000000).toFixed(2)}
                    </span>
                    <em style={{ fontSize: '11px' }}>YTD</em>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const CardTwo = () => {
    {
      tTtade.map((d, i) => {
        Tdeals += d.sumDeals;
        TvolumeTrade += d.sumVolume;
        TvalueTrade += d.sumValue;
      });
    }

    return (
      <Fragment>
        <div className="nk-block">
          <div className="row g-gs">
            <div className="col-md-2">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle"> Number of Deals</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Total Deals"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {Tdeals ? Tdeals : cardLoading()}{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">Total Volume</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Total Volume"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {TvolumeTrade
                        ? TvolumeTrade.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">Total Value </h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Total Value"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {' '}
                      {TvalueTrade
                        ? TvalueTrade.toLocaleString(navigator.language, {
                            minimumFractionDigits: 0,
                          })
                        : cardLoading()}{' '}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">USI</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="USI"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">{usi.usi}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <div className="card card-bordered card-full">
                <div className="card-inner">
                  <div className="card-title-group align-start mb-0">
                    <div className="card-title">
                      <h6 className="subtitle">Mkt. CAP (BN)</h6>
                    </div>
                    <div className="card-tools">
                      <em
                        className="card-hint icon ni ni-help-fill"
                        data-toggle="tooltip"
                        data-placement="left"
                        title="Mkt. Capitalization (BN)"
                      ></em>
                    </div>
                  </div>
                  <div className="card-amount">
                    <span className="amount">
                      {' '}
                      {(usi.capitalisation / 1000000000).toFixed(2)}
                    </span>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

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
                      <div className="nk-block-head nk-block-head-sm">
                        <div className="nk-block-between">
                          <div className="nk-block-head-content">
                            <h3 className="nk-block-title page-title">
                              Monthly Summary Dashboard
                            </h3>
                            <div className="nk-block-des text-soft">
                              <p>Welcome to Monthly Summary Dashboard</p>
                            </div>
                          </div>
                          <div className="nk-block-head-content">
                            <div className="toggle-wrap nk-block-tools-toggle">
                              <a
                                href="#"
                                className="btn btn-icon btn-trigger toggle-expand mr-n1"
                                data-target="pageMenu"
                              >
                                <em className="icon ni ni-more-v"></em>
                              </a>
                              <div
                                className="toggle-expand-content"
                                data-content="pageMenu"
                              >
                                <ul className="nk-block-tools g-3">
                                  <li className="nk-block-tools-opt">
                                    <div className="drodown">
                                      <a
                                        href="#"
                                        className="dropdown-toggle btn btn-icon btn-primary"
                                        data-toggle="dropdown"
                                      >
                                        <em className="icon ni ni-plus"></em>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="link-list-opt no-bdr">
                                          <li>
                                            <a href="#">
                                              <em className="icon ni ni-user-add-fill"></em>
                                              <span>Add User</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <em className="icon ni ni-coin-alt-fill"></em>
                                              <span>Add Order</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <em className="icon ni ni-note-add-fill-c"></em>
                                              <span>Add Page</span>
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {search2 ? CardTwo() : CardOne()}
                      {showLoading()}
                      {showLoading2()}
                      {datePickerForm()}
                      <div className="nk-block-head-content">
                        <div className="nk-block-des text-soft">
                          { start } - {end}
                        </div>
                      </div>

                      <div className="nk-block">
                        <div className="row g-gs">
                          <div className="col-md-12">
                            <div className="card card-bordered card-full">
                              <div className="card-inner">
                                {showLoading()}
                                {showLoading2()}
                                {search2 ? (
                                  <div className="container-fluid mt-3 mb-3">
                                    <ReactTable
                                      data={mcapData}
                                      columns={columns}
                                      filterable
                                      sortable
                                      defaultPageSize={20}
                                      showPaginationTop
                                      noDataText="Please wait Loading...."
                                      showPaginationBottom={false}
                                    >
                                      {(state, filtredData, instance) => {
                                        const reactTable = state.pageRows.map(
                                          (post) => {
                                            return post._original;
                                          }
                                        );
                                        return (
                                          <div>
                                            {filtredData()}
                                            <ExportToExcel post={reactTable} />
                                          </div>
                                        );
                                      }}
                                    </ReactTable>
                                  </div>
                                ) : (
                                  <div className="container-fluid mt-3 mb-3">
                                    <ReactTable
                                      data={securitySymbols}
                                      columns={columns}
                                      filterable
                                      sortable
                                      defaultPageSize={20}
                                      showPaginationTop
                                      noDataText="Please wait Loading...."
                                      showPaginationBottom={false}
                                    >
                                      {(state, filtredData, instance) => {
                                        const reactTable = state.pageRows.map(
                                          (post) => {
                                            return post._original;
                                          }
                                        );
                                        return (
                                          <div>
                                            {filtredData()}
                                            <ExportToExcel post={reactTable} start={start} end={end} />
                                          </div>
                                        );
                                      }}
                                    </ReactTable>
                                  </div>
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
      </body>
    </Fragment>
  );
};

export default Summary;
