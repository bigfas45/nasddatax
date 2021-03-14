import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';
import Link from 'next/link';
import Loader from 'react-loader-spinner';
import Router from 'next/router';

const User = ({ currentUser, user }) => {
  const [data2, setData] = useState([]);

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/users/${user}`,
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

  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [bCode, setBcode] = useState('');
  const [userType, setUserType] = useState('');
  const [status, setStatus] = useState('');

  const { doRequest3, errors3, loading3, success3 } = useRequest3({
    url: `/api/users/${user}`,
    method: 'put',
    body: {
      email,
      firstname,
      lastname,
      bCode,
      userType,
      status,
    },
    onSuccess: () => {Router.push('/admin/users')}
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest3();
  };

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

                    {/* {data2.map((user, i) => {
                      return ( */}
                    <div className="nk-block">
                      <div className="card card-bordered">
                        <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                          <li className="nav-item">
                            <a className="nav-link active">
                              <em className="icon ni ni-user-fill-c"></em>
                              <span>Personal</span>
                            </a>
                          </li>
                        </ul>
                        <div className="card-inner card-inner-lg">
                          <div className="nk-block-head">
                            <div className="nk-block-head-content">
                              <h4 className="nk-block-title">
                                Personal Information
                              </h4>
                              <div className="nk-block-des">
                                <p>
                                  Basic info, like your name and address, that
                                  you use on Nio Platform.
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="nk-block">
                            <div className="nk-data data-list data-list-s2">
                              <div className="data-head">
                                <h6 className="overline-title">Basics</h6>
                              </div>
                              <div
                                className="data-item"
                                data-toggle="modal"
                                data-target="#profile-edit"
                              >
                                <div className="data-col">
                                  <span className="data-label">Full Name</span>
                                  <span className="data-value">
                                    {data2.firstname} {data2.lastname}
                                  </span>
                                </div>
                                <div className="data-col data-col-end">
                                  <span className="data-more">
                                    <em className="icon ni ni-forward-ios"></em>
                                  </span>
                                </div>
                              </div>
                              <div
                                className="data-item"
                                data-toggle="modal"
                                data-target="#profile-edit"
                              >
                                <div className="data-col">
                                  <span className="data-label">
                                    Broker Code
                                  </span>
                                  <span className="data-value">
                                    {data2.bCode}
                                  </span>
                                </div>
                                <div className="data-col data-col-end">
                                  <span className="data-more">
                                    <em className="icon ni ni-forward-ios"></em>
                                  </span>
                                </div>
                              </div>
                              <div className="data-item">
                                <div className="data-col">
                                  <span className="data-label">Email</span>
                                  <span className="data-value">
                                    {data2.email}
                                  </span>
                                </div>
                                <div className="data-col data-col-end">
                                  <span className="data-more disable">
                                    <em className="icon ni ni-lock-alt"></em>
                                  </span>
                                </div>
                              </div>

                              <div className="data-item">
                                <div className="data-col">
                                  <span className="data-label">User Type</span>
                                  <span className="data-value">
                                    {data2.userType === 1 ? 'Admin' : 'User'}
                                  </span>
                                </div>
                                <div className="data-col data-col-end">
                                  <span className="data-more disable">
                                    <em className="icon ni ni-lock-alt"></em>
                                  </span>
                                </div>
                              </div>

                              <div
                                className="data-item"
                                data-toggle="modal"
                                data-target="#profile-edit"
                              >
                                <div className="data-col">
                                  <span className="data-label">
                                    Phone Number
                                  </span>
                                  <span className="data-value text-soft">
                                    Not add yet
                                  </span>
                                </div>

                                <div className="data-col data-col-end">
                                  <span className="data-more">
                                    <em className="icon ni ni-forward-ios"></em>
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
            <Footer />
          </div>
        </div>
        <div
          className="modal fade"
          tabindex="-1"
          role="dialog"
          id="profile-edit"
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <a href="#" className="close" data-dismiss="modal">
                <em className="icon ni ni-cross-sm"></em>
              </a>
              <div className="modal-body modal-body-lg">
                <h5 className="title">Update Profile</h5>
                <ul className="nk-nav nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#personal"
                    >
                      Personal
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="personal">
                    <form onSubmit={onSubmit}>
                      <div className="row gy-4">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="full-name">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="full-name"
                              value={firstname}
                              onChange={(e) => setFirstname(e.target.value)}
                              placeholder={data2.firstname}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="display-name">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="display-name"
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder={data2.lastname}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control form-control-lg"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder={data2.email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="birth-day">
                              Broker Code
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={bCode}
                              onChange={(e) => setBcode(e.target.value)}
                              id="birth-day"
                              placeholder={data2.bCode}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="birth-day">
                              User Status
                            </label>
                            <div class="form-control-select">
                              <select
                                class="form-control"
                                id="default-06"
                                onChange={(e) => setStatus(e.target.value)}
                              >
                                <option value="option_select_name">
                                  {data2.status}
                                </option>
                                <option value="free">Free Plan</option>
                                <option value="premium">Premium Plan</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="birth-day">
                              User Type
                            </label>
                            <div class="form-control-select">
                              <select
                                class="form-control"
                                id="default-06"
                                onChange={(e) => setUserType(e.target.value)}
                              >
                                <option value="default_option">
                                  {data2.userType === 1 ? 'Admin' : 'User'}
                                </option>
                                <option value="1">Admin</option>
                                <option value="0">Broker</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="form-group">
                          {loading3 && loading3 ? (
                            <a
                              href="#"
                              className="btn btn-lg btn-danger btn-block"
                            >
                              {' '}
                              {cardLoading()}
                              Loading.....
                            </a>
                          ) : (
                          <input
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            value="Sign In"
                          />
                          )}{' '} 
                        </div>
                         {errors3} 
                      </div>
                      {/*  */}
                    </form>
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

User.getInitialProps = async (context, client, currentUser) => {
  const { user } = context.query;

  return { user: user };
};

export default User;
