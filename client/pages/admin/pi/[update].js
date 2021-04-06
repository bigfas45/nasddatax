import React, { useState, Fragment, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';

import Loader from 'react-loader-spinner';
import Router from 'next/router';
import { updatePi } from '../../../components/admin/ApiAdmin';

const PiUpdate = ({ currentUser, id }) => {
  const [data2, setData] = useState([]);

  const [member_name, setmember_name] = useState('');
  const [member_code, setmember_code] = useState('');
  const [registration_type, setregistration_type] = useState('');
  const [registered_Address, setregistered_Address] = useState('');
  const [rc_number, setrc_number] = useState('');
  const [website, setwebsite] = useState('');
  const [date_of_incorporation, setdate_of_incorporation] = useState('');
  const [phone, setphone] = useState('');
  const [sec_registered, setsec_registered] = useState('');
  const [p_contact_name, setp_contact_name] = useState('');
  const [p_contact_phone, setp_contact_phone] = useState('');
  const [p_contact_email, setp_contact_email] = useState('');
  const [enq_contact_name, setenq_contact_name] = useState('');
  const [enq_contact_phone, setenq_contact_phone] = useState('');
  const [enq_email_com, setenq_email_com] = useState('');
  const [c_contact_name, setc_contact_name] = useState('');
  const [c_contact_phone, setc_contact_phone] = useState('');
  const [c_contact_email, setc_contact_email] = useState('');




  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/brokers/member/${id}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData(data);
      setmember_name(data.member_name);
      setmember_code(data.member_code);
      setregistration_type(data.registration_type);
      setregistered_Address(data.registered_Address);
      setrc_number(data.rc_number);
      setwebsite(data.website);
      setdate_of_incorporation(data.date_of_incorporation);
      setphone(data.phone);
      setsec_registered(data.sec_registered);
      setp_contact_name(data.p_contact_name);
      setp_contact_phone(data.p_contact_phone);
      setp_contact_email(data.p_contact_email);
      setenq_contact_name(data.enq_contact_name);
      setenq_contact_phone(data.enq_contact_phone);
      setenq_email_com(data.enq_email_com);
      setc_contact_name(data.c_contact_name);
      setc_contact_phone(data.c_contact_phone);
      setc_contact_email(data.c_contact_email);
    }
      
  });


    const { doRequest3, errors3, loading3, success3 } = useRequest3({
      url: `/api/brokers/member/${id}`,
      method: 'put',
      body: {
        member_name,
        member_code,
        registration_type,
        registered_Address,
        rc_number,
        website,
        date_of_incorporation,
        phone,
        sec_registered,
        p_contact_name,
        p_contact_phone,
        p_contact_email,
        enq_contact_name,
        enq_contact_phone,
        enq_email_com,
        c_contact_name,
        c_contact_phone,
        c_contact_email,
      },
      onSuccess: () => {
       
      },
    });
  
    const onSubmit = async (event) => {
      event.preventDefault();

      doRequest3();
    };

  // Operations

  useEffect(() => {
    currentUser && currentUser.userType != 1
      ? Router.push('/auth/access-denied')
      : '';
    doRequest2();
  }, []);


 

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

    const showSuccess = () => (
      <div class="example-alert" style={{ display: success3 ? '' : 'none' }}>
        <div class="alert alert-primary  alert-icon">
          <em class="icon ni ni-check-circle"></em> <strong>Well done!</strong>{' '}
          <strong>Success!</strong>  PI was updated.{' '}
        </div>
      </div>
    );

  const showLoading = () =>
    loading2 && (
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

                    {/* {data2.map((pi, i) => {
                      return ( */}
                    <div className="nk-block">
                      <div className="card card-bordered">
                        <div className="card-inner card-inner-lg">
                          <div className="nk-block-head">
                            <div className="nk-block-head-content">
                              <h4 className="nk-block-title">PI</h4>
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
                                  <span className="data-label">
                                    member_name
                                  </span>
                                  <span className="data-value">
                                    {data2.member_name}
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
                                    member_code
                                  </span>
                                  <span className="data-value">
                                    {data2.member_code}
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
                                    registration_type
                                  </span>
                                  <span className="data-value">
                                    {data2.registration_type}
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
                                  <span className="data-label">rc_number</span>
                                  <span className="data-value">
                                    {data2.rc_number}
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
                                  <span className="data-label">website</span>
                                  <span className="data-value">
                                    {data2.website}
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
                                    date_of_incorporation
                                  </span>
                                  <span className="data-value">
                                    {data2.date_of_incorporation}
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
                                  <span className="data-label">phone</span>
                                  <span className="data-value">
                                    {data2.phone}
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
                                    sec_registered
                                  </span>
                                  <span className="data-value">
                                    {data2.sec_registered}
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
                                    p_contact_name
                                  </span>
                                  <span className="data-value">
                                    {data2.p_contact_name}
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
                                    p_contact_phone
                                  </span>
                                  <span className="data-value">
                                    {data2.p_contact_phone}
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
                                    p_contact_email
                                  </span>
                                  <span className="data-value">
                                    {data2.p_contact_email}
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
                                    enq_contact_name
                                  </span>
                                  <span className="data-value">
                                    {data2.enq_contact_name}
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
                                    enq_contact_phone
                                  </span>
                                  <span className="data-value">
                                    {data2.enq_contact_phone}
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
                                    enq_email_com
                                  </span>
                                  <span className="data-value">
                                    {data2.enq_email_com}
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
                                    c_contact_name
                                  </span>
                                  <span className="data-value">
                                    {data2.c_contact_name}
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
                                    c_contact_phone
                                  </span>
                                  <span className="data-value">
                                    {data2.c_contact_phone}
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
                                    c_contact_email
                                  </span>
                                  <span className="data-value">
                                    {data2.c_contact_email}
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
                    {/* );
                    })} */}
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
              {showSuccess()}
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

                {/* {data3.map((p,i) => {
                  return (
                    <Fragment> */}
                <div className="tab-content">
                  <div className="tab-pane active" id="personal">
                    <form onSubmit={onSubmit}>
                      <div className="row gy-4">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="full-name">
                              member_name
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="full-name"
                              value={member_name}
                              onChange={(e) => setmember_name(e.target.value)}
                              placeholder={data2.member_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="display-name">
                              member_code
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="display-name"
                              value={member_code}
                              onChange={(e) => setmember_code(e.target.value)}
                              placeholder={data2.member_code}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              registration_type
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={registration_type}
                              onChange={(e) =>
                                setregistration_type(e.target.value)
                              }
                              placeholder={data2.registration_type}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              registered_Address
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={registered_Address}
                              onChange={(e) =>
                                setregistered_Address(e.target.value)
                              }
                              placeholder={data2.registered_Address}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              rc_number
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={rc_number}
                              onChange={(e) => setrc_number(e.target.value)}
                              placeholder={data2.rc_number}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              website
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={website}
                              onChange={(e) => setwebsite(e.target.value)}
                              placeholder={data2.website}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              date_of_incorporation
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={date_of_incorporation}
                              onChange={(e) =>
                                setdate_of_incorporation(e.target.value)
                              }
                              placeholder={data2.date_of_incorporation}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              phone
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={phone}
                              onChange={(e) => setphone(e.target.value)}
                              placeholder={data2.phone}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              sec_registered
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={sec_registered}
                              onChange={(e) =>
                                setsec_registered(e.target.value)
                              }
                              placeholder={data2.sec_registered}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              p_contact_name
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={p_contact_name}
                              onChange={(e) =>
                                setp_contact_name(e.target.value)
                              }
                              placeholder={data2.p_contact_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              p_contact_phone
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={p_contact_phone}
                              onChange={(e) =>
                                setp_contact_phone(e.target.value)
                              }
                              placeholder={data2.p_contact_phone}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              p_contact_email
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={p_contact_email}
                              onChange={(e) =>
                                setp_contact_email(e.target.value)
                              }
                              placeholder={data2.p_contact_email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              enq_contact_name
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={enq_contact_name}
                              onChange={(e) =>
                                setenq_contact_name(e.target.value)
                              }
                              placeholder={data2.enq_contact_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              enq_contact_phone
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={enq_contact_phone}
                              onChange={(e) =>
                                setenq_contact_phone(e.target.value)
                              }
                              placeholder={data2.enq_contact_phone}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              enq_email_com
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={enq_email_com}
                              onChange={(e) => setenq_email_com(e.target.value)}
                              placeholder={data2.enq_email_com}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              c_contact_name
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={c_contact_name}
                              onChange={(e) =>
                                setc_contact_name(e.target.value)
                              }
                              placeholder={data2.c_contact_name}
                            />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              c_contact_phone
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={c_contact_phone}
                              onChange={(e) =>
                                setc_contact_phone(e.target.value)
                              }
                              placeholder={data2.c_contact_phone}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              c_contact_email
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              value={c_contact_email}
                              onChange={(e) =>
                                setc_contact_email(e.target.value)
                              }
                              placeholder={data2.c_contact_email}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <input
                            type="submit"
                            className="btn btn-lg btn-primary btn-block"
                            value="Update"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* </Fragment>
                  );
                })} */}
              </div>
            </div>
          </div>
        </div>
      </body>
    </Fragment>
  );
};

PiUpdate.getInitialProps = async (context, client, currentUser) => {
  const { update } = context.query;

  return { id: update };
};

export default PiUpdate;
