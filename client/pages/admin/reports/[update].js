import React, { useState, Fragment, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import Loader from 'react-loader-spinner';
import Router from 'next/router';
import { updateReports } from '../../../components/admin/ApiAdmin';

const ReportUpdate = ({ currentUser, ReportId }) => {
  const [data2, setData] = useState([]);

  const [values, setValues] = useState({
    security: '',
    year: '',
    file: '',
    filename: '',
    loading: false,
    error: '',
    createdMail: '',
    redirectToProfile: false,
    formData: '',
  });

  const {
    security,
    year,
    loading,
    filename,
    error,
    createdMail,
    redirectToProfile,
    formData,
  } = values;

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/securities/reports/${ReportId}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData(data);
      setValues({
        ...values,
        security: data.security,
        filename: data.filename,
        year: data.year,
        formData: new FormData(),
      });
    },
  });

  // Operations

  useEffect(() => {
    currentUser && currentUser.userType != 1
      ? Router.push('/auth/access-denied')
      : '';
    doRequest2();
  }, []);

  const handleChnage = (name) => (event) => {
    const value = name === 'file' ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    //
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    updateReports(ReportId, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          security: '',
          filename: '',
          year: '',
          file: '',
          loading: false,
          redirectToProfile: true,
          createdMail: data.security,
        });
      }
    });
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

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return Router.push(`/admin/email/${ReportId}`);
      }
    }
  };

  const showLoading = () =>
    loading && (
      <div>
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
      </div>
    );

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
                        <div className="card-inner card-inner-lg">
                          <div className="nk-block-head">
                            <div className="nk-block-head-content">
                              <h4 className="nk-block-title">Report</h4>
                              <div className="nk-block-des"></div>
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
                                  <span className="data-label">security</span>
                                  <span className="data-value">
                                    {data2.security}
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
                                  <span className="data-label">filename</span>
                                  <span className="data-value">
                                    {data2.filename}
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
                                  <span className="data-label">year</span>
                                  <span className="data-value">
                                    {data2.year}
                                  </span>
                                </div>
                                <div className="data-col data-col-end">
                                  <span className="data-more disable">
                                    <em className="icon ni ni-lock-alt"></em>
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
        {/* modal here */}
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
              {showLoading()}
              <div className="modal-body modal-body-lg">
                <h5 className="title">Update Profile</h5>
                <ul className="nk-nav nav nav-tabs">
                  <li className="nav-item">
                    <a
                      className="nav-filename active"
                      data-toggle="tab"
                      href="#personal"
                    >
                      Personal
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane active" id="personal">
                    <form onSubmit={clickSubmit}>
                      <div className="row gy-4">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label" for="full-name">
                              security
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="full-name"
                              value={security}
                              onChange={handleChnage('security')}
                              placeholder={data2.security}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label" for="display-name">
                              filename
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="display-name"
                              value={filename}
                              onChange={handleChnage('filename')}
                              placeholder={data2.filename}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              year
                            </label>
                            <textarea
                              type="text"
                              className="form-control form-control-lg"
                              value={year}
                              onChange={handleChnage('year')}
                              placeholder={data2.year}
                              style={{ height: '200px' }}
                            />
                            {/* <CKEditor
                              editor={ClassicEditor}
                              name="description"
                              onChange={handleOnChange}
                            /> */}
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              File
                            </label>
                            <input
                              onChange={handleChnage('file')}
                              type="file"
                              name="file"
                              className="form-control form-control-lg"
                              id="input-1"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          {/* {loading3 && loading3 ? (
                            <a
                              href="#"
                              className="btn btn-lg btn-danger btn-block"
                            >
                              {' '}
                              {cardLoading()}
                              Loading.....
                            </a>
                          ) : ( */}
                          <input
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            value="Update"
                          />
                          {/* )}{' '} */}
                        </div>
                        {/* {errors3} */}
                        {/* {redirectUser()} */}
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

ReportUpdate.getInitialProps = async (context, client, currentUser) => {
  const { update } = context.query;

  return { ReportId: update };
};

export default ReportUpdate;
