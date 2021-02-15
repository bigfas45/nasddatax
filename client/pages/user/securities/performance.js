import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest from '../../../hooks/use-request';
import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';
import ExportToExcelSecPerformance from '../../../components/user/Exports/ExportToExcelSecPerformance';
import Router, { useRouter } from 'next/router';

const Performance = ({currentUser}) => {
  const [data, setData] = useState({
    end: '',
    start: '',
  });
  const [dataStartDate, setStartDate] = useState([]);
  const [dataEndDate, setEndDate] = useState([]);
  const [dataEndDateSecurity, setEndDateSecurity] = useState([]);

  let endUsiDate,
    endMapDate,
    startUsiDate,
    startMapDate,
    endPercentChnage,
    txtChange,
    startPercentageChange,
    txtChangeMCap,
    test;

  const { end, start } = data;

  const { doRequest, errors, loading } = useRequest({
    url: `/api/securities/performanceStart/${start}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setStartDate(data);
    },
  });

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/securities/performanceEnd/${end}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setEndDate(data);
    },
  });

  const { doRequest3, errors3, loading3, success3 } = useRequest3({
    url: `/api/securities/performance/${start}/${end}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setEndDateSecurity(data);
    },
  });

  useEffect(() => {
   currentUser && currentUser.status === 'free'
     ? Router.push('/auth/access-denied')
     : '';
  }, [])

  const searchData = () => {
    console.log(end, start);
    doRequest();
    doRequest2();
    doRequest3();
  };

  const searchSubmit = (e) => {
    e.preventDefault();

    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const datePickerForm = () => {
    return (
      <Fragment>
        <div className="nk-block nk-block-lg">
          <div className="nk-block-head">
            <div className="nk-block-head-content">
              <h4 className="title nk-block-title">Date Picker</h4>
            </div>
          </div>

          <div className="card card-preview">
            <div className="card-inner">
              <form onSubmit={searchSubmit}>
                <div className="row gy-4">
                  <div id="dateragne-picker">
                    <div class="input-daterange input-group">
                      <input
                        type="text"
                        class="form-control"
                        onChange={handleChange('start')}
                        placeholder="yyyy-mm-dd"
                      />
                      <div class="input-group-prepend">
                        <span class="input-group-text">to</span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        onChange={handleChange('end')}
                        placeholder="yyyy-mm-dd"
                      />

                      <div
                        className="input-group-prepend"
                        style={{ border: 'none' }}
                      >
                        <button className="input-group-text">Search</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
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
              <Header />

              <div className="nk-content nk-content-fluid">
                <Ticker />
                <div className="container-xl wide-lg">
                  <div className="nk-content-body">
                    <div className="nk-block-head nk-block-head-sm">
                      <div className="nk-block-between">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">
                            Security Analytics
                          </h3>
                          <div className="nk-block-des text-soft">
                            <p>Welcome to Analytics Dashboard.</p>
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
                                <li>
                                  <div className="drodown">
                                    <a
                                      href="#"
                                      className="dropdown-toggle btn btn-white btn-dim btn-outline-light"
                                      data-toggle="dropdown"
                                    >
                                      <em className="d-none d-sm-inline icon ni ni-calender-date"></em>
                                      <span>
                                        <span className="d-none d-md-inline">
                                          Last
                                        </span>{' '}
                                        30 Days
                                      </span>
                                      <em className="dd-indc icon ni ni-chevron-right"></em>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right">
                                      <ul className="link-list-opt no-bdr">
                                        <li>
                                          <a href="#">
                                            <span>Last 30 Days</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <span>Last 6 Months</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <span>Last 1 Years</span>
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </li>
                                <li className="nk-block-tools-opt">
                                  <a href="#" className="btn btn-primary">
                                    <em className="icon ni ni-reports"></em>
                                    <span>Reports</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {datePickerForm()}
                    </div>

                    <div className="nk-block">
                      <div className="row g-gs">
                        <div className="col-lg-12">
                          <div className="card card-bordered h-100">
                            <div className="card-inner mb-n2">
                              <div className="card-title-group">
                                <div className="card-title card-title-sm">
                                  <h6 className="title">
                                    Security Performance
                                  </h6>
                                  <p>Security Performance channels metrics.</p>
                                </div>
                              </div>
                            </div>
                            <div className="nk-tb-list is-loose traffic-channel-table">
                              <div className="nk-tb-item nk-tb-head">
                                <div className="nk-tb-col nk-tb-channel">
                                  <span></span>
                                </div>
                                <div className="nk-tb-col nk-tb-sessions">
                                  <span>Volume traded </span>
                                </div>
                                <div className="nk-tb-col nk-tb-prev-sessions">
                                  <span>Open Price</span>
                                </div>
                                <div className="nk-tb-col nk-tb-change">
                                  <span>Close Price</span>
                                </div>
                                <div className="nk-tb-col nk-tb-trend tb-col-sm text-right">
                                  <span>Gain/loss</span>
                                </div>
                              </div>

                              <div className="nk-tb-item">
                                <div className="nk-tb-col nk-tb-channel">
                                  <span className="tb-lead">Date</span>
                                </div>
                                <div className="nk-tb-col nk-tb-sessions">
                                  <span className="tb-sub tb-amount">
                                    <span></span>
                                  </span>
                                </div>
                                <div className="nk-tb-col nk-tb-prev-sessions">
                                  <span className="tb-sub tb-amount">
                                    <span>{start}</span>
                                  </span>
                                </div>
                                <div className="nk-tb-col nk-tb-change">
                                  <span className="tb-sub">
                                    <span>{end}</span>{' '}
                                  </span>
                                </div>
                                <div className="nk-tb-col nk-tb-trend text-right">
                                  <span className="tb-sub">
                                    <span></span>{' '}
                                  </span>
                                </div>
                              </div>

                              {dataStartDate.map((s, i) => {
                                startUsiDate = s.usi;
                                startMapDate = (
                                  s.capitalisation / 1000000000
                                ).toLocaleString(navigator.language, {
                                  minimumFractionDigits: 0,
                                });
                                {
                                  dataEndDate.map((e, ei) => {
                                    endUsiDate = e.usi;
                                    endMapDate = (
                                      e.capitalisation / 1000000000
                                    ).toLocaleString(navigator.language, {
                                      minimumFractionDigits: 0,
                                    });

                                    endPercentChnage = (
                                      ((endUsiDate - startUsiDate) /
                                        startUsiDate) *
                                      100
                                    ).toLocaleString(navigator.language, {
                                      minimumFractionDigits: 0,
                                    });
                                    if (endPercentChnage > 0) {
                                      txtChange = (
                                        <span style={{ color: '#07fe00' }}>
                                          &#9650; {endPercentChnage} %{' '}
                                        </span>
                                      );
                                    } else if (endPercentChnage < 0) {
                                      txtChange = (
                                        <span style={{ color: 'red' }}>
                                          &#9660; {endPercentChnage} %{' '}
                                        </span>
                                      );
                                    } else {
                                      txtChange = (
                                        <span className="text-warning">
                                          &#8212; {endPercentChnage} %{' '}
                                        </span>
                                      );
                                    }

                                    startPercentageChange = (
                                      ((endMapDate - startMapDate) /
                                        startMapDate) *
                                      100
                                    ).toLocaleString(navigator.language, {
                                      minimumFractionDigits: 0,
                                    });
                                    if (startPercentageChange > 0) {
                                      txtChangeMCap = (
                                        <span style={{ color: '#07fe00' }}>
                                          &#9650; {startPercentageChange} %{' '}
                                        </span>
                                      );
                                    } else if (startPercentageChange < 0) {
                                      txtChangeMCap = (
                                        <span style={{ color: 'red' }}>
                                          &#9660; {startPercentageChange} %{' '}
                                        </span>
                                      );
                                    } else {
                                      txtChangeMCap = (
                                        <span className="text-warning">
                                          &#8212; {startPercentageChange} %{' '}
                                        </span>
                                      );
                                    }
                                  });
                                }
                                return (
                                  <Fragment>
                                    <div className="nk-tb-item">
                                      <div className="nk-tb-col nk-tb-channel">
                                        <span className="tb-lead">
                                          NASD OTC index
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span></span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-prev-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span>{startUsiDate}</span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-change">
                                        <span className="tb-sub">
                                          <span>{endUsiDate}</span>{' '}
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-trend text-right">
                                        <span className="tb-sub">
                                          <span>{txtChange}</span>{' '}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="nk-tb-item">
                                      <div className="nk-tb-col nk-tb-channel">
                                        <span className="tb-lead">
                                          Market Capitalisation (₦ billion)
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span></span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-prev-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span>{startMapDate}</span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-change">
                                        <span className="tb-sub">
                                          <span>{endMapDate}</span>{' '}
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-trend text-right">
                                        <span className="tb-sub">
                                          <span>{txtChangeMCap}</span>{' '}
                                        </span>
                                      </div>
                                    </div>

                                    <div className="nk-tb-item">
                                      <div className="nk-tb-col nk-tb-channel">
                                        <span className="tb-lead">
                                          PERFORMANCE BY SECURITY
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span></span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-prev-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span></span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-change">
                                        <span className="tb-sub"></span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-trend text-right">
                                        <div className="traffic-channel-ck ml-auto">
                                          <canvas
                                            className="analytics-line-small"
                                            id="ReferralsData"
                                          ></canvas>
                                        </div>
                                      </div>
                                    </div>
                                  </Fragment>
                                );
                              })}
                              {/* loop securities here */}
                              {dataEndDateSecurity.map((sec, i) => {
                                let txtpricechange;
                                let volume = sec.volume.toLocaleString(
                                  navigator.language,
                                  { minimumFractionDigits: 0 }
                                );
                                let closeprice2 = sec.closeprice2.toLocaleString(
                                  navigator.language,
                                  { minimumFractionDigits: 2 }
                                );
                                let openprice = sec.openprice.toLocaleString(
                                  navigator.language,
                                  { minimumFractionDigits: 2 }
                                );
                                let priceChange = (
                                  ((closeprice2 - openprice) / openprice) *
                                  100
                                ).toLocaleString(navigator.language, {
                                  minimumFractionDigits: 2,
                                });

                                if (priceChange > 0) {
                                  txtpricechange = (
                                    <span style={{ color: '#07fe00' }}>
                                      &#9650; {priceChange} %{' '}
                                    </span>
                                  );
                                } else if (priceChange < 0) {
                                  txtpricechange = (
                                    <span style={{ color: 'red' }}>
                                      &#9660; {priceChange} %{' '}
                                    </span>
                                  );
                                } else {
                                  txtpricechange = (
                                    <span className="text-warning">
                                      &#8212; {priceChange} %{' '}
                                    </span>
                                  );
                                }
                                return (
                                  <Fragment>
                                    <div key={i} className="nk-tb-item">
                                      <div className="nk-tb-col nk-tb-channel">
                                        <span className="tb-lead">
                                          {sec.security_name}
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span>{volume}</span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-prev-sessions">
                                        <span className="tb-sub tb-amount">
                                          <span>{openprice}</span>
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-change">
                                        <span className="tb-sub">
                                          <span>{closeprice2}</span>{' '}
                                        </span>
                                      </div>
                                      <div className="nk-tb-col nk-tb-trend text-right">
                                        <div className="traffic-channel-ck ml-auto">
                                          <span className="tb-sub">
                                            <span>{txtpricechange}</span>{' '}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Fragment>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ExportToExcelSecPerformance
                      dataStartDate={dataStartDate}
                      dataEndDate={dataEndDate}
                      dataEndDateSecurity={dataEndDateSecurity}
                      start={start}
                      end={end}
                    />
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

export default Performance;
