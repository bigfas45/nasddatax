import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import Link from 'next/link';

const PI = ({ currentUser }) => {
  const [data2, setData] = useState([]);

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/brokers/member`,
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

                    <div className="nk-block">
                      <div className="card card-bordered card-stretch">
                        <div className="card-inner-group">
                          <div className="card-inner position-relative card-tools-toggle">
                            <div className="card-title-group">
                              <div className="card-tools">
                                <div className="form-inline flex-nowrap gx-3"></div>
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
                                          <li></li>
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
                                  <span className="sub-text">member_name</span>
                                </div>
                                <div className="nk-tb-col tb-col-md">
                                  <span className="sub-text">member_code</span>
                                </div>
                                <div className="nk-tb-col tb-col-sm">
                                  <span className="sub-text">
                                    registration_type
                                  </span>
                                </div>

                                <div className="nk-tb-col tb-col-lg">
                                  <span className="sub-text">
                                    p_contact_name
                                  </span>
                                </div>
                                <div className="nk-tb-col tb-col-lg">
                                  <span className="sub-text">
                                    p_contact_phone
                                  </span>
                                </div>
                                <div className="nk-tb-col tb-col-lg">
                                  <span className="sub-text">
                                    p_contact_email
                                  </span>
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
                                    <div className="dropdown-menu dropdown-menu-xs dropdown-menu-right"></div>
                                  </div>
                                </div>
                              </div>

                              {data2.map((user, i) => {
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
                                            {user.member_name}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="nk-tb-col tb-col-md">
                                      <span>{user.member_code}</span>
                                    </div>
                                    <div className="nk-tb-col tb-col-sm">
                                      <span>{user.registration_type}</span>
                                    </div>

                                    <div className="nk-tb-col tb-col-lg">
                                      <span>{user.p_contact_name}</span>
                                    </div>

                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        {user.p_contact_phone}
                                      </span>
                                    </div>
                                    <div className="nk-tb-col">
                                      <span className="tb-status text-success">
                                        {user.p_contact_email}
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
                                                    <a
                                                      href={`/admin/users/${user.id}`}
                                                    >
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
            <Footer></Footer>
          </div>
        </div>
      </body>
    </Fragment>
  );
};

PI.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default PI;
