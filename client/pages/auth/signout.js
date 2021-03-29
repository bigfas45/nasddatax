import { useEffect, Fragment } from 'react';
import Router from 'next/router';
import useRequest2 from '../../hooks/use-request2';
import Ticker from '../../components/ticker';
import Layout from '../../components/layout';
import SiderBar from '../../components/admin/sidebar';
import Header from '../../components/user/header';
import Footer from '../../components/user/footer';

export default () => {
  const { doRequest2, loading2, success } = useRequest2({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => {},
  });

  useEffect(() => {
    doRequest2();
  }, []);

  // return

  const body = () => {
    return (
      <Fragment>
        {' '}
        <Layout title="Logout... | NASD Data Portal" description="" />
        <body class="nk-body bg-white npc-general pg-error">
          <div class="nk-app-root">
            <div class="nk-main ">
              <div class="nk-wrap nk-wrap-nosidebar">
                <Header />
                <div class="nk-content ">
                  <Ticker />
                  <div class="nk-block nk-block-middle wide-xs mx-auto">
                    <div class="nk-block-content nk-error-ld text-center">
                      <h3 class="nk-error-head">Logout</h3>
                      <h3 class="nk-error-title">
                        You've successfully logged out of Nasd data portal. Come
                        back soon!
                      </h3>
                      {/* <p class="nk-error-text">
                      We are very sorry for inconvenience. It looks like you’re
                      try to access a page that either has been deleted or never
                      existed.
                    </p> */}
                      <a
                        href="/auth/signin"
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

  return (
    <Fragment>
      <Layout title="Login out | NASD Data Portal" description="" />

      {success ? body() : <h1>Signin out.....</h1>}
    </Fragment>
  );
};
