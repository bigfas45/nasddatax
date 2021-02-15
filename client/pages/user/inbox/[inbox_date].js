import { Fragment, useEffect, useState } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest from '../../../hooks/use-request';
import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';

import Moment from 'moment';
import Link from 'next/link';
import ExportToExcelPriceList from '../../../components/user/Exports/ExportToExcelPriceList';
import ExportToExcel from '../../../components/user/Exports/ExportToExcelTradeInbox';
import ExportToExcelGainers from '../../../components/user/Exports/ExportToExcelGainers';

const InboxTrade = ({ inbox_date, currentUser }) => {
  const [inbox, setInbox] = useState([]);
  const [values, setValues] = useState([]);
  const [trades, setTrades] = useState([]);

  let cdate, cdate2;
  const { doRequest, errors, loading } = useRequest({
    url: `/api/equity/inbox`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setInbox(data);
    },
  });

  const { doRequest2, errors2, loading2 } = useRequest2({
    url: `/api/equity/inbox/${inbox_date}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setValues(data);
    },
  });

  const { doRequest3, errors3, loading3 } = useRequest3({
    url: `/api/equity/inbox/${inbox_date}/${inbox_date}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setTrades(data);
    },
  });

  useEffect(() => {
    doRequest();
    doRequest2();
    doRequest3();
  }, []);

  return (
    <Fragment>
      <Layout title="User Dashboard | NASD Data Portal" description="" />
      <body className="nk-body bg-white has-sidebar ">
        <div className="nk-app-root">
          <div className="nk-main ">
            <SiderBar />
            <div className="nk-wrap ">
              <Header currentUser={currentUser} />
              <div className="nk-content p-0">
                <Ticker />
                <div className="nk-content-inner">
                  <div className="nk-content-body p-0">
                    <div className="nk-msg">
                      <div className="nk-msg-aside">
                        {/* Loop all messages here */}
                        {inbox.map((inboxL, i) => {
                          cdate = Moment(inboxL.Date).format('YYYY-MM-DD');
                          //
                          cdate2 = Moment(inbox_date).format('MMMM Do YYYY');
                          return (
                            <Fragment>
                              <div className="nk-msg-list" data-simplebar>
                                <div
                                  className="nk-msg-item current"
                                  data-msg-id="1"
                                >
                                  <div className="nk-msg-media user-avatar">
                                    <span>MO</span>
                                  </div>
                                  <div className="nk-msg-info">
                                    <div className="nk-msg-from">
                                      <div className="nk-msg-sender">
                                        <div className="name">
                                          Market Operations
                                        </div>
                                        <div className="lable-tag dot bg-pink"></div>
                                      </div>
                                      <div className="nk-msg-meta">
                                        <div className="attchment">
                                          <em className="icon ni ni-clip-h"></em>
                                        </div>
                                        <div className="date">{cdate}</div>
                                      </div>
                                    </div>
                                    <div className="nk-msg-context">
                                      <a>
                                        <Link
                                          href="/user/inbox/[inbox-date]"
                                          as={`/user/inbox/${cdate}`}
                                        >
                                          <div className="nk-msg-text">
                                            <h6 className="title">
                                              Market Report {cdate}
                                            </h6>
                                            <p>
                                              Hello team, Please download the
                                              attached market data files.
                                            </p>
                                          </div>
                                        </Link>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}

                        {/* End loop */}
                      </div>
                      {/* {JSON.stringify(values)} */}

                      <div className="nk-msg-body bg-white profile-shown">
                        <div className="nk-msg-head">
                          <h4 className="title d-none d-lg-block">
                            Market Report {inbox_date}
                          </h4>
                          <div className="nk-msg-head-meta">
                            <div className="d-none d-lg-block">
                              <ul className="nk-msg-tags">
                                <li>
                                  <span className="label-tag">
                                    <em className="icon ni ni-flag-fill"></em>{' '}
                                    <span>Daily Report</span>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="nk-msg-profile-toggle profile-toggle active"
                          >
                            <em className="icon ni ni-arrow-left"></em>
                          </a>
                        </div>
                        <div className="nk-msg-reply nk-reply" data-simplebar>
                          <div className="nk-msg-head py-4 d-lg-none">
                            <h4 className="title">Market Report {cdate}</h4>
                            <ul className="nk-msg-tags">
                              <li>
                                <span className="label-tag">
                                  <em className="icon ni ni-flag-fill"></em>{' '}
                                  <span>Daily Report</span>
                                </span>
                              </li>
                            </ul>
                          </div>
                          <div className="nk-reply-item">
                            <div className="nk-reply-header">
                              <div className="user-card">
                                <div className="user-avatar sm bg-blue">
                                  <span>MO</span>
                                </div>
                                <div className="user-name">
                                  Market Operations
                                </div>
                              </div>
                              <div className="date-time">{cdate2}</div>
                            </div>
                            <div className="nk-reply-body">
                              <div className="nk-reply-entry entry">
                                <p>Hello team,</p>
                                <p>
                                  Please download the attached market data
                                  files.
                                </p>
                                <p>
                                  Thank you <br />
                                  <br /> Market Report
                                </p>
                              </div>
                              <div className="attach-files">
                                <ul className="attach-list">
                                  <li className="attach-item">
                                    <em className="icon ni ni-img"></em>
                                    <ExportToExcelPriceList post={values} />
                                  </li>
                                  <li className="attach-item">
                                    <em className="icon ni ni-img"></em>
                                    <ExportToExcel post={trades} />
                                  </li>

                                  <li className="attach-item">
                                    <em className="icon ni ni-img"></em>
                                    <ExportToExcelGainers post={trades} />
                                  </li>
                                </ul>
                                <div className="attach-foot">
                                  <span className="attach-info">
                                    3 files attached
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="nk-msg-profile visible" data-simplebar>
                          <div className="card">
                            <div className="card-inner-group">
                              <div className="card-inner">
                                <div className="user-card user-card-s2 mb-2">
                                  <div className="user-avatar md bg-primary">
                                    <span>
                                      {currentUser.firstname.charAt(0)}
                                      {currentUser.lastname.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="user-info">
                                    <h5>
                                      {currentUser.firstname}{' '}
                                      {currentUser.lastname}
                                    </h5>
                                    <span className="sub-text">
                                      {currentUser.bCode}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="card-inner">
                                <div className="aside-wg">
                                  <h6 className="overline-title-alt mb-2">
                                    User Information
                                  </h6>
                                  <ul className="user-contacts">
                                    <li>
                                      <em className="icon ni ni-mail"></em>
                                      <span> {currentUser.email}</span>
                                    </li>
                                    <li>
                                      <em className="icon ni ni-call"></em>
                                      <span>+938392939</span>
                                    </li>
                                  </ul>
                                </div>
                                <div className="aside-wg">
                                  <h6 className="overline-title-alt mb-2">
                                    Additional
                                  </h6>
                                  <div className="row gx-1 gy-3">
                                    <div className="col-6">
                                      <span className="sub-text">Status:</span>
                                      <span className="lead-text text-success">
                                        {currentUser.status}
                                      </span>
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

InboxTrade.getInitialProps = async (context, client, currentUser) => {
  const { inbox_date } = context.query;

  console.log({ currentUser });

  return { inbox_date: inbox_date };
};

export default InboxTrade;
