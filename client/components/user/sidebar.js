import { Fragment } from 'react';

const SiderBar = () => {
  return (
    <Fragment>
      <div className="nk-sidebar nk-sidebar-fixed " data-content="sidebarMenu">
        <div className="nk-sidebar-element nk-sidebar-head">
          <div className="nk-sidebar-brand">
            <a href="/" className="logo-link nk-sidebar-logo">
              <img
                className="logo-light logo-img"
                src="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                srcSet="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                alt="logo"
              />
              <img
                className="logo-dark logo-img"
                src="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                srcSet="https://nasdng.com/wp-content/uploads/2018/11/NASD-OTC-EXchange-Logo-1.png"
                alt="logo-dark"
              />
            </a>
          </div>
          <div className="nk-menu-trigger mr-n2">
            <a
              href="#"
              className="nk-nav-toggle nk-quick-nav-icon d-xl-none"
              data-target="sidebarMenu"
            >
              <em className="icon ni ni-arrow-left"></em>
            </a>
          </div>
        </div>
        <div className="nk-sidebar-element">
          <div className="nk-sidebar-body" data-simplebar>
            <div className="nk-sidebar-content">
              <div className="nk-sidebar-menu">
                <ul className="nk-menu">
                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary-alt">
                      Dashboards
                    </h6>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/user/dashboard" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">Default Dashboard</span>
                    </a>
                  </li>

                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary-alt">Inbox</h6>
                  </li>

                  <li className="nk-menu-item">
                    <a href="/user/inbox/" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-users"></em>
                      </span>
                      <span className="nk-menu-text">Inbox</span>
                    </a>
                  </li>

                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary-alt">
                      Securities
                    </h6>
                  </li>

                  <li className="nk-menu-item">
                    <a href="/user/securities/" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-users"></em>
                      </span>
                      <span className="nk-menu-text">Securities</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a
                      href="/user/securities/performance"
                      className="nk-menu-link"
                    >
                      <span className="nk-menu-icon">
                        <span className="nk-menu-icon">
                          <em className="icon ni ni-grid-alt"></em>
                        </span>
                      </span>
                      <span className="nk-menu-text">
                        Securities Performance{' '}
                      </span>
                    </a>
                  </li>

                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary-alt">Equity</h6>
                  </li>
                  <li className="nk-menu-item has-sub">
                    <a href="/user/equity/" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-signin"></em>
                      </span>
                      <span className="nk-menu-text">Trade Report</span>
                    </a>
                  </li>

                  <li className="nk-menu-item has-sub">
                    <a href="/user/equity/price-list" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-trend-up"></em>
                      </span>
                      <span className="nk-menu-text">Price List</span>
                    </a>
                  </li>

                  <li className="nk-menu-item has-sub">
                    <a href="/user/equity/summary" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-chart-down"></em>
                      </span>
                      <span className="nk-menu-text">Monthly Summary</span>
                    </a>
                  </li>

                  <li className="nk-menu-heading">
                    <h6 className="overline-title">Brokers</h6>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/user/brokers" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-dashlite"></em>
                      </span>
                      <span className="nk-menu-text">All Brokers Buy Trade</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/user/brokers/brokers-sell" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-dashlite"></em>
                      </span>
                      <span className="nk-menu-text">All Brokers Sell Trade</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a
                      href="/user/brokers/top-10-brokers"
                      className="nk-menu-link"
                    >
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-layers"></em>
                      </span>
                      <span className="nk-menu-text">Top 10 Brokers</span>
                    </a>
                  </li>

                  <li className="nk-menu-item">
                    <a href="/user/brokers/buy" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-layers"></em>
                      </span>
                      <span className="nk-menu-text">Trade Log Buy Trade</span>
                    </a>
                  </li>

                  <li className="nk-menu-item">
                    <a href="/user/brokers/sell" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-layers"></em>
                      </span>
                      <span className="nk-menu-text">Trade Log Sell Trade</span>
                    </a>
                  </li>
                 
                </ul>
              </div>
              <div className="nk-sidebar-footer">
                <ul className="nk-menu nk-menu-footer">
                  <li className="nk-menu-item">
                    <a href="#" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-help-alt"></em>
                      </span>
                      <span className="nk-menu-text">Support</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SiderBar;
