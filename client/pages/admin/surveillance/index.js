import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest3 from '../../../hooks/use-request3';
import Link from 'next/link';
import Loader from 'react-loader-spinner';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';



const Surveillance = ({ currentUser }) => {
  const [data2, setData2] = useState([]);

    const [data, setData] = useState({
      end: 'empty',
      start: '0',
      results: [],
      loading: false,
      searched: false,
    });

  
  const { results, searched, loading, end, start } = data;
  const [search2, setSearch2] = useState(false);


  const { doRequest3, error3, loading3, success3 } = useRequest3({
    
     url: `/api/surveillance/${start}/${end}`,
     method: 'get',
     body: {},

     onSuccess: (data) => {
       setData2(data);
       setSearch2(true);
     },
   });

  useEffect(() => {
    currentUser && currentUser.userType != 1
      ? Router.push('/auth/access-denied')
      : '';
  }, []);

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
      setSearch2(false);
    };


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
                          type="number"
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
  
    const columns = [
      {
        Header: 'member_code',
        accessor: 'member_code', // String-based value accessors!
      },
      {
        Header: 'account',
        accessor: 'account', // String-based value accessors!
        Cell: (props) => {
          return (
            <div>
              <a
                href={`admin/surveillance/${props.original.account}.${props.original.security}`}
              >
                {props.original.account}
              </a>
            </div>
          );
        },
      },
      {
        Header: 'security',
        accessor: 'security', // String-based value accessors!
      },

      {
        Header: 'volume',
        accessor: 'volume', // String-based value accessors!
      },

      {
        Header: 'net_pending',
        accessor: 'net_pending', // String-based value accessors!
      },
      {
        Header: 'available',
        accessor: 'available', // String-based value accessors!
      },
      {
        Header: 'investor_name',
        accessor: 'investor_name', // String-based value accessors!
      },
      {
        Header: 'date',
        accessor: 'date', // String-based value accessors!
      },
    ];

    const showLoading = () =>
     
      (loading3 && (
        <div className="text-center">
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={1000000} //3 secs
          />
        </div>
      ));

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

                    <div className="nk-content nk-content-fluid">
                      <div className="container-xl wide-lg">
                        <div className="nk-content-body">
                          <div className="nk-block-head nk-block-head-sm">
                            <div className="nk-block-between">
                              <div className="nk-block-head-content">
                                <h3 className="nk-block-title page-title">
                                  Surveillance Dashboard
                                </h3>
                                <div className="nk-block-des text-soft">
                                  <p>Welcome to Surveillance Dashboard</p>
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
                                    {datePickerForm()}
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

                                    {search2 ? (
                                      <ReactTable
                                        data={data2}
                                        columns={columns}
                                        filterable
                                        sortable
                                        defaultPageSize={20}
                                        showPaginationTop
                                        noDataText={'Loading Please Wait...'}
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
            <Footer></Footer>
          </div>
        </div>
      </body>
    </Fragment>
  );
};

Surveillance.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default Surveillance;
