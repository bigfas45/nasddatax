import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../components/ticker';
import Layout from '../../components/layout';
import SiderBar from '../../components/admin/sidebar';
import Header from '../../components/user/header';
import Footer from '../../components/user/footer';
import useRequest2 from '../../hooks/use-request2';
import Link from 'next/link';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import Loader from 'react-loader-spinner';
import ExportToExcel from '../../components/user/Exports/Eod';
import InvestorName from '../../components/admin/investorName'




const Eod = ({ currentUser }) => {
  const [data2, setData] = useState([]);

  const { doRequest2, errors2, loading2, success } = useRequest2({
    url: `/api/equity/eod`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData(data);
    },
  });

  useEffect(() => {
    currentUser && currentUser.userType != 1
      ? Router.push('/auth/access-denied')
      : '';
    doRequest2();
  }, []);



  const columns = [
    {
      Header: 'EXTERNAL TICKET',
      accessor: 'EXTERNAL_TICKET', // String-based value accessors!
    },
    {
      Header: 'TO MEMBER',
      accessor: 'TO_MEMBER', // String-based value accessors!
      style: {
        textAlign: 'center',
      },
    },
    {
      Header: 'TO ACCOUNT NAME',
      accessor: 'TO_ACCOUNT', // String-based value accessors!

      Cell: (props) => {
        return (
          <div>
            <InvestorName account={props.original.TO_ACCOUNT} />
          </div>
        );
      },
    },
    {
      Header: 'TO ACCOUNT',
      accessor: 'TO_ACCOUNT', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'TO REFERENCE',
      accessor: 'TO_REFERENCE', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'FROM MEMBER',
      accessor: 'FROM_MEMBER', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'FROM ACCOUNT NAME',
      accessor: 'FROM_ACCOUNT', // String-based value accessors!
      Cell: (props) => {
        return (
          <div>
            <InvestorName account={props.original.FROM_ACCOUNT} />
          </div>
        );
      },
    },
    {
      Header: 'FROM ACCOUNT',
      accessor: 'FROM_ACCOUNT', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'FROM REFERENCE',
      accessor: 'FROM_REFERENCE', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'SYMBOL',
      accessor: 'SYMBOL', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'VOLUME',
      accessor: 'VOLUME', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'PRICE',
      accessor: 'PRICE', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'TRADE DATE',
      accessor: 'TRADE_DATE', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'TRADE TIME',
      accessor: 'TRADE_TIME', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'SETTLEMENT_DATE',
      accessor: 'SETTLEMENT DATE', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'TOTAL VALUE',
      accessor: 'TOTAL_VALUE', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'INTEREST VALUE',
      accessor: 'INTEREST VALUE', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'TRADE STATUS',
      accessor: 'TRADE_STATUS', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
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
           timeout={1000000}
           //3 secs
         />
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
                    <div className="nk-block-head nk-block-head-sm">
                      <div className="nk-block-between">
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">
                            EOD Lists
                          </h3>
                          {/* <div className="nk-block-des text-soft">
                            <p>You have total 2,595 users.</p>
                          </div> */}
                        </div>
                        <div className="nk-block-head-content">
                          <div className="toggle-wrap nk-block-tools-toggle">
                            <a
                              href="#"
                              className="btn btn-icon btn-trigger toggle-expand mr-n1"
                              data-target="pageMenu"
                            >
                              <em className="icon ni ni-menu-alt-r"></em>
                            </a>
                            <div
                              className="toggle-expand-content"
                              data-content="pageMenu"
                            >
                              <ul className="nk-block-tools g-3">
                                <li>
                                  <a
                                    href="#"
                                    className="btn btn-white btn-outline-light"
                                  >
                                    <em className="icon ni ni-download-cloud"></em>
                                    <span>Export</span>
                                  </a>
                                </li>
                                <li className="nk-block-tools-opt">
                                  <div className="drodown">
                                    <a
                                      href="#"
                                      className="dropdown-toggle btn btn-icon btn-primary"
                                      data-toggle="dropdown"
                                    >
                                      <em className="icon ni ni-plus"></em>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right"></div>
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
                          {/* <div class="card card-bordered card-full">
                            <div class="card-inner"> */}
                              {' '}
                              {showLoading()}
                              {success ? (
                                <ReactTable
                                  data={data2}
                                  columns={columns}
                                  filterable
                                  sortable
                                  defaultPageSize={20}
                                  showPaginationTop
                                  noDataText="Please wait Loading...."
                                  showPaginationBottom={false}
                                >
                                  {(state, filtredData, instance) => {
                                    const reactTable = state.pageRows.map(
                                      (post) => {
                                        return post._original;
                                      }
                                    );
                                    return (
                                      <div>
                                        {filtredData()}
                                        <ExportToExcel post={reactTable} />
                                      </div>
                                    );
                                  }}
                                </ReactTable>
                              ) : (
                                showLoading()
                              )}
                            {/* </div>
                          </div> */}
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

Eod.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default Eod;
