import { useState, Fragment, React, useEffect } from 'react';
import Ticker from '../../../components/ticker';
import Layout from '../../../components/layout';
import SiderBar from '../../../components/admin/sidebar';
import Header from '../../../components/user/header';
import Footer from '../../../components/user/footer';
import useRequest3 from '../../../hooks/use-request3';
import useRequest2 from '../../../hooks/use-request2';
import InvestorName from '../../../components/admin/investorName'

import Link from 'next/link';
import Loader from 'react-loader-spinner';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';

const Surveillance = ({ currentUser, account }) => {
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);

  var splitString = account.split('.');
  var acct = splitString[0];
  var sec = splitString[1];

  const { doRequest3, error3, loading3, success3 } = useRequest3({
    url: `/api/surveillance/buy/now/${acct}/${sec}`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setData2(data);
    
    },
  });

    const { doRequest2, error2, loading2, success2 } = useRequest2({
      url: `/api/surveillance/sell/now/${acct}/${sec}`,
      method: 'get',
      body: {},

      onSuccess: (data) => {
        setData3(data);
       
      },
    });

  useEffect(() => {
    currentUser && currentUser.userType != 1
      ? Router.push('/auth/access-denied')
      : '';
    doRequest3();
    doRequest2();
  }, []);

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const BuyTable = () => {
    return (
      <Fragment>
        <div className="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">SYMBOL</th>
                <th scope="col">TRADE DATE</th>
                <th scope="col">BUYER NAME</th>
                <th scope="col">BUYER ACCOUNT</th>
                <th scope="col">BUYER CODE</th>
                <th scope="col">SELLER NAME</th>
                <th scope="col">SELLER ACCOUNT</th>
                <th scope="col">SELLER CODE</th>
                <th scope="col">VOLUME</th>
                <th scope="col">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {data2.map((buy,i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{buy.SYMBOL}</th>
                    <td>{buy.tradeDate}</td>
                    <td>
                      <InvestorName account={buy.toaccount} />
                    </td>
                    <td>{buy.toaccount}</td>
                    <td>{buy.tomember}</td>
                    <td>{buy.fromaccount}</td>
                    <td>{buy.fromaccount}</td>
                    <td>{buy.frommember}</td>
                    <td>{buy.VOLUME}</td>
                    <td>{buy.PRICE / 10000}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  };


  const SellTable = () => {
    return (
      <Fragment>
        <div className="table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">SYMBOL</th>
                <th scope="col">TRADE DATE</th>
                <th scope="col">SELLER NAME</th>
                <th scope="col">SELLER ACCOUNT</th>
                <th scope="col">SELLER CODE</th>
                <th scope="col">BUYER NAME</th>
                <th scope="col">BUYER ACCOUNT</th>
                <th scope="col">BUYER CODE</th>
                <th scope="col">VOLUME</th>
                <th scope="col">PRICE</th>
              </tr>
            </thead>
            <tbody>
              {data3.map((sell, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{sell.SYMBOL}</th>
                    <td>{sell.tradeDate}</td>
                    <th>
                      {' '}
                      <InvestorName account={sell.fromaccount} />
                    </th>
                    <td>{sell.fromaccount}</td>
                    <td>{sell.frommember}</td>
                    <th>
                      <InvestorName account={sell.toaccount} />
                    </th>
                    <td>{sell.toaccount}</td>
                    <td>{sell.tomember}</td>
                    <td>{sell.VOLUME}</td>
                    <td>{sell.PRICE / 10000}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Fragment>
    );
  };

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
                        </div>
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">Buy</h3>
                        </div>
                        {BuyTable()}
                        <br />
                        <br />
                        <div className="nk-block-head-content">
                          <h3 className="nk-block-title page-title">Sell</h3>
                        </div>
                        {SellTable()}
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
  const { data } = context.query;

  return { account: data };
};

export default Surveillance;
