import { useState, Fragment } from 'react';
import Router from 'next/router';
import useRequest2 from '../../hooks/use-request2';
import Layout from '../../components/layout';
// import { Spinner, Button } from 'reactstrap';
import Ticker from '../../components/ticker';
import Link from 'next/link';
import Loader from 'react-loader-spinner';

const Signup = () => {
 const [email, setEmail] = useState('');
 const [firstname, setFirstname] = useState('');
 const [lastname, setLastName] = useState('');
 const [bCode, setBcode] = useState('');

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      firstname,
      lastname,
      bCode,
    },
    onSuccess: (data) => {
     
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest2();
  };

    const showSuccess = () => (
      <div class="example-alert" style={{ display: success ? '' : 'none' }}>
        <div class="alert alert-primary  alert-icon">
          <em class="icon ni ni-check-circle"></em>{' '}
          <strong>Congratulations {firstname}!</strong> New Account has been
          created for you. Check your registed <strong>email({email})</strong>{' '}
          for login details{' '}
        </div>
      </div>
    );

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


  const form = () => {
    return (
      <Fragment>
        <div className="brand-logo pb-4 text-center">
          <Link href="/">
            <a href="/" className="logo-link">
              <img
                className="logo-light logo-img logo-img-lg"
                src="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                srcSet="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png 2x"
                alt="logo"
              />
              <img
                className="logo-dark logo-img logo-img-lg"
                src="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                srcSet="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png 2x"
                alt="logo-dark"
              />
            </a>
          </Link>
        </div>
        <div className="card card-bordered">
          <div className="card-inner card-inner-lg">
            <div className="nk-block-head">
              <div className="nk-block-head-content">
                <h4 className="nk-block-title">Account Request</h4>
                <div className="nk-block-des">
                  <p>
                    Access the NASD Data portal by providing the informations
                    below
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email
                  </label>
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control form-control-lg"
                  id="default-01"
                  placeholder="Enter your email address"
                />
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    First Name
                  </label>
                </div>
                <input
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  type="text"
                  className="form-control form-control-lg"
                  id="default-01"
                  placeholder="Enter your first name"
                />
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Last Name
                  </label>
                </div>
                <input
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="form-control form-control-lg"
                  id="default-01"
                  placeholder="Enter your last/company name"
                />
              </div>

              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Broker Code
                  </label>
                </div>
                <input
                  value={bCode}
                  onChange={(e) => setBcode(e.target.value)}
                  type="text"
                  className="form-control form-control-lg"
                  id="default-01"
                  placeholder="Enter your broker code"
                />
              </div>

              <div className="form-group">
                {loading2 && loading2 ? (
                  <a href="#" className="btn btn-lg btn-danger btn-block">
                    {' '}
                    {cardLoading()}
                    Loading.....
                  </a>
                ) : (
                  <input
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    value="Request"
                  />
                )}{' '}
              </div>
              {showSuccess()}
              {errors2}
            </form>
            <div className="form-note-s2 text-center pt-4">
              {' '}
              Already have an account?
              <a href="/auth/signin">
                Sign in instead
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Ticker></Ticker>
      <body className="nk-body bg-white npc-general pg-auth">
        <Layout title="Login | NASD Data Portal" description="" />
        <div className="nk-app-root">
          <div className="nk-main ">
            <div className="nk-wrap nk-wrap-nosidebar">
              <div className="nk-content ">
                <div className="nk-block nk-block-middle nk-auth-body  wide-xs">
                  {/*  */}
                  {form()}
                </div>
                <div className="nk-footer nk-auth-footer-full">
                  <div className="container wide-lg">
                    <div className="row g-3">
                      <div className="col-lg-6 order-lg-last">
                        <ul className="nav nav-sm justify-content-center justify-content-lg-end">
                          <li className="nav-item">
                            <a className="nav-link" href="#">
                              Terms & Condition
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">
                              Privacy Policy
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#">
                              Help
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-6">
                        <div className="nk-block-content text-center text-lg-left">
                          <p className="text-soft">
                            &copy; 2019 CryptoLite. All Rights Reserved.
                          </p>
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

export default Signup;
