import { useState, Fragment } from 'react';
import Router from 'next/router';
import useRequest2 from '../../hooks/use-request2';
import Layout from '../../components/layout';
// import { Spinner, Button } from 'reactstrap';
import Ticker from '../../components/ticker';
import Link from 'next/link';
import Loader from 'react-loader-spinner';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: (data) => {
      setData(data);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    doRequest2();
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

  const body = () => {
    return (
      <Fragment>
        {' '}
        <Layout title="Logout... | NASD Data Portal" description="" />
        <body class="nk-body bg-white npc-general pg-error">
          <div class="nk-app-root">
            <div class="nk-main ">
              <div class="nk-wrap nk-wrap-nosidebar">
                <div class="nk-content ">
                  <div class="nk-block nk-block-middle wide-xs mx-auto">
                    <div class="nk-block-content nk-error-ld text-center">
                      <h3 class="nk-error-head">Signin</h3>
                      <h3 class="nk-error-title">
                        Welcome back {data.firstname}
                      </h3>

                      <a
                        href="/user/dashboard"
                        class="btn btn-lg btn-primary mt-2"
                      >
                        Click here to continue....
                      </a>
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
                <h4 className="nk-block-title">Signin</h4>
                <div className="nk-block-des">
                  <p>
                    Access the NASD Data portal using your email and passcode.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Email or Username
                  </label>
                </div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control form-control-lg"
                  id="default-01"
                  placeholder="Enter your email address or username"
                />
              </div>
              <div className="form-group">
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Passcode
                  </label>
                  <a
                    className="link link-primary link-sm"
                    href="/auth/forget-password"
                  >
                    Forgot Code?
                  </a>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#"
                    className="form-icon form-icon-right passcode-switch"
                    data-target="password"
                  >
                    <em className="passcode-icon icon-show icon ni ni-eye"></em>
                    <em className="passcode-icon icon-hide icon ni ni-eye-off"></em>
                  </a>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    className="form-control form-control-lg"
                    id="password"
                    placeholder="Enter your passcode"
                  />
                </div>
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
                    value="Sign In"
                  />
                )}{' '}
              </div>
              {errors2}
            </form>
            <div className="form-note-s2 text-center pt-4">
              {' '}
              New on our platform?{' '}
              <a href="/auth/signup">
                Request for an account
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
                  {success ? body() : form()}
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

export default Signin;
