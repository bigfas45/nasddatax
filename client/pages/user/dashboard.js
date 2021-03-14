import { useState, Fragment, React } from 'react';
import Ticker from '../../components/ticker';
import Layout from '../../components/layout';
import SiderBar from '../../components/user/sidebar';
import Header from '../../components/user/header';
import Footer from '../../components/user/footer';
import DashboardCard from '../../components/user/dashbaord-card';
import DashboardLiveTable from '../../components/user/dashboard-live-table';

const Dashboard = ({currentUser}) => {
  return (
    <Fragment>
      <Layout title="User Dashboard | NASD Data Portal" description="" />
      <body className="nk-body bg-white has-sidebar ">
        <div className="nk-app-root">
          <div className="nk-main ">
            <SiderBar />

            <div className="nk-wrap ">
              <Header currentUser={currentUser} />
              <div className="nk-content nk-content-fluid">
                <Ticker />
                <div className="container-xl wide-lg">
                  <div className="nk-content-body">
                    {/* body goes here  */}

                    <div className="nk-block-head nk-block-head-sm">
                      <div className="nk-block-between">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">
                            OTC Dashboard
                          </h3>
                          <div className="nk-block-des text-soft">
                            <p>NASD OTC Security Exchange Dashboard</p>
                          </div>
                        </div>
                        <div className="nk-block-head-content">
                          <div className="toggle-wrap nk-block-tools-toggle">
                           
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

                    <div className="nk-block">
                      <div className="row g-gs">
                        {/* Card goes here  */}

                        <DashboardCard />

                        {/* Live trade card goes here  */}

                        <DashboardLiveTable />
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

Dashboard.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default Dashboard;
