import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/user/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest3 from '../../../hooks/use-request3';
import Loader from 'react-loader-spinner';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import ExportToExcel from '../../../components/user/Exports/ExportToExcelBrokersTopTrades';
import Router, { useRouter } from 'next/router';

const Top10Brokers = ({currentUser}) => {
  const [data, setData] = useState({
    end: '',
    start: '',
    results: [],
    loading: false,
    searched: false,
  });

  const { results, searched, loading, end, start } = data;

  const [trade, setTrade] = useState([]);

  const { doRequest3, errors3, loading3, success3 } = useRequest3({
    url: `/api/brokers/top10/${start}/${end}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setTrade(data);
    },
  });

  useEffect(() => {
    currentUser === null ? Router.push('/auth/redirect-login') : '';
    
     currentUser && currentUser.status === 'free'
       ? Router.push('/auth/access-denied')
       : '';
  }, [])

  const searchData = () => {
    console.log(start, end);
    doRequest3();
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({
      ...data,
      [name]: event.target.value,
      searched: false,
    });
  };

  const columns = [
    {
      Header: 'PI',
      accessor: 'member_name', // String-based value accessors!
    },
    {
      Header: 'PI CODE',
      accessor: 'toMember', // String-based value accessors!
      style: {
        textAlign: 'center',
      },
    },
    {
      Header: 'DEALS',
      accessor: 'count', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
    },
    {
      Header: 'VALUE',
      accessor: 'y', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
      Cell: (props) => {
        return <span>{parseFloat(props.original.y).toFixed(0)}</span>;
      },
    },
    {
      Header: 'VOLUME',
      accessor: 'volume', // String-based value accessors!
      style: {
        textAlign: 'right',
      },
      Cell: (props) => {
        return <span>{parseFloat(props.original.volume).toFixed(0)}</span>;
      },
    },
  ];

  const showLoading = () =>
    loading3 && (
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

  const datePickerForm = () => {
    return (
      <Fragment>
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={searchSubmit}>
                  <label>Daterange Picker</label>
                  <div id="dateragne-picker">
                    <div className="input-daterange input-group">
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange('start')}
                        placeholder="20200101"
                      />
                      <div className="input-group-prepend">
                        <span className="input-group-text">TO</span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        onChange={handleChange('end')}
                        placeholder="20200131"
                      />
                      <div
                        className="input-group-prepend"
                        style={{ border: 'none' }}
                      >
                        <button className="input-group-text">Search</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

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
                              Brokers Performance Report
                            </h3>
                            <div className="nk-block-des text-soft">
                              <p>
                                {' '}
                                Enter a date range to generate all brokers
                                performance report for the period
                              </p>
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
                                  <li>
                                    <a
                                      href="#"
                                      className="btn btn-white btn-dim btn-outline-primary"
                                    >
                                      <em className="icon ni ni-download-cloud"></em>
                                      <span>Export</span>
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="btn btn-white btn-dim btn-outline-primary"
                                    >
                                      <em className="icon ni ni-reports"></em>
                                      <span>Reports</span>
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
                              <div class="card-inner">{datePickerForm()}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="nk-block">
                        <div class="row g-gs">
                          <div class="col-md-12">
                            <div class="card card-bordered card-full">
                              <div class="card-inner">
                                {' '}
                                {showLoading()}
                                {success3 ? (
                                  <ReactTable
                                    data={trade}
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
                                          <ExportToExcel
                                            post={reactTable}
                                            start={start}
                                            end={end}
                                          />
                                        </div>
                                      );
                                    }}
                                  </ReactTable>
                                ) : (
                                  showLoading()
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

export default Top10Brokers;
