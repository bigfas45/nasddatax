import { Fragment, useEffect, useState } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest from '../../../hooks/use-request';
import Moment from 'moment';
import Link from 'next/link';

const Inbox = ({currentUser}) => {
  const [inbox, setInbox] = useState([]);
  let cdate;
  const { doRequest, errors, loading } = useRequest({
    url: `/api/equity/inbox`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setInbox(data);
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <Fragment>
      <Layout title="User Dashboard | NASD Data Portal" description="" />
      <body className="nk-body bg-white has-sidebar ">
        <div className="nk-app-root">
          <div className="nk-main ">
            <SiderBar />
            <div className="nk-wrap ">
              <Header currentUser={currentUser}/>
              <div className="nk-content p-0">
                <Ticker />
                <div className="nk-content-inner">
                  <div className="nk-content-body p-0">
                    <div className="nk-ibx">
                      <div
                        className="nk-ibx-aside"
                        data-content="inbox-aside"
                        data-toggle-overlay="true"
                        data-toggle-screen="lg"
                      >
                        <div className="nk-ibx-head">
                          <h5 className="mb-0">NasdMail</h5>
                          <a
                            href="#"
                            className="link link-primary"
                            data-toggle="modal"
                            data-target="#compose-mail"
                          >
                            <em className="icon ni ni-plus"></em>{' '}
                            <span>Compose</span>
                          </a>
                        </div>
                        <div className="nk-ibx-nav" data-simplebar>
                          <ul className="nk-ibx-menu">
                            <li className="active">
                              <a className="nk-ibx-menu-item" href="#">
                                <em className="icon ni ni-inbox"></em>
                                <span className="nk-ibx-menu-text">Inbox</span>
                                <span className="badge badge-pill badge-primary">
                                  7
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="nk-ibx-body bg-white">
                        <div className="nk-ibx-head">
                          <div className="nk-ibx-head-actions"></div>

                          <div className="search-wrap" data-search="search">
                            <div className="search-content">
                              <a
                                href="#"
                                className="search-back btn btn-icon toggle-search"
                                data-target="search"
                              >
                                <em className="icon ni ni-arrow-left"></em>
                              </a>
                              <input
                                type="text"
                                className="form-control border-transparent form-focus-none"
                                placeholder="Search by user or message"
                              />
                              <button className="search-submit btn btn-icon">
                                <em className="icon ni ni-search"></em>
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Loop here */}
                        {inbox.map((inboxL, i) => {
                          cdate = Moment(inboxL.Date).format('YYYY-MM-DD');
                          return (
                            <Fragment>
                              <div className="nk-ibx-list" data-simplebar>
                                <div className="nk-ibx-item">
                                  <div></div>

                                  <div className="nk-ibx-item-elem nk-ibx-item-check">
                                    <div className="custom-control custom-control-sm custom-checkbox">
                                      <input
                                        type="checkbox"
                                        className="custom-control-input nk-dt-item-check"
                                        id="conversionItem03"
                                      />
                                      <label
                                        className="custom-control-label"
                                        for="conversionItem03"
                                      ></label>
                                    </div>
                                  </div>
                                  <div className="nk-ibx-item-elem nk-ibx-item-star">
                                    <div className="asterisk"></div>
                                  </div>
                                  <div className="nk-ibx-item-elem nk-ibx-item-user">
                                    <div className="user-card">
                                      <div className="user-avatar">
                                        {' '}
                                        <span>
                                          {' '}
                                          <Link
                                            href="/user/inbox/[inbox-date]"
                                            as={`/user/inbox/${cdate}`}
                                          >
                                            MR
                                          </Link>
                                        </span>
                                      </div>
                                      <div className="user-name">
                                        <div className="lead-text">
                                          <Link
                                            href="/user/inbox/[inbox-date]"
                                            as={`/user/inbox/${cdate}`}
                                          >
                                            {cdate}
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="nk-ibx-item-elem nk-ibx-item-fluid">
                                    <div className="nk-ibx-context-group">
                                      <div className="nk-ibx-context">
                                        <span className="nk-ibx-context-text">
                                          <span className="heading">
                                            <Link
                                              href="/user/inbox/[inbox-date]"
                                              as={`/user/inbox/${cdate}`}
                                            >
                                              MARKET REPORT
                                            </Link>
                                            &#160;
                                            <Link
                                              href="/user/inbox/[inbox-date]"
                                              as={`/user/inbox/${cdate}`}
                                            >
                                              {cdate}
                                            </Link>
                                          </span>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="nk-ibx-item-elem nk-ibx-item-attach">
                                    <a className="link link-light">
                                      <em className="icon ni ni-clip-h"></em>
                                    </a>
                                  </div>
                                  <div className="nk-ibx-item-elem nk-ibx-item-time">
                                    <div className="sub-text">4:00 pm</div>
                                  </div>
                                </div>
                              </div>
                            </Fragment>
                          );
                        })}

                        {/* end loop */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </body>
    </Fragment>
  );
};

export default Inbox;
