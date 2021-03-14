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
                    <a href="/admin/dashboard" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">Default Dashboard</span>
                    </a>
                  </li>

                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary-alt">Users</h6>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/admin/users" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">User List</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/admin/users/add-user" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">Create User</span>
                    </a>
                  </li>

                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary-alt">Mails</h6>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/admin/email" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">Email List</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/admin/email/create" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">Create Email</span>
                    </a>
                  </li>

                  <li className="nk-menu-heading">
                    <h6 className="overline-title text-primary-alt">Reports</h6>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/admin/reports" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">Report List</span>
                    </a>
                  </li>
                  <li className="nk-menu-item">
                    <a href="/admin/reports/create" className="nk-menu-link">
                      <span className="nk-menu-icon">
                        <em className="icon ni ni-bitcoin-cash"></em>
                      </span>
                      <span className="nk-menu-text">Create Report</span>
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
