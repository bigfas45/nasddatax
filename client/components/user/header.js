import {Fragment} from 'react'

const Header = ({ currentUser }) => {

  return (
    <Fragment>
      <div className="nk-header nk-header-fixed is-light">
        <div className="container-fluid">
          <div className="nk-header-wrap">
            <div className="nk-menu-trigger d-xl-none ml-n1">
              <a
                href="#"
                className="nk-nav-toggle nk-quick-nav-icon"
                data-target="sidebarMenu"
              >
                <em className="icon ni ni-menu"></em>
              </a>
            </div>
            <div className="nk-header-brand d-xl-none">
              <a href="html/index.html" className="logo-link">
                <img
                  className="logo-light logo-img"
                  src="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                  srcSet="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.pngg 2x"
                  alt="logo"
                />
                <img
                  className="logo-dark logo-img"
                  src="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                  srcSet="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png 2x"
                  alt="logo-dark"
                />
              </a>
            </div>
            <div className="nk-header-news d-none d-xl-block">
              <div className="nk-news-list">
                <a className="nk-news-item" href="#">
                  <div className="nk-news-icon">
                    <em className="icon ni ni-card-view"></em>
                  </div>
                  <div className="nk-news-text">
                    <p>
                      Do you know the latest update of 2019?{' '}
                      <span>
                        {' '}
                        A overview of our is now available on YouTube
                      </span>
                    </p>
                    <em className="icon ni ni-external"></em>
                  </div>
                </a>
              </div>
            </div>
            <div className="nk-header-tools">
              <ul className="nk-quick-nav">
                <li className="dropdown user-dropdown">
                  <a
                    href="#"
                    className="dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <div className="user-toggle">
                      <div className="user-avatar sm">
                        <em className="icon ni ni-user-alt"></em>
                      </div>
                      <div className="user-info d-none d-md-block">
                        <div className="user-status">
                          {currentUser && currentUser.userType === 0
                            ? 'Broker'
                            : 'Administrator'}
                        </div>
                        <div className="user-name dropdown-indicator">
                          {currentUser && currentUser.firstname}
                        </div>
                      </div>
                    </div>
                  </a>
                  <div className="dropdown-menu dropdown-menu-md dropdown-menu-right dropdown-menu-s1">
                    <div className="dropdown-inner user-card-wrap bg-lighter d-none d-md-block">
                      <div className="user-card">
                        <div className="user-avatar">
                          {/* str.charAt(0) */}

                          <span>
                            {currentUser &&
                              currentUser.firstname.charAt(0) +
                                currentUser.lastname.charAt(0)}{' '}
                          </span>
                        </div>
                        <div className="user-info">
                          <span className="lead-text">
                            {' '}
                            {currentUser && currentUser.firstname}{' '}
                            {currentUser && currentUser.lastname}
                          </span>
                          <span className="sub-text">
                            {' '}
                            {currentUser && currentUser.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li>
                          <a href="#">
                            <em className="icon ni ni-user-alt"></em>
                            <span>View Profile</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="icon ni ni-setting-alt"></em>
                            <span>Account Setting</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <em className="icon ni ni-activity-alt"></em>
                            <span>Login Activity</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="dropdown-inner">
                      <ul className="link-list">
                        <li>
                          <a href="/auth/signout">
                            <em className="icon ni ni-signout"></em>
                            <span>Sign out</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}


export default Header;