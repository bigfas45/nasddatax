import { Fragment } from 'react';
import Layout from '../../components/layout';
const Access = () => {
  return (
    <Fragment>
      <Layout title="Access Denied | NASD Data Portal" description="" />
      <body class="nk-body bg-white npc-general pg-error">
        <div class="nk-app-root">
          <div class="nk-main ">
            <div class="nk-wrap nk-wrap-nosidebar">
              <div class="nk-content ">
                <div class="nk-block nk-block-middle wide-xs mx-auto">
                  <div class="nk-block-content nk-error-ld text-center">
                    <h1 class="nk-error-head">401</h1>

                    <h3 class="nk-error-title"> ACCESS DENIED</h3>
                    <h3 class="nk-error-title">You need to login to acess the page </h3>
                    <p class="nk-error-text">
                      Contact marketoperations@nasdng.com or (+234-902-455-9686)
                      for more information.
                    </p>
                    <a
                      href="user/auth/signin"
                      class="btn btn-lg btn-primary mt-2"
                    >
                      Signin
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

export default Access;
