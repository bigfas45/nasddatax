import React, { useState, Fragment, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import useRequest3 from '../../../hooks/use-request3';
import useRequest4 from '../../../hooks/use-request4';
import useRequest5 from '../../../hooks/use-request5';
import useRequest6 from '../../../hooks/use-request6';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import Loader from 'react-loader-spinner';
import Router from 'next/router';
import { updateEmail } from '../../../components/admin/ApiAdmin';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const EmailUpdate = ({ currentUser, EmailId }) => {
  const [data2, setData] = useState([]);

  const [values, setValues] = useState({
    subject: '',
    message: '',
    file: '',
    link: '',
    loading: false,
    error: '',
    createdMail: '',
    redirectToProfile: false,
    formData: '',
  });

  const {
    subject,
    message,
    loading,
    link,
    error,
    createdMail,
    redirectToProfile,
    formData,
  } = values;

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/users/email/${EmailId}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData(data);
      setValues({
        ...values,
        subject: data.subject,
        link: data.link,
        message: data.message,
        formData: new FormData(),
      });
    },
  });


  // Operations


    const { doRequest3, errors3, loading3, success3 } = useRequest3({
      url: `/api/users/email/operations/${EmailId}`,
      method: 'get',
      body: {},

      onSuccess: (data) => {
      console.log(data);
       
      },
    });
  
 
  
    const showLoading3 = () =>
      loading3 && (
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
  
  
     const showAlert3 = () =>
       success3 && (
         <div>
           <div class="example-alert">
             <div class="alert alert-primary alert-icon">
               <em class="icon ni ni-alert-circle"></em>{' '}
               <strong>Test email to marketoperations@nasdng.com has been sent!!! </strong>. 
             </div>
           </div>
         </div>
    );
  
   const submit = () => {
     confirmAlert({
       title: 'Confirm to submit',
       message: 'Are you sure to send email to marketoperations@nasdng.com?.',
       buttons: [
         {
           label: 'Yes',
           onClick: () => doRequest3(),
         },
         {
           label: 'No',
           onClick: () => alert('Click No'),
         },
       ],
     });
   };
  
  
  // End Operation
  

  // NASD PI
  
      const { doRequest4, errors4, loading4, success4 } = useRequest4({
        url: `/api/users/email/pi/${EmailId}`,
        method: 'get',
        body: {},

        onSuccess: (data) => {
          console.log(data);
        },
      });
  
  
   const showLoading4 = () =>
     loading4 && (
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

   const showAlert4 = () =>
     success4 && (
       <div>
         <div class="example-alert">
           <div class="alert alert-primary alert-icon">
             <em class="icon ni ni-alert-circle"></em>{' '}
             <strong>
                Email to NASD Participant has been sent!!!{' '}
             </strong>
             .
           </div>
         </div>
       </div>
    );
  
  
   const submitPi = () => {
     confirmAlert({
       title: 'Confirm to submit',
       message: 'Are you sure to send email to All NASD Participant.',
       buttons: [
         {
           label: 'Yes',
           onClick: () => doRequest4(),
         },
         {
           label: 'No',
           onClick: () => alert('Click No'),
         },
       ],
     });
  };
  
  // END PI


  // Start Image

   const { doRequest5, errors5, loading5, success5 } = useRequest5({
     url: `/api/users/email/image/${EmailId}`,
     method: 'get',
     body: {},

     onSuccess: (data) => {
       console.log(data);
     },
   });
  
  
  const showLoading5 = () =>
    loading5 && (
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

  const showAlert5 = () =>
    success5 && (
      <div>
        <div class="example-alert">
          <div class="alert alert-primary alert-icon">
            <em class="icon ni ni-alert-circle"></em>{' '}
            <strong>Email to NASD Participant has been sent!!! </strong>.
          </div>
        </div>
      </div>
    );

  const submitImage = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to send email with image to All NASD Participant.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => doRequest5(),
        },
        {
          label: 'No',
          onClick: () => alert('Click No'),
        },
      ],
    });
  };

  // End Image


  // Start For All market participant

     const { doRequest6, errors6, loading6, success6 } = useRequest6({
       url: `/api/users/email/all/${EmailId}`,
       method: 'get',
       body: {},

       onSuccess: (data) => {
         console.log(data);
       },
     });
  
    const showAlert6 = () =>
      success6 && (
        <div>
          <div class="example-alert">
            <div class="alert alert-primary alert-icon">
              <em class="icon ni ni-alert-circle"></em>{' '}
              <strong>Email to NASD Participant has been sent!!! </strong>.
            </div>
          </div>
        </div>
    );
  
    const submitAllPI = () => {
      confirmAlert({
        title: 'Confirm to submit',
        message:
          'Are you sure to send email to both NSE & NASD Participant.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => doRequest6(),
          },
          {
            label: 'No',
            onClick: () => alert('Click No'),
          },
        ],
      });
    };
  

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

  const handleOnChange = (e, editor) => {
    const descriptionData = editor.getData();
    formData.append('description', descriptionData);
  };

  const clickSubmit = (event) => {
    //
    event.preventDefault();
    setValues({ ...values, error: '', loading: true });

    updateEmail(EmailId, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          subject: '',
          link: '',
          message: '',
          file: '',
          loading: false,
          redirectToProfile: true,
          createdMail: data.subject,
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
          return Router.push(`/admin/email/${EmailId}`);
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
                    {showAlert3()}
                    {showAlert4()}
                    {showAlert5()}
                    {showAlert6()}
                    <div className="nk-block">
                      <div className="card card-bordered">
                        <ul className="nav nav-tabs nav-tabs-mb-icon nav-tabs-card">
                          <li className="nav-item">
                            <a className="nav-link active">
                              <em className="icon ni ni-user-fill-c"></em>
                              <span>Email</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              onClick={() =>
                                submit(() => {
                                  console.log('done');
                                })
                              }
                              class="nav-link"
                            >
                              {showLoading3()}
                              <em class="icon ni ni-repeat"></em>
                              <span>Email Market Operation</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              onClick={() =>
                                submitPi(() => {
                                  console.log('done');
                                })
                              }
                            >
                              {showLoading4()}
                              <em class="icon ni ni-repeat"></em>
                              <span>Email NASD Participant</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              onClick={() =>
                                submitAllPI(() => {
                                  console.log('done');
                                })
                              }
                            >
                              <em class="icon ni ni-repeat"></em>
                              <span>NSE/NASD Participant</span>
                            </a>
                          </li>
                          <li class="nav-item">
                            <a
                              class="nav-link"
                              onClick={() =>
                                submitImage(() => {
                                  console.log('done');
                                })
                              }
                            >
                              <em class="icon ni ni-repeat"></em>
                              <span>Email With ImageTo NASD Participant</span>
                            </a>
                          </li>
                        </ul>
                        <div className="card-inner card-inner-lg">
                          <div className="nk-block-head">
                            <div className="nk-block-head-content">
                              <h4 className="nk-block-title">Email</h4>
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
                                  <span className="data-label">Subject</span>
                                  <span className="data-value">
                                    {data2.subject}
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
                                  <span className="data-label">Link</span>
                                  <span className="data-value">
                                    {data2.link}
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
                                  <span className="data-label">Message</span>
                                  <span className="data-value">
                                    {data2.message}
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
                                  <span className="data-label">File</span>
                                  <span className="data-value">
                                    {data2.message}
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
                    <form onSubmit={clickSubmit}>
                      <div className="row gy-4">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label" for="full-name">
                              Subject
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="full-name"
                              value={subject}
                              onChange={handleChnage('subject')}
                              placeholder={data2.subject}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label" for="display-name">
                              Link
                            </label>
                            <input
                              type="text"
                              className="form-control form-control-lg"
                              id="display-name"
                              value={link}
                              onChange={handleChnage('link')}
                              placeholder={data2.link}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label className="form-label" for="phone-no">
                              Message
                            </label>
                            <textarea
                              type="text"
                              className="form-control form-control-lg"
                              value={message}
                              onChange={handleChnage('message')}
                              placeholder={data2.message}
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

EmailUpdate.getInitialProps = async (context, client, currentUser) => {
  const { update } = context.query;

  return { EmailId: update };
};

export default EmailUpdate;
