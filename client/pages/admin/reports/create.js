import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest from '../../../hooks/use-request';
import Router from 'next/router';
import { createReport } from '../../../components/admin/ApiAdmin';
import Loader from 'react-loader-spinner';

const Create = ({ currentUser }) => {
  const [values, setValues] = useState({
    security: '',
    year: '',
    filename: '',
    file: '',
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

  const init = () => {
    setValues({ ...values, formData: new FormData() });
  };

  useEffect(() => {
    init();
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

    createReport(formData).then((data) => {
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
          createdMail: data.security,
        });
      }
    });
  };

  const showError = () => (
    <div
      className="alert alert-danger alert-dismissible alert-round"
      role="alert"
      style={{ display: error ? '' : 'none' }}
    >
      <button type="button" className="close" data-dismiss="alert">
        ×
      </button>
      <div className="alert-icon">
        <i className="icon-close"></i>
      </div>
      <div className="alert-year">
        <span>
          <strong>Error!</strong> {error}
        </span>
      </div>
    </div>
  );

  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return Router.push(`/admin/email/`);
      }
    }
  };

  const showSuccess = () => (
    <div class="example-alert" style={{ display: createdMail ? '' : 'none' }}>
      <div class="alert alert-primary  alert-icon">
        <em class="icon ni ni-check-circle"></em> <strong>Well done!</strong>{' '}
        <strong>Success!</strong> New Report was created.{' '}
      </div>
    </div>
  );

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
                    <div className="nk-block nk-block-lg">
                      <div className="nk-block-head">
                        <div className="nk-block-head-content">
                          <h4 className="title nk-block-title">
                            Create Report form
                          </h4>
                          <div className="nk-block-des"></div>
                        </div>
                      </div>
                      <div className="card card-bordered">
                        <div className="card-inner">
                          {showLoading()}
                          {showError()}
                          {showSuccess()}
                          <br />
                          <div className="card-head">
                            <h5 className="card-title">Report </h5>
                          </div>
                          <form onSubmit={clickSubmit}>
                            <div className="row g-4">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="full-name-1"
                                  >
                                    security
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      onChange={handleChnage('security')}
                                      type="text"
                                      className="form-control"
                                      value={security}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="full-name-1"
                                  >
                                    File Name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      onChange={handleChnage('filename')}
                                      value={filename}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="email-address-1"
                                  >
                                    year
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="number"
                                      className="form-control form-control-lg"
                                      onChange={handleChnage('year')}
                                      value={year}
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="phone-no-1"
                                  >
                                    File
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      onChange={handleChnage('file')}
                                      type="file"
                                      name="file"
                                      className="form-control form-control-lg"
                                      id="input-1"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="col-12">
                                <div className="form-group">
                                  <button className="btn btn-lg btn-primary">
                                    Save Email
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {redirectUser()}

            <Footer />
          </div>
        </div>
      </body>
    </Fragment>
  );
};

Create.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default Create;
