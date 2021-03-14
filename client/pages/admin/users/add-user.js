import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest from '../../../hooks/use-request';
import Link from 'next/link';
import Router from 'next/router';



const AddUsers = ({ currentUser }) => {
   console.log(currentUser);
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastName] = useState('');
  const [bCode, setBcode] = useState('');

  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      firstname,
      lastname,
      bCode,
    },
    onSuccess: (data) => {
      Router.push('/admin/users/');
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest();
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
                    <div className="nk-block nk-block-lg">
                      <div className="nk-block-head">
                        <div className="nk-block-head-content">
                          <h4 className="title nk-block-title">
                            Create User form
                          </h4>
                          <div className="nk-block-des"></div>
                        </div>
                      </div>
                      <div className="card card-bordered">
                        <div className="card-inner">
                          <div className="card-head">
                            <h5 className="card-title">User </h5>
                          </div>
                          <form onSubmit={onSubmit}>
                            <div className="row g-4">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="full-name-1"
                                  >
                                    First Name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                     
                                      value={firstname}
                                      onChange={(e) =>
                                        setFirstname(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="full-name-1"
                                  >
                                    Last Name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                     
                                      value={lastname}
                                      onChange={(e) =>
                                        setLastName(e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="email-address-1"
                                  >
                                    Email address
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                     
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="phone-no-1"
                                  >
                                    Broker Code
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                     
                                      value={bCode}
                                      onChange={(e) => setBcode(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  <button className="btn btn-lg btn-primary">
                                    Save Informations
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <br />
                          {errors}
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

AddUsers.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default AddUsers;
