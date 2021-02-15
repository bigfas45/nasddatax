import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest from '../../../hooks/use-request';

const TradeLog = () => {
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

                <div className="nk-content nk-content-fluid">
                  <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                      <div className="nk-block-head nk-block-head-sm">
                        <div className="nk-block-between">
                          <div className="nk-block-head-content">
                            <h3 className="nk-block-title page-title">
                              Investment Dashboard
                            </h3>
                            <div className="nk-block-des text-soft">
                              <p>Welcome to Crypto Invest Dashboard</p>
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
                                    <a
                                      href="#"
                                      className="btn btn-white btn-dim btn-outline-primary"
                                    >
                                      <em className="icon ni ni-download-cloud"></em>
                                      <span>Export</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="btn btn-white btn-dim btn-outline-primary"
                                    >
                                      <em className="icon ni ni-reports"></em>
                                      <span>Reports</span>
                                    </a>
                                  </li>
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
                      <div class="nk-block">
                        <div class="row g-gs">
                          <div class="col-md-12">
                            <div class="card card-bordered card-full">
                              <div class="card-inner">Hello</div>
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

export default TradeLog;
