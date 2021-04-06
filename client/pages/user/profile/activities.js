import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest3 from '../../../hooks/use-request3';
import Loader from 'react-loader-spinner';
import Router from 'next/router';
import moment from 'moment'

const Activities = ({ currentUser }) => {
  const [data, setData] = useState([]);


   const { doRequest3, errors3, loading3, success3 } = useRequest3({
     url: `/api/users/activities/${currentUser.id}`,
     method: 'get',
     body: {
      
     },
     onSuccess: (data) => {
     setData(data)
     },
   });
  
  useEffect(() => {
    doRequest3();
  }, [])

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
                    {/*  */}
                    <div className="nk-content nk-content-fluid">
                      <div className="container-xl wide-lg">
                        <div className="nk-content-body">
                          <div className="nk-block">
                            <div className="card card-bordered">
                              <div className="card-aside-wrap">
                                <div className="card-inner card-inner-lg">
                                  <div className="nk-block-head nk-block-head-lg">
                                    <div className="nk-block-between">
                                      <div className="nk-block-head-content">
                                        <h4 className="nk-block-title">
                                          Login Activity
                                        </h4>
                                        <div className="nk-block-des">
                                          <p>
                                            Here is your last login
                                            activities log.{' '}
                                            <span className="text-soft">
                                              <em className="icon ni ni-info"></em>
                                            </span>
                                          </p>
                                        </div>
                                      </div>
                                      <div className="nk-block-head-content align-self-start d-lg-none">
                                        <a
                                          href="#"
                                          className="toggle btn btn-icon btn-trigger mt-n1"
                                          data-target="userAside"
                                        >
                                          <em className="icon ni ni-menu-alt-r"></em>
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="nk-block card card-bordered">
                                    <table className="table table-ulogs">
                                      <thead className="thead-light">
                                        <tr>
                                          {/* <th className="tb-col-os">
                                            <span className="overline-title">
                                              Browser{' '}
                                              <span className="d-sm-none">
                                                / IP
                                              </span>
                                            </span>
                                          </th> */}
                                          <th className="tb-col-ip">
                                            <span className="overline-title">
                                              IP
                                            </span>
                                          </th>
                                          <th className="tb-col-time">
                                            <span className="overline-title">
                                              Time
                                            </span>
                                          </th>
                                          <th className="tb-col-action">
                                            <span className="overline-title">
                                              &nbsp;
                                            </span>
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {data.map((browser, i) => {
                                          return (
                                            <Fragment>
                                              <tr key={i}>
                                                {/* <td className="tb-col-os">
                                                  {browser.broswer}
                                                </td> */}
                                                <td className="tb-col-ip">
                                                  <span className="sub-text">
                                                    {browser.ip}
                                                  </span>
                                                </td>
                                                <td className="tb-col-time">
                                                  <span className="sub-text">
                                                    {moment
                                                      .utc(browser.date)
                                                      .format(
                                                        'MMMM Do YYYY, h:mm:ss a'
                                                      )}
                                                  </span>
                                                </td>
                                              
                                              </tr>
                                            </Fragment>
                                          );
                                        })}
                                       
                               
                                
                                      
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div
                                  className="card-aside card-aside-left user-aside toggle-slide toggle-slide-left toggle-break-lg"
                                  data-content="userAside"
                                  data-toggle-screen="lg"
                                  data-toggle-overlay="true"
                                >
                                  <div
                                    className="card-inner-group"
                                    data-simplebar
                                  >
                                    <div className="card-inner">
                                      <div className="user-card">
                                        <div className="user-avatar bg-primary">
                                          <span>
                                            {currentUser.firstname.charAt(0)}{' '}
                                            {currentUser.lastname.charAt(0)}
                                          </span>
                                        </div>
                                        <div className="user-info">
                                          <span className="lead-text">
                                            {currentUser.firstname}
                                          </span>
                                          <span className="sub-text">
                                            {currentUser.email}
                                          </span>
                                        </div>
                                      </div>
                                    </div>

                                    <div className="card-inner p-0">
                                      <ul className="link-list-menu">
                                        <li>
                                          <a
                                            className="active"
                                            href="/user/profile/"
                                          >
                                            <em className="icon ni ni-user-fill-c"></em>
                                            <span>Personal Infomation</span>
                                          </a>
                                        </li>

                                        <li>
                                          <a href="/user/profile/activities">
                                            <em className="icon ni ni-activity-round-fill"></em>
                                            <span>Account Activity</span>
                                          </a>
                                        </li>
                                      </ul>
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

export default Activities;
