import React, { useState, useEffect, Fragment } from 'react';
import useRequest from '../hooks/use-request';
import useRequest2 from '../hooks/use-request2';

const Nsi = () => {
  const [nisT, setNsiT] = useState([]);
  
  const [nisY, setNsnisty] = useState([]);

  const { doRequest, errors, loading } = useRequest({
    url: `/api/equity/MarketIndexT`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setNsiT(data);
    },
  });

  const { doRequest2, errors2, loading2 } = useRequest2({
    url: `/api/equity/MarketIndexY`,
    method: 'get',
    body: {},

    onSuccess: (data) => {
      setNsnisty(data);
    },
  });

  useEffect(() => {
    doRequest();
    doRequest2();
  }, []);

  return (
    <div className="col-lg-12 col-xl-12">
      <div className="nk-block">
        <div className="row g-2">
          {nisT.map((nist, i) => {
            return (
              <Fragment>
                <div key={i} className="col-sm-3">
                  <div className="card bg-light">
                    <div className="nk-wgw sm">
                      <div className="nk-wgw-name">
                        <div className="nk-wgw-icon">
                          <em className="icon ni ni-trend-up"></em>
                        </div>
                        <h5 className="nk-wgw-title title">NSI</h5>
                      </div>
                      <div className="nk-wgw-balance">
                        <div className="amount">
                          {nist.usi}

                          {nisY.map((nisty, i) => {
                            const todayrow = nist.usi;
                            const yesterdayrow = nisty.usi;
                            const usiPercentageChange = (
                              ((todayrow - yesterdayrow) / yesterdayrow) *
                              100
                            ).toFixed(2);
                            let usiTextChange;
                            if (usiPercentageChange > 0) {
                              usiTextChange = (
                                <span
                                  style={{
                                    color: '#07fe00',
                                    fontWeight: '900',
                                    fontSize: 'large',
                                  }}
                                >
                                  &#9650; {usiPercentageChange} %{' '}
                                </span>
                              );
                            } else if (usiPercentageChange < 0) {
                              usiTextChange = (
                                <span
                                  style={{
                                    color: 'red',
                                    fontWeight: '900',
                                    fontSize: 'large',
                                  }}
                                >
                                  &#9660; {usiPercentageChange} %{' '}
                                </span>
                              );
                            } else {
                              usiTextChange = (
                                <span
                                  style={{
                                    color: '#333300',
                                    fontWeight: '900',
                                    fontSize: 'large',
                                  }}
                                >
                                  &#8212; {usiPercentageChange} %{' '}
                                </span>
                              );
                            }
                            return (
                              <span className="currency currency-nio">
                                {usiTextChange}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}

          {nisT.map((Mcap, i) => {
            return (
              <Fragment>
                <div key={i} className="col-sm-3">
                  <div className="card bg-light">
                    <div className="nk-wgw sm">
                      <div className="nk-wgw-name">
                        <div className="nk-wgw-icon">
                          <em className="icon ni ni-sign-kobo"></em>
                        </div>
                        <h5 className="nk-wgw-title title">Mkt. Cap (₦'Bn)</h5>
                      </div>
                      <div className="nk-wgw-balance">
                        <div className="amount">
                          {(Mcap.capitalisation / 1000000000).toLocaleString(
                            navigator.language,
                            {
                              minimumFractionDigits: 0,
                            }
                          )}

                          {nisY.map((McapY, i) => {
                            const McapRowT = Mcap.capitalisation;
                            const McapRowY = McapY.capitalisation;
                            const McapPercentageChange = (
                              ((McapRowT - McapRowY) / McapRowY) *
                              100
                            ).toFixed(2);
                            let McapTextChange;
                            if (McapPercentageChange > 0) {
                              McapTextChange = (
                                <span
                                  style={{
                                    color: '#07fe00',
                                    fontWeight: '900',
                                    fontSize: 'large',
                                  }}
                                >
                                  &#9650; {McapPercentageChange} %{' '}
                                </span>
                              );
                            } else if (McapPercentageChange < 0) {
                              McapTextChange = (
                                <span
                                  style={{
                                    color: 'red',
                                    fontWeight: '900',
                                    fontSize: 'large',
                                  }}
                                >
                                  &#9660; {McapPercentageChange} %{' '}
                                </span>
                              );
                            } else {
                              McapTextChange = (
                                <span
                                  style={{
                                    color: '#333300',
                                    fontWeight: '900',
                                    fontSize: 'large',
                                  }}
                                >
                                  &#8212; {McapPercentageChange} %{' '}
                                </span>
                              );
                            }
                            return (
                              <span className="currency currency-nio">
                                {McapTextChange}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            );
          })}

          <div className="col-sm-3">
            <div className="card bg-light">
              <div className="nk-wgw sm">
                <div className="nk-wgw-name">
                  <div className="nk-wgw-icon">
                    <em className="icon ni ni-money"></em>
                  </div>
                  <h5 className="nk-wgw-title title">Volume Traded</h5>
                </div>
                <div className="nk-wgw-balance">
                  <div className="amount">
                    4.434953
                    <span className="currency currency-btc">Volume</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-3">
            <div className="card bg-light">
              <div className="nk-wgw sm">
                <div className="nk-wgw-name">
                  <div className="nk-wgw-icon">
                    <em className="icon ni ni-sign-kobo"></em>
                  </div>
                  <h5 className="nk-wgw-title title">Value Traded</h5>
                </div>
                <div className="nk-wgw-balance">
                  <div className="amount">
                    0.000560
                    <span className="currency currency-eth">Value </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Nsi.getInitialProps = async (context, client, currentuser) => {
  const { data } = await client.get(`/api/equity/MarketIndexT`);

  console.log(data);

  return { nsi: data };
};

export default Nsi;
