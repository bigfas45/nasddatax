import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest2 from '../../../hooks/use-request2';
import ExportToExcelEquity from '../../../components/user/Exports/ExportToExcelEquity';
import Loader from 'react-loader-spinner';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Router, { useRouter } from 'next/router';
import moment from 'moment';

const Equity = ({ currentUser }) => {
  const [data, setData] = useState([]);

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/securities/bonds`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    currentUser && currentUser.status === 'free'
      ? Router.push('/auth/access-denied')
      : '';
    doRequest2();
  }, []);

  const columns = [
    {
      Header: 'Trade Date',
      accessor: 'trade_date', // String-based value accessors!
    },

    {
      Header: 'Security',
      accessor: 'security', // String-based value accessors!
    },
    {
      Header: 'Value Traded',
      accessor: 'value_traded', // String-based value accessors!
    },
    {
      Header: 'Buy Firm',
      accessor: 'buy_firm', // String-based value accessors!
    },
    {
      Header: 'Buy Fees',
      accessor: 'buy_fees', // String-based value accessors!
    },
    {
      Header: 'Sell Firm',
      accessor: 'sell_firm', // String-based value accessors!
    },
    {
      Header: 'Sell Fees',
      accessor: 'sell_fees', // String-based value accessors!
    },
    {
      Header: 'Total Fees',
      accessor: 'total_fees', // String-based value accessors!
    },
  ];

  const showLoading = () =>
    loading2 && (
      <div className="text-center">
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={1000000} //3 secs
        />
      </div>
    );

  return (
    <Fragment>
      <Layout title="User Dashboard | NASD Data Portal" description="" />
      <body className="nk-body npc-crypto bg-white has-sidebar ">
        <div className="nk-app-root">
          <div className="nk-main ">
            <SiderBar />
            <div className="nk-wrap ">
              <Header currentUser={currentUser} />
              <div className="nk-content nk-content-fluid">
                <Ticker />

                <div className="nk-content nk-content-fluid">
                  <div className="container-xl wide-lg">
                    <div className="nk-content-body">
                      <div className="nk-block-head nk-block-head-sm">
                        <div className="nk-block-between">
                          <div className="nk-block-head-content">
                            <h3 className="nk-block-title page-title">
                              Bonds
                            </h3>
                            <div className="nk-block-des text-soft">
                              <p>Welcome to Bonds Dashboard</p>
                            </div>
                          </div>
                          <div className="nk-block-head-content">
                            <div className="toggle-wrap nk-block-tools-toggle">
                              <a
                                href="#"
                                className="btn btn-icon btn-trigger toggle-expand mr-n1"
                                data-target="pageMenu"
                              >
                                <em className="icon ni ni-more-v"></em>
                              </a>
                              <div
                                className="toggle-expand-content"
                                data-content="pageMenu"
                              >
                                <ul className="nk-block-tools g-3">
                                  <li className="nk-block-tools-opt">
                                    <div className="drodown">
                                      <a
                                        href="#"
                                        className="dropdown-toggle btn btn-icon btn-primary"
                                        data-toggle="dropdown"
                                      >
                                        <em className="icon ni ni-plus"></em>
                                      </a>
                                      <div className="dropdown-menu dropdown-menu-right">
                                        <ul className="link-list-opt no-bdr">
                                          <li>
                                            <a href="#">
                                              <em className="icon ni ni-user-add-fill"></em>
                                              <span>Add User</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <em className="icon ni ni-coin-alt-fill"></em>
                                              <span>Add Order</span>
                                            </a>
                                          </li>
                                          <li>
                                            <a href="#">
                                              <em className="icon ni ni-note-add-fill-c"></em>
                                              <span>Add Page</span>
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
                      </div>
                      <div class="nk-block">
                        <div class="row g-gs">
                          <div class="col-md-12">
                            <div class="card card-bordered card-full">
                              <div class="card-inner">
                                {showLoading()}
                                {success ? (
                                  <ReactTable
                                    data={data}
                                    columns={columns}
                                    filterable
                                    sortable
                                    defaultPageSize={10}
                                    showPaginationTop
                                    showPaginationBottom={false}
                                  >
                                    {(state, filtredData, instance) => {
                                      const reactTable = state.pageRows.map(
                                        (post) => {
                                          return post._original;
                                        }
                                      );
                                      return <div>{filtredData()}</div>;
                                    }}
                                  </ReactTable>
                                ) : (
                                  ''
                                )}
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
        </div>
      </body>
    </Fragment>
  );
};

export default Equity;
