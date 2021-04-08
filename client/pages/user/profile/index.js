import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest3 from '../../../hooks/use-request3';
import Loader from 'react-loader-spinner';
import Router from 'next/router';

const Profile = ({ currentUser }) => {
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
    const [password, setPassword] = useState('');

  const { doRequest3, errors3, loading3, success3 } = useRequest3({
    url: `/api/users/${currentUser.id}`,
    method: 'put',
    body: {
      email,
      firstname,
      lastname,
      password,
    },
    onSuccess: () => {
      Router.push('/auth/signout');
    },
  });

  useEffect(() => {
    setEmail(currentUser.email);
    setFirstname(currentUser.firstname);
    setLastName(currentUser.lastname);
  }, []);

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
                                          Personal Information
                                        </h4>
                                        <div className="nk-block-des">
                                          <p>
                                            Basic info, like your name and
                                            address, that you use on Nio
                                            Platform.
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
                                  <div className="nk-block">
                                    <div className="nk-data data-list">
                                      <div className="data-head">
                                        <h6 className="overline-title">
                                          Basics
                                        </h6>
                                      </div>
                                      <div
                                        className="data-item"
                                        data-toggle="modal"
                                        data-target="#profile-edit"
                                      >
                                        <div className="data-col">
                                          <span className="data-label">
                                            Full Name
                                          </span>
                                          <span className="data-value">
                                            {currentUser.firstname}{' '}
                                            {currentUser.lastname}
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
                                            Display Name
                                          </span>
                                          <span className="data-value">
                                            {currentUser.firstname}{' '}
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
                                          <span className="data-label">
                                            Email
                                          </span>
                                          <span className="data-value">
                                            {currentUser.email}{' '}
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
                                            Broker Code
                                          </span>
                                          <span className="data-value text-soft">
                                            {currentUser.bCode}{' '}
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
                                        data-tab-target="#address"
                                      >
                                        <div className="data-col">
                                          <span className="data-label">
                                            User Type
                                          </span>
                                          <span className="data-value">
                                            {currentUser.userType === 1
                                              ? 'Broker'
                                              : 'Admin'}{' '}
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
                                            Status
                                          </span>
                                          <span className="data-value text-soft">
                                            {currentUser.status}{' '}
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
                            <h5 className="title">Update Password</h5>
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
                            <form onSubmit={onSubmit}>
                              <div className="tab-content">
                                <div className="tab-pane active" id="personal">
                                  <div className="row gy-4">
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          for="full-name"
                                        >
                                          First Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control form-control-lg"
                                          id="full-name"
                                          value={firstname}
                                          onChange={(e) =>
                                            setFirstname(e.target.value)
                                          }
                                          placeholder="Enter Full name"
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          for="display-name"
                                        >
                                          Last Name
                                        </label>
                                        <input
                                          type="text"
                                          className="form-control form-control-lg"
                                          id="display-name"
                                          value={lastname}
                                          onChange={(e) =>
                                            setLastName(e.target.value)
                                          }
                                          placeholder="Enter display name"
                                          readOnly
                                        />
                                      </div>
                                    </div>
                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          for="phone-no"
                                        >
                                          Email
                                        </label>
                                        <input
                                          type="email"
                                          className="form-control form-control-lg"
                                          value={email}
                                          onChange={(e) =>
                                            setEmail(e.target.value)
                                          }
                                          readOnly
                                        />
                                      </div>
                                    </div>

                                    <div className="col-md-6">
                                      <div className="form-group">
                                        <label
                                          className="form-label"
                                          for="phone-no"
                                        >
                                          Password
                                        </label>
                                        <input
                                          type="password"
                                          className="form-control form-control-lg"
                                          value={password}
                                          onChange={(e) =>
                                            setPassword(e.target.value)
                                          }
                                        />
                                      </div>
                                    </div>

                                    <div className="col-12">
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
                                            value="Update Password"
                                          />
                                        )}{' '}
                                      </div>
                                      {errors3}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
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

export default Profile;
