import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import Link from 'next/link';

const Users = ({ currentUser }) => {


  const [data2, setData] = useState([]);

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/users`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    currentUser && currentUser.userType != 1
      ? Router.push('/auth/access-denied')
      : '';
    doRequest2();
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
              <div className="nk-content nk-content-fluid">
                <Ticker />
                <div className="container-xl wide-lg">
                  <div className="nk-content-body">
                    {/* body goes here  */}

                    <div className="nk-block-head nk-block-head-sm">
                      <div className="nk-block-between">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">
                            Users Lists
                          </h3>
                          {/* <div className="nk-block-des text-soft">
                            <p>You have total 2,595 users.</p>
                          </div> */}
                        </div>
                        <div className="nk-block-head-content">
                          <div className="toggle-wrap nk-block-tools-toggle">
                            <a
                              href="#"
                              className="btn btn-icon btn-trigger toggle-expand mr-n1"
                              data-target="pageMenu"
                            >
                              <em className="icon ni ni-menu-alt-r"></em>
                            </a>
                            <div
                              className="toggle-expand-content"
                              data-content="pageMenu"
                            >
                              <ul className="nk-block-tools g-3">
                                <li>
                                  <a
                                    href="#"
                                    className="btn btn-white btn-outline-light"
                                  >
                                    <em className="icon ni ni-download-cloud"></em>
                                    <span>Export</span>
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
                                            <span>Add User</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <span>Add Team</span>
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <span>Import User</span>
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
                      <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                          <div className="card-inner position-relative card-tools-toggle">
                            <div className="card-title-group">
                              <div className="card-tools">
                                <div className="form-inline flex-nowrap gx-3">
                                  
                                  
                                </div>
                              </div>
                              <div className="card-tools mr-n1">
                                <ul className="btn-toolbar gx-1">
                                  <li>
                                    <a
                                      href="#"
                                      className="btn btn-icon search-toggle toggle-search"
                                      data-target="search"
                                    >
                                      <em className="icon ni ni-search"></em>
                                    </a>
                                  </li>
                                  <li className="btn-toolbar-sep"></li>
                                  <li>
                                    <div className="toggle-wrap">
                                      <a
                                        href="#"
                                        className="btn btn-icon btn-trigger toggle"
                                        data-target="cardTools"
                                      >
                                        <em className="icon ni ni-menu-right"></em>
                                      </a>
                                      <div
                                        className="toggle-content"
                                        data-content="cardTools"
                                      >
                                        <ul className="btn-toolbar gx-1">
                                          <li className="toggle-close">
                                            <a
                                              href="#"
                                              className="btn btn-icon btn-trigger toggle"
                                              data-target="cardTools"
                                            >
                                              <em className="icon ni ni-arrow-left"></em>
                                            </a>
                                          </li>
                                          <li>
                                            
                                          </li>
                                          <li>
                                            <div className="dropdown">
                                              <a
                                                href="#"
                                                className="btn btn-trigger btn-icon dropdown-toggle"
                                                data-toggle="dropdown"
                                              >
                                                <em className="icon ni ni-setting"></em>
                                              </a>
                                         
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div
                              className="card-search search-wrap"
                              data-search="search"
                            >
                              <div className="card-body">
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
                                    placeholder="Search by user or email"
                                  />
                                  <button className="search-submit btn btn-icon">
                                    <em className="icon ni ni-search"></em>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card-inner p-0">
                            <div className="nk-tb-list nk-tb-ulist is-compact">
                              <div className="nk-tb-item nk-tb-head">
                                <div className="nk-tb-col nk-tb-col-check">
                                  <div className="custom-control custom-control-sm custom-checkbox notext">
                                    <input
                                      type="checkbox"
                                      className="custom-control-input"
                                      id="uid"
                                    />
                                    <label
                                      className="custom-control-label"
                                      for="uid"
                                    ></label>
                                  </div>
                                </div>
                                <div className="nk-tb-col">
                                  <span className="sub-text">User</span>
                                </div>
                                <div className="nk-tb-col tb-col-md">
                                  <span className="sub-text">Role</span>
                                </div>
                                <div className="nk-tb-col tb-col-sm">
                                  <span className="sub-text">Email</span>
                                </div>
                               
                                <div className="nk-tb-col tb-col-lg">
                                  <span className="sub-text">Company</span>
                                </div>
                                <div className="nk-tb-col tb-col-lg">
                                  <span className="sub-text">Verified</span>
                                </div>
                                <div className="nk-tb-col tb-col-lg">
                                  <span className="sub-text">Last Login</span>
                                </div>
                                <div className="nk-tb-col">
                                  <span className="sub-text">Status</span>
                                </div>
                                <div className="nk-tb-col nk-tb-col-tools text-right">
                                  <div className="dropdown">
                                    <a
                                      href="#"
                                      className="btn btn-xs btn-outline-light btn-icon dropdown-toggle"
                                      data-toggle="dropdown"
                                      data-offset="0,5"
                                    >
                                      <em className="icon ni ni-plus"></em>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right">
                                     
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {data2.map((user,i) => {
                                return (
                                  <div key={i} className="nk-tb-item">
                                    <div className="nk-tb-col nk-tb-col-check">
                                      <div className="custom-control custom-control-sm custom-checkbox notext">
                                        <input
                                          type="checkbox"
                                          className="custom-control-input"
                                          id="uid15"
                                        />
                                        <label
                                          className="custom-control-label"
                                          for="uid15"
                                        ></label>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col">
                                      <div className="user-card">
                                        <div className="user-avatar xs bg-success">
                                          <span>MB</span>
                                        </div>
                                        <div className="user-name">
                                          <span className="tb-lead">
                                            {user.firstname} {user.lastname}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>
                                        {user.userType === 1 ? 'Admin' : 'User'}
                                      </span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>{user.email}</span>
                                    </div>

                                    <div className="nk-tb-col tb-col-lg">
                                      <span>{user.bCode}</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                      <ul className="list-status">
                                        <li>
                                          <em className="icon text-warning/ ni ni-alarm-alt"></em>{' '}
                                          <span>Email</span>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="nk-tb-col tb-col-lg">
                                      <span>01 Jan 2020</span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        {user.status}
                                      </span>
                                    </div>
                                    <div className="nk-tb-col nk-tb-col-tools">
                                      <ul className="nk-tb-actions gx-2">
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Wallet"
                                          >
                                            <em className="icon ni ni-wallet-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Send Email"
                                          >
                                            <em className="icon ni ni-mail-fill"></em>
                                          </a>
                                        </li>
                                        <li className="nk-tb-action-hidden">
                                          <a
                                            href="#"
                                            className="btn btn-sm btn-icon btn-trigger"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                            title="Suspend"
                                          >
                                            <em className="icon ni ni-user-cross-fill"></em>
                                          </a>
                                        </li>
                                        <li>
                                          <div className="drodown">
                                            <a
                                              href="#"
                                              className="btn btn-sm btn-icon btn-trigger dropdown-toggle"
                                              data-toggle="dropdown"
                                            >
                                              <em className="icon ni ni-more-h"></em>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right">
                                              <ul className="link-list-opt no-bdr">
                                                <li>
                                                  <a>
                                                    <em className="icon ni ni-eye"></em>
                                                    {/* <Link
                                                      href="/admin/users/[user]"
                                                      as={`/admin/users/${user.id}`}
                                                    > */}
                                                      <a href={`/admin/users/${user.id}`}>
                                                      <span>Edit Details</span>
                                                    </a>
                                                  </a>
                                                </li>

                                                <li className="divider"></li>

                                                <li>
                                                  <a href="#">
                                                    <em className="icon ni ni-na"></em>
                                                    <span>Suspend User</span>
                                                  </a>
                                                </li>
                                              </ul>
                                            </div>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                );
                              })}

                         
                           
                            </div>
                          </div>
                       
                        </div>
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

Users.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default Users;
