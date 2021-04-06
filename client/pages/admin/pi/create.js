import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import Link from 'next/link';
import Router from 'next/router';

const Create = ({ currentUser }) => {


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
  



  const { doRequest2, errors2, success } = useRequest2({
    url: '/api/brokers/add',
    method: 'post',
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
    onSuccess: (data) => {},
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest2();
  };

    const showSuccess = () => (
      <div class="example-alert" style={{ display: success ? '' : 'none' }}>
        <div class="alert alert-primary  alert-icon">
          <em class="icon ni ni-check-circle"></em> <strong>Well done!</strong>{' '}
          <strong>Success!</strong> New PI was created.{' '}
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
                            Create PI form
                          </h4>
                          <div className="nk-block-des"></div>
                        </div>
                      </div>
                      <div className="card card-bordered">
                        <div className="card-inner">
                          {showSuccess()}
                          <div className="card-head">
                            <h5 className="card-title">PI </h5>
                          </div>
                          <form onSubmit={onSubmit}>
                            <div className="row g-4">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label
                                    className="form-label"
                                    for="full-name-1"
                                  >
                                    member_name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={member_name}
                                      onChange={(e) =>
                                        setmember_name(e.target.value)
                                      }
                                      required
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
                                    member_code
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={member_code}
                                      onChange={(e) =>
                                        setmember_code(e.target.value)
                                      }
                                      required
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
                                    registration_type
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={registration_type}
                                      onChange={(e) =>
                                        setregistration_type(e.target.value)
                                      }
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
                                    registered_Address
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={registered_Address}
                                      onChange={(e) =>
                                        setregistered_Address(e.target.value)
                                      }
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
                                    rc_number
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={rc_number}
                                      onChange={(e) =>
                                        setrc_number(e.target.value)
                                      }
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
                                    website
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={website}
                                      onChange={(e) =>
                                        setwebsite(e.target.value)
                                      }
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
                                    date_of_incorporation
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={date_of_incorporation}
                                      onChange={(e) =>
                                        setdate_of_incorporation(e.target.value)
                                      }
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
                                    phone
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={phone}
                                      onChange={(e) => setphone(e.target.value)}
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
                                    sec_registered
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={sec_registered}
                                      onChange={(e) =>
                                        setsec_registered(e.target.value)
                                      }
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
                                    p_contact_name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={p_contact_name}
                                      onChange={(e) =>
                                        setp_contact_name(e.target.value)
                                      }
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
                                    p_contact_phone
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={p_contact_phone}
                                      onChange={(e) =>
                                        setp_contact_phone(e.target.value)
                                      }
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
                                    p_contact_email
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={p_contact_email}
                                      onChange={(e) =>
                                        setp_contact_email(e.target.value)
                                      }
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
                                    enq_contact_name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={enq_contact_name}
                                      onChange={(e) =>
                                        setenq_contact_name(e.target.value)
                                      }
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
                                    enq_contact_phone
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={enq_contact_phone}
                                      onChange={(e) =>
                                        setenq_contact_phone(e.target.value)
                                      }
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
                                    enq_email_com
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={enq_email_com}
                                      onChange={(e) =>
                                        setenq_email_com(e.target.value)
                                      }
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
                                    c_contact_name
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={c_contact_name}
                                      onChange={(e) =>
                                        setc_contact_name(e.target.value)
                                      }
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
                                    c_contact_phone
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={c_contact_phone}
                                      onChange={(e) =>
                                        setc_contact_phone(e.target.value)
                                      }
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
                                    c_contact_email
                                  </label>
                                  <div className="form-control-wrap">
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={c_contact_email}
                                      onChange={(e) =>
                                        setc_contact_email(e.target.value)
                                      }
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
                          {errors2}
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

Create.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default Create;
